import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Box, User } from 'lucide-react';

export function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-14 lg:h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Box className="h-3 w-3 lg:h-5 lg:w-5 text-primary-foreground" />
          </div>
          <span className="text-lg lg:text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            3D Viewer
          </span>
        </Link>

        <div className="flex items-center space-x-1 lg:space-x-2">
          <Button
            asChild
            variant={isActive('/') ? 'default' : 'ghost'}
            size="sm"
            className={`${isActive('/') ? 'bg-gradient-primary text-primary-foreground' : ''} text-xs lg:text-sm`}
          >
            <Link to="/">
              <Box className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
              <span className="hidden sm:inline">Viewer</span>
            </Link>
          </Button>
          
          <Button
            asChild
            variant={isActive('/developer') ? 'default' : 'ghost'}
            size="sm"
            className={`${isActive('/developer') ? 'bg-gradient-primary text-primary-foreground' : ''} text-xs lg:text-sm`}
          >
            <Link to="/developer">
              <User className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
              <span className="hidden sm:inline">Developer</span>
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}