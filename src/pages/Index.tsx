import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PredictionForm from "@/components/PredictionForm";
import Dashboard from "@/components/Dashboard";
import InsightsPanel from "@/components/InsightsPanel";
import { Brain, BarChart3, Lightbulb, ChefHat, Leaf, TrendingDown } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <ChefHat className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold">FoodWaste Predictor</h1>
                <p className="text-sm text-muted-foreground">AI-Powered Hostel Food Management</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-success" />
              <span className="text-sm font-medium">Sustainability Focus</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
            <Brain className="h-4 w-4" />
            Powered by Logistic Regression AI
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Predict & Prevent Food Wastage
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Advanced machine learning system to forecast food wastage in hostels, helping management 
            make data-driven decisions and reduce environmental impact.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-success/10 text-success px-3 py-1 rounded-full text-sm">
              <TrendingDown className="h-4 w-4" />
              Up to 30% waste reduction
            </div>
            <div className="flex items-center gap-2 bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm">
              <BarChart3 className="h-4 w-4" />
              Real-time analytics
            </div>
            <div className="flex items-center gap-2 bg-warning/10 text-warning px-3 py-1 rounded-full text-sm">
              <Lightbulb className="h-4 w-4" />
              Smart recommendations
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="predict" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Predict
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Insights
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    ML Prediction
                  </CardTitle>
                  <CardDescription>
                    Advanced logistic regression model trained on historical data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2">
                    <li>• Occupancy rate analysis</li>
                    <li>• Day-of-week patterns</li>
                    <li>• Holiday impact assessment</li>
                    <li>• Meal type optimization</li>
                  </ul>
                  <Button 
                    className="w-full mt-4" 
                    onClick={() => setActiveTab("predict")}
                  >
                    Try Prediction
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-secondary" />
                    Analytics Dashboard
                  </CardTitle>
                  <CardDescription>
                    Comprehensive insights across all hostels
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2">
                    <li>• Real-time waste tracking</li>
                    <li>• Hostel performance comparison</li>
                    <li>• Weekly trend analysis</li>
                    <li>• Meal type breakdowns</li>
                  </ul>
                  <Button 
                    variant="secondary" 
                    className="w-full mt-4"
                    onClick={() => setActiveTab("dashboard")}
                  >
                    View Analytics
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-warning" />
                    Smart Insights
                  </CardTitle>
                  <CardDescription>
                    AI-powered recommendations for waste reduction
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2">
                    <li>• Actionable recommendations</li>
                    <li>• Cost impact analysis</li>
                    <li>• Environmental metrics</li>
                    <li>• Implementation guidance</li>
                  </ul>
                  <Button 
                    variant="outline" 
                    className="w-full mt-4"
                    onClick={() => setActiveTab("insights")}
                  >
                    Get Insights
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Featured Hostels */}
            <Card>
              <CardHeader>
                <CardTitle>Featured Hostels</CardTitle>
                <CardDescription>Currently tracking food wastage across these facilities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {["Om Sai Hostel", "Amrutha Hostel", "Dwaraka Hostel", "Vijaya Aditya Hostel"].map((hostel, index) => (
                    <div key={index} className="text-center p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="font-medium">{hostel}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {[60, 55, 60, 60][index]} capacity
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Prediction Tab */}
          <TabsContent value="predict">
            <PredictionForm />
          </TabsContent>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights">
            <InsightsPanel />
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="border-t bg-muted/50 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>FoodWaste Predictor • Reducing food wastage through intelligent prediction</p>
            <p className="mt-1">Built with React, TypeScript & Machine Learning</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;