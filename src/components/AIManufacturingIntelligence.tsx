
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Target, 
  BarChart3, 
  Zap,
  Clock,
  Users,
  Award,
  RefreshCw
} from 'lucide-react';

const AIManufacturingIntelligence = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulated AI predictions and analytics
  const [predictions] = useState({
    productionEfficiency: 87.5,
    qualityPrediction: 94.2,
    defectProbability: 5.8,
    energyOptimization: 78.3,
    maintenancePrediction: 15 // days until next maintenance
  });

  const [aiInsights] = useState([
    {
      id: 1,
      type: 'optimization',
      severity: 'high',
      title: 'Production Line Optimization Opportunity',
      description: 'AI detected 23% efficiency improvement possible by adjusting worker schedules during peak hours',
      impact: '+23% productivity',
      confidence: 92,
      action: 'Implement shift rotation model',
      icon: TrendingUp
    },
    {
      id: 2,
      type: 'quality',
      severity: 'medium',
      title: 'Quality Control Pattern Detection',
      description: 'Machine learning identified correlation between humidity levels and product defects',
      impact: '-15% defect rate',
      confidence: 88,
      action: 'Install humidity control system',
      icon: Target
    },
    {
      id: 3,
      type: 'predictive',
      severity: 'low',
      title: 'Predictive Maintenance Alert',
      description: 'Neural network predicts equipment maintenance needed in 15 days based on vibration patterns',
      impact: 'Prevent downtime',
      confidence: 85,
      action: 'Schedule maintenance window',
      icon: AlertTriangle
    }
  ]);

  const [performanceMetrics] = useState({
    aiAccuracy: 94.7,
    dataProcessed: 2.3, // TB
    modelsRunning: 12,
    predictionsToday: 847
  });

  const runAIAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setLastUpdate(new Date());
    }, 3000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <Brain className="h-8 w-8 text-blue-600" />
            AI Manufacturing Intelligence
          </h2>
          <p className="text-gray-600 mt-1">
            Powered by Machine Learning & Deep Neural Networks
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </div>
          <Button 
            onClick={runAIAnalysis} 
            disabled={isAnalyzing}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
            {isAnalyzing ? 'Analyzing...' : 'Run AI Analysis'}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">AI Dashboard</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 text-sm font-medium">Production Efficiency</p>
                    <p className="text-2xl font-bold text-blue-900">{predictions.productionEfficiency}%</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                </div>
                <Progress value={predictions.productionEfficiency} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-600 text-sm font-medium">Quality Prediction</p>
                    <p className="text-2xl font-bold text-green-900">{predictions.qualityPrediction}%</p>
                  </div>
                  <Target className="h-8 w-8 text-green-600" />
                </div>
                <Progress value={predictions.qualityPrediction} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-600 text-sm font-medium">Energy Optimization</p>
                    <p className="text-2xl font-bold text-yellow-900">{predictions.energyOptimization}%</p>
                  </div>
                  <Zap className="h-8 w-8 text-yellow-600" />
                </div>
                <Progress value={predictions.energyOptimization} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-600 text-sm font-medium">Next Maintenance</p>
                    <p className="text-2xl font-bold text-purple-900">{predictions.maintenancePrediction} days</p>
                  </div>
                  <Clock className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-blue-600" />
                  AI Model Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Overall Accuracy</span>
                  <span className="text-lg font-bold text-green-600">{performanceMetrics.aiAccuracy}%</span>
                </div>
                <Progress value={performanceMetrics.aiAccuracy} />
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{performanceMetrics.modelsRunning}</p>
                    <p className="text-sm text-blue-700">Active Models</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{performanceMetrics.predictionsToday}</p>
                    <p className="text-sm text-green-700">Predictions Today</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Real-time Manufacturing Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium text-green-800">Production Line A</p>
                      <p className="text-sm text-green-600">Operating at optimal efficiency</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Optimal</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <p className="font-medium text-yellow-800">Quality Control Station</p>
                      <p className="text-sm text-yellow-600">Minor anomaly detected</p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">Monitoring</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium text-blue-800">Workforce Allocation</p>
                      <p className="text-sm text-blue-600">AI optimized for peak hours</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Optimized</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Predictions & Forecasting</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Production Forecasting</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <span>Next 24 hours</span>
                      <span className="font-bold text-green-600">+12% output</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <span>Next 7 days</span>
                      <span className="font-bold text-blue-600">+8% efficiency</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <span>Next 30 days</span>
                      <span className="font-bold text-purple-600">-5% defects</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Risk Assessment</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <span>Equipment Failure Risk</span>
                      <Badge className="bg-green-100 text-green-800">Low (3%)</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <span>Quality Issues Risk</span>
                      <Badge className="bg-yellow-100 text-yellow-800">Medium (12%)</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <span>Supply Chain Risk</span>
                      <Badge className="bg-green-100 text-green-800">Low (7%)</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="space-y-4">
            {aiInsights.map((insight) => {
              const Icon = insight.icon;
              return (
                <Card key={insight.id} className={`border-2 ${getSeverityColor(insight.severity)}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-white">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{insight.title}</h3>
                          <p className="text-gray-600 mt-1">{insight.description}</p>
                        </div>
                      </div>
                      <Badge className={getSeverityColor(insight.severity)}>
                        {insight.severity.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <span className="text-sm text-gray-600">Expected Impact:</span>
                        <p className="font-semibold text-green-600">{insight.impact}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">AI Confidence:</span>
                        <p className="font-semibold">{insight.confidence}%</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Recommended Action:</span>
                        <p className="font-semibold">{insight.action}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        Generated by Neural Network Analysis
                      </div>
                      <Button size="sm" className="flex items-center gap-2">
                        Implement Suggestion
                        <TrendingUp className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>AI System Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Model Accuracy</span>
                    <span className="font-bold">{performanceMetrics.aiAccuracy}%</span>
                  </div>
                  <Progress value={performanceMetrics.aiAccuracy} />
                  
                  <div className="flex justify-between items-center">
                    <span>Data Processed</span>
                    <span className="font-bold">{performanceMetrics.dataProcessed} TB</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Active Models</span>
                    <span className="font-bold">{performanceMetrics.modelsRunning}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Predictions Today</span>
                    <span className="font-bold">{performanceMetrics.predictionsToday}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>AI Technologies Used</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Brain className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Deep Neural Networks</p>
                      <p className="text-sm text-gray-600">Pattern recognition & prediction</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">Machine Learning</p>
                      <p className="text-sm text-gray-600">Optimization algorithms</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium">Predictive Analytics</p>
                      <p className="text-sm text-gray-600">Forecasting & risk assessment</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                    <Target className="h-5 w-5 text-yellow-600" />
                    <div>
                      <p className="font-medium">Computer Vision</p>
                      <p className="text-sm text-gray-600">Quality control automation</p>
                    </div>
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

export default AIManufacturingIntelligence;
