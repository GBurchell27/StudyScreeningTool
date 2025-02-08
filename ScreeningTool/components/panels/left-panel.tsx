'use client';

import { FileUpload } from '@/components/upload/file-upload';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useWorkflow } from '@/context/workflow-context';
import { FileText, Settings, Download, Info } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { CriteriaModal } from '@/components/criteria/criteria-modal';

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
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-muted-foreground" />
            Getting Started
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-4">
          <p>
            This AI-powered Screening Tool helps you efficiently sort through papers for your systematic review.
          </p>
          <div className="space-y-2">
            <h4 className="font-medium text-foreground">How it works:</h4>
            <ol className="list-decimal list-inside space-y-1">
              <li>Upload your RIS file containing study metadata</li>
              <li>Define your inclusion/exclusion criteria</li>
              <li>Let AI analyze each study's title, abstract, and keywords</li>
              <li>Review AI-generated recommendations (Include/Maybe/Exclude)</li>
            </ol>
          </div>
          <Separator />
          {stage === 'upload' && <FileUpload />}
          <div className="space-y-2 mt-4">
            <CriteriaModal />
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