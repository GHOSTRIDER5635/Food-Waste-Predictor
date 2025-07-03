import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Brain, Lightbulb, Calculator, Upload, TrendingUp } from "lucide-react";
import PredictionForm from "@/components/PredictionForm";
import Dashboard from "@/components/Dashboard";
import InsightsPanel from "@/components/InsightsPanel";
import VisualizationDashboard from "@/components/VisualizationDashboard";
import DataUpload from "@/components/DataUpload";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Food Wastage Prediction System
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            ML-powered Flask-ready solution with comprehensive data visualizations to predict and reduce food wastage in student hostels
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="predict">Predict</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="visualizations">Visualizations</TabsTrigger>
            <TabsTrigger value="upload">Upload Data</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Overview</CardTitle>
                <CardDescription>Advanced ML system for food wastage prediction with Flask deployment capabilities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <Calculator className="h-12 w-12 mx-auto mb-4 text-primary" />
                      <h3 className="font-semibold mb-2">ML Prediction Engine</h3>
                      <p className="text-sm text-muted-foreground">
                        Logistic regression model with 87% accuracy, enhanced feature engineering
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <BarChart3 className="h-12 w-12 mx-auto mb-4 text-secondary" />
                      <h3 className="font-semibold mb-2">Data Visualizations</h3>
                      <p className="text-sm text-muted-foreground">
                        Heatmaps, correlation analysis, trend charts using advanced charting
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <Upload className="h-12 w-12 mx-auto mb-4 text-accent" />
                      <h3 className="font-semibold mb-2">CSV Data Upload</h3>
                      <p className="text-sm text-muted-foreground">
                        Upload custom datasets with validation and preprocessing
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <Brain className="h-12 w-12 mx-auto mb-4 text-warning" />
                      <h3 className="font-semibold mb-2">Flask Integration</h3>
                      <p className="text-sm text-muted-foreground">
                        Ready for Flask deployment with API endpoints and model serving
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <TrendingUp className="h-12 w-12 mx-auto mb-4 text-success" />
                      <h3 className="font-semibold mb-2">Impact Analytics</h3>
                      <p className="text-sm text-muted-foreground">
                        ROC curves, confusion matrix, precision-recall analysis
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <Lightbulb className="h-12 w-12 mx-auto mb-4 text-primary" />
                      <h3 className="font-semibold mb-2">Cost Reduction</h3>
                      <p className="text-sm text-muted-foreground">
                        Reduce waste by 30%, save ₹18,500+ monthly, prevent 850kg CO₂
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="predict" className="space-y-6">
            <PredictionForm />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Dashboard />
          </TabsContent>

          <TabsContent value="visualizations" className="space-y-6">
            <VisualizationDashboard />
          </TabsContent>

          <TabsContent value="upload" className="space-y-6">
            <DataUpload />
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <InsightsPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;