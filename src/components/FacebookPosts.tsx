import { useEffect } from "react";
import { Facebook, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FacebookPost {
  id: string;
  url: string;
  reelId: string;
}

export const FacebookPosts = () => {
  useEffect(() => {
    // Load Facebook SDK for embedding
    const loadFacebookSDK = () => {
      if (document.getElementById("facebook-jssdk")) return;

      const script = document.createElement("script");
      script.id = "facebook-jssdk";
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v21.0";

      window.fbAsyncInit = () => {
        if (window.FB) {
          window.FB.init({
            xfbml: true,
            version: "v21.0",
          });
          window.FB.XFBML.parse();
        }
      };

      document.head.appendChild(script);
    };

    // Give a small delay to ensure DOM is ready
    setTimeout(() => {
      loadFacebookSDK();
      // Also try parsing after SDK loads
      setTimeout(() => {
        if (window.FB && window.FB.XFBML) {
          window.FB.XFBML.parse();
        }
      }, 1000);
    }, 100);
  }, []);

  const facebookPosts: FacebookPost[] = [
    {
      id: "post-1",
      url: "https://www.facebook.com/reel/1063659892535347",
      reelId: "1063659892535347",
    },
    {
      id: "post-2",
      url: "https://www.facebook.com/reel/1283700730200298/?s=single_unit",
      reelId: "1283700730200298",
    },
    {
      id: "post-3",
      url: "https://www.facebook.com/reel/1996593834239180/?s=single_unit",
      reelId: "1996593834239180",
    },
    {
      id: "post-4",
      url: "https://www.facebook.com/reel/3192988037542385/?s=single_unit",
      reelId: "3192988037542385",
    },
  ];

  return (
    <section id="facebook-posts" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-4">
            Follow Us on <span className="text-primary text-glow">Facebook</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Check out our latest posts and updates
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {facebookPosts.map((post, index) => (
            <div key={post.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="bg-card border-2 border-border rounded-lg overflow-hidden hover:border-primary transition-all duration-300 h-full flex flex-col">
                  {/* Embed Container */}
                  <div className="relative w-full bg-black/20 flex items-center justify-center overflow-hidden" style={{ minHeight: "300px" }}>
                    <div
                      className="fb-video w-full"
                      data-href={post.url}
                      data-show-text="false"
                      data-width="500"
                      data-allowfullscreen="true"
                    />
                    {/* Fallback play icon if embed doesn't load */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <div className="bg-primary rounded-full p-4">
                        <Play className="w-8 h-8 fill-primary-foreground text-primary-foreground" />
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-6 flex flex-col items-center justify-center flex-grow">
                    <div className="flex items-center gap-2 mb-3">
                      <Facebook className="w-5 h-5 text-primary" />
                      <span className="font-orbitron font-bold text-foreground">Facebook Reel</span>
                    </div>
                    <Button
                      className="bg-primary text-primary-foreground hover:bg-primary/90 font-orbitron font-bold w-full"
                      asChild
                    >
                      <a href={post.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                        Watch Now
                      </a>
                    </Button>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* Direct Links Section */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">
            Or visit us directly on Facebook
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {facebookPosts.map((post) => (
              <Button
                key={`link-${post.id}`}
                asChild
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-orbitron"
              >
                <a href={post.url} target="_blank" rel="noopener noreferrer">
                  Reel {post.id.split("-")[1]}
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Type definition for Facebook SDK
declare global {
  interface Window {
    fbAsyncInit?: () => void;
    FB?: {
      init: (config: any) => void;
      XFBML: {
        parse: () => void;
      };
    };
  }
}
