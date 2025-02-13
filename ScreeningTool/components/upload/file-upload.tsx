'use client';

import { useCallback, useState, useRef } from 'react';
import { useWorkflow } from '@/context/workflow-context';
import { Card } from '@/components/ui/card';
import { Upload, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"

export function FileUpload() {
  const { setStudies, setStage } = useWorkflow();
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Add file input ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Add click handler
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  // Add file change handler
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const risFile = files.find(file => file.name.endsWith('.ris'));
    
    // *** API CALL TO BACKEND ***  
    if (risFile) {
      try {
        setIsLoading(true);
        setError(null);
        
        const formData = new FormData();
        formData.append('file', risFile);
        
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        
        if (!response.ok) {
          throw new Error('Upload failed');
        }
        
        const data = await response.json();
        setStudies(data.validated_entries);
        setStage('criteria');
        
        // Show success toast
        toast({
          title: "File Upload Successful",
          description: `Successfully processed ${data.study_count} studies from ${risFile.name}`,
          variant: "default",
        });

      } catch (error) {
        setError((error as Error).message);
        toast({
          title: "Upload Failed",
          description: (error as Error).message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const risFile = files.find(file => file.name.endsWith('.ris'));
    
    // *** API CALL TO BACKEND ***  
    if (risFile) {
      try {
        setIsLoading(true);
        setError(null);
        
        const formData = new FormData();
        formData.append('file', risFile);
        
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        
        if (!response.ok) {
          throw new Error('Upload failed');
        }
        
        const data = await response.json();
        setStudies(data.validated_entries);
        setStage('criteria');
        
        // Show success toast
        toast({
          title: "File Upload Successful",
          description: `Successfully processed ${data.study_count} studies from ${risFile.name}`,
          variant: "default",
        });

      } catch (error) {
        setError((error as Error).message);
        toast({
          title: "Upload Failed",
          description: (error as Error).message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  }, [setStage, setStudies, toast]);

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".ris"
        className="hidden"
        disabled={isLoading}
      />
      <Card
        className={`p-8 border-2 border-dashed transition-colors 
          ${isDragging ? 'border-primary bg-primary/10' : 'border-border'}
          ${isLoading ? 'opacity-50' : ''} 
          cursor-pointer`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={handleClick}
      >
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          {isLoading ? (
            <Loader2 className="h-8 w-8 animate-spin" />
          ) : (
            <Upload className="h-8 w-8 text-muted-foreground" />
          )}
          <div className="space-y-2">
            <h3 className="font-semibold">
              {isLoading ? 'Uploading...' : 'Upload RIS File'}
            </h3>
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
            {!isLoading && !error && (
              <p className="text-sm text-muted-foreground">
                Drag and drop your RIS file here
              </p>
            )}
          </div>
        </div>
      </Card>
    </>
  );
}