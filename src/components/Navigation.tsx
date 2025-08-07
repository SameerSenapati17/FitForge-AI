import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Dumbbell, BarChart, MessageSquare, Zap } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/generator", icon: Dumbbell, label: "Workout" },
    { path: "/dashboard", icon: BarChart, label: "Progress" },
    { path: "/coach", icon: MessageSquare, label: "AI Coach" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-glass backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent"
          >
            <Zap className="w-8 h-8 text-primary" />
            <span>FitForge AI</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive(path)
                    ? "bg-primary text-primary-foreground shadow-neon"
                    : "text-muted-foreground hover:text-foreground hover:bg-elevated"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </Link>
            ))}
          </div>
          
          {/* Mobile menu - simplified for now */}
          <div className="md:hidden flex items-center space-x-2">
            {navItems.map(({ path, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  isActive(path)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;