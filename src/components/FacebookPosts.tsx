import { useEffect } from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FacebookPost {
  id: string;
  url: string;
  reelId: string;
}

export const FacebookPosts = () => {
  useEffect(() => {
    // Load Facebook SDK for embedding
    if (!window.FB) {
      window.fbAsyncInit = function () {
        FB.init({
          appId: "",
          xfbml: true,
          version: "v21.0",
        });
      };

      const script = document.createElement("script");
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v21.0";

      script.onload = () => {
        if (window.FB && window.FB.XFBML) {
          setTimeout(() => window.FB.XFBML.parse(), 100);
        }
      };

      document.head.appendChild(script);
    } else if (window.FB && window.FB.XFBML) {
      window.FB.XFBML.parse();
    }
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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-4">
            Follow Us on <span className="text-primary text-glow">Facebook</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Check out our latest posts and updates
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {facebookPosts.map((post, index) => (
            <div
              key={post.id}
              className="flex flex-col items-center justify-center animate-slide-up min-h-96 bg-card rounded-lg border border-border p-6"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className="fb-video w-full max-w-md"
                data-href={post.url}
                data-show-text="false"
                data-width="500"
              />
              <div className="mt-4 w-full flex justify-center">
                <Button
                  asChild
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-orbitron font-bold gap-2"
                >
                  <a href={post.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                    Watch on Facebook
                  </a>
                </Button>
              </div>
            </div>
          ))}
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
