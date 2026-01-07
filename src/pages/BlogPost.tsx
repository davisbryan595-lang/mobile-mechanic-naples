import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getPostBySlug, getRelatedPosts } from "@/data/blog-posts";
import {
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
  ArrowLeft,
  Clock,
  User,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = getPostBySlug(slug || "");
  const relatedPosts = slug ? getRelatedPosts(slug, 3) : [];
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Scroll to top when slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <h1 className="font-orbitron text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The article you're looking for doesn't exist.
          </p>
          <Button onClick={() => navigate("/blog")} className="bg-primary text-primary-foreground">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to a backend
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", phone: "", message: "" });
    alert("Thank you for your inquiry! We'll contact you soon.");
  };

  const shareUrl = `${window.location.origin}/blog/${post.slug}`;
  const shareText = `Check out this article: ${post.title}`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Back Button */}
      <div className="pt-32 pb-4 bg-background">
        <div className="container mx-auto px-4">
          <button
            onClick={() => navigate("/blog")}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </section>

      {/* Article Content */}
      <article className="py-12 bg-card">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Title and Meta */}
          <div className="mb-8 border-b border-border pb-8">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-full">
                {post.category}
              </span>
            </div>

            <h1 className="font-orbitron text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {post.title}
            </h1>

            {/* Article Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime} min read</span>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="mt-6 flex items-center gap-3 pt-6 border-t border-border">
              <span className="text-sm font-bold text-muted-foreground">Share:</span>
              <a
                href={`https://facebook.com/sharer/sharer.php?u=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-secondary rounded-lg hover:bg-primary/20 hover:text-primary transition-all text-muted-foreground"
                title="Share on Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-secondary rounded-lg hover:bg-primary/20 hover:text-primary transition-all text-muted-foreground"
                title="Share on Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-secondary rounded-lg hover:bg-primary/20 hover:text-primary transition-all text-muted-foreground"
                title="Share on LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Article Body */}
          <div className="prose prose-invert max-w-none mb-12 leading-relaxed">
            {post.content
              .split("\n\n")
              .map((paragraph, index) => {
                // Handle headings (lines starting with #)
                if (paragraph.startsWith("# ")) {
                  return (
                    <h2
                      key={index}
                      className="font-orbitron text-3xl font-bold mt-8 mb-4 text-foreground"
                    >
                      {paragraph.replace(/^# /, "")}
                    </h2>
                  );
                }
                if (paragraph.startsWith("## ")) {
                  return (
                    <h3
                      key={index}
                      className="font-orbitron text-2xl font-bold mt-6 mb-3 text-foreground"
                    >
                      {paragraph.replace(/^## /, "")}
                    </h3>
                  );
                }
                if (paragraph.startsWith("### ")) {
                  return (
                    <h4
                      key={index}
                      className="font-orbitron text-xl font-bold mt-4 mb-2 text-foreground"
                    >
                      {paragraph.replace(/^### /, "")}
                    </h4>
                  );
                }

                // Handle bullet points (lines starting with -)
                if (paragraph.startsWith("- ")) {
                  const items = paragraph.split("\n").filter((item) => item.startsWith("- "));
                  return (
                    <ul key={index} className="list-disc list-inside space-y-2 mb-4 text-muted-foreground">
                      {items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-muted-foreground">
                          {item.replace(/^- /, "")}
                        </li>
                      ))}
                    </ul>
                  );
                }

                // Handle numbered lists (lines starting with numbers)
                if (/^\d+\./.test(paragraph)) {
                  const items = paragraph.split("\n").filter((item) => /^\d+\./.test(item));
                  return (
                    <ol key={index} className="list-decimal list-inside space-y-2 mb-4 text-muted-foreground">
                      {items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-muted-foreground">
                          {item.replace(/^\d+\.\s/, "")}
                        </li>
                      ))}
                    </ol>
                  );
                }

                // Handle bold text (**text**)
                const renderBoldText = (text: string) => {
                  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
                    if (part.startsWith("**") && part.endsWith("**")) {
                      return (
                        <strong key={i} className="font-bold text-foreground">
                          {part.replace(/\*\*/g, "")}
                        </strong>
                      );
                    }
                    return part;
                  });
                };

                // Regular paragraph
                return (
                  <p key={index} className="text-muted-foreground mb-4">
                    {renderBoldText(paragraph)}
                  </p>
                );
              })}
          </div>

          {/* Author Card */}
          <div className="bg-gradient-metallic border border-border rounded-lg p-6 mb-12">
            <h3 className="font-orbitron font-bold text-lg mb-2">About the Author</h3>
            <p className="text-muted-foreground">
              {post.author} is a certified mobile mechanic with years of experience in automotive
              repair and maintenance. Passionate about helping vehicle owners understand their cars
              and maintain them properly.
            </p>
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div className="mb-12">
              <h2 className="font-orbitron text-3xl font-bold mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relPost) => (
                  <div
                    key={relPost.id}
                    className="group bg-gradient-metallic border border-border rounded-lg hover:border-primary transition-all hover:glow-orange hover:scale-105 cursor-pointer overflow-hidden"
                    onClick={() => navigate(`/blog/${relPost.slug}`)}
                  >
                    <div className="flex flex-col h-full">
                      {/* Image */}
                      <div className="w-full h-32 overflow-hidden bg-secondary">
                        <img
                          src={relPost.image}
                          alt={relPost.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                        <div>
                          <span className="inline-block px-2 py-1 bg-primary/20 text-primary text-xs font-bold rounded mb-2">
                            {relPost.category}
                          </span>
                          <h3 className="font-orbitron font-bold text-base leading-tight group-hover:text-primary transition-colors">
                            {relPost.title}
                          </h3>
                        </div>

                        <div className="text-xs text-muted-foreground">
                          {new Date(relPost.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {/* Lead Generation CTA - Service Quote Form */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-gradient-metallic border border-border rounded-lg p-8">
            <h2 className="font-orbitron text-3xl font-bold mb-2">Need Service?</h2>
            <p className="text-muted-foreground mb-6">
              Get a free quote for the service mentioned in this article. Our mobile mechanics are
              ready to help.
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />

              <textarea
                placeholder="Describe your service needs..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={4}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
              />

              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
              >
                Get Free Quote
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground mb-3">Or contact us directly:</p>
              <a
                href="https://wa.me/2392729166"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-bold"
              >
                <MessageCircle className="w-5 h-5" />
                Message on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
