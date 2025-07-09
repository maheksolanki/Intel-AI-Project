
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WorkerManagement } from '@/components/admin/WorkerManagement';
import { JobManagement } from '@/components/admin/JobManagement';
import { SkillManagement } from '@/components/admin/SkillManagement';
import { AssignmentManagement } from '@/components/admin/AssignmentManagement';
import { EmployeeEvaluation } from '@/components/admin/EmployeeEvaluation';
import { TrainingManagement } from '@/components/admin/TrainingManagement';
import { EmployeeComparison } from '@/components/admin/EmployeeComparison';
import { AIManagementPanel } from '@/components/admin/AIManagementPanel';
import { 
  Users, 
  Briefcase, 
  Award, 
  GitBranch, 
  UserCheck, 
  BookOpen, 
  BarChart3,
  Brain
} from 'lucide-react';

export const AdminPanel = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Management</h1>
      </div>

      <Tabs defaultValue="evaluation" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 gap-1">
          <TabsTrigger value="evaluation" className="flex items-center gap-2 text-xs sm:text-sm">
            <UserCheck className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Evaluation</span>
          </TabsTrigger>
          <TabsTrigger value="comparison" className="flex items-center gap-2 text-xs sm:text-sm">
            <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Compare</span>
          </TabsTrigger>
          <TabsTrigger value="training" className="flex items-center gap-2 text-xs sm:text-sm">
            <BookOpen className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Training</span>
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center gap-2 text-xs sm:text-sm">
            <Brain className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">AI System</span>
          </TabsTrigger>
          <TabsTrigger value="workers" className="flex items-center gap-2 text-xs sm:text-sm">
            <Users className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Workers</span>
          </TabsTrigger>
          <TabsTrigger value="jobs" className="flex items-center gap-2 text-xs sm:text-sm">
            <Briefcase className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Jobs</span>
          </TabsTrigger>
          <TabsTrigger value="skills" className="flex items-center gap-2 text-xs sm:text-sm">
            <Award className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Skills</span>
          </TabsTrigger>
          <TabsTrigger value="assignments" className="flex items-center gap-2 text-xs sm:text-sm">
            <GitBranch className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Assignments</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="evaluation">
          <EmployeeEvaluation />
        </TabsContent>

        <TabsContent value="comparison">
          <EmployeeComparison />
        </TabsContent>

        <TabsContent value="training">
          <TrainingManagement />
        </TabsContent>

        <TabsContent value="ai">
          <AIManagementPanel />
        </TabsContent>

        <TabsContent value="workers">
          <WorkerManagement />
        </TabsContent>

        <TabsContent value="jobs">
          <JobManagement />
        </TabsContent>

        <TabsContent value="skills">
          <SkillManagement />
        </TabsContent>

        <TabsContent value="assignments">
          <AssignmentManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};
