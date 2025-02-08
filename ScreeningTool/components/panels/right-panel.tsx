'use client';

import { useWorkflow } from '@/context/workflow-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface RightPanelProps {
  collapsed: boolean;
}

export function RightPanel({ collapsed }: RightPanelProps) {
  const { stage, criteria } = useWorkflow();

  if (collapsed) {
    return null;
  }

  const handleDownload = (type: 'included' | 'maybe' | 'excluded') => {
    // Implement download logic here
    console.log(`Downloading ${type} studies...`);
  };

  return (
    <ScrollArea className="h-full p-4">
      <Card>
        <CardHeader>
          <CardTitle>Download Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {stage === 'criteria' && (
            <>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => handleDownload('included')}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Included
              </Button>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => handleDownload('maybe')}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Maybe
              </Button>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => handleDownload('excluded')}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Excluded
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </ScrollArea>
  );
}