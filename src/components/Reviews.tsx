import { useEffect } from "react";

export const Reviews = () => {
  useEffect(() => {
    // Load Elfsight platform script with error handling
    if (!window.elfsight) {
      const script = document.createElement("script");
      script.src = "https://elfsightcdn.com/platform.js";
      script.async = true;

      // Handle script loading errors gracefully
      script.onerror = () => {
        console.warn("Failed to load Elfsight platform script");
      };

      document.body.appendChild(script);
    }
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

        {/* Reviews widgets disabled due to account limits - upgrade your Elfsight plan to re-enable */}
        <div className="max-w-4xl mx-auto text-center py-12">
          <p className="text-gray-600">
            Customer reviews will be displayed here. Please check back soon.
          </p>
        </div>
      </div>
    </section>
  );
};
