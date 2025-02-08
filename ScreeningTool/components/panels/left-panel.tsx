'use client';

import { FileUpload } from '@/components/upload/file-upload';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useWorkflow } from '@/context/workflow-context';
import { FileText, Settings, Download } from 'lucide-react';

interface LeftPanelProps {
  collapsed: boolean;
}

export function LeftPanel({ collapsed }: LeftPanelProps) {
  const { stage } = useWorkflow();

  if (collapsed) {
    return (
      <div className="flex flex-col items-center gap-4 p-2">
        <Button variant="ghost" size="icon">
          <FileText className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Download className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="h-full p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Project Controls</CardTitle>
        </CardHeader>
        <CardContent>
          {stage === 'upload' && <FileUpload />}
          <div className="space-y-2 mt-4">
            <Button className="w-full" variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Criteria Templates
            </Button>
            <Button className="w-full" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Results
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}