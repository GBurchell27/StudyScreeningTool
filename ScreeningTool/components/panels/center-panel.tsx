'use client';

import { useWorkflow } from '@/context/workflow-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Play, Upload, CheckCircle, AlertCircle } from 'lucide-react';

export function CenterPanel() {
  const { studies, criteria } = useWorkflow();

  const handleRunAgents = () => {
    // TODO: Implement agent processing logic
    console.log('Running AI agents...');
  };

  return (
    <div className="h-full p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Study Screening</h1>
          <p className="text-muted-foreground">
            Review your studies and criteria before starting the AI analysis
          </p>
        </div>
        <Button onClick={handleRunAgents} className="gap-2">
          <Play className="h-4 w-4" />
          Run AI Analysis
        </Button>
      </div>

      {/* Studies Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-primary" />
            Studies Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px]">
            <div className="space-y-4">
              {studies.map((study, index) => (
                <Card key={index} className="p-4">
                  <h3 className="font-semibold">{study.title || 'Untitled Study'}</h3>
                  <p className="text-sm text-muted-foreground">
                    {study.authors?.join(', ') || 'Unknown Authors'} • {study.year || 'No Year'}
                  </p>
                </Card>
              ))}
              {studies.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No studies uploaded yet. Use the panel on the left to upload a RIS file.
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Criteria Review */}
      <Card>
        <CardHeader>
          <CardTitle>Screening Criteria</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Inclusion Criteria</h3>
              <ScrollArea className="h-[200px] border rounded-md p-4">
                {criteria?.inclusion?.map((item, index) => (
                  <div key={index} className="flex items-start gap-2 py-1">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                    <span>{item}</span>
                  </div>
                ))}
                {!criteria?.inclusion?.length && (
                  <div className="text-muted-foreground text-center py-4">
                    No inclusion criteria defined
                  </div>
                )}
              </ScrollArea>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">Exclusion Criteria</h3>
              <ScrollArea className="h-[200px] border rounded-md p-4">
                {criteria?.exclusion?.map((item, index) => (
                  <div key={index} className="flex items-start gap-2 py-1">
                    <AlertCircle className="h-4 w-4 text-red-500 mt-1" />
                    <span>{item}</span>
                  </div>
                ))}
                {!criteria?.exclusion?.length && (
                  <div className="text-muted-foreground text-center py-4">
                    No exclusion criteria defined
                  </div>
                )}
              </ScrollArea>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}