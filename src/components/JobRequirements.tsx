
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Briefcase, Clock, AlertCircle, Users } from 'lucide-react';

const jobOpenings = [
  {
    id: '1',
    title: 'Senior Pasteurization Operator',
    department: 'Production',
    priority: 'High',
    requiredSkills: [
      { name: 'Pasteurization', level: 90, critical: true },
      { name: 'Quality Control', level: 85, critical: true },
      { name: 'Safety Protocols', level: 80, critical: false },
      { name: 'Equipment Maintenance', level: 75, critical: false }
    ],
    experience: '5+ years',
    certifications: ['Food Safety', 'HACCP'],
    shift: 'Morning',
    candidates: 2
  },
  {
    id: '2',
    title: 'Quality Control Specialist',
    department: 'Quality Assurance',
    priority: 'Critical',
    requiredSkills: [
      { name: 'Advanced Testing', level: 95, critical: true },
      { name: 'Lab Equipment', level: 90, critical: true },
      { name: 'Data Analysis', level: 85, critical: true },
      { name: 'Compliance', level: 80, critical: false }
    ],
    experience: '3+ years',
    certifications: ['Lab Certification', 'ISO Standards'],
    shift: 'Day',
    candidates: 1
  },
  {
    id: '3',
    title: 'Packaging Line Supervisor',
    department: 'Packaging',
    priority: 'Medium',
    requiredSkills: [
      { name: 'Team Leadership', level: 85, critical: true },
      { name: 'Packaging Operations', level: 80, critical: true },
      { name: 'Quality Assurance', level: 75, critical: false },
      { name: 'Inventory Management', level: 70, critical: false }
    ],
    experience: '4+ years',
    certifications: ['Leadership Training'],
    shift: 'Evening',
    candidates: 3
  }
];

export const JobRequirements = () => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Briefcase className="h-5 w-5" />
          <span>Job Requirements & Openings</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {jobOpenings.map((job) => (
          <div key={job.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold mb-1">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.department}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={getPriorityColor(job.priority)}>
                  {job.priority}
                </Badge>
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <Users className="h-3 w-3" />
                  <span>{job.candidates}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium mb-2">Required Skills</h4>
                <div className="space-y-1">
                  {job.requiredSkills.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs">{skill.name}</span>
                        {skill.critical && (
                          <AlertCircle className="h-3 w-3 text-red-500" />
                        )}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {skill.level}%+
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Experience:</span>
                  <p className="font-medium">{job.experience}</p>
                </div>
                <div>
                  <span className="text-gray-600">Shift:</span>
                  <p className="font-medium">{job.shift}</p>
                </div>
              </div>

              <div>
                <span className="text-gray-600 text-sm">Required Certifications:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {job.certifications.map((cert, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="h-3 w-3" />
                  <span>Posted 2 days ago</span>
                </div>
                <Button variant="outline" size="sm">
                  Find Matches
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
