import { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import type { ChatMessage, Restaurant, Event } from "@/types";

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
}

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
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

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
      // AI is currently disabled - will be enabled in a future update
      // const response = await fetch("/api/ai/recommend", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ query: userMessage.content }),
      // });

      // Simulate a delay to make it feel realistic
      await new Promise(resolve => setTimeout(resolve, 1000));

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "🚧 **AI Assistant Coming Soon!**\n\nI'm currently being set up to help you discover the best of Erie, PA. In the meantime, you can browse our directory pages to find:\n\n• Restaurants by cuisine type\n• Upcoming events and activities\n• Family-friendly attractions\n• Community programs and social groups\n\nUse the navigation menu or search bar to explore!",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm sorry, the AI assistant is not yet available. Please use the navigation menu to browse our directory.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
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
        {messages.length === 0 ? (
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
