'use client';

import { useWorkflow } from '@/context/workflow-context';
import { UploadStage } from '@/components/stages/upload-stage';
import { CriteriaStage } from '@/components/stages/criteria-stage';
import { ProcessingStage } from '@/components/stages/processing-stage';
import { ResultsStage } from '@/components/stages/results-stage';

export function CenterPanel() {
  const { stage } = useWorkflow();

  return (
    <div className="h-full p-6">
      {stage === 'upload' && <UploadStage />}
      {stage === 'criteria' && <CriteriaStage />}
      {stage === 'processing' && <ProcessingStage />}
      {stage === 'results' && <ResultsStage />}
    </div>
  );
}