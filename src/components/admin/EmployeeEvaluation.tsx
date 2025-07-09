
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  User, 
  FileText, 
  TrendingUp, 
  Award, 
  AlertTriangle, 
  CheckCircle, 
  BookOpen,
  Users,
  Calendar,
  Star
} from 'lucide-react';

const mockEmployees = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    role: 'Pasteurization Operator',
    department: 'Production',
    email: 'rajesh@flavi.com',
    phone: '+91 98765 43210',
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
    weeklyData: [
      { week: 'Week 1', productivity: 88, quality: 85, safety: 92 },
      { week: 'Week 2', productivity: 90, quality: 87, safety: 94 },
      { week: 'Week 3', productivity: 92, quality: 88, safety: 95 },
      { week: 'Week 4', productivity: 94, quality: 90, safety: 96 }
    ],
    resume: {
      education: 'Diploma in Dairy Technology',
      certifications: ['Food Safety Certification', 'HACCP', 'Equipment Operation'],
      previousRoles: ['Junior Operator - 3 years', 'Senior Operator - 5 years']
    },
    jobFit: 'Perfect Match',
    fitScore: 92,
    recommendations: []
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Packaging Supervisor',
    department: 'Packaging',
    email: 'priya@flavi.com',
    phone: '+91 98765 43211',
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
    weeklyData: [
      { week: 'Week 1', productivity: 82, quality: 75, safety: 85 },
      { week: 'Week 2', productivity: 84, quality: 77, safety: 87 },
      { week: 'Week 3', productivity: 85, quality: 78, safety: 88 },
      { week: 'Week 4', productivity: 87, quality: 80, safety: 90 }
    ],
    resume: {
      education: 'Bachelor in Management',
      certifications: ['Leadership Training', 'Packaging Standards'],
      previousRoles: ['Team Lead - 3 years', 'Supervisor - 2 years']
    },
    jobFit: 'Needs Training',
    fitScore: 78,
    recommendations: ['Quality Assurance Training', 'Inventory Management Course']
  },
  {
    id: 3,
    name: 'Amit Patel',
    role: 'Quality Control Analyst',
    department: 'Quality',
    email: 'amit@flavi.com',
    phone: '+91 98765 43212',
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
    weeklyData: [
      { week: 'Week 1', productivity: 60, quality: 65, safety: 80 },
      { week: 'Week 2', productivity: 62, quality: 68, safety: 82 },
      { week: 'Week 3', productivity: 65, quality: 70, safety: 85 },
      { week: 'Week 4', productivity: 68, quality: 72, safety: 88 }
    ],
    resume: {
      education: 'Bachelor in Chemistry',
      certifications: ['Basic QA Training'],
      previousRoles: ['Junior Analyst - 2 years']
    },
    jobFit: 'Poor Match',
    fitScore: 65,
    recommendations: ['Advanced Lab Testing Course', 'Data Analysis Training', 'Compliance Workshop']
  }
];

