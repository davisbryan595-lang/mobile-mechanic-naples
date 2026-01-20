import { useEffect } from "react";

export const Reviews = () => {
  useEffect(() => {
    // Load Elfsight platform script if not already loaded
    if (!window.eapps) {
      const script = document.createElement("script");
      script.src = "https://elfsightcdn.com/platform.js";
      script.async = true;
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

        <div className="max-w-4xl mx-auto">
          {/* Elfsight Google Reviews | Mobile-Mechanic Service Google Reviews */}
          <div className="elfsight-app-783427a7-3dd8-4356-afc9-1eb328f1c27f" data-elfsight-app-lazy></div>
        </div>
      </div>
    </section>
  );
};
