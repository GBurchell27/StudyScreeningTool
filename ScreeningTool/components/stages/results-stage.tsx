'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, Filter, Search } from 'lucide-react';

export function ResultsStage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Screening Results</h1>
          <p className="text-muted-foreground">Review and export your screening decisions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Studies</CardTitle>
            <div className="flex items-center gap-4">
              <div className="flex w-[300px] items-center space-x-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search studies..." className="h-9" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px] h-9">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Studies</SelectItem>
                  <SelectItem value="include">Include</SelectItem>
                  <SelectItem value="maybe">Maybe</SelectItem>
                  <SelectItem value="exclude">Exclude</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Authors</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Decision</TableHead>
                  <TableHead>Confidence</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 10 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">Example Study Title {i + 1}</TableCell>
                    <TableCell>Author et al.</TableCell>
                    <TableCell>2023</TableCell>
                    <TableCell>
                      <Select defaultValue="include">
                        <SelectTrigger className="w-[100px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="include">Include</SelectItem>
                          <SelectItem value="maybe">Maybe</SelectItem>
                          <SelectItem value="exclude">Exclude</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 rounded-full bg-green-200">
                          <div className="h-2 rounded-full bg-green-500" style={{ width: '80%' }} />
                        </div>
                        <span className="text-sm">80%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}