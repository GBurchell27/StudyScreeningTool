'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';

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
  ],
  exclusion: [
    {
      id: 'animal-studies',
      label: 'Animal Studies',
      template: 'Exclude studies conducted on animals',
    },
    {
      id: 'case-reports',
      label: 'Case Reports',
      template: 'Exclude individual case reports',
    },
    {
      id: 'reviews',
      label: 'Review Articles',
      template: 'Exclude literature reviews, systematic reviews, and meta-analyses',
    },
    {
      id: 'non-empirical',
      label: 'Non-Empirical',
      template: 'Exclude theoretical papers and opinion pieces',
    },
  ],
};

export function CriteriaModal() {
  const [inclusionCriteria, setInclusionCriteria] = useState<string>('');
  const [exclusionCriteria, setExclusionCriteria] = useState<string>('');
  const [selectedInclusion, setSelectedInclusion] = useState<string[]>([]);
  const [selectedExclusion, setSelectedExclusion] = useState<string[]>([]);

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
    // Handle submission logic here
    console.log({
      inclusion: inclusionCriteria,
      exclusion: exclusionCriteria
    });
  };

  return (
    <Dialog>
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
            <div className="space-y-2">
              <Label>Custom Inclusion Criteria</Label>
              <Textarea
                placeholder="Enter each criterion on a new line, starting with '- '"
                value={inclusionCriteria}
                onChange={(e) => setInclusionCriteria(e.target.value)}
                className="h-[200px]"
              />
            </div>
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
            <div className="space-y-2">
              <Label>Custom Exclusion Criteria</Label>
              <Textarea
                placeholder="Enter each criterion on a new line, starting with '- '"
                value={exclusionCriteria}
                onChange={(e) => setExclusionCriteria(e.target.value)}
                className="h-[200px]"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button onClick={handleSubmit}>
            Save Criteria
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 