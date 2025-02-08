'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useWorkflow } from '@/context/workflow-context';
import { ArrowRight, Plus } from 'lucide-react';

export function CriteriaStage() {
  const { setStage } = useWorkflow();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Screening Criteria</h1>
          <p className="text-muted-foreground">Define your inclusion and exclusion criteria</p>
        </div>
        <Button onClick={() => setStage('processing')} size="lg">
          Start Screening
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="structured">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="structured">Structured Filters</TabsTrigger>
          <TabsTrigger value="natural">Natural Language</TabsTrigger>
        </TabsList>

        <TabsContent value="structured" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Publication Criteria</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Publication Year Range</Label>
                <Slider defaultValue={[2000, 2024]} min={1900} max={2024} step={1} />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>1900</span>
                  <span>2024</span>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Study Types</Label>
                <div className="grid grid-cols-2 gap-4">
                  {['Randomized Control Trial', 'Systematic Review', 'Cohort Study', 'Case Control'].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Switch id={type} />
                      <Label htmlFor={type}>{type}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Keywords</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input placeholder="Add keyword..." />
                  <Button variant="outline" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="natural" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Natural Language Criteria</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Inclusion Criteria</Label>
                <Input placeholder="e.g., Studies must include human participants aged 18 or older..." />
              </div>
              <div className="space-y-2">
                <Label>Exclusion Criteria</Label>
                <Input placeholder="e.g., Exclude studies focused on pediatric populations..." />
              </div>
              <div className="space-y-2">
                <Label>Confidence Threshold</Label>
                <Slider defaultValue={[0.7]} max={1} min={0} step={0.1} />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Low Confidence</span>
                  <span>High Confidence</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}