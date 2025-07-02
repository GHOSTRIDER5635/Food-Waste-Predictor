import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, AlertTriangle, CheckCircle, Target } from "lucide-react";

const insights = [
  {
    type: "warning",
    title: "High Weekend Wastage",
    description: "Food waste increases by 35% on weekends. Consider reducing portions or implementing advance booking.",
    impact: "High",
    suggestion: "Implement a weekend booking system 24 hours in advance"
  },
  {
    type: "success",
    title: "Dwaraka Hostel Improvement",
    description: "Waste reduced by 18% after implementing portion control measures.",
    impact: "Medium",
    suggestion: "Apply similar measures to other hostels"
  },
  {
    type: "alert",
    title: "Dinner Waste Pattern",
    description: "Dinner shows consistently higher waste rates across all hostels (31% average).",
    impact: "High",
    suggestion: "Survey students about dinner preferences and timing"
  },
  {
    type: "tip",
    title: "Occupancy Correlation",
    description: "Hostels with >80% occupancy show 40% less waste per capita.",
    impact: "Medium",
    suggestion: "Focus retention strategies on underperforming hostels"
  }
];

const recommendations = [
  {
    priority: "High",
    action: "Implement dynamic portion sizing based on daily attendance predictions",
    expectedReduction: "15-20%"
  },
  {
    priority: "Medium",
    action: "Create student feedback system for meal preferences",
    expectedReduction: "10-15%"
  },
  {
    priority: "Medium",
    action: "Establish weekend advance booking system",
    expectedReduction: "25-30%"
  },
  {
    priority: "Low",
    action: "Train kitchen staff on waste monitoring best practices",
    expectedReduction: "5-10%"
  }
];

export default function InsightsPanel() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Key Insights
          </CardTitle>
          <CardDescription>
            Data-driven observations from your hostel food wastage patterns
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {insights.map((insight, index) => (
            <Alert key={index} className="border-l-4 border-l-primary">
              <div className="flex items-start gap-3">
                {insight.type === "warning" && <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />}
                {insight.type === "success" && <CheckCircle className="h-5 w-5 text-success mt-0.5" />}
                {insight.type === "alert" && <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />}
                {insight.type === "tip" && <Target className="h-5 w-5 text-primary mt-0.5" />}
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{insight.title}</h4>
                    <Badge variant={insight.impact === "High" ? "destructive" : "secondary"}>
                      {insight.impact} Impact
                    </Badge>
                  </div>
                  <AlertDescription className="text-sm">
                    {insight.description}
                  </AlertDescription>
                  <div className="text-sm font-medium text-primary">
                    💡 {insight.suggestion}
                  </div>
                </div>
              </div>
            </Alert>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-secondary" />
            Action Recommendations
          </CardTitle>
          <CardDescription>
            Prioritized actions to reduce food wastage across hostels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-shrink-0">
                  <Badge variant={rec.priority === "High" ? "destructive" : rec.priority === "Medium" ? "warning" : "secondary"}>
                    {rec.priority}
                  </Badge>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium">{rec.action}</p>
                  <p className="text-sm text-success font-medium">
                    Expected reduction: {rec.expectedReduction}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-primary">Monthly Impact Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">2.3 tons</div>
              <div className="text-sm text-muted-foreground">Food saved this month</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">₹18,500</div>
              <div className="text-sm text-muted-foreground">Cost savings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">-12%</div>
              <div className="text-sm text-muted-foreground">Waste reduction</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">850 kg</div>
              <div className="text-sm text-muted-foreground">CO₂ prevented</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}