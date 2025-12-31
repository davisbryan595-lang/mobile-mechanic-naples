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

  // FAQ database with keywords and responses
  const faqDatabase: FAQItem[] = [
    {
      keywords: ["hello", "hi", "hey", "greetings"],
      response: "Hello! How can I assist with your car repair today?",
    },
    {
      keywords: ["location", "area", "where", "serve", "naples", "bonita", "estero", "fort myers", "lehigh"],
      response:
        "We provide mobile services in Naples, Bonita Springs, Estero, Fort Myers, and Lehigh Acres. We come to your home, office, or roadside!",
    },
    {
      keywords: ["oil", "change", "filter"],
      response:
        "Oil Change (labor only): $60–$120. Oil Filter: $20–$50. Recommended every 3,000 miles or 90 days. Parts extra.",
    },
    {
      keywords: ["brake", "brakes", "pads", "rotors"],
      response:
        "Brake Pads (labor): $120–$190. Pads + Rotors: $220–$350. Full 4-wheel: $380–$600. Fluid Flush: $120–$200.",
    },
    {
      keywords: ["ac", "a/c", "air conditioning", "recharge"],
      response:
        "A/C services: Inspection/recharge $80–$500+ depending on the issue (R134a or R1234yf).",
    },
    {
      keywords: ["diagnostic", "diagnostics", "check engine", "obd"],
      response: "OBD Diagnostics: $95–$145 using advanced tools.",
    },
    {
      keywords: ["starter", "alternator", "battery"],
      response:
        "Starter Replacement: $180–$350. Alternator: $180–$320. Battery: $50–$120 (plus testing).",
    },
    {
      keywords: ["headlight", "restoration", "polishing"],
      response: "Headlight Restoration: $70–$250.",
    },
    {
      keywords: ["detailing", "clean", "wash", "interior", "exterior"],
      response:
        "Mobile Detailing: Packages from $150–$1200 (wash/wax, deep clean, full detail).",
    },
    {
      keywords: ["price", "cost", "estimate", "quote"],
      response:
        "Prices are labor estimates only—parts extra. Use our on-site estimator or contact for exact quote!",
    },
    {
      keywords: ["warranty", "guarantee"],
      response: "6-month labor warranty (optional 12-month upgrade).",
    },
    {
      keywords: ["book", "appointment", "schedule", "contact", "phone"],
      response:
        "Call or text 239-272-9166 for booking. Same-day often available! Hours: Mon-Fri 8AM-6PM, Sat 9AM-4PM.",
    },
  ];

  // Welcome message
  const welcomeMessage =
    "Hi! I'm here to help with mobile mechanic services in Southwest Florida. Ask about pricing, locations, booking, or anything from our site! I'm Bryan Davis, an AI assistant powered by Linkage Digital.";

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

  // Keyword matching algorithm
  const findBestMatch = (userInput: string): string => {
    const inputLower = userInput.toLowerCase();
    let bestMatch: FAQItem | null = null;
    let maxMatches = 0;

    for (const faq of faqDatabase) {
      let matchCount = 0;
      for (const keyword of faq.keywords) {
        if (inputLower.includes(keyword.toLowerCase())) {
          matchCount++;
        }
      }

      if (matchCount > maxMatches) {
        maxMatches = matchCount;
        bestMatch = faq;
      }
    }

    if (bestMatch && maxMatches > 0) {
      return bestMatch.response;
    }

    return "I don't have that info yet—please call 239-272-9166 or message us for help!";
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
                        "max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed transition-all duration-300 animate-fade-in",
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
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute bottom-6 right-6 pointer-events-auto bg-gradient-to-br from-primary to-orange-500 hover:from-primary/90 hover:to-orange-600 text-white rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-gray-900 hover:scale-110 active:scale-95"
        aria-label={isOpen ? "Close chat" : "Open chat"}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className="w-6 h-6 md:w-7 md:h-7 transition-transform duration-300" />
        ) : (
          <div className="flex flex-col items-center gap-0.5">
            <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
            <span className="text-[10px] md:text-xs font-bold leading-none">Chat</span>
          </div>
        )}
      </button>

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
