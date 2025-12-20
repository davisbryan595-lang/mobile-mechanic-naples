import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, MessageSquare, ExternalLink } from "lucide-react";
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

        {/* Leave a Review Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-gradient-metallic border-2 border-border rounded-lg p-8 glow-orange">
            <div className="flex items-center justify-center gap-2 mb-6">
              <MessageSquare className="w-6 h-6 text-primary" />
              <h3 className="font-orbitron text-2xl font-bold text-center">
                Share Your Experience
              </h3>
            </div>
            <p className="text-muted-foreground text-center mb-8">
              We'd love to hear about your service experience! Leave a review on your favorite platform.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Google Review Button */}
              <a
                href="https://www.google.com/search?q=mobile+mechanic+reviews"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-6 bg-background/50 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all"
              >
                <Star className="w-8 h-8 text-primary mb-2" />
                <span className="font-orbitron font-bold text-foreground">Google Reviews</span>
                <span className="text-xs text-muted-foreground mt-1">5-star rating</span>
                <ExternalLink className="w-4 h-4 text-primary mt-3" />
              </a>

              {/* Facebook Review Button */}
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-6 bg-background/50 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all"
              >
                <Star className="w-8 h-8 text-primary mb-2" />
                <span className="font-orbitron font-bold text-foreground">Facebook Reviews</span>
                <span className="text-xs text-muted-foreground mt-1">Share feedback</span>
                <ExternalLink className="w-4 h-4 text-primary mt-3" />
              </a>

              {/* Yelp Review Button */}
              <a
                href="https://www.yelp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-6 bg-background/50 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all"
              >
                <Star className="w-8 h-8 text-primary mb-2" />
                <span className="font-orbitron font-bold text-foreground">Yelp Reviews</span>
                <span className="text-xs text-muted-foreground mt-1">Rate our service</span>
                <ExternalLink className="w-4 h-4 text-primary mt-3" />
              </a>
            </div>

            <p className="text-xs text-muted-foreground text-center mt-6">
              Your honest feedback helps us improve and helps other customers make informed decisions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
