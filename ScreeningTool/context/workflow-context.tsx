'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type WorkflowStage = 'upload' | 'criteria' | 'processing' | 'results';

interface WorkflowContextType {
  stage: WorkflowStage;
  setStage: (stage: WorkflowStage) => void;
  studies: any[];
  setStudies: (studies: any[]) => void;
  criteria: any;
  setCriteria: (criteria: any) => void;
  results: any[];
  setResults: (results: any[]) => void;
}

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);

export function WorkflowProvider({ children }: { children: ReactNode }) {
  const [stage, setStage] = useState<WorkflowStage>('upload');
  const [studies, setStudies] = useState<any[]>([]);
  const [criteria, setCriteria] = useState<any>({});
  const [results, setResults] = useState<any[]>([]);

  return (
    <WorkflowContext.Provider 
      value={{
        stage,
        setStage,
        studies,
        setStudies,
        criteria,
        setCriteria,
        results,
        setResults,
      }}
    >
      {children}
    </WorkflowContext.Provider>
  );
}

export function useWorkflow() {
  const context = useContext(WorkflowContext);
  if (context === undefined) {
    throw new Error('useWorkflow must be used within a WorkflowProvider');
  }
  return context;
}