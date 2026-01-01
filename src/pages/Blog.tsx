import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { blogPosts, categories, getRecentPosts, getPostsByCategory } from "@/data/blog-posts";
import { Search, ArrowRight, MessageCircle } from "lucide-react";

export default function Blog() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    let posts = blogPosts;

    if (selectedCategory) {
      posts = posts.filter((post) => post.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      posts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query)
      );
    }

    return posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [selectedCategory, searchQuery]);

  const recentPosts = getRecentPosts(5);

  const categoryCounts = useMemo(() => {
    return categories.reduce(
      (acc, cat) => {
        acc[cat] = blogPosts.filter((post) => post.category === cat).length;
        return acc;
      },
      {} as Record<string, number>
    );
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[400px] pt-32 pb-16 flex items-center justify-center overflow-hidden">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(135deg, hsl(0 0% 8%), hsl(0 0% 4%))`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-background" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <h1 className="font-orbitron text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Auto Repair Tips &{" "}
              <span className="text-primary text-glow">Advice</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4 font-rajdhani">
              Expert guidance from mobile mechanic professionals
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn everything you need to know about vehicle maintenance, repair tips, and how to
              keep your car running smoothly.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-2">
              {/* Search Bar */}
              <div className="mb-8">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              {/* Blog Posts Grid */}
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPosts.map((post, index) => (
                    <div
                      key={post.id}
                      className="group bg-gradient-metallic border border-border rounded-lg hover:border-primary transition-all hover:glow-orange hover:scale-105 cursor-pointer overflow-hidden animate-slide-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                      onClick={() => navigate(`/blog/${post.slug}`)}
                    >
                      <div className="flex flex-col text-left h-full">
                        {/* Featured Image */}
                        <div className="w-full h-40 overflow-hidden bg-secondary">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>

                        {/* Card Content */}
                        <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                          {/* Category Badge */}
                          <div>
                            <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-full mb-3">
                              {post.category}
                            </span>

                            {/* Title */}
                            <h3 className="font-orbitron font-bold text-lg leading-tight group-hover:text-primary transition-colors mb-2">
                              {post.title}
                            </h3>

                            {/* Excerpt */}
                            <p className="text-muted-foreground text-sm line-clamp-2">
                              {post.excerpt}
                            </p>
                          </div>

                          {/* Meta Info */}
                          <div className="pt-3 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
                            <div>
                              <p>{post.author}</p>
                              <p>{new Date(post.date).toLocaleDateString()}</p>
                            </div>
                            <p className="text-primary font-bold">{post.readTime} min read</p>
                          </div>

                          {/* Read More Button */}
                          <button className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-bold text-sm mt-3 group/btn">
                            Read More
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No articles found matching your search.</p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory(null);
                    }}
                    className="text-primary hover:underline mt-4 font-bold"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Categories */}
              <div className="bg-gradient-metallic border border-border rounded-lg p-6">
                <h3 className="font-orbitron font-bold text-xl mb-4">Categories</h3>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-all font-rajdhani font-medium ${
                        selectedCategory === null
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                      }`}
                    >
                      All Articles ({blogPosts.length})
                    </button>
                  </li>
                  {categories.map((category) => (
                    <li key={category}>
                      <button
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-all font-rajdhani font-medium flex items-center justify-between ${
                          selectedCategory === category
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                        }`}
                      >
                        {category}
                        <span className="text-xs bg-background/50 px-2 py-1 rounded">
                          {categoryCounts[category]}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recent Posts */}
              <div className="bg-gradient-metallic border border-border rounded-lg p-6">
                <h3 className="font-orbitron font-bold text-xl mb-4">Recent Posts</h3>
                <ul className="space-y-3">
                  {recentPosts.map((post) => (
                    <li key={post.id}>
                      <button
                        onClick={() => navigate(`/blog/${post.slug}`)}
                        className="group text-left hover:text-primary transition-colors"
                      >
                        <p className="text-sm font-bold leading-snug group-hover:underline">
                          {post.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(post.date).toLocaleDateString()}
                        </p>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <div className="bg-gradient-primary border border-primary rounded-lg p-6 text-center space-y-4">
                <div>
                  <h3 className="font-orbitron font-bold text-lg text-primary-foreground mb-2">
                    Need Service?
                  </h3>
                  <p className="text-sm text-primary-foreground/80">
                    Schedule your vehicle service today
                  </p>
                </div>
                <Button
                  size="lg"
                  className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold"
                  onClick={() => {
                    const contactElement = document.getElementById("contact");
                    if (contactElement) {
                      contactElement.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  Book Service
                </Button>
                <div className="text-xs text-primary-foreground/70 border-t border-primary-foreground/20 pt-4">
                  <p className="font-bold mb-2">Quick Contact</p>
                  <a
                    href="https://wa.me/2392729166"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-primary-foreground transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp Message
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
