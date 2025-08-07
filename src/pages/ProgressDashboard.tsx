import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  Target, 
  Clock, 
  Flame, 
  Trophy, 
  Calendar,
  Activity,
  Zap
} from "lucide-react";

const ProgressDashboard = () => {
  const stats = [
    {
      title: "Workouts Completed",
      value: "24",
      change: "+12%",
      icon: Target,
      color: "text-primary"
    },
    {
      title: "Calories Burned",
      value: "3,240",
      change: "+8%",
      icon: Flame,
      color: "text-secondary"
    },
    {
      title: "Time Spent",
      value: "18h 30m",
      change: "+15%",
      icon: Clock,
      color: "text-primary"
    },
    {
      title: "Current Streak",
      value: "7 days",
      change: "New Record!",
      icon: Trophy,
      color: "text-secondary"
    }
  ];

  const weeklyData = [
    { day: "Mon", workouts: 1, duration: 45 },
    { day: "Tue", workouts: 0, duration: 0 },
    { day: "Wed", workouts: 1, duration: 40 },
    { day: "Thu", workouts: 1, duration: 35 },
    { day: "Fri", workouts: 1, duration: 50 },
    { day: "Sat", workouts: 0, duration: 0 },
    { day: "Sun", workouts: 1, duration: 45 }
  ];

  const achievements = [
    { title: "First Workout", description: "Completed your first AI workout", date: "2 weeks ago", unlocked: true },
    { title: "7 Day Streak", description: "Workout for 7 consecutive days", date: "Just now", unlocked: true },
    { title: "Strong Start", description: "Complete 10 workouts", date: "1 week ago", unlocked: true },
    { title: "Consistency King", description: "30 day workout streak", date: "In progress", unlocked: false },
    { title: "Power User", description: "Complete 50 workouts", date: "In progress", unlocked: false },
  ];

  const recentWorkouts = [
    { name: "Upper Body Strength", date: "Today", duration: "45 min", completed: true },
    { name: "Lower Body Power", date: "Yesterday", duration: "40 min", completed: true },
    { name: "Full Body HIIT", date: "2 days ago", duration: "35 min", completed: true },
    { name: "Core Focus", date: "3 days ago", duration: "30 min", completed: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Progress Dashboard
              </span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Track your fitness journey and celebrate your achievements
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 bg-gradient-card border-border hover:border-primary/50 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    <p className={`text-sm ${stat.color} font-medium`}>
                      {stat.change}
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl bg-primary/10 ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-card">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="workouts">Workouts</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="goals">Goals</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Weekly Activity */}
                <Card className="p-6 bg-gradient-card border-border">
                  <h3 className="text-xl font-semibold mb-6 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-primary" />
                    Weekly Activity
                  </h3>
                  <div className="space-y-4">
                    {weeklyData.map((day, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 text-sm font-medium">{day.day}</div>
                          <div className="flex-1">
                            <Progress 
                              value={day.workouts * 100} 
                              className="h-2"
                            />
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground min-w-[60px] text-right">
                          {day.duration > 0 ? `${day.duration}min` : "Rest"}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Recent Workouts */}
                <Card className="p-6 bg-gradient-card border-border">
                  <h3 className="text-xl font-semibold mb-6 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-secondary" />
                    Recent Workouts
                  </h3>
                  <div className="space-y-4">
                    {recentWorkouts.map((workout, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-elevated/50">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <div>
                            <p className="font-medium">{workout.name}</p>
                            <p className="text-sm text-muted-foreground">{workout.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{workout.duration}</p>
                          <Badge variant="secondary" className="bg-primary/20 text-primary text-xs">
                            Completed
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Monthly Progress */}
              <Card className="p-6 bg-gradient-card border-border">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                  Monthly Progress
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">75%</div>
                    <p className="text-muted-foreground">Goal Progress</p>
                    <Progress value={75} className="mt-2" />
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-secondary mb-2">18</div>
                    <p className="text-muted-foreground">Workouts This Month</p>
                    <Progress value={60} className="mt-2" />
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">12h</div>
                    <p className="text-muted-foreground">Hours Trained</p>
                    <Progress value={80} className="mt-2" />
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <Card className="p-6 bg-gradient-card border-border">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-secondary" />
                  Your Achievements
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <div 
                      key={index} 
                      className={`p-4 rounded-lg border transition-all duration-200 ${
                        achievement.unlocked 
                          ? "border-primary bg-primary/5 shadow-glow" 
                          : "border-border bg-elevated/50"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          achievement.unlocked ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        }`}>
                          <Trophy className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{achievement.title}</h4>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">{achievement.date}</p>
                        </div>
                        {achievement.unlocked && (
                          <Badge className="bg-primary text-primary-foreground">
                            Unlocked
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="goals" className="space-y-6">
              <Card className="p-6 bg-gradient-card border-border">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-primary" />
                  Current Goals
                </h3>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Monthly Workout Target</h4>
                      <span className="text-sm text-muted-foreground">18/24 workouts</span>
                    </div>
                    <Progress value={75} className="h-3" />
                    <p className="text-sm text-muted-foreground">6 more workouts to reach your goal!</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Weekly Consistency</h4>
                      <span className="text-sm text-muted-foreground">4/5 days</span>
                    </div>
                    <Progress value={80} className="h-3" />
                    <p className="text-sm text-muted-foreground">1 more workout this week!</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Strength Progress</h4>
                      <span className="text-sm text-muted-foreground">65%</span>
                    </div>
                    <Progress value={65} className="h-3" />
                    <p className="text-sm text-muted-foreground">Great progress on your strength goals!</p>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProgressDashboard;