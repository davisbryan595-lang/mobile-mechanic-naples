import { useEffect } from "react";

export const FacebookPosts = () => {
  useEffect(() => {
    // Load Facebook SDK if not already loaded
    if (!window.fbAsyncInit) {
      window.fbAsyncInit = function () {
        FB.init({
          appId: "1234567890", // Placeholder - Facebook SDK will work without this for embedded posts
          xfbml: true,
          version: "v21.0",
        });
        // Parse any new Facebook plugins that may have been added
        FB.XFBML.parse();
      };

      const script = document.createElement("script");
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v21.0";
      document.body.appendChild(script);
    } else {
      // SDK already loaded, just parse the new content
      if (window.FB && window.FB.XFBML) {
        window.FB.XFBML.parse();
      }
    }
  }, []);

  const facebookPostUrls = [
    "https://www.facebook.com/reel/1063659892535347",
    "https://www.facebook.com/reel/1283700730200298/?s=single_unit",
    "https://www.facebook.com/reel/1996593834239180/?s=single_unit",
    "https://www.facebook.com/reel/3192988037542385/?s=single_unit",
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
          {facebookPostUrls.map((url, index) => (
            <div
              key={index}
              className="flex justify-center animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="fb-video w-full max-w-lg" data-href={url} data-show-text="false" />
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
    FB: any;
  }
}
