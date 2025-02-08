'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useWorkflow } from '@/context/workflow-context';

export function UploadStage() {
  const { studies } = useWorkflow();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Upload Studies</h1>
          <p className="text-muted-foreground">Import your RIS file to begin the screening process</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Study Preview</CardTitle>
        </CardHeader>
        <CardContent>
          {studies.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No studies uploaded yet. Use the panel on the left to upload a RIS file.
            </div>
          ) : (
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {studies.map((study, index) => (
                  <Card key={index} className="p-4">
                    <h3 className="font-semibold">{study.title || 'Untitled Study'}</h3>
                    <p className="text-sm text-muted-foreground">
                      {study.authors?.join(', ') || 'Unknown Authors'} • {study.year || 'No Year'}
                    </p>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
}