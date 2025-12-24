import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Review {
  id: number;
  name: string;
  text: string;
  rating: number;
  image: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Troi Grant",
    text: "Great service, responded right away and got the job done the same day. I would recommend to any one that wants to find the real issue going on with their vehicle. He goes above and beyond Thank you!",
    rating: 5,
    image: "https://cdn.builder.io/api/v1/image/assets%2Fbd2db2bf76dc466fa0ee7e5d644defec%2F0311d97e6a2745bb96def9c99ede103a?format=webp&width=800",
  },
  {
    id: 2,
    name: "Belinda Swope",
    text: "They were fast, knowledgeable, friendly and honest! Highly recommend. They were fast, knowledgeable, friendly and honest! Highly recommend. They were fast, knowledgeable, friendly and honest! Highly recommend",
    rating: 5,
    image: "https://cdn.builder.io/api/v1/image/assets%2Fbd2db2bf76dc466fa0ee7e5d644defec%2F044d8608167543128f40c3649767369e?format=webp&width=800",
  },
  {
    id: 3,
    name: "Michael Luongo",
    text: "I just used mobile services this morning. They were excellent courteous, polite, and neat. I would highly recommend this service for anyone.",
    rating: 5,
    image: "https://cdn.builder.io/api/v1/image/assets%2Fbd2db2bf76dc466fa0ee7e5d644defec%2F9e0d42f735d0482ea6988c20ce44a430?format=webp&width=800",
  },
];

export const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? reviews.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === reviews.length - 1 ? 0 : prevIndex + 1));
  };

  const currentReview = reviews[currentIndex];

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

        {/* Facebook-style Review Carousel */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-8 relative">
            {/* Review Content */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <img
                  src={currentReview.image}
                  alt={currentReview.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
                />
              </div>

              {/* Review Text */}
              <div className="flex-grow">
                {/* Name */}
                <h3 className="font-bold text-gray-900 text-lg mb-2">{currentReview.name}</h3>

                {/* Star Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: currentReview.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-700 text-sm leading-relaxed">{currentReview.text}</p>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4 justify-center mt-8">
              <Button
                onClick={goToPrevious}
                variant="outline"
                size="icon"
                className="rounded-full hover:bg-gray-100"
                aria-label="Previous review"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              {/* Indicator Dots */}
              <div className="flex gap-2 items-center">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex ? "bg-primary w-6" : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to review ${index + 1}`}
                    aria-current={index === currentIndex ? "true" : "false"}
                  />
                ))}
              </div>

              <Button
                onClick={goToNext}
                variant="outline"
                size="icon"
                className="rounded-full hover:bg-gray-100"
                aria-label="Next review"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            {/* Review Counter */}
            <div className="text-center mt-6 text-sm text-gray-600">
              {currentIndex + 1} / {reviews.length}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
