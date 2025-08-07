import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Flame, Target, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  rarity: "common" | "rare" | "epic" | "legendary";
}

interface AchievementNotificationProps {
  achievement: Achievement;
  onClose: () => void;
  show: boolean;
}

const AchievementNotification = ({ achievement, onClose, show }: AchievementNotificationProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  const rarityColors = {
    common: "border-muted bg-muted/10",
    rare: "border-primary bg-primary/10",
    epic: "border-secondary bg-secondary/10", 
    legendary: "border-orange-500 bg-orange-500/10"
  };

  const rarityGlow = {
    common: "",
    rare: "shadow-glow",
    epic: "shadow-[0_0_20px_hsl(165_82%_51%_/_0.3)]",
    legendary: "shadow-[0_0_30px_hsl(25_95%_53%_/_0.4)]"
  };

  return (
    <div className={`fixed top-24 right-4 z-50 transform transition-all duration-300 ${
      isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
    }`}>
      <Card className={`p-6 max-w-sm border-2 ${rarityColors[achievement.rarity]} ${rarityGlow[achievement.rarity]}`}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-xl ${
              achievement.rarity === "legendary" ? "bg-orange-500/20" :
              achievement.rarity === "epic" ? "bg-secondary/20" :
              achievement.rarity === "rare" ? "bg-primary/20" : 
              "bg-muted/20"
            }`}>
              <achievement.icon className={`w-6 h-6 ${
                achievement.rarity === "legendary" ? "text-orange-500" :
                achievement.rarity === "epic" ? "text-secondary" :
                achievement.rarity === "rare" ? "text-primary" : 
                "text-muted-foreground"
              }`} />
            </div>
            <div>
              <Badge variant="secondary" className={`text-xs mb-1 ${
                achievement.rarity === "legendary" ? "bg-orange-500/20 text-orange-500" :
                achievement.rarity === "epic" ? "bg-secondary/20 text-secondary" :
                achievement.rarity === "rare" ? "bg-primary/20 text-primary" :
                "bg-muted/20"
              }`}>
                {achievement.rarity.toUpperCase()}
              </Badge>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsVisible(false)}
            className="h-6 w-6 p-0 hover:bg-destructive/20"
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-bold text-lg">🎉 Achievement Unlocked!</h3>
          <h4 className="font-semibold text-foreground">{achievement.title}</h4>
          <p className="text-sm text-muted-foreground">{achievement.description}</p>
        </div>
        
        <div className="mt-4 text-center">
          <div className="text-xs text-muted-foreground">
            {achievement.rarity === "legendary" ? "🌟 Legendary Achievement! 🌟" :
             achievement.rarity === "epic" ? "⭐ Epic Achievement!" :
             achievement.rarity === "rare" ? "✨ Rare Achievement!" :
             "Achievement Completed!"}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AchievementNotification;