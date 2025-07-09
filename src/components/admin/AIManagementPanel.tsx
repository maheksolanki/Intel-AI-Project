
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Brain, 
  Settings, 
  Database, 
  Cpu, 
  Activity, 
  Zap,
  Play,
  Pause,
  RotateCcw,
  Upload
} from 'lucide-react';

export const AIManagementPanel = () => {
  const [aiModels] = useState([
    {
      id: 1,
      name: 'Production Optimizer',
      type: 'Neural Network',
      status: 'Active',
      accuracy: 94.7,
      lastTrained: '2024-01-15',
      dataPoints: 125000,
      description: 'Optimizes production schedules and resource allocation'
    },
    {
      id: 2,
      name: 'Quality Predictor',
      type: 'Random Forest',
      status: 'Active',
      accuracy: 91.3,
      lastTrained: '2024-01-12',
      dataPoints: 89000,
      description: 'Predicts product quality based on manufacturing parameters'
    },
    {
      id: 3,
      name: 'Maintenance Forecaster',
      type: 'LSTM',
      status: 'Training',
      accuracy: 87.5,
      lastTrained: '2024-01-10',
      dataPoints: 67000,
      description: 'Predicts equipment maintenance needs and failures'
    }
  ]);

  const [systemMetrics] = useState({
    cpuUsage: 67,
    memoryUsage: 82,
    gpuUsage: 45,
    modelsRunning: 12,
    dataProcessingRate: 2.3,
    predictionAccuracy: 93.2
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Training': return 'bg-blue-100 text-blue-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Brain className="h-6 w-6 text-blue-600" />
          AI System Management
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload Training Data
          </Button>
          <Button className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Configure Models
          </Button>
        </div>
      </div>

      <Tabs defaultValue="models" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="models">AI Models</TabsTrigger>
          <TabsTrigger value="performance">System Performance</TabsTrigger>
          <TabsTrigger value="data">Data Management</TabsTrigger>
        </TabsList>

        <TabsContent value="models" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {aiModels.map((model) => (
              <Card key={model.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{model.name}</h3>
                        <Badge className={getStatusColor(model.status)}>
                          {model.status}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{model.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Type: {model.type}</span>
                        <span>Last Trained: {model.lastTrained}</span>
                        <span>Data Points: {model.dataPoints.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Accuracy</p>
                        <p className="text-xl font-bold text-green-600">{model.accuracy}%</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Model Performance</span>
                      <span className="text-sm text-gray-600">{model.accuracy}%</span>
                    </div>
                    <Progress value={model.accuracy} className="h-2" />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Activity className="h-4 w-4" />
                      <span>Processing {(Math.random() * 1000).toFixed(0)} predictions/hour</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex items-center gap-1">
                        <RotateCcw className="h-3 w-3" />
                        Retrain
                      </Button>
                      <Button size="sm" variant="outline" className="flex items-center gap-1">
                        {model.status === 'Active' ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                        {model.status === 'Active' ? 'Pause' : 'Start'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Cpu className="h-4 w-4" />
                  CPU Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">{systemMetrics.cpuUsage}%</span>
                    <Badge className={systemMetrics.cpuUsage > 80 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                      {systemMetrics.cpuUsage > 80 ? 'High' : 'Normal'}
                    </Badge>
                  </div>
                  <Progress value={systemMetrics.cpuUsage} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  Memory Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">{systemMetrics.memoryUsage}%</span>
                    <Badge className={systemMetrics.memoryUsage > 80 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                      {systemMetrics.memoryUsage > 80 ? 'High' : 'Normal'}
                    </Badge>
                  </div>
                  <Progress value={systemMetrics.memoryUsage} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  GPU Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">{systemMetrics.gpuUsage}%</span>
                    <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                  </div>
                  <Progress value={systemMetrics.gpuUsage} />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Active Models</span>
                  <span className="font-bold">{systemMetrics.modelsRunning}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Data Processing Rate</span>
                  <span className="font-bold">{systemMetrics.dataProcessingRate} TB/hour</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Average Prediction Accuracy</span>
                  <span className="font-bold text-green-600">{systemMetrics.predictionAccuracy}%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Production Optimizer completed training</p>
                      <p className="text-xs text-gray-500">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New training data uploaded</p>
                      <p className="text-xs text-gray-500">15 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-yellow-50 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Maintenance Forecaster accuracy improved</p>
                      <p className="text-xs text-gray-500">1 hour ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="data" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Training Data Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Production Data</p>
                      <p className="text-sm text-gray-600">125,000 records</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Complete</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Quality Metrics</p>
                      <p className="text-sm text-gray-600">89,000 records</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Complete</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Maintenance Logs</p>
                      <p className="text-sm text-gray-600">67,000 records</p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">Updating</Badge>
                  </div>
                </div>
                <Button className="w-full">
                  Upload New Dataset
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Quality Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Data Completeness</span>
                      <span className="text-sm">96%</span>
                    </div>
                    <Progress value={96} />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Data Accuracy</span>
                      <span className="text-sm">94%</span>
                    </div>
                    <Progress value={94} />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Data Freshness</span>
                      <span className="text-sm">91%</span>
                    </div>
                    <Progress value={91} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
