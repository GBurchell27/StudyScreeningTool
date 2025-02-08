'use client';

import { useState } from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { LeftPanel } from '@/components/panels/left-panel';
import { CenterPanel } from '@/components/panels/center-panel';
import { RightPanel } from '@/components/panels/right-panel';
import { WorkflowProvider } from '@/context/workflow-context';

export function MainLayout() {
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(false);

  return (
    <WorkflowProvider>
      <div className="h-screen w-full bg-background">
        <ResizablePanelGroup direction="horizontal" className="min-h-screen rounded-lg">
          <ResizablePanel 
            defaultSize={20} 
            minSize={15} 
            maxSize={30} 
            collapsible={true} 
            onCollapse={() => setLeftCollapsed(true)}
            onExpand={() => setLeftCollapsed(false)}
            className="bg-card"
          >
            <LeftPanel collapsed={leftCollapsed} />
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize={60}>
            <CenterPanel />
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel 
            defaultSize={20} 
            minSize={15} 
            maxSize={30} 
            collapsible={true}
            onCollapse={() => setRightCollapsed(true)}
            onExpand={() => setRightCollapsed(false)}
            className="bg-card"
          >
            <RightPanel collapsed={rightCollapsed} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </WorkflowProvider>
  );
}