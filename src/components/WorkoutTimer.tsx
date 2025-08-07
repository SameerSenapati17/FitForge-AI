import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Pause, RotateCcw, Clock } from "lucide-react";

interface WorkoutTimerProps {
  onTimeComplete?: (seconds: number) => void;
  className?: string;
}

const WorkoutTimer = ({ onTimeComplete, className = "" }: WorkoutTimerProps) => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    if (onTimeComplete && seconds > 0) {
      onTimeComplete(seconds);
    }
    setSeconds(0);
  };

  return (
    <Card className={`p-4 bg-gradient-card border-border ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-primary/20">
            <Clock className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Workout Time</p>
            <p className="text-xl font-bold">{formatTime(seconds)}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            onClick={handleStart}
            size="sm"
            variant={isRunning ? "destructive" : "default"}
            className={isRunning ? "" : "bg-primary hover:bg-primary-hover text-primary-foreground"}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button
            onClick={handleReset}
            size="sm"
            variant="outline"
            className="border-border hover:bg-elevated"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default WorkoutTimer;