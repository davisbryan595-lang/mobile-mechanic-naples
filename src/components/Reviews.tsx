import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews = [
    {
      name: "John D.",
      rating: 5,
      text: "Prompt, honest, and did an awesome job. Highly recommend! They came to my office and fixed my brake issue in under an hour.",
    },
    {
      name: "Maria K.",
      rating: 5,
      text: "Came the same day and fixed my A/C right in the driveway! Super professional and the price was very fair. Will definitely use again.",
    },
    {
      name: "Robert S.",
      rating: 5,
      text: "Best mobile mechanic service in Naples! They diagnosed my engine problem quickly and explained everything clearly. No pressure, just honest service.",
    },
    {
      name: "Lisa M.",
      rating: 5,
      text: "Called them for a battery replacement and they were at my house within 2 hours. Fast, professional, and saved me a tow truck fee!",
    },
  ];

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  useEffect(() => {
    const interval = setInterval(nextReview, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="reviews" className="py-20 bg-gradient-to-b from-background to-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-4">
            Customer <span className="text-primary text-glow">Reviews</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See what our satisfied customers have to say
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="bg-gradient-metallic border-2 border-primary/30 rounded-lg p-8 md:p-12 glow-orange min-h-[300px] flex flex-col justify-center">
            <div className="flex justify-center mb-4">
              {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-primary text-primary" />
              ))}
            </div>
            
            <blockquote className="text-center mb-6">
              <p className="text-xl md:text-2xl text-foreground italic mb-4">
                "{reviews[currentIndex].text}"
              </p>
              <footer className="font-orbitron font-bold text-primary text-lg">
                — {reviews[currentIndex].name}
              </footer>
            </blockquote>

            <div className="flex justify-center gap-2 mt-4">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-primary w-8"
                      : "bg-border hover:bg-primary/50"
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            onClick={prevReview}
            aria-label="Previous review"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            onClick={nextReview}
            aria-label="Next review"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </section>
  );
};
