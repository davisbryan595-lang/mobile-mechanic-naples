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

  // Welcome message FAQ item
  const welcomeMessage =
    "Hi! I'm here to help with mobile mechanic services in Southwest Florida. Ask about pricing, locations, booking, or anything from our site! I'm Bryan Davis, an AI assistant powered by Linkage Digital.";

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 0);
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
    <div className="fixed bottom-6 right-6 z-50 font-rajdhani">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-full sm:w-96 bg-white rounded-lg shadow-2xl flex flex-col max-h-96 overflow-hidden" style={{ animation: "slideUpAnimation 0.3s ease-out" }}>
          {/* Header */}
          <div className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between">
            <h2 className="font-orbitron font-bold text-lg">Mobile Mechanic Helper</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-blue-700 rounded-lg p-1 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn("flex", message.type === "user" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-xs px-4 py-2 rounded-lg text-sm leading-relaxed",
                    message.type === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-300 text-gray-900 rounded-bl-none",
                  )}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-300 text-gray-900 px-4 py-2 rounded-lg rounded-bl-none">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 bg-white p-4">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your question..."
                disabled={isLoading}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-gray-100 disabled:cursor-not-allowed"
                aria-label="Chat message input"
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-400 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2"
        aria-label={isOpen ? "Close chat" : "Open chat"}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <div className="flex flex-col items-center gap-1">
            <MessageCircle className="w-6 h-6" />
            <span className="text-xs font-bold">Chat</span>
          </div>
        )}
      </button>

      {/* Mobile Responsive and Animation Styles */}
      <style jsx>{`
        @media (max-width: 640px) {
          .chat-window-mobile {
            width: calc(100vw - 48px);
            max-width: none;
          }
        }

        @keyframes slideUpAnimation {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
