
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Plus, 
  BookOpen, 
  Users, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Play,
  Pause,
  Award
} from 'lucide-react';

const mockTrainingPrograms = [
  {
    id: 1,
    title: 'Advanced Quality Control Techniques',
    description: 'Comprehensive training on latest QC methods and equipment',
    duration: '40 hours',
    level: 'Advanced',
    skills: ['Quality Control', 'Lab Testing', 'Data Analysis'],
    enrolled: 8,
    capacity: 12,
    startDate: '2024-02-15',
    endDate: '2024-03-15',
    status: 'Active',
    instructor: 'Dr. Kavita Mehta'
  },
  {
    id: 2,
    title: 'Safety Protocols & HACCP',
    description: 'Essential safety training and HACCP implementation',
    duration: '24 hours',
    level: 'Intermediate',
    skills: ['Safety Protocols', 'HACCP', 'Compliance'],
    enrolled: 15,
    capacity: 20,
    startDate: '2024-02-01',
    endDate: '2024-02-28',
    status: 'Active',
    instructor: 'Ravi Sharma'
  },
  {
    id: 3,
    title: 'Equipment Maintenance Basics',
    description: 'Basic maintenance procedures for dairy processing equipment',
    duration: '16 hours',
    level: 'Basic',
    skills: ['Equipment Maintenance', 'Troubleshooting'],
    enrolled: 5,
    capacity: 10,
    startDate: '2024-03-01',
    endDate: '2024-03-08',
    status: 'Upcoming',
    instructor: 'Suresh Patel'
  }
];

const mockEnrollments = [
  { id: 1, employeeId: 3, employeeName: 'Amit Patel', programId: 1, programTitle: 'Advanced Quality Control Techniques', progress: 65, status: 'In Progress' },
  { id: 2, employeeId: 2, employeeName: 'Priya Sharma', programId: 2, programTitle: 'Safety Protocols & HACCP', progress: 90, status: 'Nearly Complete' },
  { id: 3, employeeId: 1, employeeName: 'Rajesh Kumar', programId: 3, programTitle: 'Equipment Maintenance Basics', progress: 0, status: 'Enrolled' },
];

const mockEmployees = [
  { id: 1, name: 'Rajesh Kumar', role: 'Pasteurization Operator' },
  { id: 2, name: 'Priya Sharma', role: 'Packaging Supervisor' },
  { id: 3, name: 'Amit Patel', role: 'Quality Control Analyst' },
];

