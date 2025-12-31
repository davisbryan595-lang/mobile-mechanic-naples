import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

interface FAQItem {
  keywords: string[];
  response: string;
}

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // FAQ database with keywords and responses (prioritized by specificity)
  const faqDatabase: FAQItem[] = [
    // Identity/introduction questions - high priority
    {
      keywords: ["who", "you", "who are you", "who is this", "what's your name", "introduce", "yourself", "name"],
      response:
        "👋 **Hi! I'm Bryan Davis**\n\nI'm an AI assistant powered by **Linkage Digital**, here to help you with all your mobile mechanic needs in Southwest Florida.\n\nI can help you with:\n💰 Pricing & service details\n📍 Service areas & locations\n🔧 Types of repairs we offer\n📅 Booking & scheduling\n✅ Warranty information\n\nWhat would you like to know?",
    },
    // High priority - specific pricing/package queries
    {
      keywords: ["price", "pricing", "cost", "estimate", "quote", "how much", "package", "packages"],
      response:
        "📋 **Pricing Guide:**\n\n💰 **Common Services:**\n• Oil Changes: $60–$120 labor\n• Brake Service: $120–$600 (full 4-wheel)\n• A/C Services: $80–$500+\n• Battery: $50–$120\n• Starters/Alternators: $180–$350\n• Diagnostics: $95–$145\n• Headlight Restoration: $70–$250\n• Mobile Detailing: $150–$1200\n\nPrices shown are labor only—parts extra. Need a custom quote? Call 239-272-9166!",
    },
    {
      keywords: ["hello", "hi", "hey", "greetings"],
      response: "Hello! 👋 How can I assist with your car repair today?",
    },
    {
      keywords: ["service", "services", "what services", "what can", "repair", "repairs", "offer", "do you do", "available"],
      response:
        "🔧 **Our Services:**\n\n🛢️ **Engine & Maintenance**\n• Oil Changes (labor: $60–$120)\n• Oil Filters ($20–$50)\n• Full preventative maintenance\n\n🛑 **Brakes**\n• Brake Pads (labor: $120–$190)\n• Pads + Rotors ($220–$350)\n• Full 4-wheel service ($380–$600)\n• Fluid Flush ($120–$200)\n\n❄️ **Climate Control**\n• A/C Inspection & Recharge ($80–$500+)\n• Works with R134a & R1234yf\n\n🔋 **Electrical**\n• Starters ($180–$350)\n• Alternators ($180–$320)\n• Batteries ($50–$120)\n\n🔍 **Diagnostics**\n• OBD Diagnostics ($95–$145)\n• Check Engine Light diagnosis\n• Advanced tools & scanning\n\n💡 **Other Services**\n• Headlight Restoration ($70–$250)\n• Mobile Detailing ($150–$1200)\n\nNeed details on any service? Just ask! 📞 239-272-9166",
    },
    {
      keywords: ["location", "area", "where", "serve", "service area", "naples", "bonita", "estero", "fort myers", "lehigh"],
      response:
        "📍 **Service Areas:**\nWe provide mobile services in:\n• Naples\n• Bonita Springs\n• Estero\n• Fort Myers\n• Lehigh Acres\n\nWe come to your home, office, or roadside! No towing needed.",
    },
    {
      keywords: ["oil", "change", "filter"],
      response:
        "🛢️ **Oil Change Service:**\n• Labor: $60–$120\n• Oil Filter: $20–$50\n• Recommended: Every 3,000 miles or 90 days\n• Note: Parts costs extra\n\nNeed to book? Call 239-272-9166",
    },
    {
      keywords: ["brake", "brakes", "pads", "rotors"],
      response:
        "🛑 **Brake Service Options:**\n• Pads (labor): $120–$190\n• Pads + Rotors: $220–$350\n• Full 4-wheel: $380–$600\n• Fluid Flush: $120–$200\n\nNeed an inspection? We offer free diagnostics!",
    },
    {
      keywords: ["ac", "a/c", "air conditioning", "recharge", "climate"],
      response:
        "❄️ **A/C Services:**\n• Inspection/Recharge: $80–$500+ (depending on issue)\n• We work with R134a and R1234yf refrigerants\n• Same-day service often available!\n\nFeel free to call for details: 239-272-9166",
    },
    {
      keywords: ["diagnostic", "diagnostics", "check engine", "obd", "scanner"],
      response:
        "🔍 **Diagnostic Services:**\n• OBD Diagnostics: $95–$145\n• Using advanced diagnostic tools\n• Identifies all check engine issues\n• Quick turnaround time\n\nSchedule now: 239-272-9166",
    },
    {
      keywords: ["starter", "alternator", "battery", "electrical"],
      response:
        "🔋 **Electrical Services:**\n• Starter Replacement: $180–$350\n• Alternator: $180–$320\n• Battery: $50–$120 (includes testing)\n• Expert diagnosis & replacement\n\nCall for same-day service!",
    },
    {
      keywords: ["headlight", "restoration", "polishing", "lights"],
      response: "💡 **Headlight Restoration:**\n• Service Cost: $70–$250\n• Professional restoration & polishing\n• Improved visibility & safety\n\nBook today: 239-272-9166",
    },
    {
      keywords: ["detailing", "clean", "wash", "interior", "exterior", "maintenance"],
      response:
        "✨ **Mobile Detailing Packages:**\n• Basic: $150–$300 (wash/wax)\n• Deep Clean: $300–$600 (interior/exterior)\n• Full Detail: $600–$1200 (comprehensive)\n\nLet's make your car shine! Call 239-272-9166",
    },
    {
      keywords: ["warranty", "guarantee", "protection"],
      response:
        "✅ **Warranty Coverage:**\n• Standard: 6-month labor warranty\n• Premium: 12-month upgrade available\n• Peace of mind on all repairs\n\nLearn more when you call: 239-272-9166",
    },
    {
      keywords: ["contact", "reach", "how can i contact", "get in touch", "talk to", "call you"],
      response:
        "📞 **How to Reach Us:**\n\n📱 Call or Text: **239-272-9166**\n\n⏰ **Hours:**\n• Mon-Fri: 8AM-6PM\n• Sat: 9AM-4PM\n• Sun: Closed\n\n💬 Same-day service often available!",
    },
    {
      keywords: ["book", "appointment", "schedule", "reserve", "booking", "available"],
      response:
        "📞 **Let's Get Started!**\n• Call/Text: 239-272-9166\n• Same-day appointments often available!\n• Hours:\n  - Mon-Fri: 8AM-6PM\n  - Sat: 9AM-4PM\n  - Sun: Closed\n\nWe're ready to help!",
    },
  ];

  // Welcome message
  const welcomeMessage =
    "👋 **Hi! I'm Bryan Davis**, an AI assistant powered by Linkage Digital.\n\nAsk me about pricing, services, locations, or booking! 🔧";

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Show welcome message when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMsg: Message = {
        id: "welcome",
        type: "bot",
        content: welcomeMessage,
        timestamp: new Date(),
      };
      setMessages([welcomeMsg]);
    }
  }, [isOpen]);

  // Improved keyword matching algorithm with context awareness
  const findBestMatch = (userInput: string): string => {
    const inputLower = userInput.toLowerCase().trim();

    // Split input into words for better matching
    const inputWords = inputLower.split(/\s+/);

    let bestMatch: FAQItem | null = null;
    let maxScore = 0;

    for (const faq of faqDatabase) {
      let score = 0;

      for (const keyword of faq.keywords) {
        const keywordLower = keyword.toLowerCase();

        // Exact word match gets highest score
        if (inputWords.includes(keywordLower)) {
          score += 10;
        }
        // Substring match (word contains keyword)
        else if (inputLower.includes(keywordLower)) {
          score += 5;
        }
      }

      // Higher score wins, or first match if tied
      if (score > maxScore) {
        maxScore = score;
        bestMatch = faq;
      }
    }

    // Return best match if found, otherwise fallback
    if (bestMatch && maxScore > 0) {
      return bestMatch.response;
    }

    return "I'm not sure about that—could you rephrase? Or call 239-272-9166 and our team can help! 📞";
  };

  // Handle message sending
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate bot thinking with a small delay
    setTimeout(() => {
      const botResponse = findBestMatch(inputValue);
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        type: "bot",
        content: botResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 300);
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Chat Window */}
      {isOpen && (
        <>
          {/* Backdrop - Mobile only, full coverage */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm pointer-events-auto md:hidden"
            onClick={() => setIsOpen(false)}
            role="presentation"
          />

          {/* Chat Container - Responsive positioning */}
          <div
            className="absolute bottom-0 left-0 right-0 md:bottom-6 md:right-6 md:left-auto pointer-events-auto"
            style={{
              animation: "slideUpChat 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <div className="mx-4 mb-4 md:mx-0 md:mb-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-t-2xl md:rounded-2xl border border-gray-700 overflow-hidden shadow-2xl flex flex-col h-[85vh] md:h-[600px] md:w-96">
              {/* Header */}
              <div className="bg-gradient-to-r from-primary/90 to-primary via-primary px-6 py-5 md:py-6 flex items-center justify-between flex-shrink-0 shadow-lg">
                <div>
                  <h2 className="font-orbitron font-bold text-lg md:text-xl text-white leading-tight">
                    Mobile Mechanic
                  </h2>
                  <p className="text-xs text-orange-100 mt-0.5">Ask anything about our services</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-shrink-0 hover:bg-orange-700/30 rounded-full p-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-300 ml-3"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-gradient-to-b from-gray-800/50 via-gray-900/70 to-gray-900 scrollbar-thin scrollbar-thumb-orange-600/50 scrollbar-track-transparent">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn("flex", message.type === "user" ? "justify-end" : "justify-start")}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed transition-all duration-300 animate-fade-in whitespace-pre-wrap break-words",
                        message.type === "user"
                          ? "bg-gradient-to-br from-primary to-orange-500 text-white rounded-br-none font-medium shadow-lg"
                          : "bg-gradient-to-br from-gray-700 to-gray-800 text-gray-100 rounded-bl-none border border-gray-600 shadow-md",
                      )}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gradient-to-br from-gray-700 to-gray-800 px-4 py-3 rounded-2xl rounded-bl-none border border-gray-600">
                      <div className="flex gap-2 items-center">
                        <div
                          className="w-2 h-2 bg-primary rounded-full animate-bounce"
                          style={{ animationDelay: "0s" }}
                        />
                        <div
                          className="w-2 h-2 bg-primary rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                        <div
                          className="w-2 h-2 bg-primary rounded-full animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-700 bg-gray-800/50 backdrop-blur-sm p-4 md:p-5 flex-shrink-0">
                <form onSubmit={handleSendMessage} className="flex gap-3">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask me something..."
                    disabled={isLoading}
                    className="flex-1 bg-gray-700/60 border border-gray-600 hover:border-gray-500 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Chat message input"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !inputValue.trim()}
                    className="flex-shrink-0 bg-gradient-to-br from-primary to-orange-500 hover:from-primary/90 hover:to-orange-600 text-white rounded-xl p-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-orange-500/30"
                    aria-label="Send message"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute bottom-6 right-6 pointer-events-auto bg-gradient-to-br from-primary to-orange-500 hover:from-primary/90 hover:to-orange-600 text-white rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-gray-900 hover:scale-110 active:scale-95"
          aria-label="Open chat"
          aria-expanded={isOpen}
        >
          <div className="flex flex-col items-center gap-0.5">
            <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
            <span className="text-[10px] md:text-xs font-bold leading-none">Chat</span>
          </div>
        </button>
      )}

      {/* Animations and Responsive Styles */}
      <style jsx>{`
        @keyframes slideUpChat {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInMessage {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeInMessage 0.3s ease-out forwards;
        }

        /* Scrollbar Styling */
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: rgba(255, 140, 0, 0.3);
          border-radius: 3px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background-color: rgba(255, 140, 0, 0.5);
        }

        /* Mobile specific responsive adjustments */
        @media (max-width: 640px) {
          /* Ensure full width on mobile with proper spacing */
          .absolute.bottom-0 {
            width: calc(100vw - 2rem);
          }

          /* Adjust header padding on small screens */
          h2 {
            font-size: 1rem;
          }

          p {
            font-size: 0.75rem;
          }
        }

        /* Tablet adjustments */
        @media (min-width: 641px) and (max-width: 1024px) {
          /* Slight adjustments for tablet */
          .absolute.bottom-0.right-0 {
            margin: 1.5rem;
          }
        }

        /* Extra large screens */
        @media (min-width: 1280px) {
          /* Ensure proper positioning on large screens */
        }
      `}</style>
    </div>
  );
};
