'use client';

import { useCallback, useState } from 'react';
import { useWorkflow } from '@/context/workflow-context';
import { Card } from '@/components/ui/card';
import { Upload } from 'lucide-react';

export function FileUpload() {
  const { setStudies, setStage } = useWorkflow();
  const [isDragging, setIsDragging] = useState(false);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const risFile = files.find(file => file.name.endsWith('.ris'));
    
    if (risFile) {
      // TODO: Handle file upload and parsing
      setStage('criteria');
    }
  }, [setStage]);

  return (
    <Card
      className={`p-8 border-2 border-dashed transition-colors ${
        isDragging ? 'border-primary bg-primary/10' : 'border-border'
      }`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <Upload className="h-8 w-8 text-muted-foreground" />
        <div className="space-y-2">
          <h3 className="font-semibold">Upload RIS File</h3>
          <p className="text-sm text-muted-foreground">
            Drag and drop your RIS file here
          </p>
        </div>
      </div>
    </Card>
  );
}