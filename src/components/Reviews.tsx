import { useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Star } from "lucide-react";

interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Troi Grant",
    rating: 5,
    text: "Great service, responded right away and got the job done the same day. I would recommend to any one that wants to find the real issue going on with their vehicle. He goes above and beyond Thank you!",
  },
  {
    id: 2,
    name: "Belinda Swope",
    rating: 5,
    text: "They were fast, knowledgeable, friendly and honest! Highly recommend They were fast, knowledgeable, friendly and honest! Highly recommend They were fast, knowledgeable, friendly and honest! Highly recommend",
  },
  {
    id: 3,
    name: "Michael Luongo",
    rating: 5,
    text: "I just used mobile services this morning. They were excellent courteous, polite, and neat. I would highly recommend this service for anyone.",
  },
];

export const Reviews = () => {
  const [api, setApi] = useState<any>(null);

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

        <div className="max-w-6xl mx-auto px-4">
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {reviews.map((review) => (
                <CarouselItem key={review.id} className="md:basis-1/3">
                  <div className="facebook-review-card">
                    <div className="review-header">
                      <div className="reviewer-info">
                        <div className="reviewer-avatar">{review.name.charAt(0)}</div>
                        <div className="reviewer-details">
                          <h3 className="reviewer-name">{review.name}</h3>
                          <div className="review-rating">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="rating-star" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="review-text">{review.text}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="review-carousel-button review-carousel-prev" />
            <CarouselNext className="review-carousel-button review-carousel-next" />
          </Carousel>

          <div className="carousel-indicators">
            {reviews.map((_, index) => (
              <button
                key={index}
                className={`indicator-dot ${api?.selectedScrollSnap() === index ? "active" : ""}`}
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .facebook-review-card {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 20px;
          height: 100%;
          display: flex;
          flex-direction: column;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
          transition: box-shadow 0.3s ease;
        }

        .facebook-review-card:hover {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
        }

        .review-header {
          display: flex;
          align-items: center;
          margin-bottom: 16px;
        }

        .reviewer-info {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
        }

        .reviewer-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, hsl(30 100% 50%), hsl(25 100% 45%));
          color: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 18px;
          flex-shrink: 0;
        }

        .reviewer-details {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .reviewer-name {
          font-weight: 600;
          color: #1a1a1a;
          font-size: 15px;
          margin: 0;
          font-family: 'Rajdhani', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .review-rating {
          display: flex;
          gap: 4px;
          align-items: center;
        }

        .rating-star {
          width: 16px;
          height: 16px;
          fill: hsl(30 100% 50%);
          color: hsl(30 100% 50%);
        }

        .review-text {
          color: #626262;
          font-size: 14px;
          line-height: 1.5;
          margin: 0;
          flex: 1;
          font-family: 'Rajdhani', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .review-carousel-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: hsl(30 100% 50%) !important;
          color: #000 !important;
          border: none !important;
          z-index: 10;
          width: 40px !important;
          height: 40px !important;
          padding: 0 !important;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50% !important;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(255, 140, 0, 0.3);
        }

        .review-carousel-button:hover:not(:disabled) {
          background: hsl(30 95% 45%) !important;
          box-shadow: 0 4px 12px rgba(255, 140, 0, 0.5);
        }

        .review-carousel-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .review-carousel-prev {
          left: -60px;
        }

        .review-carousel-next {
          right: -60px;
        }

        .carousel-indicators {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 24px;
        }

        .indicator-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #d4d4d8;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }

        .indicator-dot.active {
          background: hsl(30 100% 50%);
          width: 28px;
          border-radius: 5px;
        }

        @media (max-width: 768px) {
          .facebook-review-card {
            padding: 16px;
          }

          .review-carousel-prev {
            left: 0;
            position: relative;
            margin-bottom: 16px;
            margin-right: 8px;
          }

          .review-carousel-next {
            right: 0;
            position: relative;
            margin-left: 8px;
          }

          .carousel-controls {
            display: flex;
            justify-content: center;
            gap: 8px;
            margin-top: 16px;
          }
        }
      `}</style>
    </section>
  );
};
