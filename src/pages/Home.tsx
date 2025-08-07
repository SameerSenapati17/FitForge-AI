import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Zap, Target, TrendingUp, MessageSquare } from "lucide-react";
import heroImage from "@/assets/hero-fitness.jpg";

const Home = () => {
  const features = [
    {
      icon: Target,
      title: "AI-Powered Plans",
      description: "Get personalized workout routines tailored to your goals and fitness level."
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Monitor your fitness journey with detailed analytics and insights."
    },
    {
      icon: MessageSquare,
      title: "AI Coach Chat",
      description: "Get instant advice on form, nutrition, and motivation from your AI coach."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold">
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    Transform
                  </span>
                  <br />
                  Your Fitness
                  <br />
                  <span className="text-foreground">Journey</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Unlock your potential with AI-powered workout plans, real-time coaching, 
                  and intelligent progress tracking designed just for you.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  asChild 
                  size="lg"
                  className="bg-primary hover:bg-primary-hover text-primary-foreground shadow-neon transition-all duration-300"
                >
                  <Link to="/generator">
                    <Zap className="mr-2 w-5 h-5" />
                    Start My Smart Workout Plan
                  </Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Link to="/dashboard">View Progress</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-full"></div>
              <img 
                src={heroImage} 
                alt="AI Fitness Training"
                className="relative z-10 w-full h-auto rounded-2xl shadow-card"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why Choose <span className="text-primary">FitForge AI?</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Experience the future of fitness with cutting-edge AI technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="p-8 bg-gradient-card border-border hover:border-primary transition-all duration-300 group cursor-pointer"
              >
                <div className="text-center space-y-4">
                  <div className="inline-flex p-4 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <Card className="p-12 bg-gradient-card border-primary/20 max-w-4xl mx-auto">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Ready to Start Your Journey?</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Join thousands of users who have transformed their fitness with AI-powered training
              </p>
              <Button 
                asChild 
                size="lg"
                className="bg-primary hover:bg-primary-hover text-primary-foreground shadow-neon"
              >
                <Link to="/generator">
                  <Zap className="mr-2 w-5 h-5" />
                  Get Started Now
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;