export const EmployeeEvaluation = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(mockEmployees[0]);
  const [showComparison, setShowComparison] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const getFitColor = (fit) => {
    switch (fit) {
      case 'Perfect Match': return 'bg-green-100 text-green-800 border-green-200';
      case 'Needs Training': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Poor Match': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSkillColor = (level, required) => {
    const percentage = (level / required) * 100;
    if (percentage >= 100) return 'text-green-600';
    if (percentage >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPerformanceColor = (score) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Employee Evaluation</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setShowComparison(!showComparison)}
            className="flex items-center gap-2"
          >
            <Users className="h-4 w-4" />
            Compare Employees
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Employee List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Employees
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {mockEmployees.map((employee) => (
              <div
                key={employee.id}
                className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                  selectedEmployee.id === employee.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                }`}
                onClick={() => setSelectedEmployee(employee)}
              >
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs bg-blue-100 text-blue-600">
                      {employee.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{employee.name}</p>
                    <p className="text-xs text-gray-600 truncate">{employee.role}</p>
                    <Badge className={`${getFitColor(employee.jobFit)} text-xs mt-1`}>
                      {employee.jobFit}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Employee Details */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="resume">Resume</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback className="text-xl bg-blue-100 text-blue-600">
                          {selectedEmployee.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-2xl font-bold">{selectedEmployee.name}</h3>
                        <p className="text-gray-600">{selectedEmployee.role}</p>
                        <p className="text-sm text-gray-500">{selectedEmployee.department}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={`${getFitColor(selectedEmployee.jobFit)} mb-2`}>
                        {selectedEmployee.jobFit}
                      </Badge>
                      <p className="text-2xl font-bold text-blue-600">{selectedEmployee.fitScore}%</p>
                      <p className="text-sm text-gray-500">Job Fit Score</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Contact Information</h4>
                      <div className="space-y-2">
                        <p><strong>Email:</strong> {selectedEmployee.email}</p>
                        <p><strong>Phone:</strong> {selectedEmployee.phone}</p>
                        <p><strong>Experience:</strong> {selectedEmployee.experience}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Performance Summary</h4>
                      <div className="space-y-2">
                        {Object.entries(selectedEmployee.performance).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between">
                            <span className="capitalize">{key}:</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-20 h-2 bg-gray-200 rounded-full">
                                <div 
                                  className={`h-full rounded-full ${getPerformanceColor(value)}`}
                                  style={{ width: `${value}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium">{value}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {selectedEmployee.recommendations.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Training Recommendations
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedEmployee.recommendations.map((rec, index) => (
                          <Badge key={index} variant="outline" className="bg-orange-50 text-orange-700">
                            {rec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="skills">
              <Card>
                <CardHeader>
                  <CardTitle>Skills Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedEmployee.skills.map((skill, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{skill.name}</span>
                          <div className="flex items-center space-x-2">
                            <span className={`text-sm font-medium ${getSkillColor(skill.level, skill.required)}`}>
                              {skill.level}%
                            </span>
                            <span className="text-xs text-gray-500">
                              (Required: {skill.required}%)
                            </span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Current Level</span>
                            <span>Required Level</span>
                          </div>
                          <div className="relative">
                            <Progress value={skill.required} className="h-2 bg-gray-200" />
                            <Progress 
                              value={skill.level} 
                              className={`h-2 absolute top-0 ${
                                skill.level >= skill.required ? 'bg-green-200' : 'bg-red-200'
                              }`}
                            />
                          </div>
                        </div>
                        {skill.level < skill.required && (
                          <div className="flex items-center gap-2 text-sm text-orange-600">
                            <AlertTriangle className="h-3 w-3" />
                            <span>Gap: {skill.required - skill.level}% - Training recommended</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Performance Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-4">Weekly Performance Trend</h4>
                      <div className="space-y-3">
                        {selectedEmployee.weeklyData.map((week, index) => (
                          <div key={index} className="grid grid-cols-4 gap-4 p-3 bg-gray-50 rounded-lg">
                            <div className="font-medium">{week.week}</div>
                            <div className="text-center">
                              <div className="text-sm text-gray-600">Productivity</div>
                              <div className="font-semibold">{week.productivity}%</div>
                            </div>
                            <div className="text-center">
                              <div className="text-sm text-gray-600">Quality</div>
                              <div className="font-semibold">{week.quality}%</div>
                            </div>
                            <div className="text-center">
                              <div className="text-sm text-gray-600">Safety</div>
                              <div className="font-semibold">{week.safety}%</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resume">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Resume & Background
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2">Education</h4>
                      <p className="text-gray-700">{selectedEmployee.resume.education}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Certifications</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedEmployee.resume.certifications.map((cert, index) => (
                          <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
                            <Award className="h-3 w-3 mr-1" />
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Previous Roles</h4>
                      <ul className="space-y-1">
                        {selectedEmployee.resume.previousRoles.map((role, index) => (
                          <li key={index} className="text-gray-700 flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            {role}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
