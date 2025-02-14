'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useWorkflow } from '@/context/workflow-context';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from 'lucide-react';

const commonCriteria = {
  inclusion: [
    {
      id: 'human-subjects',
      label: 'Human Subjects Only',
      template: 'Study must include human participants',
    },
    {
      id: 'adults-only',
      label: 'Adults Only (18+)',
      template: 'Participants must be adults aged 18 years or older',
    },
    {
      id: 'randomized-control-studies',
      label: 'Randomized Control Studies',
      template: 'Study must be a randomized control study',
    },
    {
      id: 'systematic-reviews-only',
      label: 'Systematic Reviews Only',
      template: 'Study must be a systematic review',
    },
    {
      id: 'systematic-reviews-and-meta-analyses',
      label: 'Systematic Reviews and Meta-Analyses',
      template: 'Study must be a systematic review or meta-analysis',
    },
    {
      id: 'quantitative-studies-only',
      label: 'Quantitative Studies Only',
      template: 'Study must be a quantitative study',
    },
    {
      id: 'qualitative-studies-only',
      label: 'Qualitative Studies Only',
      template: 'Study must be a qualitative study',
    },
    
  ],
  exclusion: [
    {
      id: 'animal-studies',
      label: 'Animal Studies',
      template: 'Exclude studies conducted on animals',
    },
    {
      id: 'reviews',
      label: 'Review Articles',
      template: 'Exclude literature reviews, systematic reviews, and meta-analyses',
    },
    {
      id: 'case-studies-and-case-reports',
      label: 'Case Studies and Case Reports',
      template: 'Exclude case studies and case reports',
    },
  ],
};

export function CriteriaModal() {
  const [open, setOpen] = useState(false);
  const [inclusionCriteria, setInclusionCriteria] = useState<string>('');
  const [exclusionCriteria, setExclusionCriteria] = useState<string>('');
  const [selectedInclusion, setSelectedInclusion] = useState<string[]>([]);
  const [selectedExclusion, setSelectedExclusion] = useState<string[]>([]);
  const { setCriteria } = useWorkflow();

  const handleInclusionSelect = (id: string, checked: boolean) => {
    if (checked) {
      const template = commonCriteria.inclusion.find(c => c.id === id)?.template;
      setInclusionCriteria(prev => 
        prev ? `${prev}\n- ${template}` : `- ${template}`
      );
      setSelectedInclusion(prev => [...prev, id]);
    } else {
      setSelectedInclusion(prev => prev.filter(item => item !== id));
    }
  };

  const handleExclusionSelect = (id: string, checked: boolean) => {
    if (checked) {
      const template = commonCriteria.exclusion.find(c => c.id === id)?.template;
      setExclusionCriteria(prev => 
        prev ? `${prev}\n- ${template}` : `- ${template}`
      );
      setSelectedExclusion(prev => [...prev, id]);
    } else {
      setSelectedExclusion(prev => prev.filter(item => item !== id));
    }
  };

  const handleSubmit = () => {
    // Convert string to array by splitting on newlines and filtering empty lines
    const inclusionArray = inclusionCriteria
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
      
    const exclusionArray = exclusionCriteria
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    setCriteria({
      inclusion: inclusionArray,
      exclusion: exclusionArray
    });
    
    setOpen(false); // Close the modal after saving
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Add Criteria
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>Define Screening Criteria</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4 flex-1 overflow-hidden">
          {/* Inclusion Criteria */}
          <div className="space-y-4">
            <Label>Common Inclusion Criteria</Label>
            <ScrollArea className="h-[200px] border rounded-md p-4">
              <div className="space-y-2">
                {commonCriteria.inclusion.map((criteria) => (
                  <div key={criteria.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={criteria.id}
                      checked={selectedInclusion.includes(criteria.id)}
                      onCheckedChange={(checked) => 
                        handleInclusionSelect(criteria.id, checked as boolean)
                      }
                    />
                    <label htmlFor={criteria.id} className="text-sm font-medium">
                      {criteria.label}
                    </label>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="flex items-center gap-2">
              <Label>Custom Inclusion Criteria</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Input specific inclusion criteria based on your research question.</p>
                    <p>You can also add your own criteria by typing in the text area below.</p>
                    <p>Enter each criterion on a new line, starting with '- '</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Textarea
              placeholder="Enter each criterion on a new line, starting with '- '"
              value={inclusionCriteria}
              onChange={(e) => setInclusionCriteria(e.target.value)}
              className="h-[200px]"
            />
          </div>

          {/* Exclusion Criteria */}
          <div className="space-y-4">
            <Label>Common Exclusion Criteria</Label>
            <ScrollArea className="h-[200px] border rounded-md p-4">
              <div className="space-y-2">
                {commonCriteria.exclusion.map((criteria) => (
                  <div key={criteria.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={criteria.id}
                      checked={selectedExclusion.includes(criteria.id)}
                      onCheckedChange={(checked) => 
                        handleExclusionSelect(criteria.id, checked as boolean)
                      }
                    />
                    <label htmlFor={criteria.id} className="text-sm font-medium">
                      {criteria.label}
                    </label>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="flex items-center gap-2">
              <Label>Custom Exclusion Criteria</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Input specific exclusion criteria based on your research question.</p>
                    <p>You can also add your own criteria by typing in the text area below.</p>
                    <p>Enter each criterion on a new line, starting with '- '</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Textarea
              placeholder="Enter each criterion on a new line, starting with '- '"
              value={exclusionCriteria}
              onChange={(e) => setExclusionCriteria(e.target.value)}
              className="h-[200px]"
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <DialogClose asChild>
            <Button onClick={handleSubmit}>
              Save Criteria
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
} 