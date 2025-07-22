import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { ModelViewer } from '@/components/ModelViewer';
import { FileUpload } from '@/components/FileUpload';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Zap, Shield, Download } from 'lucide-react';

export default function Index() {
  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const [modelFile, setModelFile] = useState<File | null>(null);

  const features = [
    {
      icon: Sparkles,
      title: 'High-Quality Rendering',
      description: 'Advanced Three.js rendering with realistic lighting and shadows'
    },
    {
      icon: Zap,
      title: 'Real-time Interaction',
      description: 'Smooth 60fps interactions with orbit controls and zoom'
    },
    {
      icon: Shield,
      title: 'Offline Capable',
      description: 'Works completely offline - no server required'
    },
    {
      icon: Download,
      title: 'Easy Upload',
      description: 'Drag & drop GLB files for instant 3D viewing'
    }
  ];

  const handleFileUpload = (url: string, file: File) => {
    setModelUrl(url);
    setModelFile(file);
  };

  const handleReset = () => {
    setModelUrl(null);
    setModelFile(null);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4 space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-6 py-12">
            <div className="space-y-4">
              <Badge className="bg-primary/10 text-primary border border-primary/20 px-4 py-1">
                ✨ Powered by Three.js & WebGL
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground">
                Professional{' '}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  3D Model Viewer
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Upload and view GLB 3D models with stunning real-time rendering. 
                Built for developers, designers, and 3D enthusiasts who demand quality.
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Upload Section */}
            <div className="lg:col-span-1 space-y-4 lg:space-y-6 order-2 lg:order-1">
              <Card className="p-4 lg:p-6 bg-gradient-card border-border shadow-card">
                <h2 className="text-lg lg:text-xl font-semibold text-foreground mb-4">Upload Model</h2>
                <FileUpload onFileUpload={handleFileUpload} />
              </Card>

              {/* Features */}
              <Card className="p-4 lg:p-6 bg-gradient-card border-border shadow-card">
                <h3 className="text-base lg:text-lg font-semibold text-foreground mb-4">Features</h3>
                  <div className="space-y-3 lg:space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 lg:w-8 lg:h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <feature.icon className="h-3 w-3 lg:h-4 lg:w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground text-xs lg:text-sm">{feature.title}</h4>
                        <p className="text-xs text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Technical Info */}
              <Card className="p-4 lg:p-6 bg-gradient-card border-border shadow-card">
                <h3 className="text-base lg:text-lg font-semibold text-foreground mb-4">Technical Details</h3>
                <div className="space-y-2 lg:space-y-3 text-xs lg:text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Supported Format:</span>
                    <span className="text-foreground font-mono">GLB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Max File Size:</span>
                    <span className="text-foreground font-mono">50MB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Renderer:</span>
                    <span className="text-foreground font-mono">WebGL 2.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Framework:</span>
                    <span className="text-foreground font-mono">Three.js</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Viewer Section */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <ModelViewer 
                modelUrl={modelUrl} 
                modelFile={modelFile}
                onReset={handleReset} 
              />
            </div>
          </div>

          {/* Info Section */}
          {!modelUrl && (
            <Card className="p-6 lg:p-8 bg-gradient-card border-border shadow-card text-center">
              <div className="max-w-2xl mx-auto space-y-4">
                <h3 className="text-xl lg:text-2xl font-bold text-foreground">
                  Ready to Explore 3D Models?
                </h3>
                <p className="text-sm lg:text-base text-muted-foreground">
                  Upload your GLB files to experience high-quality 3D visualization with advanced 
                  lighting, shadows, and smooth interactions. Perfect for product showcases, 
                  architectural visualization, and creative projects.
                </p>
                <div className="flex flex-wrap justify-center gap-1 lg:gap-2 mt-4 lg:mt-6">
                  <Badge variant="outline" className="border-primary/30 text-primary">
                    Real-time Rendering
                  </Badge>
                  <Badge variant="outline" className="border-primary/30 text-primary">
                    Orbit Controls
                  </Badge>
                  <Badge variant="outline" className="border-primary/30 text-primary">
                    Auto-rotation
                  </Badge>
                  <Badge variant="outline" className="border-primary/30 text-primary">
                    Screenshot Export
                  </Badge>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
