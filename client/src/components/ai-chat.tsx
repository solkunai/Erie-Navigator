import { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles, Loader2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import type { ChatMessage, Restaurant, Event } from "@shared/schema";

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
}

// Set to false to disable AI and show "Coming Soon" message
const AI_ENABLED = false;

const suggestedQueries = [
  "Mexican food tonight",
  "Family activities this weekend",
  "Autism-friendly events",
  "Best seafood restaurants",
  "Free things to do",
  "Live music today",
];

export function AIChat({ isOpen, onClose }: AIChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && textareaRef.current && AI_ENABLED) {
      textareaRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!AI_ENABLED || !input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userMessage.content }),
      });

      if (!response.ok) {
        throw new Error("Failed to get AI response");
      }

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message,
        timestamp: new Date(),
        recommendations: data.recommendations,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm sorry, I couldn't process your request. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (!AI_ENABLED) return;
    setInput(suggestion);
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[400px] bg-background border-l shadow-xl flex flex-col">
      <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          <h2 className="font-semibold">Erie AI Assistant</h2>
          {!AI_ENABLED && (
            <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground text-xs">
              Coming Soon
            </Badge>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-primary-foreground hover:bg-primary-foreground/10"
          data-testid="button-close-ai"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        {!AI_ENABLED ? (
          // Coming Soon Message
          <div className="flex flex-col items-center justify-center h-full text-center px-6 py-12">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Coming Soon!</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Our AI-powered assistant will help you discover the best restaurants, events, and activities in Erie, PA based on your preferences.
            </p>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Personalized recommendations
              </p>
              <p className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Find hidden gems in Erie
              </p>
              <p className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Get answers to local questions
              </p>
            </div>
            <p className="mt-8 text-xs text-muted-foreground">
              In the meantime, explore our directory to find great local spots!
            </p>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col gap-4">
            <p className="text-muted-foreground text-center py-8">
              Hi! I can help you find restaurants, events, and activities in Erie, PA.
              Try asking me something like:
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {suggestedQueries.map((query) => (
                <Badge
                  key={query}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => handleSuggestionClick(query)}
                  data-testid={`chip-suggestion-${query.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {query}
                </Badge>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                  data-testid={`message-${message.role}-${message.id}`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  
                  {message.recommendations?.restaurants && message.recommendations.restaurants.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <p className="text-xs font-semibold opacity-80">Restaurants:</p>
                      {message.recommendations.restaurants.map((restaurant) => (
                        <RecommendationCard key={restaurant.id} type="restaurant" item={restaurant} />
                      ))}
                    </div>
                  )}
                  
                  {message.recommendations?.events && message.recommendations.events.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <p className="text-xs font-semibold opacity-80">Events:</p>
                      {message.recommendations.events.map((event) => (
                        <RecommendationCard key={event.id} type="event" item={event} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3 flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm text-muted-foreground">Thinking...</span>
                </div>
              </div>
            )}
          </div>
        )}
      </ScrollArea>

      {AI_ENABLED && (
        <div className="p-4 border-t bg-background">
          <div className="flex gap-2">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Erie restaurants, events, activities..."
              className="resize-none min-h-[44px] max-h-32"
              rows={1}
              disabled={isLoading}
              data-testid="input-ai-chat"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              size="icon"
              data-testid="button-send-ai"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function RecommendationCard({ type, item }: { type: "restaurant" | "event"; item: Restaurant | Event }) {
  if (type === "restaurant") {
    const restaurant = item as Restaurant;
    return (
      <div className="bg-background rounded-md p-2 text-foreground text-xs">
        <p className="font-medium">{restaurant.name}</p>
        <p className="text-muted-foreground">{restaurant.category} • {restaurant.priceRange}</p>
      </div>
    );
  }
  
  const event = item as Event;
  return (
    <div className="bg-background rounded-md p-2 text-foreground text-xs">
      <p className="font-medium">{event.title}</p>
      <p className="text-muted-foreground">{event.date} at {event.time}</p>
    </div>
  );
}