export const TrainingManagement = () => {
  const [programs, setPrograms] = useState(mockTrainingPrograms);
  const [enrollments, setEnrollments] = useState(mockEnrollments);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEnrollDialogOpen, setIsEnrollDialogOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    level: 'Basic',
    skills: '',
    capacity: '',
    startDate: '',
    endDate: '',
    instructor: ''
  });
  const [enrollmentData, setEnrollmentData] = useState({
    employeeId: '',
    programId: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProgram) {
      setPrograms(programs.map(p => p.id === editingProgram.id ? {
        ...editingProgram,
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim()),
        capacity: parseInt(formData.capacity),
        enrolled: editingProgram.enrolled,
        status: editingProgram.status
      } : p));
    } else {
      const newProgram = {
        id: Date.now(),
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim()),
        capacity: parseInt(formData.capacity),
        enrolled: 0,
        status: 'Upcoming'
      };
      setPrograms([...programs, newProgram]);
    }
    setIsDialogOpen(false);
    setEditingProgram(null);
    setFormData({
      title: '', description: '', duration: '', level: 'Basic', 
      skills: '', capacity: '', startDate: '', endDate: '', instructor: ''
    });
  };

  const handleEnrollment = (e) => {
    e.preventDefault();
    const employee = mockEmployees.find(emp => emp.id === parseInt(enrollmentData.employeeId));
    const program = programs.find(prog => prog.id === parseInt(enrollmentData.programId));
    
    if (employee && program) {
      const newEnrollment = {
        id: Date.now(),
        employeeId: parseInt(enrollmentData.employeeId),
        employeeName: employee.name,
        programId: parseInt(enrollmentData.programId),
        programTitle: program.title,
        progress: 0,
        status: 'Enrolled'
      };
      setEnrollments([...enrollments, newEnrollment]);
      
      // Update program enrollment count
      setPrograms(programs.map(p => p.id === parseInt(enrollmentData.programId) ? 
        { ...p, enrolled: p.enrolled + 1 } : p
      ));
    }
    
    setIsEnrollDialogOpen(false);
    setEnrollmentData({ employeeId: '', programId: '' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Upcoming': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Basic': return 'bg-blue-100 text-blue-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 90) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Training Management</h2>
        <div className="flex gap-2">
          <Dialog open={isEnrollDialogOpen} onOpenChange={setIsEnrollDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Enroll Employee
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Enroll Employee in Training</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleEnrollment} className="space-y-4">
                <div>
                  <Label htmlFor="employeeId">Employee</Label>
                  <select
                    id="employeeId"
                    value={enrollmentData.employeeId}
                    onChange={(e) => setEnrollmentData({...enrollmentData, employeeId: e.target.value})}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="">Select Employee</option>
                    {mockEmployees.map(emp => (
                      <option key={emp.id} value={emp.id}>{emp.name} - {emp.role}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="programId">Training Program</Label>
                  <select
                    id="programId"
                    value={enrollmentData.programId}
                    onChange={(e) => setEnrollmentData({...enrollmentData, programId: e.target.value})}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="">Select Program</option>
                    {programs.filter(p => p.enrolled < p.capacity).map(prog => (
                      <option key={prog.id} value={prog.id}>
                        {prog.title} ({prog.enrolled}/{prog.capacity} enrolled)
                      </option>
                    ))}
                  </select>
                </div>
                <Button type="submit" className="w-full">
                  Enroll Employee
                </Button>
              </form>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Program
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingProgram ? 'Edit Training Program' : 'Create Training Program'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Program Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="instructor">Instructor</Label>
                    <Input
                      id="instructor"
                      value={formData.instructor}
                      onChange={(e) => setFormData({...formData, instructor: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      placeholder="e.g., 40 hours"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="level">Level</Label>
                    <select
                      id="level"
                      value={formData.level}
                      onChange={(e) => setFormData({...formData, level: e.target.value})}
                      className="w-full p-2 border rounded-md"
                      required
                    >
                      <option value="Basic">Basic</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={formData.capacity}
                      onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="skills">Skills Covered (comma separated)</Label>
                  <Input
                    id="skills"
                    value={formData.skills}
                    onChange={(e) => setFormData({...formData, skills: e.target.value})}
                    placeholder="e.g., Quality Control, Lab Testing"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <Button type="submit" className="w-full">
                  {editingProgram ? 'Update Program' : 'Create Program'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Training Programs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Training Programs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {programs.map((program) => (
                <div key={program.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{program.title}</h3>
                      <p className="text-gray-600 text-sm">{program.description}</p>
                      <p className="text-sm text-gray-500 mt-1">Instructor: {program.instructor}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge className={getStatusColor(program.status)}>
                        {program.status}
                      </Badge>
                      <Badge className={getLevelColor(program.level)}>
                        {program.level}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Clock className="h-3 w-3" />
                        <span>{program.duration}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600 mt-1">
                        <Calendar className="h-3 w-3" />
                        <span>{program.startDate} - {program.endDate}</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Users className="h-3 w-3" />
                        <span>{program.enrolled}/{program.capacity} enrolled</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full"
                          style={{width: `${(program.enrolled / program.capacity) * 100}%`}}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-sm font-medium mb-1">Skills Covered:</p>
                    <div className="flex flex-wrap gap-1">
                      {program.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Employee Enrollments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Employee Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {enrollments.map((enrollment) => (
                <div key={enrollment.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {enrollment.employeeName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{enrollment.employeeName}</h4>
                        <p className="text-sm text-gray-600">{enrollment.programTitle}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={
                      enrollment.status === 'Completed' ? 'bg-green-50 text-green-700' :
                      enrollment.status === 'Nearly Complete' ? 'bg-yellow-50 text-yellow-700' :
                      'bg-blue-50 text-blue-700'
                    }>
                      {enrollment.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">{enrollment.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getProgressColor(enrollment.progress)}`}
                        style={{width: `${enrollment.progress}%`}}
                      />
                    </div>
                  </div>
                  
                  {enrollment.progress === 100 && (
                    <div className="flex items-center gap-2 mt-3 text-green-600">
                      <Award className="h-4 w-4" />
                      <span className="text-sm font-medium">Training Completed - Certificate Issued</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
