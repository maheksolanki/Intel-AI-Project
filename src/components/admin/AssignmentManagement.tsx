
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';

const mockAssignments = [
  { id: 1, workerId: 1, workerName: 'Rajesh Kumar', jobId: 1, jobTitle: 'Pasteurization Operator', status: 'Active', matchScore: 95, startDate: '2024-01-15' },
  { id: 2, workerId: 2, workerName: 'Priya Sharma', jobId: 3, jobTitle: 'Packaging Technician', status: 'Active', matchScore: 88, startDate: '2024-01-20' },
  { id: 3, workerId: 3, workerName: 'Amit Patel', jobId: 2, jobTitle: 'Quality Inspector', status: 'Pending', matchScore: 92, startDate: '2024-02-01' },
];

const mockWorkers = [
  { id: 1, name: 'Rajesh Kumar' },
  { id: 2, name: 'Priya Sharma' },
  { id: 3, name: 'Amit Patel' },
];

const mockJobs = [
  { id: 1, title: 'Pasteurization Operator' },
  { id: 2, title: 'Quality Inspector' },
  { id: 3, title: 'Packaging Technician' },
];

export const AssignmentManagement = () => {
  const [assignments, setAssignments] = useState(mockAssignments);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [formData, setFormData] = useState({
    workerId: '',
    jobId: '',
    status: 'Pending',
    startDate: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const worker = mockWorkers.find(w => w.id === parseInt(formData.workerId));
    const job = mockJobs.find(j => j.id === parseInt(formData.jobId));
    
    if (editingAssignment) {
      setAssignments(assignments.map(a => a.id === editingAssignment.id ? {
        ...editingAssignment,
        ...formData,
        workerId: parseInt(formData.workerId),
        jobId: parseInt(formData.jobId),
        workerName: worker?.name || '',
        jobTitle: job?.title || '',
        matchScore: Math.floor(Math.random() * 30) + 70 // Random score between 70-100
      } : a));
    } else {
      const newAssignment = {
        id: Date.now(),
        ...formData,
        workerId: parseInt(formData.workerId),
        jobId: parseInt(formData.jobId),
        workerName: worker?.name || '',
        jobTitle: job?.title || '',
        matchScore: Math.floor(Math.random() * 30) + 70
      };
      setAssignments([...assignments, newAssignment]);
    }
    setIsDialogOpen(false);
    setEditingAssignment(null);
    setFormData({ workerId: '', jobId: '', status: 'Pending', startDate: '' });
  };

  const handleEdit = (assignment) => {
    setEditingAssignment(assignment);
    setFormData({
      workerId: assignment.workerId.toString(),
      jobId: assignment.jobId.toString(),
      status: assignment.status,
      startDate: assignment.startDate
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    setAssignments(assignments.filter(a => a.id !== id));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMatchScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle>Assignment Management</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                New Assignment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{editingAssignment ? 'Edit Assignment' : 'Create New Assignment'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="workerId">Worker</Label>
                  <select
                    id="workerId"
                    value={formData.workerId}
                    onChange={(e) => setFormData({...formData, workerId: e.target.value})}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="">Select Worker</option>
                    {mockWorkers.map(worker => (
                      <option key={worker.id} value={worker.id}>{worker.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="jobId">Job</Label>
                  <select
                    id="jobId"
                    value={formData.jobId}
                    onChange={(e) => setFormData({...formData, jobId: e.target.value})}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="">Select Job</option>
                    {mockJobs.map(job => (
                      <option key={job.id} value={job.id}>{job.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="Pending">Pending</option>
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <input
                    type="date"
                    id="startDate"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  {editingAssignment ? 'Update Assignment' : 'Create Assignment'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Worker</TableHead>
                <TableHead>Job</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Match Score</TableHead>
                <TableHead className="hidden lg:table-cell">Start Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assignments.map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell className="font-medium">{assignment.workerName}</TableCell>
                  <TableCell>{assignment.jobTitle}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(assignment.status)}>
                      {assignment.status}
                    </Badge>
                  </TableCell>
                  <TableCell className={`hidden md:table-cell font-semibold ${getMatchScoreColor(assignment.matchScore)}`}>
                    {assignment.matchScore}%
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{assignment.startDate}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(assignment)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(assignment.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
