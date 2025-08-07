import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface WorkoutFormData {
  name: string;
  age: string;
  gender: string;
  height: string;
  weight: string;
  fitnessGoal: string;
  daysPerWeek: string;
  preferredTime: string;
}

const WorkoutGenerator = () => {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState<WorkoutFormData>({
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    fitnessGoal: "",
    daysPerWeek: "",
    preferredTime: ""
  });

  const handleInputChange = (field: keyof WorkoutFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const requiredFields = Object.values(formData);
    if (requiredFields.some(field => !field.trim())) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to generate your workout plan.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Store form data for the results page
      localStorage.setItem('workoutFormData', JSON.stringify(formData));
      
      toast({
        title: "Workout Plan Generated!",
        description: "Your personalized AI workout plan is ready.",
      });
      
      navigate('/results');
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate workout plan. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                AI Workout Generator
              </span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Tell us about yourself and let our AI create the perfect workout plan for you
            </p>
          </div>

          <Card className="p-8 bg-gradient-card border-border">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="bg-elevated border-border focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="25"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    className="bg-elevated border-border focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Gender</Label>
                  <Select onValueChange={(value) => handleInputChange('gender', value)}>
                    <SelectTrigger className="bg-elevated border-border focus:border-primary">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="175"
                    value={formData.height}
                    onChange={(e) => handleInputChange('height', e.target.value)}
                    className="bg-elevated border-border focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="70"
                    value={formData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    className="bg-elevated border-border focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Days per Week</Label>
                  <Select onValueChange={(value) => handleInputChange('daysPerWeek', value)}>
                    <SelectTrigger className="bg-elevated border-border focus:border-primary">
                      <SelectValue placeholder="Select days" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 days</SelectItem>
                      <SelectItem value="4">4 days</SelectItem>
                      <SelectItem value="5">5 days</SelectItem>
                      <SelectItem value="6">6 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Fitness Goal</Label>
                <Select onValueChange={(value) => handleInputChange('fitnessGoal', value)}>
                  <SelectTrigger className="bg-elevated border-border focus:border-primary">
                    <SelectValue placeholder="Select your fitness goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weight-loss">Weight Loss</SelectItem>
                    <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                    <SelectItem value="strength">Strength Training</SelectItem>
                    <SelectItem value="endurance">Endurance</SelectItem>
                    <SelectItem value="general">General Fitness</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Preferred Workout Time</Label>
                <Select onValueChange={(value) => handleInputChange('preferredTime', value)}>
                  <SelectTrigger className="bg-elevated border-border focus:border-primary">
                    <SelectValue placeholder="When do you prefer to workout?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (6-10 AM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12-4 PM)</SelectItem>
                    <SelectItem value="evening">Evening (6-9 PM)</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isGenerating}
                className="w-full bg-primary hover:bg-primary-hover text-primary-foreground shadow-neon"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                    Generating Your Plan...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 w-5 h-5" />
                    Generate AI Workout Plan
                  </>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WorkoutGenerator;