import { useEffect, useState } from "react";

export const Reviews = () => {
  const [scriptError, setScriptError] = useState(false);

  useEffect(() => {
    // Check if script is already loaded
    if (window.elfsight) {
      return;
    }

    // Load Elfsight platform script with error handling
    const script = document.createElement("script");
    script.src = "https://elfsightcdn.com/platform.js";
    script.async = true;

    script.onerror = () => {
      console.warn("Failed to load Elfsight widget script. Reviews widget may not display.");
      setScriptError(true);
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup if needed
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Customer <span className="text-primary text-glow">Reviews</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            See what our satisfied customers have to say
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {scriptError ? (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-center">
              <p className="text-amber-800">
                We're having trouble loading our Google Reviews at the moment. Please try refreshing the page.
              </p>
            </div>
          ) : (
            <div
              className="elfsight-app-783427a7-3dd8-4356-afc9-1eb328f1c27f"
              data-elfsight-app-lazy
            ></div>
          )}
        </div>
      </div>
    </section>
  );
};
