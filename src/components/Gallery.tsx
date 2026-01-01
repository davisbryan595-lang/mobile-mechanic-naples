import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Facebook, Instagram, Play } from "lucide-react";

interface InstagramEmbedWrapperProps {
  postId: string;
  index: number;
}

const InstagramEmbedWrapper = ({ postId, index }: InstagramEmbedWrapperProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const url = `https://www.instagram.com/p/${postId}/`;

  return (
    <>
      <div
        className="group relative overflow-hidden rounded-lg border-2 border-border hover:border-primary transition-all cursor-pointer animate-slide-up h-64 bg-gradient-to-br from-background via-card to-background"
        style={{ animationDelay: `${index * 0.1}s` }}
        onClick={() => setIsOpen(true)}
      >
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/80 group-hover:bg-primary transition-colors">
            <Play className="w-8 h-8 text-white fill-white" />
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl bg-black rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-primary transition-colors z-10 bg-black/50 rounded-full p-2 hover:bg-black/70"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            <iframe
              src={`https://www.instagram.com/p/${postId}/embed/captioned/`}
              width="100%"
              style={{ minHeight: "600px" }}
              frameBorder="0"
              scrolling="no"
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              title={`Instagram Post ${index + 1}`}
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export const Gallery = () => {
  const [activeTab, setActiveTab] = useState<"work" | "facebook" | "instagram">("work");
  const [showAll, setShowAll] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const facebookPostIds = [
    "1063659892535347",
    "1283700730200298",
    "1996593834239180",
    "3192988037542385",
  ];

  const instagramPostIds = [
    "DSp-7FDEYB7",
    "DSi9s1uETxF",
    "DSi9nv2EVSJ",
    "DSfKhgYEbpB",
  ];

  const allImages = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F5ea4b1680de74be58c62aa3fdc28c495%2F483f76759fc3427c8b6c29c352b2221e?format=webp&width=800",
      alt: "Headlight Restoration & Polishing",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2Fbd2db2bf76dc466fa0ee7e5d644defec%2F2911595d1b0a42268e17b328e8d1cd31?format=webp&width=800",
      alt: "Professional Brake Service",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F5ea4b1680de74be58c62aa3fdc28c495%2Fcb7b3af7d02f42f593db25a7b9b4a5fc?format=webp&width=800",
      alt: "Engine Bay Diagnostics",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F5ea4b1680de74be58c62aa3fdc28c495%2Fe0a02dcc2cda49e299c90281e6a393b1?format=webp&width=800",
      alt: "Transmission & CV Axle Work",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2Fbd2db2bf76dc466fa0ee7e5d644defec%2F86aa742a714b4c3683563ef2b20f4864?format=webp&width=800",
      alt: "Vehicle on Lift Service",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2Fbd2db2bf76dc466fa0ee7e5d644defec%2F904dea1c0c2148f2809f7a8ae0458a7f?format=webp&width=800",
      alt: "Professional Headlight Detail",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F5ea4b1680de74be58c62aa3fdc28c495%2F64448697005d48ad88dd802ecb1dc760?format=webp&width=800",
      alt: "Engine Work & Maintenance",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F5ea4b1680de74be58c62aa3fdc28c495%2F116d44bb332741a187fe3086188bbb0d?format=webp&width=800",
      alt: "Advanced Engine Diagnostics",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2Fbd2db2bf76dc466fa0ee7e5d644defec%2F4c133a74774947f6bb1fe43017fef144?format=webp&width=800",
      alt: "Transmission Service Setup",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2Fbd2db2bf76dc466fa0ee7e5d644defec%2F8fd8f184b96c45baa7af6d6daf2334e7?format=webp&width=800",
      alt: "Suspension Component Work",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2Fbd2db2bf76dc466fa0ee7e5d644defec%2Fbbca93c367854547a000d1896b2d4ed9?format=webp&width=800",
      alt: "Professional Engine Service",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F5ea4b1680de74be58c62aa3fdc28c495%2Fb5a3fdf41785432bb66e30334c95087e?format=webp&width=800",
      alt: "Battery & Electrical Service",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2Fbd2db2bf76dc466fa0ee7e5d644defec%2Ff6fcd8f5b0d44c43b3c70cf7cd747e3d?format=webp&width=800",
      alt: "Vehicle Maintenance Detail",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2Fbd2db2bf76dc466fa0ee7e5d644defec%2Fa79df58b31f8455c97ae3b661017fd4a?format=webp&width=800",
      alt: "Complete Engine Inspection",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F5ea4b1680de74be58c62aa3fdc28c495%2F1d993643fcfc4e2386693c222b736f2e?format=webp&width=800",
      alt: "Professional Service Quality",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F5ea4b1680de74be58c62aa3fdc28c495%2F5b220e88101f4ea69b16f26d86dc9f4a?format=webp&width=800",
      alt: "Headlight Restoration Close-up",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F5ea4b1680de74be58c62aa3fdc28c495%2F95917a645a584efb99c4d05988f9336b?format=webp&width=800",
      alt: "Professional Headlight Repair",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F5ea4b1680de74be58c62aa3fdc28c495%2Fa1e7a42eb1874b1ba2a79c76578753dc?format=webp&width=800",
      alt: "Advanced Headlight Work",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F5ea4b1680de74be58c62aa3fdc28c495%2Fd5e7f329baa14a249ef2f06f17b9e7ff?format=webp&width=800",
      alt: "Engine Service & Diagnostics",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F5ea4b1680de74be58c62aa3fdc28c495%2F864ff63b3a3a4545add504983adb6cde?format=webp&width=800",
      alt: "Vehicle Hood Service",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2Fbd2db2bf76dc466fa0ee7e5d644defec%2F218ad3ec2e4a4412a89eddb546f7fcea?format=webp&width=800",
      alt: "Professional Vehicle Maintenance",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2Fbd2db2bf76dc466fa0ee7e5d644defec%2F88f40f97d3674714973cc3748c8fe777?format=webp&width=800",
      alt: "Engine Compartment Work",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F5ea4b1680de74be58c62aa3fdc28c495%2Fcddc90b37878410484a54005b120056f?format=webp&width=800",
      alt: "Comprehensive Diagnostics Setup",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F5ea4b1680de74be58c62aa3fdc28c495%2F6ee6e4283ccc48ffbcd0048ee297b474?format=webp&width=800",
      alt: "Vehicle Brake System Work",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F5ea4b1680de74be58c62aa3fdc28c495%2F76652870bbd346ceb4d9b40403c91b4e?format=webp&width=800",
      alt: "Professional Engine Rebuild",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2Fbd2db2bf76dc466fa0ee7e5d644defec%2Ffbd9332073c047f79ce18749a0f8f7ee?format=webp&width=800",
      alt: "Undercarriage Service Work",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F5ea4b1680de74be58c62aa3fdc28c495%2F9a49e275cf01497884f1eac6dca9e7b4?format=webp&width=800",
      alt: "Suspension & Axle Repair",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F5ea4b1680de74be58c62aa3fdc28c495%2Fc5b7176e6b474a2fbccce11b9c717333?format=webp&width=800",
      alt: "Engine Block Inspection",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2Fbd2db2bf76dc466fa0ee7e5d644defec%2F502d572387d240d5a2f5c09fc90bc3b5?format=webp&width=800",
      alt: "Professional Parts Replacement",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F5ea4b1680de74be58c62aa3fdc28c495%2F5c0bafc2ad5a44869e627bc5c19efd1c?format=webp&width=800",
      alt: "Engine Maintenance Service",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F5ea4b1680de74be58c62aa3fdc28c495%2F7076cc6a2e024477896adf104417f81b?format=webp&width=800",
      alt: "Professional Truck Engine Service",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F5ea4b1680de74be58c62aa3fdc28c495%2Fb14d770f41a84b588ea85865a19dd970?format=webp&width=800",
      alt: "Engine Block Detail Work",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F5ea4b1680de74be58c62aa3fdc28c495%2Fd43ae049801f4e7281e289c5b62faa5e?format=webp&width=800",
      alt: "Engine Hood Service",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F5ea4b1680de74be58c62aa3fdc28c495%2Fd55cc17bdcf34c539b7de8417ade56b7?format=webp&width=800",
      alt: "Engine Component Installation",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F5ea4b1680de74be58c62aa3fdc28c495%2F0ac7878f08304be3bdb33485bdb205f1?format=webp&width=800",
      alt: "Red Vehicle Engine Inspection",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F5ea4b1680de74be58c62aa3fdc28c495%2F0dee8ac725ba46f7b2a3bb72cf5e5f07?format=webp&width=800",
      alt: "Professional Mechanic Working",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2Fbd2db2bf76dc466fa0ee7e5d644defec%2Fcbc9a9cf985048dba5b9c82a68c0f576?format=webp&width=800",
      alt: "Engine Diagnostics Service",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F5ea4b1680de74be58c62aa3fdc28c495%2F63cfb8d536d840da9925a17dbd3e4639?format=webp&width=800",
      alt: "Engine Work in Progress",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F5ea4b1680de74be58c62aa3fdc28c495%2F57e548c057fb4d949b910e5d356b15d7?format=webp&width=800",
      alt: "BMW Engine Service",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F5ea4b1680de74be58c62aa3fdc28c495%2Fb7393f41931c4944bf7d8447b71df104?format=webp&width=800",
      alt: "Headlight Restoration In Progress",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F5ea4b1680de74be58c62aa3fdc28c495%2Fbed827f66f8742699b61c21b52f19baa?format=webp&width=800",
      alt: "Headlight Restoration Detail",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F5ea4b1680de74be58c62aa3fdc28c495%2F7f9738e6a291429083744e1448a52c65?format=webp&width=800",
      alt: "Vehicle in Professional Shop",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F5ea4b1680de74be58c62aa3fdc28c495%2Fe764977990f44511aeb42e5507c2ead0?format=webp&width=800",
      alt: "Automotive Parts Display",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F5ea4b1680de74be58c62aa3fdc28c495%2F36537bef51ee44f7883e6606f367385c?format=webp&width=800",
      alt: "Professional Shop Supplies",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F5ea4b1680de74be58c62aa3fdc28c495%2F368fdf75e49b4ab699091e6aed90974e?format=webp&width=800",
      alt: "Service Vehicle Setup",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F5ea4b1680de74be58c62aa3fdc28c495%2F575f284f41154b63ac60beb07b955e78?format=webp&width=800",
      alt: "Headlight Polishing Work",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F5ea4b1680de74be58c62aa3fdc28c495%2F55d2dcec28774a03b3299293a047cb25?format=webp&width=800",
      alt: "Engine Compartment Inspection",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F5ea4b1680de74be58c62aa3fdc28c495%2F17d8af0e4a864f9a863fd4ffb52de149?format=webp&width=800",
      alt: "Professional Brake Service",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F5ea4b1680de74be58c62aa3fdc28c495%2Fdfa5bdbae1fa41ae84b9ac97e9f9869f?format=webp&width=800",
      alt: "Vehicle Lift Service Work",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F5ea4b1680de74be58c62aa3fdc28c495%2F8b0b854e75954282a553c3131354acba?format=webp&width=800",
      alt: "Suspension Component Service",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F5ea4b1680de74be58c62aa3fdc28c495%2F8621d1a1db39400883f74249975bd662?format=webp&width=800",
      alt: "Classic Car Service",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F5ea4b1680de74be58c62aa3fdc28c495%2Fcc4573955f4b4e828cd82d2e27f732f0?format=webp&width=800",
      alt: "Classic Vehicle Hood Work",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F5ea4b1680de74be58c62aa3fdc28c495%2Ffe6c19e7b0fa4d13afc0174637342472?format=webp&width=800",
      alt: "Professional Service Equipment",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F5ea4b1680de74be58c62aa3fdc28c495%2F1749c83f9f90422f9b12be0516d8adca?format=webp&width=800",
      alt: "Ball Joint & Suspension Repair",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F5ea4b1680de74be58c62aa3fdc28c495%2F0e8cf8e29c0b4efe8769e75aa1ee0b3a?format=webp&width=800",
      alt: "Vehicle Suspension Work",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F5ea4b1680de74be58c62aa3fdc28c495%2F340a8d0a6eda497f8bcf3c9263c4cecd?format=webp&width=800",
      alt: "Complete Vehicle Service",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F5ea4b1680de74be58c62aa3fdc28c495%2F9e8195c244b342a58ead5c16affed83e?format=webp&width=800",
      alt: "Professional Brake System Work",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F5ea4b1680de74be58c62aa3fdc28c495%2F0fc34aa618b6433e9f6642687fa53c87?format=webp&width=800",
      alt: "Hybrid Vehicle Service",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F5ea4b1680de74be58c62aa3fdc28c495%2Fe7d786dc9bd24151af8678d160e83e5d?format=webp&width=800",
      alt: "Mechanical Work Detail",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F5ea4b1680de74be58c62aa3fdc28c495%2F6778e5f6a94d4327af8c0786b3667873?format=webp&width=800",
      alt: "Engine Service with Tools",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F5ea4b1680de74be58c62aa3fdc28c495%2F134164811f354b60ba934400ab53cfa6?format=webp&width=800",
      alt: "Professional Vehicle Lift Service",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F5ea4b1680de74be58c62aa3fdc28c495%2Fa6dd723a51f24d8d9fa209804005758c?format=webp&width=800",
      alt: "Suspension & Brake Work",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F5ea4b1680de74be58c62aa3fdc28c495%2F3d82e8e8261649ddbd51e3f57e5f31c6?format=webp&width=800",
      alt: "Engine Block Service",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F5ea4b1680de74be58c62aa3fdc28c495%2F39c74938d5b04fc4845790f7a2a10439?format=webp&width=800",
      alt: "Professional Repair & Service",
    },
  ];

  const displayedImages = showAll ? allImages : allImages.slice(0, 7);

  return (
    <>
      <section id="gallery" className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-4">
              Gallery & <span className="text-primary text-glow">Social Media</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Professional service delivered at your location
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            <button
              onClick={() => {
                setActiveTab("work");
                setShowAll(false);
              }}
              className={`px-6 py-2 rounded-lg font-rajdhani font-medium transition-all ${
                activeTab === "work"
                  ? "bg-primary text-primary-foreground"
                  : "bg-border text-foreground hover:bg-border/80"
              }`}
            >
              Our Work
            </button>
            <button
              onClick={() => {
                setActiveTab("facebook");
                setShowAll(false);
              }}
              className={`px-6 py-2 rounded-lg font-rajdhani font-medium transition-all flex items-center gap-2 ${
                activeTab === "facebook"
                  ? "bg-primary text-primary-foreground"
                  : "bg-border text-foreground hover:bg-border/80"
              }`}
            >
              <Facebook className="w-4 h-4" />
              Facebook
            </button>
            <button
              onClick={() => {
                setActiveTab("instagram");
                setShowAll(false);
              }}
              className={`px-6 py-2 rounded-lg font-rajdhani font-medium transition-all flex items-center gap-2 ${
                activeTab === "instagram"
                  ? "bg-primary text-primary-foreground"
                  : "bg-border text-foreground hover:bg-border/80"
              }`}
            >
              <Instagram className="w-4 h-4" />
              Instagram
            </button>
          </div>

          {/* Our Work Tab */}
          {activeTab === "work" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {displayedImages.map((image, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-lg border-2 border-border hover:border-primary transition-all cursor-pointer animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => setSelectedImage(image.src)}
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {!showAll && (
                <div className="flex justify-center mt-12">
                  <Button
                    onClick={() => setShowAll(true)}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 font-orbitron font-bold text-lg glow-orange-strong"
                    size="lg"
                  >
                    View All Gallery
                  </Button>
                </div>
              )}
            </>
          )}

          {/* Facebook Posts Tab */}
          {activeTab === "facebook" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {facebookPostIds.map((postId, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center rounded-lg border-2 border-border hover:border-primary transition-all animate-slide-up overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <iframe
                    src={`https://www.facebook.com/plugins/post.php?href=https://www.facebook.com/reel/${postId}/&width=500&show_text=true`}
                    width="100%"
                    height="500"
                    style={{ border: "none", overflow: "hidden" }}
                    allowFullScreen={true}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  ></iframe>
                </div>
              ))}
            </div>
          )}

          {/* Instagram Posts Tab */}
          {activeTab === "instagram" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {instagramPostIds.map((postId, index) => (
                <InstagramEmbedWrapper
                  key={index}
                  postId={postId}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-primary transition-colors z-10"
              aria-label="Close gallery"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={selectedImage}
              alt="Gallery preview"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
};
