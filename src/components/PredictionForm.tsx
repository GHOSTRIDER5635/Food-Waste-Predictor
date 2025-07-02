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
}

export default function PredictionForm() {
  const [formData, setFormData] = useState({
    hostelName: '',
    day: '',
    studentsPresent: '',
    totalCapacity: '',
    mealType: '',
    isHoliday: ''
  });
  
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);

  const hostels = ["Om Sai Hostel", "Amrutha Hostel", "Dwaraka Hostel", "Vijaya Aditya Hostel"];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const mealTypes = ["Breakfast", "Lunch", "Dinner"];

  const calculatePrediction = () => {
    setLoading(true);
    
    // Simple logistic regression simulation
    setTimeout(() => {
      const studentsPresent = parseInt(formData.studentsPresent);
      const totalCapacity = parseInt(formData.totalCapacity);
      const occupancyRate = studentsPresent / totalCapacity;
      
      // Factors that increase wastage probability
      let wasteScore = 0;
      
      // Low occupancy increases waste
      if (occupancyRate < 0.6) wasteScore += 0.4;
      else if (occupancyRate < 0.8) wasteScore += 0.2;
      
      // Weekends and holidays increase waste
      if (formData.day === 'Saturday' || formData.day === 'Sunday') wasteScore += 0.2;
      if (formData.isHoliday === 'Yes') wasteScore += 0.3;
      
      // Dinner tends to have more waste
      if (formData.mealType === 'Dinner') wasteScore += 0.1;
      
      // Add some randomness
      wasteScore += Math.random() * 0.3;
      
      const probability = Math.min(wasteScore, 0.95);
      const prediction: PredictionResult = {
        probability: probability,
        prediction: probability > 0.5 ? 'Yes' : 'No',
        confidence: probability > 0.7 ? 'High' : probability > 0.4 ? 'Medium' : 'Low'
      };
      
      setPrediction(prediction);
      setLoading(false);
    }, 1000);
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
              <Select value={formData.day} onValueChange={(value) => setFormData({...formData, day: value})}>
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
              <Label htmlFor="students">Students Present</Label>
              <Input
                id="students"
                type="number"
                placeholder="45"
                value={formData.studentsPresent}
                onChange={(e) => setFormData({...formData, studentsPresent: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacity">Total Capacity</Label>
              <Input
                id="capacity"
                type="number"
                placeholder="60"
                value={formData.totalCapacity}
                onChange={(e) => setFormData({...formData, totalCapacity: e.target.value})}
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
              <Label htmlFor="holiday">Holiday</Label>
              <Select value={formData.isHoliday} onValueChange={(value) => setFormData({...formData, isHoliday: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Is it a holiday?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading || !formData.hostelName || !formData.day || !formData.studentsPresent || !formData.totalCapacity || !formData.mealType || !formData.isHoliday}
          >
            {loading ? "Predicting..." : "Predict Food Wastage"}
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
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}