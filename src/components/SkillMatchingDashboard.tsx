
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

interface WorkerAssignment {
  id: string;
  workerName: string;
  jobRole: string;
  matchScore: number;
  skills: string[];
  requiredSkills: string[];
  status: 'optimal' | 'suboptimal' | 'mismatch';
  department: string;
  experience: number;
}

const mockAssignments: WorkerAssignment[] = [
  {
    id: '1',
    workerName: 'Rajesh Kumar',
    jobRole: 'Pasteurization Operator',
    matchScore: 95,
    skills: ['Pasteurization', 'Quality Control', 'Safety Protocols', 'Equipment Maintenance'],
    requiredSkills: ['Pasteurization', 'Quality Control', 'Safety Protocols'],
    status: 'optimal',
    department: 'Production',
    experience: 8
  },
  {
    id: '2',
    workerName: 'Priya Patel',
    jobRole: 'Packaging Supervisor',
    matchScore: 85,
    skills: ['Team Leadership', 'Packaging Operations', 'Inventory Management'],
    requiredSkills: ['Team Leadership', 'Packaging Operations', 'Quality Assurance'],
    status: 'suboptimal',
    department: 'Packaging',
    experience: 5
  },
  {
    id: '3',
    workerName: 'Amit Shah',
    jobRole: 'Quality Control Analyst',
    matchScore: 65,
    skills: ['Basic Testing', 'Documentation'],
    requiredSkills: ['Advanced Testing', 'Lab Equipment', 'Data Analysis', 'Compliance'],
    status: 'mismatch',
    department: 'Quality Assurance',
    experience: 2
  }
];

export const SkillMatchingDashboard = () => {
  const [selectedAssignment, setSelectedAssignment] = useState<WorkerAssignment | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'bg-green-100 text-green-800 border-green-200';
      case 'suboptimal': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'mismatch': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'optimal': return <CheckCircle2 className="h-4 w-4" />;
      case 'suboptimal': return <AlertCircle className="h-4 w-4" />;
      case 'mismatch': return <AlertCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Current Worker Assignments</span>
          </CardTitle>
          <Button variant="outline" size="sm">
            Optimize All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockAssignments.map((assignment) => (
          <div
            key={assignment.id}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
              selectedAssignment?.id === assignment.id ? 'ring-2 ring-blue-500' : ''
            } ${getStatusColor(assignment.status)}`}
            onClick={() => setSelectedAssignment(assignment)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(assignment.status)}
                  <h3 className="font-semibold">{assignment.workerName}</h3>
                </div>
                <ArrowRight className="h-4 w-4" />
                <span className="font-medium">{assignment.jobRole}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">{assignment.department}</Badge>
                <span className="text-sm font-bold">{assignment.matchScore}%</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600 mb-1">Worker Skills:</p>
                <div className="flex flex-wrap gap-1">
                  {assignment.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Required Skills:</p>
                <div className="flex flex-wrap gap-1">
                  {assignment.requiredSkills.map((skill, index) => (
                    <Badge 
                      key={index} 
                      variant={assignment.skills.includes(skill) ? "default" : "destructive"}
                      className="text-xs"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-3 flex items-center justify-between text-xs text-gray-600">
              <span>Experience: {assignment.experience} years</span>
              <span className="capitalize">{assignment.status} match</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
