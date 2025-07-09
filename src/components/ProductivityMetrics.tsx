
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, AlertTriangle, Target } from 'lucide-react';

const metrics = [
  {
    title: 'Overall Efficiency',
    value: 87,
    target: 95,
    trend: 'up',
    change: '+5%',
    icon: TrendingUp,
    color: 'text-green-600'
  },
  {
    title: 'Safety Incidents',
    value: 3,
    target: 0,
    trend: 'down',
    change: '-2',
    icon: AlertTriangle,
    color: 'text-red-600'
  },
  {
    title: 'Training Costs',
    value: 75,
    target: 50,
    trend: 'down',
    change: '-12%',
    icon: TrendingDown,
    color: 'text-green-600'
  },
  {
    title: 'Quality Score',
    value: 92,
    target: 98,
    trend: 'up',
    change: '+3%',
    icon: Target,
    color: 'text-blue-600'
  }
];

export const ProductivityMetrics = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Productivity Metrics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const progressValue = metric.title === 'Safety Incidents' 
            ? 100 - (metric.value / 10 * 100) 
            : (metric.value / metric.target) * 100;
          
          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon className={`h-4 w-4 ${metric.color}`} />
                  <span className="text-sm font-medium">{metric.title}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-semibold ${metric.color}`}>
                    {metric.change}
                  </span>
                  <span className="text-sm text-gray-600">
                    {metric.value}{metric.title === 'Safety Incidents' ? '' : '%'}
                  </span>
                </div>
              </div>
              
              <Progress 
                value={Math.min(progressValue, 100)} 
                className="h-2"
              />
              
              <div className="flex justify-between text-xs text-gray-500">
                <span>Current: {metric.value}{metric.title === 'Safety Incidents' ? '' : '%'}</span>
                <span>Target: {metric.target}{metric.title === 'Safety Incidents' ? '' : '%'}</span>
              </div>
            </div>
          );
        })}
        
        <div className="mt-6 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800 font-medium">
            💡 Tip: Optimal skill matching can improve efficiency by up to 23%
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
