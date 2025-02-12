'use client';

import { useWorkflow } from '@/context/workflow-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Download, FileJson, FileText, Table, PieChart} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface RightPanelProps {
  collapsed: boolean;
}

export function RightPanel({ collapsed }: RightPanelProps) {
  const { stage, criteria } = useWorkflow();

  // Mock data - replace with actual data from your state management
  const progress = {
    processed: 65,
    total: 100,
    included: 30,
    maybe: 15,
    excluded: 20,
  };

  if (collapsed) {
    return null;
  }

  return (
    <ScrollArea className="h-full p-4">
      {/* Progress Tracking Card */}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Screening Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={progress.processed} />
          <p className="text-sm text-muted-foreground">
            {progress.processed}/{progress.total} studies processed ({Math.round(progress.processed)}%)
          </p>
        </CardContent>
      </Card>

      {/* Results Summary Card */}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Results Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="flex items-center">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6 mr-2"
                        onClick={() => {/* Add download handler for included studies */}}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Download included studies</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2" />
                Included
              </span>
              <span>{progress.included}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6 mr-2"
                        onClick={() => {/* Add download handler for maybe studies */}}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Download maybe studies</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2" />
                Maybe
              </span>
              <span>{progress.maybe}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6 mr-2"
                        onClick={() => {/* Add download handler for excluded studies */}}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Download excluded studies</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2" />
                Excluded
              </span>
              <span>{progress.excluded}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Options Card */}
      <Card>
        <CardHeader>
          <CardTitle>Export & Reporting</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full" variant="outline">
            <Table className="mr-2 h-4 w-4" />
            Export as CSV
          </Button>
          <Button className="w-full" variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Printable Report
          </Button>
        </CardContent>
      </Card>
    </ScrollArea>
  );
}