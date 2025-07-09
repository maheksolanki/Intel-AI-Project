
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star, Award, BookOpen } from 'lucide-react';

const workers = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    department: 'Production',
    experience: 8,
    rating: 4.8,
    skills: [
      { name: 'Pasteurization', level: 95 },
      { name: 'Quality Control', level: 90 },
      { name: 'Safety Protocols', level: 88 },
      { name: 'Equipment Maintenance', level: 85 }
    ],
    certifications: ['Food Safety', 'HACCP', 'Equipment Operation'],
    availability: 'Available'
  },
  {
    id: '2',
    name: 'Priya Patel',
    department: 'Packaging',
    experience: 5,
    rating: 4.5,
    skills: [
      { name: 'Team Leadership', level: 92 },
      { name: 'Packaging Operations', level: 88 },
      { name: 'Inventory Management', level: 75 },
      { name: 'Quality Assurance', level: 60 }
    ],
    certifications: ['Leadership Training', 'Packaging Standards'],
    availability: 'On Shift'
  },
  {
    id: '3',
    name: 'Amit Shah',
    department: 'Quality Assurance',
    experience: 2,
    rating: 3.8,
    skills: [
      { name: 'Basic Testing', level: 70 },
      { name: 'Documentation', level: 65 },
      { name: 'Lab Equipment', level: 45 },
      { name: 'Data Analysis', level: 40 }
    ],
    certifications: ['Basic QA Training'],
    availability: 'Training'
  }
];

export const WorkerProfiles = () => {
  const getSkillColor = (level: number) => {
    if (level >= 85) return 'bg-green-500';
    if (level >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'On Shift': return 'bg-blue-100 text-blue-800';
      case 'Training': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BookOpen className="h-5 w-5" />
          <span>Worker Skill Profiles</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {workers.map((worker) => (
          <div key={worker.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {worker.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{worker.name}</h3>
                  <p className="text-sm text-gray-600">{worker.department}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs">{worker.rating}</span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-500">{worker.experience} years</span>
                  </div>
                </div>
              </div>
              <Badge className={getAvailabilityColor(worker.availability)}>
                {worker.availability}
              </Badge>
            </div>

            <div className="space-y-2 mb-3">
              <h4 className="text-sm font-medium">Skills & Competency</h4>
              {worker.skills.map((skill, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-xs">{skill.name}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getSkillColor(skill.level)} transition-all`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <span className="text-xs w-8 text-right">{skill.level}%</span>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center space-x-1">
                <Award className="h-3 w-3" />
                <span>Certifications</span>
              </h4>
              <div className="flex flex-wrap gap-1">
                {worker.certifications.map((cert, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
