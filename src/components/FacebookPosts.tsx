import { useEffect } from "react";

export const FacebookPosts = () => {
  useEffect(() => {
    // Load and initialize Facebook SDK
    const loadFacebookSdk = () => {
      // Check if SDK is already loaded
      if (window.FB) {
        window.FB.XFBML.parse();
        return;
      }

      window.fbAsyncInit = function () {
        FB.init({
          xfbml: true,
          version: "v21.0",
        });
        FB.XFBML.parse();
      };

      // Load the Facebook SDK script
      const script = document.createElement("script");
      script.id = "facebook-jssdk";
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v21.0";
      script.onload = () => {
        // Parse after script loads
        setTimeout(() => {
          if (window.FB && window.FB.XFBML) {
            window.FB.XFBML.parse();
          }
        }, 100);
      };

      const existingScript = document.getElementById("facebook-jssdk");
      if (!existingScript) {
        document.head.appendChild(script);
      }
    };

    loadFacebookSdk();

    // Fallback: parse again after a short delay to ensure all elements are loaded
    const parseTimer = setTimeout(() => {
      if (window.FB && window.FB.XFBML) {
        window.FB.XFBML.parse();
      }
    }, 1500);

    return () => clearTimeout(parseTimer);
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
              <div
                className="fb-video w-full"
                data-href={url}
                data-width="500"
                data-show-text="false"
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
    FB: any;
  }
}
