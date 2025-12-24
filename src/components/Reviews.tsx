import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

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
  {
    id: 4,
    name: "Martin Rainey Jr.",
    text: "Was great! I provided the parts and they did the install. Was quick, professional and easy. If I need anymore car maintenance done, they would be the first ones to call!",
    rating: 5,
    image: "https://cdn.builder.io/api/v1/image/assets%2Fbd2db2bf76dc466fa0ee7e5d644defec%2Fd45741c132f444bea02f93361f00a322?format=webp&width=800",
  },
  {
    id: 5,
    name: "Rowan Jamie",
    text: "Highly Recommend, Honest, Reliable, Prompt, Efficient, Trustworthy, Knowledgeable of all ages of vehicles, Prices are very reasonable. 5 stars",
    rating: 5,
    image: "https://cdn.builder.io/api/v1/image/assets%2Fbd2db2bf76dc466fa0ee7e5d644defec%2F859ac9735ace48ca9563d0c33b9c54db?format=webp&width=800",
  },
  {
    id: 6,
    name: "Neal Smith",
    text: "very prompt, answered every question I had and did a great job at a very reasonable price. highly recommend.",
    rating: 5,
    image: "https://cdn.builder.io/api/v1/image/assets%2Fbd2db2bf76dc466fa0ee7e5d644defec%2F5d6156ebcc284eb489d47c2793b2c4c9?format=webp&width=800",
  },
  {
    id: 7,
    name: "Karina Kutsar",
    text: "Very helpful and fast, he came to my work and fixed it all for me before my shift was over. would definitely recommend!!",
    rating: 5,
    image: "https://cdn.builder.io/api/v1/image/assets%2Fbd2db2bf76dc466fa0ee7e5d644defec%2F4a106f24a72c4b41996469a3787876cd?format=webp&width=800",
  },
  {
    id: 8,
    name: "Anton Rybalka",
    text: "I've used this mobile mechanic a few times now, and every time the service has been excellent. He's reliable, honest, and really knows what he's doing. It's super convenient that he comes to you, and the prices are very fair. Definitely my go-to mechanic from now on!",
    rating: 5,
    image: "https://cdn.builder.io/api/v1/image/assets%2Fbd2db2bf76dc466fa0ee7e5d644defec%2Fc0ef74711a834099865b361176c05890?format=webp&width=800",
  },
  {
    id: 9,
    name: "Azanyel Colon",
    text: "Fast Reliable Reasonable Service",
    rating: 5,
    image: "https://cdn.builder.io/api/v1/image/assets%2Fbd2db2bf76dc466fa0ee7e5d644defec%2Fc46ec658a1d6482d86aa5b7ac51162c6?format=webp&width=800",
  },
  {
    id: 10,
    name: "Illia Bielov",
    text: "Make job quick and professional! Recommend!",
    rating: 5,
    image: "https://cdn.builder.io/api/v1/image/assets%2Fbd2db2bf76dc466fa0ee7e5d644defec%2Fe9ab9910a7ae40949ef7a15d91b0e3d3?format=webp&width=800",
  },
];

const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61578075644481&sk=reviews";

const ReviewCard = ({ review }: { review: Review }) => (
  <div className="facebook-review-card bg-white border border-facebook-border rounded-lg shadow-md hover:shadow-lg transition-shadow h-full">
    {/* Card Header with Facebook theme */}
    <div className="p-4 border-b border-facebook-border">
      <div className="flex items-start gap-3">
        <img
          src={review.image}
          alt={review.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
        />
        <div className="flex-grow">
          <h3 className="font-bold text-gray-900 text-sm">{review.name}</h3>
          <div className="flex gap-0.5 mt-1">
            {Array.from({ length: review.rating }).map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Review Content */}
    <div className="p-4">
      <p className="text-gray-700 text-sm leading-relaxed">{review.text}</p>
    </div>

    {/* Facebook Link */}
    <div className="px-4 pb-4 pt-0">
      <a
        href={FACEBOOK_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="facebook-link text-facebook-blue hover:text-facebook-blue-dark text-xs font-semibold flex items-center gap-1 transition-colors"
      >
        View on Facebook
        <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  </div>
);

export const Reviews = () => {
  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Customer <span className="text-primary text-glow">Reviews</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-4">
            See what our satisfied customers have to say
          </p>
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-facebook-blue hover:bg-facebook-blue-dark text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Visit us on Facebook
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Facebook-style Review Carousel - 3 items visible */}
        <div className="max-w-6xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {reviews.map((review) => (
                <CarouselItem key={review.id} className="pl-2 md:pl-4 md:basis-1/3">
                  <ReviewCard review={review} />
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Buttons */}
            <div className="flex gap-4 justify-center mt-8">
              <CarouselPrevious className="relative position-static left-0 top-0 translate-y-0 translate-x-0 h-10 w-10 bg-facebook-blue hover:bg-facebook-blue-dark text-white border-0" />
              <CarouselNext className="relative position-static right-0 top-0 translate-y-0 translate-x-0 h-10 w-10 bg-facebook-blue hover:bg-facebook-blue-dark text-white border-0" />
            </div>
          </Carousel>
        </div>

        {/* Review Count */}
        <div className="text-center mt-8 text-sm text-gray-600">
          {reviews.length} reviews from satisfied customers
        </div>
      </div>

      {/* Facebook Color Theme CSS */}
      <style>{`
        :root {
          --facebook-blue: #1877f2;
          --facebook-blue-dark: #0a66c2;
          --facebook-border: #e5e5e5;
        }

        .facebook-review-card {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .facebook-link {
          color: var(--facebook-blue);
        }

        .facebook-link:hover {
          color: var(--facebook-blue-dark);
        }

        .bg-facebook-blue {
          background-color: var(--facebook-blue);
        }

        .bg-facebook-blue-dark {
          background-color: var(--facebook-blue-dark);
        }

        .hover\:bg-facebook-blue-dark:hover {
          background-color: var(--facebook-blue-dark);
        }

        .text-facebook-blue {
          color: var(--facebook-blue);
        }

        .text-facebook-blue-dark {
          color: var(--facebook-blue-dark);
        }

        .border-facebook-border {
          border-color: var(--facebook-border);
        }
      `}</style>
    </section>
  );
};
