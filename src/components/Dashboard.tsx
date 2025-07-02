import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingDown, TrendingUp, Users, Utensils } from "lucide-react";

// Sample data for demonstration
const hostels = [
  { name: "Om Sai Hostel", capacity: 60, avgOccupancy: 75, wasteRate: 23 },
  { name: "Amrutha Hostel", capacity: 55, avgOccupancy: 82, wasteRate: 18 },
  { name: "Dwaraka Hostel", capacity: 60, avgOccupancy: 68, wasteRate: 31 },
  { name: "Vijaya Aditya Hostel", capacity: 60, avgOccupancy: 88, wasteRate: 15 },
];

const weeklyData = [
  { day: "Monday", breakfast: 15, lunch: 12, dinner: 25 },
  { day: "Tuesday", breakfast: 18, lunch: 14, dinner: 22 },
  { day: "Wednesday", breakfast: 12, lunch: 16, dinner: 28 },
  { day: "Thursday", breakfast: 20, lunch: 11, dinner: 24 },
  { day: "Friday", breakfast: 22, lunch: 19, dinner: 35 },
  { day: "Saturday", breakfast: 35, lunch: 28, dinner: 42 },
  { day: "Sunday", breakfast: 38, lunch: 32, dinner: 45 },
];

const mealStats = [
  { meal: "Breakfast", avgWaste: 22, trend: "down" },
  { meal: "Lunch", avgWaste: 16, trend: "down" },
  { meal: "Dinner", avgWaste: 31, trend: "up" },
];

export default function Dashboard() {
  const totalCapacity = hostels.reduce((sum, hostel) => sum + hostel.capacity, 0);
  const avgOccupancy = Math.round(hostels.reduce((sum, hostel) => sum + hostel.avgOccupancy, 0) / hostels.length);
  const avgWasteRate = Math.round(hostels.reduce((sum, hostel) => sum + hostel.wasteRate, 0) / hostels.length);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Capacity</p>
                <p className="text-2xl font-bold">{totalCapacity}</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Occupancy</p>
                <p className="text-2xl font-bold">{avgOccupancy}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Waste Rate</p>
                <p className="text-2xl font-bold text-warning">{avgWasteRate}%</p>
              </div>
              <TrendingDown className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Hostels</p>
                <p className="text-2xl font-bold">{hostels.length}</p>
              </div>
              <Utensils className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Hostel Performance
            </CardTitle>
            <CardDescription>Waste rates by hostel</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {hostels.map((hostel, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{hostel.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{hostel.avgOccupancy}% occupied</span>
                      <Badge variant={hostel.wasteRate > 25 ? "destructive" : hostel.wasteRate > 20 ? "warning" : "success"}>
                        {hostel.wasteRate}% waste
                      </Badge>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        hostel.wasteRate > 25 ? 'bg-destructive' : 
                        hostel.wasteRate > 20 ? 'bg-warning' : 'bg-success'
                      }`}
                      style={{ width: `${hostel.wasteRate}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Waste Trends</CardTitle>
            <CardDescription>Average waste percentage by day and meal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyData.map((day, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{day.day}</span>
                    <span className="text-sm text-muted-foreground">
                      Avg: {Math.round((day.breakfast + day.lunch + day.dinner) / 3)}%
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">Breakfast</div>
                      <div className="font-semibold text-sm">{day.breakfast}%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">Lunch</div>
                      <div className="font-semibold text-sm">{day.lunch}%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">Dinner</div>
                      <div className="font-semibold text-sm">{day.dinner}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Meal Type Analysis</CardTitle>
          <CardDescription>Waste patterns by meal type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mealStats.map((stat, index) => (
              <div key={index} className="text-center p-4 border rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="font-semibold">{stat.meal}</span>
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-warning" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-success" />
                  )}
                </div>
                <div className="text-2xl font-bold mb-1">{stat.avgWaste}%</div>
                <div className="text-sm text-muted-foreground">Average waste</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}