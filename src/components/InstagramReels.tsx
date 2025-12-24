import { useEffect, useRef } from "react";
import { Instagram, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InstagramPost {
  id: string;
  url: string;
  postId: string;
}

export const InstagramReels = () => {
  const scriptLoaded = useRef(false);

  useEffect(() => {
    // Load Instagram SDK for embedding
    const loadInstagramSDK = () => {
      if (scriptLoaded.current) return;

      if (document.getElementById("instagram-embed")) {
        // SDK already exists, just re-process
        if (window.instgrm) {
          window.instgrm.Embeds.process();
        }
        return;
      }

      const script = document.createElement("script");
      script.id = "instagram-embed";
      script.async = true;
      script.defer = true;
      script.src = "https://www.instagram.com/embed.js";

      script.onload = () => {
        scriptLoaded.current = true;
        // Process embeds after script loads
        setTimeout(() => {
          if (window.instgrm) {
            window.instgrm.Embeds.process();
          }
        }, 100);
      };

      document.head.appendChild(script);

      // Fallback processing after delay
      const fallbackTimeout = setTimeout(() => {
        if (window.instgrm) {
          window.instgrm.Embeds.process();
        }
      }, 2000);

      return () => clearTimeout(fallbackTimeout);
    };

    loadInstagramSDK();
  }, []);

  const instagramPosts: InstagramPost[] = [
    {
      id: "post-1",
      url: "https://www.instagram.com/p/DSp-7FDEYB7/",
      postId: "DSp-7FDEYB7",
    },
    {
      id: "post-2",
      url: "https://www.instagram.com/p/DSi9s1uETxF/",
      postId: "DSi9s1uETxF",
    },
    {
      id: "post-3",
      url: "https://www.instagram.com/p/DSi9nv2EVSJ/",
      postId: "DSi9nv2EVSJ",
    },
    {
      id: "post-4",
      url: "https://www.instagram.com/p/DSfKhgYEbpB/",
      postId: "DSfKhgYEbpB",
    },
  ];

  return (
    <section id="instagram" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-4">
            Follow Us on <span className="text-primary text-glow">Instagram</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Check out our latest updates and behind-the-scenes content
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {instagramPosts.map((post, index) => (
            <div
              key={post.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-card border-2 border-border rounded-lg overflow-hidden hover:border-primary transition-all duration-300 h-full flex flex-col group">
                {/* Embed Container */}
                <div className="relative w-full bg-gradient-to-b from-black/40 to-black/20 flex items-center justify-center overflow-hidden" style={{ minHeight: "500px" }}>
                  {/* Instagram Embed */}
                  <blockquote
                    className="instagram-media w-full"
                    data-instgrm-permalink={post.url}
                    data-instgrm-version="14"
                  />

                  {/* Fallback/Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-primary rounded-full p-4 mb-4">
                      <Instagram className="w-8 h-8 fill-primary-foreground text-primary-foreground" />
                    </div>
                    <p className="text-white font-orbitron font-bold text-sm">Click to View</p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-6 flex flex-col items-center justify-center flex-grow gap-4">
                  <div className="flex items-center gap-2">
                    <Instagram className="w-5 h-5 text-primary" />
                    <span className="font-orbitron font-bold text-foreground">Instagram Post</span>
                  </div>
                  <Button
                    className="bg-primary text-primary-foreground hover:bg-primary/90 font-orbitron font-bold w-full gap-2"
                    asChild
                  >
                    <a href={post.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                      View on Instagram
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Access Links */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-8 font-orbitron">
            View all posts directly
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {instagramPosts.map((post) => (
              <Button
                key={`link-${post.id}`}
                asChild
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-orbitron"
              >
                <a href={post.url} target="_blank" rel="noopener noreferrer">
                  Post {post.id.split("-")[1]}
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Type definition for Instagram SDK
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}
