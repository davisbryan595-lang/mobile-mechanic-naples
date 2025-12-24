import { useEffect, useRef } from "react";

interface FacebookEmbed {
  href: string;
  id: string;
}

export const FacebookPosts = () => {
  const embedsLoaded = useRef(false);

  useEffect(() => {
    // Load and initialize Facebook SDK
    const loadFacebookSdk = async () => {
      // Only load once
      if (embedsLoaded.current) return;

      return new Promise<void>((resolve) => {
        window.fbAsyncInit = function () {
          if (window.FB) {
            window.FB.init({
              appId: "",
              xfbml: true,
              version: "v21.0",
            });
            window.FB.XFBML.parse();
            embedsLoaded.current = true;
            resolve();
          }
        };

        // Load the Facebook SDK script
        if (!document.getElementById("facebook-jssdk")) {
          const script = document.createElement("script");
          script.id = "facebook-jssdk";
          script.async = true;
          script.defer = true;
          script.crossOrigin = "anonymous";
          script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v21.0";
          document.head.appendChild(script);
        }

        // Timeout fallback to ensure parsing happens
        setTimeout(() => {
          if (window.FB && window.FB.XFBML) {
            window.FB.XFBML.parse();
          }
          resolve();
        }, 2000);
      });
    };

    loadFacebookSdk();
  }, []);

  const facebookEmbeds: FacebookEmbed[] = [
    {
      href: "https://www.facebook.com/reel/1063659892535347",
      id: "fb-post-1",
    },
    {
      href: "https://www.facebook.com/reel/1283700730200298/?s=single_unit",
      id: "fb-post-2",
    },
    {
      href: "https://www.facebook.com/reel/1996593834239180/?s=single_unit",
      id: "fb-post-3",
    },
    {
      href: "https://www.facebook.com/reel/3192988037542385/?s=single_unit",
      id: "fb-post-4",
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto justify-items-center">
          {facebookEmbeds.map((embed, index) => (
            <div
              key={embed.id}
              className="w-full max-w-md animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                id={embed.id}
                className="fb-video overflow-hidden"
                data-href={embed.href}
                data-width="500"
                data-allowfullscreen="true"
              />
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
