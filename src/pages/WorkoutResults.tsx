import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RotateCcw, Edit, Clock, Target, Calendar, CheckCircle, Trophy } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import WorkoutTimer from "@/components/WorkoutTimer";
import AchievementNotification from "@/components/AchievementNotification";
import { useAchievements } from "@/hooks/useAchievements";

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  notes?: string;
  completed?: boolean;
}

interface WorkoutDay {
  day: string;
  focus: string;
  duration: string;
  exercises: Exercise[];
  completed?: boolean;
}

const WorkoutResults = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutDay[]>([]);
  const [selectedDay, setSelectedDay] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<{ [key: string]: boolean }>({});
  const [workoutStartTime, setWorkoutStartTime] = useState<Date | null>(null);
  const { checkAchievements, newAchievement, dismissAchievement } = useAchievements();

  useEffect(() => {
    const formData = localStorage.getItem('workoutFormData');
    if (!formData) {
      navigate('/generator');
      return;
    }
    
    const data = JSON.parse(formData);
    setUserData(data);
    
    // Generate sample workout based on user data
    generateWorkoutPlan(data);
  }, [navigate]);

  const generateWorkoutPlan = (data: any) => {
    // Sample AI-generated workout plan with completion tracking
    const samplePlan: WorkoutDay[] = [
      {
        day: "Monday",
        focus: "Upper Body Strength",
        duration: "45 min",
        completed: false,
        exercises: [
          { name: "Push-ups", sets: 3, reps: "8-12", rest: "60s", notes: "Modify on knees if needed", completed: false },
          { name: "Dumbbell Rows", sets: 3, reps: "10-12", rest: "60s", completed: false },
          { name: "Shoulder Press", sets: 3, reps: "8-10", rest: "90s", completed: false },
          { name: "Chest Dips", sets: 2, reps: "6-10", rest: "60s", completed: false },
          { name: "Bicep Curls", sets: 3, reps: "12-15", rest: "45s", completed: false }
        ]
      },
      {
        day: "Wednesday",
        focus: "Lower Body Power",
        duration: "40 min",
        completed: false,
        exercises: [
          { name: "Squats", sets: 4, reps: "10-12", rest: "90s", notes: "Focus on form", completed: false },
          { name: "Deadlifts", sets: 3, reps: "8-10", rest: "120s", completed: false },
          { name: "Lunges", sets: 3, reps: "10 each leg", rest: "60s", completed: false },
          { name: "Calf Raises", sets: 3, reps: "15-20", rest: "45s", completed: false },
          { name: "Glute Bridges", sets: 3, reps: "12-15", rest: "60s", completed: false }
        ]
      },
      {
        day: "Friday",
        focus: "Full Body HIIT",
        duration: "35 min",
        completed: false,
        exercises: [
          { name: "Burpees", sets: 4, reps: "30s on/30s off", rest: "60s", completed: false },
          { name: "Mountain Climbers", sets: 3, reps: "20 each leg", rest: "45s", completed: false },
          { name: "Jump Squats", sets: 3, reps: "15", rest: "60s", completed: false },
          { name: "Plank", sets: 3, reps: "45s hold", rest: "30s", completed: false },
          { name: "High Knees", sets: 3, reps: "30s", rest: "30s", completed: false }
        ]
      }
    ];
    
    setWorkoutPlan(samplePlan);
  };

  const toggleExerciseComplete = (exerciseIndex: number) => {
    const key = `${selectedDay}-${exerciseIndex}`;
    const newCompleted = { ...completedExercises, [key]: !completedExercises[key] };
    setCompletedExercises(newCompleted);
    
    // Update the exercise in the workout plan
    const updatedPlan = [...workoutPlan];
    updatedPlan[selectedDay].exercises[exerciseIndex].completed = !completedExercises[key];
    setWorkoutPlan(updatedPlan);
    
    if (!completedExercises[key]) {
      toast({
        title: "Exercise Completed! 💪",
        description: `Great job completing ${updatedPlan[selectedDay].exercises[exerciseIndex].name}!`,
      });
      
      // Check if all exercises are complete
      const allComplete = updatedPlan[selectedDay].exercises.every(ex => ex.completed);
      if (allComplete && !updatedPlan[selectedDay].completed) {
        updatedPlan[selectedDay].completed = true;
        setWorkoutPlan(updatedPlan);
        
        // Update achievements
        const currentStats = {
          workoutsCompleted: updatedPlan.filter(w => w.completed).length,
          currentStreak: 7, // Mock streak
          totalTimeMinutes: 450, // Mock time
          exercisesCompleted: updatedPlan.reduce((acc, w) => acc + w.exercises.filter(e => e.completed).length, 0),
          perfectWorkouts: updatedPlan.filter(w => w.completed).length
        };
        
        checkAchievements(currentStats);
        
        toast({
          title: "Workout Complete! 🎉",
          description: "Amazing! You've completed your entire workout session.",
        });
      }
    }
  };

  const startWorkout = () => {
    setWorkoutStartTime(new Date());
    toast({
      title: "Workout Started! 🔥",
      description: "Timer is running. Let's crush this workout!",
    });
  };

  const handleWorkoutTimeComplete = (seconds: number) => {
    const minutes = Math.round(seconds / 60);
    toast({
      title: "Workout Session Complete!",
      description: `Great job! You worked out for ${minutes} minutes.`,
    });
  };

  const handleRegenerate = () => {
    toast({
      title: "Regenerating Plan",
      description: "Creating a new workout plan based on your preferences...",
    });
    
    // Simulate regeneration
    setTimeout(() => {
      generateWorkoutPlan(userData);
      toast({
        title: "New Plan Generated!",
        description: "Your workout plan has been updated with fresh exercises.",
      });
    }, 2000);
  };

  if (!userData || workoutPlan.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-hero pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your workout plan...</p>
        </div>
      </div>
    );
  }

  const currentWorkout = workoutPlan[selectedDay];

  return (
    <>
      {newAchievement && (
        <AchievementNotification
          achievement={newAchievement}
          show={!!newAchievement}
          onClose={dismissAchievement}
        />
      )}
      
      <div className="min-h-screen bg-gradient-hero pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Your AI-Generated Workout Plan
              </span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Personalized for {userData.name} - {userData.fitnessGoal.replace('-', ' ')} focused
            </p>
          </div>

          {/* User Stats */}
          <Card className="p-6 mb-8 bg-gradient-card border-border">
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div className="space-y-1">
                <div className="text-2xl font-bold text-primary">{userData.daysPerWeek}</div>
                <div className="text-sm text-muted-foreground">Days/Week</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-secondary">{userData.age}</div>
                <div className="text-sm text-muted-foreground">Years Old</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-primary">{userData.height}cm</div>
                <div className="text-sm text-muted-foreground">Height</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-secondary">{userData.weight}kg</div>
                <div className="text-sm text-muted-foreground">Weight</div>
              </div>
            </div>
          </Card>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Workout Days Sidebar */}
            <div className="lg:col-span-1">
              <Card className="p-6 bg-gradient-card border-border">
                <h3 className="font-semibold mb-4">Workout Schedule</h3>
                <div className="space-y-2">
                  {workoutPlan.map((day, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedDay(index)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                        selectedDay === index 
                          ? "bg-primary text-primary-foreground shadow-neon" 
                          : "hover:bg-elevated"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{day.day}</div>
                          <div className="text-sm opacity-80">{day.focus}</div>
                        </div>
                        {day.completed && (
                          <Trophy className="w-4 h-4 text-secondary" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </Card>
            </div>

            {/* Workout Details */}
            <div className="lg:col-span-3">
              <div className="space-y-6">
                {/* Workout Timer */}
                {!workoutStartTime && (
                  <div className="flex justify-center">
                    <Button
                      onClick={startWorkout}
                      size="lg"
                      className="bg-primary hover:bg-primary-hover text-primary-foreground shadow-neon"
                    >
                      Start Workout Timer
                    </Button>
                  </div>
                )}
                
                {workoutStartTime && (
                  <WorkoutTimer onTimeComplete={handleWorkoutTimeComplete} />
                )}

                <Card className="p-8 bg-gradient-card border-border">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{currentWorkout.day} Workout</h2>
                      <div className="flex items-center space-x-4 text-muted-foreground">
                        <div className="flex items-center">
                          <Target className="w-4 h-4 mr-1" />
                          {currentWorkout.focus}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {currentWorkout.duration}
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-secondary/20 text-secondary">
                      Day {selectedDay + 1}
                    </Badge>
                  </div>

                  <div className="space-y-6">
                    {currentWorkout.exercises.map((exercise, index) => (
                      <div key={index}>
                        <div className={`flex items-start justify-between p-4 rounded-lg transition-all duration-200 ${
                          exercise.completed ? "bg-primary/10 border border-primary/20" : "bg-elevated/50"
                        }`}>
                          <div className="flex-1">
                            <h4 className={`font-semibold text-lg mb-2 ${
                              exercise.completed ? "line-through text-muted-foreground" : ""
                            }`}>
                              {exercise.name}
                            </h4>
                            <div className="grid sm:grid-cols-3 gap-4 text-sm text-muted-foreground">
                              <div>
                                <span className="font-medium text-foreground">{exercise.sets}</span> sets
                              </div>
                              <div>
                                <span className="font-medium text-foreground">{exercise.reps}</span> reps
                              </div>
                              <div>
                                <span className="font-medium text-foreground">{exercise.rest}</span> rest
                              </div>
                            </div>
                            {exercise.notes && (
                              <p className="text-sm text-muted-foreground mt-2 italic">
                                💡 {exercise.notes}
                              </p>
                            )}
                          </div>
                          <Button 
                            size="sm" 
                            variant={exercise.completed ? "default" : "ghost"}
                            className={exercise.completed ? "bg-primary text-primary-foreground" : "hover:bg-primary/20"}
                            onClick={() => toggleExerciseComplete(index)}
                          >
                            <CheckCircle className={`w-4 h-4 ${exercise.completed ? "text-primary-foreground" : ""}`} />
                          </Button>
                        </div>
                        {index < currentWorkout.exercises.length - 1 && (
                          <Separator className="my-4" />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-border">
                    <Button
                      onClick={handleRegenerate}
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Regenerate Plan
                    </Button>
                    <Button
                      variant="outline"
                      className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Customize Workout
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default WorkoutResults;