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
import { Settings, Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

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
      id: 'systematic-reviews-meta-analysis ',
      label: 'Systematic Reviews and Meta-Analysis',
      template: 'Study must be a systematic review or meta-analysis',
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
    setSelectedExclusion(prev => {
      if (checked) {
        const template = commonCriteria.exclusion.find(c => c.id === id)?.template;
        setExclusionCriteria(prev => 
          prev ? `${prev}\n- ${template}` : `- ${template}`
        );
        return [...prev, id];
      }
      return prev.filter(item => item !== id);
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
        <div className="flex-1 overflow-y-auto">
          <Tabs defaultValue="inclusion" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="inclusion">Inclusion Criteria</TabsTrigger>
              <TabsTrigger value="exclusion">Exclusion Criteria</TabsTrigger>
            </TabsList>
            <TabsContent value="inclusion" className="space-y-4">
              <div className="space-y-4">
                <div>
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
                          <label
                            htmlFor={criteria.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {criteria.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Custom Inclusion Criteria</Label>
                  <Textarea
                    placeholder="Enter each criterion on a new line, starting with '- '"
                    value={inclusionCriteria}
                    onChange={(e) => setInclusionCriteria(e.target.value)}
                    className="min-h-[250px]"
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="exclusion" className="space-y-4">
              <div className="space-y-4">
                <div>
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
                          <label
                            htmlFor={criteria.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {criteria.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Custom Exclusion Criteria</Label>
                  <Textarea
                    placeholder="Enter each criterion on a new line, starting with '- '"
                    value={exclusionCriteria}
                    onChange={(e) => setExclusionCriteria(e.target.value)}
                    className="min-h-[250px]"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
} 