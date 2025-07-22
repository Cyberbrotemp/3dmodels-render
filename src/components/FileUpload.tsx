import { useCallback, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Upload, File, CheckCircle, AlertCircle } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (url: string, file: File) => void;
}

export function FileUpload({ onFileUpload }: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFile = useCallback(async (file: File) => {
    if (!file.name.toLowerCase().endsWith('.glb')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a GLB file (.glb)",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 50 * 1024 * 1024) { // 50MB limit
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 50MB",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    try {
      // Create object URL for offline viewing
      const url = URL.createObjectURL(file);
      onFileUpload(url, file);
      
      toast({
        title: "Model loaded successfully!",
        description: `${file.name} is ready to view`,
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error loading your model",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  }, [onFileUpload, toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  return (
    <Card 
      className={`
        relative p-4 sm:p-8 border-2 border-dashed transition-all duration-300 cursor-pointer
        ${isDragOver 
          ? 'border-primary bg-primary/5 shadow-glow' 
          : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-primary/5'
        }
        ${isUploading ? 'pointer-events-none opacity-50' : ''}
      `}
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onClick={() => document.getElementById('file-input')?.click()}
    >
      <input
        id="file-input"
        type="file"
        accept=".glb"
        onChange={handleFileInput}
        className="hidden"
      />
      
      <div className="text-center space-y-4">
        <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-gradient-card rounded-full flex items-center justify-center">
          {isUploading ? (
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          ) : (
            <Upload className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
          )}
        </div>
        
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
            {isUploading ? 'Loading Model...' : 'Upload 3D Model'}
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground mb-4">
            Drag & drop your GLB file here, or click to browse
          </p>
        </div>

        <div className="space-y-2">
          <Button 
            variant="outline" 
            className="w-full"
            disabled={isUploading}
          >
            <File className="h-4 w-4 mr-2" />
            Choose GLB File
          </Button>
          
          <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center">
              <CheckCircle className="h-3 w-3 mr-1 text-success" />
              GLB Format
            </div>
            <div className="flex items-center">
              <AlertCircle className="h-3 w-3 mr-1 text-warning" />
              Max 50MB
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}