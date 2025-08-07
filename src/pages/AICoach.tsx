import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Sparkles, Dumbbell, Apple, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  suggestions?: string[];
}

const AICoach = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI fitness coach. I'm here to help you with workouts, nutrition advice, form tips, and motivation. How can I assist you today?",
      sender: "ai",
      timestamp: new Date(),
      suggestions: [
        "Suggest today's workout",
        "Post-workout meal ideas",
        "How to improve my squat form?",
        "Quick 15-minute morning routine"
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickSuggestions = [
    { text: "Suggest today's workout", icon: Dumbbell, category: "Workout" },
    { text: "Post-workout meal ideas", icon: Apple, category: "Nutrition" },
    { text: "Quick morning routine", icon: Clock, category: "Routine" },
    { text: "Motivation boost", icon: Sparkles, category: "Mindset" }
  ];

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputMessage.trim();
    if (!text) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: text,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(text);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse.content,
        sender: "ai",
        timestamp: new Date(),
        suggestions: aiResponse.suggestions
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const generateAIResponse = (userInput: string): { content: string; suggestions?: string[] } => {
    const input = userInput.toLowerCase();
    
    if (input.includes("workout") || input.includes("exercise")) {
      return {
        content: "Great! Based on your recent activity, I recommend a upper body strength session today. Here's a quick routine:\n\n• Push-ups: 3 sets of 8-12\n• Dumbbell rows: 3 sets of 10-12\n• Shoulder press: 3 sets of 8-10\n• Plank hold: 3 sets of 30-45 seconds\n\nThis should take about 30-35 minutes. Would you like me to adjust the intensity or focus on a specific muscle group?",
        suggestions: ["Make it more challenging", "Focus on core instead", "I only have 20 minutes"]
      };
    }
    
    if (input.includes("meal") || input.includes("nutrition") || input.includes("food")) {
      return {
        content: "Perfect timing for post-workout nutrition! Here are some excellent options:\n\n🍗 **Protein Focus:**\n• Grilled chicken with quinoa and roasted vegetables\n• Greek yogurt with berries and granola\n• Protein smoothie with banana and spinach\n\n🥑 **Balanced Options:**\n• Avocado toast with eggs\n• Salmon with sweet potato\n• Turkey and hummus wrap\n\nTiming is key - aim to eat within 30-60 minutes post-workout for optimal recovery!",
        suggestions: ["Vegetarian options", "Quick 5-minute meals", "Pre-workout snacks"]
      };
    }
    
    if (input.includes("form") || input.includes("technique")) {
      return {
        content: "Form is crucial for both effectiveness and injury prevention! For squats specifically:\n\n✅ **Key Points:**\n• Keep your chest up and core engaged\n• Weight should be on your heels\n• Knees track over your toes\n• Descend until thighs are parallel to ground\n• Drive through heels to stand up\n\n⚠️ **Common Mistakes:**\n• Knees caving inward\n• Leaning too far forward\n• Not going deep enough\n\nWould you like a video demonstration or tips for a different exercise?",
        suggestions: ["Deadlift form tips", "Push-up variations", "Show me a video"]
      };
    }
    
    if (input.includes("motivation") || input.includes("boost") || input.includes("tired")) {
      return {
        content: "I hear you! Remember why you started this journey. 💪\n\n🌟 **Quick Motivation:**\n• You've already completed 24 workouts - that's amazing!\n• Every rep counts, every step matters\n• You're stronger today than you were yesterday\n• Your future self will thank you for not giving up\n\n🔥 **Energy Boost:**\nTry 5 jumping jacks right now. Sometimes we just need to start moving to feel the energy flow!\n\nWhat's one small thing you can do right now to move forward?",
        suggestions: ["Set a mini goal", "5-minute energy workout", "Share my progress"]
      };
    }
    
    if (input.includes("routine") || input.includes("morning")) {
      return {
        content: "A great morning routine sets the tone for the entire day! Here's a energizing 15-minute flow:\n\n🌅 **Morning Power Routine:**\n• 2 min: Deep breathing & stretching\n• 3 min: Dynamic warm-up (arm circles, leg swings)\n• 5 min: Core circuit (planks, mountain climbers, bicycle crunches)\n• 3 min: Upper body (push-ups, arm raises)\n• 2 min: Cool down & positive affirmations\n\nThis will boost your energy, improve focus, and kickstart your metabolism. Want me to create a custom routine based on your schedule?",
        suggestions: ["Evening routine instead", "10-minute version", "No equipment needed"]
      };
    }
    
    // Default response
    return {
      content: "I'm here to help with all aspects of your fitness journey! Whether you need workout suggestions, nutrition advice, form corrections, or just some motivation - I've got you covered.\n\nWhat would you like to focus on today?",
      suggestions: ["Plan my week", "Assess my progress", "Answer a specific question"]
    };
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                AI Fitness Coach
              </span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Get personalized advice, motivation, and support 24/7
            </p>
          </div>

          <Card className="bg-gradient-card border-border overflow-hidden">
            {/* Quick Suggestions */}
            <div className="p-4 border-b border-border">
              <p className="text-sm text-muted-foreground mb-3">Quick suggestions:</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {quickSuggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSendMessage(suggestion.text)}
                    className="justify-start text-xs border-border hover:border-primary hover:bg-primary/10"
                  >
                    <suggestion.icon className="w-3 h-3 mr-1" />
                    {suggestion.text}
                  </Button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="h-[600px] p-6">
              <div className="space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-3 ${
                      message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                    }`}
                  >
                    <div className={`p-2 rounded-full ${
                      message.sender === "ai" ? "bg-primary/20" : "bg-secondary/20"
                    }`}>
                      {message.sender === "ai" ? (
                        <Bot className="w-4 h-4 text-primary" />
                      ) : (
                        <User className="w-4 h-4 text-secondary" />
                      )}
                    </div>
                    
                    <div className={`flex-1 max-w-[80%] ${
                      message.sender === "user" ? "text-right" : ""
                    }`}>
                      <div className={`p-4 rounded-2xl ${
                        message.sender === "ai"
                          ? "bg-elevated/50 text-foreground"
                          : "bg-primary text-primary-foreground"
                      }`}>
                        <p className="whitespace-pre-line">{message.content}</p>
                      </div>
                      
                      {message.suggestions && message.sender === "ai" && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {message.suggestions.map((suggestion, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="cursor-pointer bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                              onClick={() => handleSendMessage(suggestion)}
                            >
                              {suggestion}
                            </Badge>
                          ))}
                        </div>
                      )}
                      
                      <p className="text-xs text-muted-foreground mt-2">
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-full bg-primary/20">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                    <div className="bg-elevated/50 p-4 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about fitness, nutrition, or motivation..."
                  className="flex-1 bg-elevated border-border focus:border-primary"
                  disabled={isTyping}
                />
                <Button
                  onClick={() => handleSendMessage()}
                  disabled={!inputMessage.trim() || isTyping}
                  size="icon"
                  className="bg-primary hover:bg-primary-hover text-primary-foreground shadow-neon"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AICoach;