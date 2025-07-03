import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calculator, TrendingUp, TrendingDown } from "lucide-react";

interface PredictionResult {
  probability: number;
  prediction: 'Yes' | 'No';
  confidence: string;
  factors: string[];
}

export default function PredictionForm() {
  const [formData, setFormData] = useState({
    hostelName: '',
    dayOfWeek: '',
    totalStudents: '',
    mealsBooked: '',
    specialEvent: '',
    weatherCondition: '',
    isWeekend: '',
    mealType: ''
  });
  
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);

  const hostels = ["Om Sai Hostel", "Amrutha Hostel", "Dwaraka Hostel", "Vijaya Aditya Hostel"];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const mealTypes = ["Breakfast", "Lunch", "Dinner"];
  const weatherConditions = ["Sunny", "Rainy", "Cloudy", "Stormy"];
  const specialEvents = ["Yes", "No"];

  const calculatePrediction = () => {
    setLoading(true);
    
    // Enhanced logistic regression simulation based on new dataset structure
    setTimeout(() => {
      const totalStudents = parseInt(formData.totalStudents);
      const mealsBooked = parseInt(formData.mealsBooked);
      const bookingRate = mealsBooked / totalStudents;
      
      // Factors that increase wastage probability
      let wasteScore = 0;
      const factors: string[] = [];
      
      // Low booking rate increases waste
      if (bookingRate < 0.6) {
        wasteScore += 0.4;
        factors.push("Low booking rate (<60%)");
      } else if (bookingRate < 0.8) {
        wasteScore += 0.2;
        factors.push("Moderate booking rate (60-80%)");
      }
      
      // Weekend effects
      if (formData.isWeekend === 'Yes' || formData.dayOfWeek === 'Saturday' || formData.dayOfWeek === 'Sunday') {
        wasteScore += 0.25;
        factors.push("Weekend effect");
      }
      
      // Special events
      if (formData.specialEvent === 'Yes') {
        wasteScore += 0.3;
        factors.push("Special event day");
      }
      
      // Weather impact
      if (formData.weatherCondition === 'Rainy' || formData.weatherCondition === 'Stormy') {
        wasteScore += 0.15;
        factors.push("Bad weather conditions");
      }
      
      // Meal type patterns
      if (formData.mealType === 'Dinner') {
        wasteScore += 0.15;
        factors.push("Dinner service (higher waste tendency)");
      } else if (formData.mealType === 'Breakfast') {
        wasteScore += 0.05;
        factors.push("Breakfast service");
      }
      
      // Hostel-specific patterns
      if (formData.hostelName === 'Dwaraka Hostel') {
        wasteScore += 0.1;
        factors.push("Hostel-specific pattern");
      }
      
      // Add controlled randomness
      wasteScore += Math.random() * 0.2;
      
      const probability = Math.min(Math.max(wasteScore, 0.05), 0.95);
      const prediction: PredictionResult = {
        probability: probability,
        prediction: probability > 0.5 ? 'Yes' : 'No',
        confidence: probability > 0.7 ? 'High' : probability > 0.4 ? 'Medium' : 'Low',
        factors: factors.length > 0 ? factors : ["Normal operating conditions"]
      };
      
      setPrediction(prediction);
      setLoading(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculatePrediction();
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-6 w-6 text-primary" />
          Food Wastage Prediction
        </CardTitle>
        <CardDescription>
          Enter hostel data to predict the likelihood of food wastage
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hostel">Hostel Name</Label>
              <Select value={formData.hostelName} onValueChange={(value) => setFormData({...formData, hostelName: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select hostel" />
                </SelectTrigger>
                <SelectContent>
                  {hostels.map((hostel) => (
                    <SelectItem key={hostel} value={hostel}>{hostel}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="day">Day of Week</Label>
              <Select value={formData.dayOfWeek} onValueChange={(value) => setFormData({...formData, dayOfWeek: value, isWeekend: value === 'Saturday' || value === 'Sunday' ? 'Yes' : 'No'})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select day" />
                </SelectTrigger>
                <SelectContent>
                  {days.map((day) => (
                    <SelectItem key={day} value={day}>{day}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalStudents">Total Students</Label>
              <Input
                id="totalStudents"
                type="number"
                placeholder="60"
                value={formData.totalStudents}
                onChange={(e) => setFormData({...formData, totalStudents: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mealsBooked">Meals Booked</Label>
              <Input
                id="mealsBooked"
                type="number"
                placeholder="45"
                value={formData.mealsBooked}
                onChange={(e) => setFormData({...formData, mealsBooked: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="meal">Meal Type</Label>
              <Select value={formData.mealType} onValueChange={(value) => setFormData({...formData, mealType: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select meal" />
                </SelectTrigger>
                <SelectContent>
                  {mealTypes.map((meal) => (
                    <SelectItem key={meal} value={meal}>{meal}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="weather">Weather Condition</Label>
              <Select value={formData.weatherCondition} onValueChange={(value) => setFormData({...formData, weatherCondition: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select weather" />
                </SelectTrigger>
                <SelectContent>
                  {weatherConditions.map((weather) => (
                    <SelectItem key={weather} value={weather}>{weather}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialEvent">Special Event</Label>
              <Select value={formData.specialEvent} onValueChange={(value) => setFormData({...formData, specialEvent: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Special event today?" />
                </SelectTrigger>
                <SelectContent>
                  {specialEvents.map((event) => (
                    <SelectItem key={event} value={event}>{event}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="weekend">Is Weekend</Label>
              <Input
                id="weekend"
                value={formData.isWeekend}
                disabled
                placeholder="Auto-detected"
                className="bg-muted"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading || !formData.hostelName || !formData.dayOfWeek || !formData.totalStudents || !formData.mealsBooked || !formData.mealType || !formData.weatherCondition || !formData.specialEvent}
          >
            {loading ? "Analyzing with ML Model..." : "Predict Food Wastage"}
          </Button>
        </form>

        {prediction && (
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              Prediction Result
              {prediction.prediction === 'Yes' ? (
                <TrendingUp className="h-4 w-4 text-warning" />
              ) : (
                <TrendingDown className="h-4 w-4 text-success" />
              )}
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Food Wastage Predicted:</span>
                <Badge variant={prediction.prediction === 'Yes' ? 'destructive' : 'default'}>
                  {prediction.prediction}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span>Probability:</span>
                <span className="font-medium">{(prediction.probability * 100).toFixed(1)}%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span>Confidence:</span>
                <Badge variant={prediction.confidence === 'High' ? 'default' : 'secondary'}>
                  {prediction.confidence}
                </Badge>
              </div>
              
              <div className="w-full bg-background rounded-full h-2 mt-2">
                <div 
                  className={`h-2 rounded-full ${prediction.prediction === 'Yes' ? 'bg-warning' : 'bg-success'}`}
                  style={{width: `${prediction.probability * 100}%`}}
                />
              </div>
              
              <div className="mt-4 p-3 bg-background rounded border">
                <h4 className="font-medium mb-2">Contributing Factors:</h4>
                <ul className="space-y-1">
                  {prediction.factors.map((factor, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}