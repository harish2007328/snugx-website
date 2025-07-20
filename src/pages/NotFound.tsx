
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-bg px-4">
      <div className="text-center space-y-8">
        <div className="relative">
          <h1 className="text-9xl md:text-[12rem] font-bold text-neon-green/20 leading-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="glass p-8 rounded-lg">
              <h2 className="text-2xl md:text-3xl font-bold text-light-text mb-4">
                Page Not Found
              </h2>
              <p className="text-gray-400 mb-8 max-w-md">
                The page you're looking for seems to have vanished into the digital void. 
                Let's get you back on track.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="btn-primary px-6 py-3" asChild>
                  <Link to="/">
                    <Home className="mr-2 w-4 h-4" />
                    Go Home
                  </Link>
                </Button>
                
                <Button className="btn-secondary px-6 py-3" onClick={() => window.history.back()}>
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Go Back
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16">
          <p className="text-sm text-gray-500">
            Error Code: 404 | Page: {location.pathname}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
