import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  ContactShadows, 
  PresentationControls,
  useGLTF,
  Html,
  useProgress
} from '@react-three/drei';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2, RotateCcw, Download, ZoomIn, ZoomOut } from 'lucide-react';

interface ModelProps {
  url: string;
}

function Model({ url }: ModelProps) {
  const { scene } = useGLTF(url);
  const meshRef = useRef<THREE.Group>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-rotate when not being controlled
  useFrame((state, delta) => {
    if (meshRef.current && !isHovered) {
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <PresentationControls
      enabled={true}
      global={false}
      cursor={true}
      snap={false}
      speed={1}
      zoom={1}
      rotation={[0, 0, 0]}
      polar={[-Math.PI / 3, Math.PI / 3]}
      azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
    >
      <group
        ref={meshRef}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      >
        <primitive object={scene} scale={1} />
      </group>
    </PresentationControls>
  );
}

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-4 p-6 bg-card/80 backdrop-blur-sm rounded-lg border">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <div className="text-center">
          <p className="text-foreground font-medium">Loading 3D Model</p>
          <p className="text-muted-foreground text-sm">{Math.round(progress)}% complete</p>
        </div>
        <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </Html>
  );
}

interface ModelViewerProps {
  modelUrl: string | null;
  modelFile: File | null;
  onReset: () => void;
}

export function ModelViewer({ modelUrl, modelFile, onReset }: ModelViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleDownload = () => {
    if (!modelFile) return;
    
    const link = document.createElement('a');
    link.download = modelFile.name;
    link.href = URL.createObjectURL(modelFile);
    link.click();
  };

  const handleScreenshot = () => {
    if (!canvasRef.current) return;
    
    const link = document.createElement('a');
    link.download = 'model-screenshot.png';
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  const resetCamera = () => {
    // This would reset the camera position
    // Implementation depends on how you want to handle camera controls
  };

  if (!modelUrl) {
    return (
      <Card className="w-full h-[400px] md:h-[600px] flex items-center justify-center bg-viewer-bg border-border">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-gradient-card rounded-full flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-dashed border-muted-foreground rounded" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">No Model Loaded</h3>
            <p className="text-muted-foreground">Upload a GLB file to view your 3D model</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Viewer Controls */}
      <div className="flex flex-col sm:flex-row gap-2 justify-between items-start sm:items-center p-3 sm:p-4 bg-control-bg rounded-lg border">
        <div className="flex flex-wrap gap-2">
          <Button onClick={resetCamera} variant="outline" size="sm" className="text-xs sm:text-sm">
            <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            Reset View
          </Button>
          <Button onClick={handleScreenshot} variant="outline" size="sm" className="text-xs sm:text-sm">
            <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            Screenshot
          </Button>
          {modelFile && (
            <Button onClick={handleDownload} variant="outline" size="sm" className="text-xs sm:text-sm">
              <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Download GLB
            </Button>
          )}
        </div>
        <Button onClick={onReset} variant="destructive" size="sm" className="text-xs sm:text-sm w-full sm:w-auto">
          Clear Model
        </Button>
      </div>

      {/* 3D Canvas */}
      <Card className="relative overflow-hidden bg-viewer-bg border-border">
        <Canvas
          ref={canvasRef}
          camera={{ position: [0, 0, 5], fov: 45 }}
          style={{ height: '400px', minHeight: '300px' }}
          className="md:!h-[600px]"
          gl={{ preserveDrawingBuffer: true }}
        >
          <ambientLight intensity={0.4} />
          <spotLight 
            position={[10, 10, 10]} 
            angle={0.15} 
            penumbra={1} 
            intensity={1}
            castShadow
          />
          <pointLight position={[-10, -10, -10]} intensity={0.3} />
          
          <Suspense fallback={<Loader />}>
            <Model url={modelUrl} />
            <ContactShadows
              rotation-x={Math.PI / 2}
              position={[0, -1.4, 0]}
              opacity={0.4}
              width={10}
              height={10}
              blur={2.5}
              far={4.5}
            />
            <Environment preset="city" />
          </Suspense>
          
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={1}
            maxDistance={20}
            autoRotate={false}
            enableDamping={true}
            dampingFactor={0.05}
            touches={{
              ONE: THREE.TOUCH.ROTATE,
              TWO: THREE.TOUCH.DOLLY_PAN
            }}
          />
        </Canvas>
        
        {/* Viewer overlay info */}
        <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 bg-card/80 backdrop-blur-sm rounded-lg p-2 sm:p-3 border">
          <p className="text-xs text-muted-foreground hidden sm:block">
            Click & drag to rotate • Scroll to zoom • Right-click & drag to pan
          </p>
          <p className="text-xs text-muted-foreground sm:hidden">
            Touch & drag to rotate • Pinch to zoom
          </p>
        </div>
      </Card>
    </div>
  );
}