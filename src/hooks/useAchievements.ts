import { useState, useCallback } from "react";
import { Trophy, Flame, Target, Star, Zap, Dumbbell } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  rarity: "common" | "rare" | "epic" | "legendary";
  condition: (stats: UserStats) => boolean;
  unlocked?: boolean;
}

interface UserStats {
  workoutsCompleted: number;
  currentStreak: number;
  totalTimeMinutes: number;
  exercisesCompleted: number;
  perfectWorkouts: number; // workouts with all exercises completed
}

export const useAchievements = () => {
  const [achievements] = useState<Achievement[]>([
    {
      id: "first_workout",
      title: "Getting Started",
      description: "Complete your first workout",
      icon: Target,
      rarity: "common",
      condition: (stats) => stats.workoutsCompleted >= 1
    },
    {
      id: "streak_3",
      title: "Building Momentum", 
      description: "Maintain a 3-day workout streak",
      icon: Flame,
      rarity: "common",
      condition: (stats) => stats.currentStreak >= 3
    },
    {
      id: "streak_7",
      title: "Week Warrior",
      description: "Complete workouts for 7 days straight",
      icon: Trophy,
      rarity: "rare",
      condition: (stats) => stats.currentStreak >= 7
    },
    {
      id: "workouts_10",
      title: "Consistent Crusher",
      description: "Complete 10 total workouts",
      icon: Dumbbell,
      rarity: "rare",
      condition: (stats) => stats.workoutsCompleted >= 10
    },
    {
      id: "perfect_5",
      title: "Perfectionist",
      description: "Complete 5 perfect workouts (all exercises done)",
      icon: Star,
      rarity: "epic",
      condition: (stats) => stats.perfectWorkouts >= 5
    },
    {
      id: "time_1000",
      title: "Time Master",
      description: "Spend 1000+ minutes working out",
      icon: Zap,
      rarity: "epic",
      condition: (stats) => stats.totalTimeMinutes >= 1000
    },
    {
      id: "streak_30",
      title: "Unstoppable Force",
      description: "Maintain a 30-day workout streak",
      icon: Flame,
      rarity: "legendary",
      condition: (stats) => stats.currentStreak >= 30
    }
  ]);

  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>(() => {
    const saved = localStorage.getItem('unlockedAchievements');
    return saved ? JSON.parse(saved) : [];
  });

  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);

  const checkAchievements = useCallback((stats: UserStats) => {
    const newlyUnlocked: Achievement[] = [];
    
    achievements.forEach(achievement => {
      if (!unlockedAchievements.includes(achievement.id) && achievement.condition(stats)) {
        newlyUnlocked.push(achievement);
      }
    });

    if (newlyUnlocked.length > 0) {
      const updatedUnlocked = [...unlockedAchievements, ...newlyUnlocked.map(a => a.id)];
      setUnlockedAchievements(updatedUnlocked);
      localStorage.setItem('unlockedAchievements', JSON.stringify(updatedUnlocked));
      
      // Show the most significant achievement (highest rarity)
      const mostSignificant = newlyUnlocked.reduce((prev, curr) => {
        const rarityOrder = { common: 1, rare: 2, epic: 3, legendary: 4 };
        return rarityOrder[curr.rarity] > rarityOrder[prev.rarity] ? curr : prev;
      });
      
      setNewAchievement(mostSignificant);
    }
  }, [achievements, unlockedAchievements]);

  const dismissAchievement = useCallback(() => {
    setNewAchievement(null);
  }, []);

  const getUnlockedAchievements = useCallback(() => {
    return achievements.filter(a => unlockedAchievements.includes(a.id));
  }, [achievements, unlockedAchievements]);

  const getProgress = useCallback(() => {
    return {
      unlocked: unlockedAchievements.length,
      total: achievements.length,
      percentage: Math.round((unlockedAchievements.length / achievements.length) * 100)
    };
  }, [achievements.length, unlockedAchievements.length]);

  return {
    achievements: achievements.map(a => ({ ...a, unlocked: unlockedAchievements.includes(a.id) })),
    newAchievement,
    checkAchievements,
    dismissAchievement,
    getUnlockedAchievements,
    getProgress
  };
};