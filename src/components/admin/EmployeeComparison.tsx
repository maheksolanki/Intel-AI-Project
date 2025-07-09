
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  TrendingUp, 
  Award, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  Star
} from 'lucide-react';

const mockEmployees = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    role: 'Pasteurization Operator',
    department: 'Production',
    experience: '8 years',
    skills: [
      { name: 'Pasteurization', level: 95, required: 90 },
      { name: 'Quality Control', level: 90, required: 85 },
      { name: 'Safety Protocols', level: 88, required: 95 },
      { name: 'Equipment Maintenance', level: 85, required: 80 }
    ],
    performance: {
      productivity: 92,
      quality: 88,
      safety: 95,
      attendance: 96,
      teamwork: 85
    },
    fitScore: 92,
    jobFit: 'Perfect Match'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Packaging Supervisor',
    department: 'Packaging',
    experience: '5 years',
    skills: [
      { name: 'Team Leadership', level: 92, required: 85 },
      { name: 'Packaging Operations', level: 88, required: 90 },
      { name: 'Inventory Management', level: 75, required: 80 },
      { name: 'Quality Assurance', level: 60, required: 85 }
    ],
    performance: {
      productivity: 85,
      quality: 78,
      safety: 88,
      attendance: 92,
      teamwork: 95
    },
    fitScore: 78,
    jobFit: 'Needs Training'
  },
  {
    id: 3,
    name: 'Amit Patel',
    role: 'Quality Control Analyst',
    department: 'Quality',
    experience: '2 years',
    skills: [
      { name: 'Lab Testing', level: 70, required: 90 },
      { name: 'Data Analysis', level: 65, required: 85 },
      { name: 'Documentation', level: 80, required: 75 },
      { name: 'Compliance', level: 45, required: 90 }
    ],
    performance: {
      productivity: 65,
      quality: 70,
      safety: 85,
      attendance: 88,
      teamwork: 75
    },
    fitScore: 65,
    jobFit: 'Poor Match'
  }
];

