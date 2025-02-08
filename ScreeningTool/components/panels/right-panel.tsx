'use client';

import { useWorkflow } from '@/context/workflow-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface RightPanelProps {
  collapsed: boolean;
}

export function RightPanel({ collapsed }: RightPanelProps) {
  const { stage } = useWorkflow();

  if (collapsed) {
    return null;
  }

  return (
    <ScrollArea className="h-full p-4">
      <Card>
        <CardHeader>
          <CardTitle>Details</CardTitle>
        </CardHeader>
        <CardContent>
          {stage === 'upload' && <div>Upload Statistics</div>}
          {stage === 'criteria' && <div>Criteria Preview</div>}
          {stage === 'processing' && <div>Processing Details</div>}
          {stage === 'results' && <div>Study Details</div>}
        </CardContent>
      </Card>
    </ScrollArea>
  );
}