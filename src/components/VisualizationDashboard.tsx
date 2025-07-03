import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, BarChart3, PieChart as PieChartIcon, Activity, FileText } from 'lucide-react';

// Enhanced sample data for comprehensive visualizations
const hostelWasteData = [
  { name: "Om Sai", wasteRate: 23, mealsServed: 1250, totalWaste: 287 },
  { name: "Amrutha", wasteRate: 18, mealsServed: 1180, totalWaste: 212 },
  { name: "Dwaraka", wasteRate: 31, mealsServed: 1340, totalWaste: 415 },
  { name: "Vijaya Aditya", wasteRate: 15, mealsServed: 1420, totalWaste: 213 }
];

const weeklyTrendData = [
  { day: "Mon", booked: 180, consumed: 165, wasted: 15, wasteRate: 8.3 },
  { day: "Tue", booked: 175, consumed: 162, wasted: 13, wasteRate: 7.4 },
  { day: "Wed", booked: 185, consumed: 170, wasted: 15, wasteRate: 8.1 },
  { day: "Thu", booked: 190, consumed: 175, wasted: 15, wasteRate: 7.9 },
  { day: "Fri", booked: 200, consumed: 165, wasted: 35, wasteRate: 17.5 },
  { day: "Sat", booked: 165, consumed: 120, wasted: 45, wasteRate: 27.3 },
  { day: "Sun", booked: 150, consumed: 110, wasted: 40, wasteRate: 26.7 }
];

const mealTypeData = [
  { name: "Breakfast", value: 22, color: "#22c55e" },
  { name: "Lunch", value: 16, color: "#3b82f6" },
  { name: "Dinner", value: 31, color: "#f59e0b" }
];

const correlationData = [
  { factor: "Booking Rate", correlation: -0.78, impact: "High" },
  { factor: "Weather", correlation: 0.45, impact: "Medium" },
  { factor: "Special Events", correlation: 0.62, impact: "High" },
  { factor: "Weekend", correlation: 0.71, impact: "High" },
  { factor: "Occupancy", correlation: -0.65, impact: "High" }
];

const monthlyData = [
  { month: "Jan", totalWaste: 1200, costImpact: 18500, co2Impact: 720 },
  { month: "Feb", totalWaste: 1350, costImpact: 20250, co2Impact: 810 },
  { month: "Mar", totalWaste: 1180, costImpact: 17700, co2Impact: 708 },
  { month: "Apr", totalWaste: 1050, costImpact: 15750, co2Impact: 630 },
  { month: "May", totalWaste: 980, costImpact: 14700, co2Impact: 588 },
  { month: "Jun", totalWaste: 850, costImpact: 12750, co2Impact: 510 }
];

export default function VisualizationDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Data Visualizations & Analytics</h2>
          <p className="text-muted-foreground">Comprehensive analysis of food wastage patterns</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Activity className="h-3 w-3" />
            Live Data
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="correlations">Correlations</TabsTrigger>
          <TabsTrigger value="predictions">ML Insights</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Waste Rate by Hostel
                </CardTitle>
                <CardDescription>Comparative analysis across all hostels</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={hostelWasteData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value, name) => [
                        `${value}${name === 'wasteRate' ? '%' : ''}`, 
                        name === 'wasteRate' ? 'Waste Rate' : name === 'mealsServed' ? 'Meals Served' : 'Total Waste (kg)'
                      ]}
                    />
                    <Bar dataKey="wasteRate" fill="hsl(var(--warning))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon className="h-5 w-5" />
                  Waste Distribution by Meal Type
                </CardTitle>
                <CardDescription>Average waste percentage across meal types</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={mealTypeData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {mealTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Booking vs Consumption Trends</CardTitle>
              <CardDescription>Analysis of meal booking patterns and actual consumption</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={weeklyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="booked" stroke="hsl(var(--primary))" strokeWidth={2} name="Meals Booked" />
                  <Line type="monotone" dataKey="consumed" stroke="hsl(var(--success))" strokeWidth={2} name="Meals Consumed" />
                  <Line type="monotone" dataKey="wasted" stroke="hsl(var(--warning))" strokeWidth={2} name="Meals Wasted" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Impact Reduction Trend</CardTitle>
              <CardDescription>Progress in waste reduction over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'totalWaste' ? `${value} kg` : 
                      name === 'costImpact' ? `₹${value}` : `${value} kg CO₂`,
                      name === 'totalWaste' ? 'Total Waste' :
                      name === 'costImpact' ? 'Cost Impact' : 'CO₂ Impact'
                    ]}
                  />
                  <Area type="monotone" dataKey="totalWaste" stackId="1" stroke="hsl(var(--warning))" fill="hsl(var(--warning))" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="correlations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Factor Correlation Analysis</CardTitle>
              <CardDescription>How different factors correlate with food wastage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {correlationData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="font-medium">{item.factor}</div>
                      <Badge variant={item.impact === 'High' ? 'destructive' : 'secondary'}>
                        {item.impact} Impact
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.correlation > 0 ? (
                        <TrendingUp className="h-4 w-4 text-warning" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-success" />
                      )}
                      <span className="font-medium">
                        {item.correlation > 0 ? '+' : ''}{item.correlation}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Model Performance Metrics</CardTitle>
                <CardDescription>Logistic regression model evaluation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Accuracy</span>
                    <span className="font-bold text-success">87.3%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Precision</span>
                    <span className="font-bold text-success">84.1%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Recall</span>
                    <span className="font-bold text-success">89.7%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>F1 Score</span>
                    <span className="font-bold text-success">86.8%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Feature Importance</CardTitle>
                <CardDescription>Most influential factors in predictions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { feature: "Booking Rate", importance: 0.35 },
                    { feature: "Day of Week", importance: 0.28 },
                    { feature: "Special Events", importance: 0.18 },
                    { feature: "Weather", importance: 0.12 },
                    { feature: "Hostel", importance: 0.07 }
                  ].map((item, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{item.feature}</span>
                        <span>{(item.importance * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-primary"
                          style={{width: `${item.importance * 100}%`}}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Export Data & Reports
              </CardTitle>
              <CardDescription>Download comprehensive analysis reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg text-center space-y-2">
                  <h4 className="font-medium">Dataset Export</h4>
                  <p className="text-sm text-muted-foreground">Download current dataset in CSV format</p>
                  <Badge variant="outline">CSV Format</Badge>
                </div>
                <div className="p-4 border rounded-lg text-center space-y-2">
                  <h4 className="font-medium">Monthly Report</h4>
                  <p className="text-sm text-muted-foreground">Comprehensive monthly analysis</p>
                  <Badge variant="outline">PDF Report</Badge>
                </div>
                <div className="p-4 border rounded-lg text-center space-y-2">
                  <h4 className="font-medium">Model Metrics</h4>
                  <p className="text-sm text-muted-foreground">ML model performance details</p>
                  <Badge variant="outline">JSON Export</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}