export const EmployeeComparison = () => {
  const [selectedEmployees, setSelectedEmployees] = useState([mockEmployees[0], mockEmployees[1]]);
  const [availableEmployees, setAvailableEmployees] = useState(mockEmployees);

  const handleEmployeeSelect = (employee, index) => {
    const newSelected = [...selectedEmployees];
    newSelected[index] = employee;
    setSelectedEmployees(newSelected);
  };

  const getFitColor = (fit) => {
    switch (fit) {
      case 'Perfect Match': return 'bg-green-100 text-green-800 border-green-200';
      case 'Needs Training': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Poor Match': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSkillStatus = (level, required) => {
    if (level >= required) return { icon: CheckCircle, color: 'text-green-600', status: 'Met' };
    if (level >= required * 0.8) return { icon: AlertTriangle, color: 'text-yellow-600', status: 'Close' };
    return { icon: XCircle, color: 'text-red-600', status: 'Gap' };
  };

  const getPerformanceColor = (score) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getBestCandidate = () => {
    return selectedEmployees.reduce((best, current) => 
      current.fitScore > best.fitScore ? current : best
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Employee Comparison</h2>
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-500" />
          <span className="text-sm text-gray-600">
            Best Match: <strong>{getBestCandidate().name}</strong> ({getBestCandidate().fitScore}%)
          </span>
        </div>
      </div>

      {/* Employee Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[0, 1].map((index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-lg">Employee {index + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              <select
                value={selectedEmployees[index]?.id || ''}
                onChange={(e) => {
                  const employee = availableEmployees.find(emp => emp.id === parseInt(e.target.value));
                  if (employee) handleEmployeeSelect(employee, index);
                }}
                className="w-full p-2 border rounded-md mb-4"
              >
                <option value="">Select Employee</option>
                {availableEmployees.map(emp => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} - {emp.role}
                  </option>
                ))}
              </select>
              
              {selectedEmployees[index] && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {selectedEmployees[index].name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{selectedEmployees[index].name}</h3>
                      <p className="text-sm text-gray-600">{selectedEmployees[index].role}</p>
                      <p className="text-xs text-gray-500">{selectedEmployees[index].experience}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Job Fit Score</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-blue-600">
                        {selectedEmployees[index].fitScore}%
                      </span>
                      <Badge className={getFitColor(selectedEmployees[index].jobFit)}>
                        {selectedEmployees[index].jobFit}
                      </Badge>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedEmployees[0] && selectedEmployees[1] && (
        <>
          {/* Skills Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Skills Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Get all unique skills */}
                {Array.from(new Set([
                  ...selectedEmployees[0].skills.map(s => s.name),
                  ...selectedEmployees[1].skills.map(s => s.name)
                ])).map((skillName) => {
                  const emp1Skill = selectedEmployees[0].skills.find(s => s.name === skillName);
                  const emp2Skill = selectedEmployees[1].skills.find(s => s.name === skillName);
                  
                  return (
                    <div key={skillName} className="space-y-3">
                      <h4 className="font-medium">{skillName}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[emp1Skill, emp2Skill].map((skill, empIndex) => {
                          if (!skill) return (
                            <div key={empIndex} className="p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500">Not applicable</span>
                                <XCircle className="h-4 w-4 text-gray-400" />
                              </div>
                            </div>
                          );
                          
                          const status = getSkillStatus(skill.level, skill.required);
                          const StatusIcon = status.icon;
                          
                          return (
                            <div key={empIndex} className="p-3 border rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">
                                  {selectedEmployees[empIndex].name}
                                </span>
                                <div className="flex items-center gap-2">
                                  <StatusIcon className={`h-4 w-4 ${status.color}`} />
                                  <span className={`text-sm ${status.color}`}>{status.status}</span>
                                </div>
                              </div>
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span>Current: {skill.level}%</span>
                                  <span>Required: {skill.required}%</span>
                                </div>
                                <Progress value={skill.level} className="h-2" />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Performance Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Performance Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.keys(selectedEmployees[0].performance).map((metric) => (
                  <div key={metric} className="space-y-2">
                    <h4 className="font-medium capitalize">{metric}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedEmployees.map((employee, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <span className="text-sm">{employee.name}</span>
                          <div className="flex items-center gap-3">
                            <div className="w-24 h-2 bg-gray-200 rounded-full">
                              <div 
                                className={`h-full rounded-full ${getPerformanceColor(employee.performance[metric])}`}
                                style={{ width: `${employee.performance[metric]}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium w-8 text-right">
                              {employee.performance[metric]}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommendation Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Recommendation Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedEmployees.map((employee, index) => (
                  <div key={index} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {employee.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{employee.name}</h3>
                        <Badge className={getFitColor(employee.jobFit)}>
                          {employee.jobFit}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">Strengths</h4>
                      <ul className="text-sm space-y-1">
                        {employee.skills
                          .filter(skill => skill.level >= skill.required)
                          .map((skill, skillIndex) => (
                            <li key={skillIndex} className="flex items-center gap-2 text-green-600">
                              <CheckCircle className="h-3 w-3" />
                              {skill.name} ({skill.level}%)
                            </li>
                          ))}
                      </ul>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">Areas for Improvement</h4>
                      <ul className="text-sm space-y-1">
                        {employee.skills
                          .filter(skill => skill.level < skill.required)
                          .map((skill, skillIndex) => (
                            <li key={skillIndex} className="flex items-center gap-2 text-red-600">
                              <XCircle className="h-3 w-3" />
                              {skill.name} (Gap: {skill.required - skill.level}%)
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Overall Recommendation</h4>
                <p className="text-blue-700">
                  Based on the comparison, <strong>{getBestCandidate().name}</strong> is the best fit 
                  for the current role requirements with a {getBestCandidate().fitScore}% match score. 
                  {getBestCandidate().fitScore < 85 && 
                    " However, additional training is recommended to improve performance in key areas."
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};
