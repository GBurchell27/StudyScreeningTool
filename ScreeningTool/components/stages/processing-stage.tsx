'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useWorkflow } from '@/context/workflow-context';
import { PauseCircle, PlayCircle } from 'lucide-react';
import { useState } from 'react';

export function ProcessingStage() {
  const { setStage } = useWorkflow();
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Processing Studies</h1>
          <p className="text-muted-foreground">Analyzing studies based on your criteria</p>
        </div>
        <Button variant="outline" size="icon" onClick={() => setIsPaused(!isPaused)}>
          {isPaused ? (
            <PlayCircle className="h-4 w-4" />
          ) : (
            <PauseCircle className="h-4 w-4" />
          )}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={33} />
          <div className="grid grid-cols-3 text-sm">
            <div>
              <p className="text-muted-foreground">Processed</p>
              <p className="font-medium">33/100</p>
            </div>
            <div>
              <p className="text-muted-foreground">Estimated Time</p>
              <p className="font-medium">~2 minutes</p>
            </div>
            <div>
              <p className="text-muted-foreground">API Cost</p>
              <p className="font-medium">$0.12</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Decision Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { label: 'Include', count: 12, color: 'bg-green-500' },
              { label: 'Maybe', count: 8, color: 'bg-yellow-500' },
              { label: 'Exclude', count: 13, color: 'bg-red-500' },
            ].map((status) => (
              <div key={status.label} className="space-y-2">
                <div className={`h-2 rounded-full ${status.color}`} />
                <p className="font-medium">{status.label}</p>
                <p className="text-2xl font-bold">{status.count}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}