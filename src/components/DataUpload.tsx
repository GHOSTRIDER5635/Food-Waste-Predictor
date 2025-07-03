import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, CheckCircle, AlertTriangle, Download } from "lucide-react";

interface UploadStatus {
  status: 'idle' | 'uploading' | 'success' | 'error';
  message: string;
  recordCount?: number;
}

export default function DataUpload() {
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>({ status: 'idle', message: '' });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadStatus({ status: 'idle', message: '' });
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    setUploadStatus({ status: 'uploading', message: 'Processing your dataset...' });

    // Simulate file processing
    setTimeout(() => {
      // Simple validation simulation
      if (selectedFile.type === 'text/csv' || selectedFile.name.endsWith('.csv')) {
        const recordCount = Math.floor(Math.random() * 500) + 100; // Simulate record count
        setUploadStatus({ 
          status: 'success', 
          message: 'Dataset uploaded and validated successfully!',
          recordCount 
        });
      } else {
        setUploadStatus({ 
          status: 'error', 
          message: 'Please upload a valid CSV file with the required format.' 
        });
      }
    }, 2000);
  };

  const downloadSampleData = () => {
    // Create sample CSV data
    const sampleData = `hostel_name,day_of_week,total_students,meals_booked,meals_consumed,special_event,weather_condition,is_weekend,waste_generated
Om Sai Hostel,Monday,60,45,42,No,Sunny,0,1
Amrutha Hostel,Tuesday,55,50,48,No,Cloudy,0,0
Dwaraka Hostel,Wednesday,60,38,35,Yes,Rainy,0,1
Vijaya Aditya Hostel,Thursday,60,55,53,No,Sunny,0,0
Om Sai Hostel,Friday,60,40,35,No,Sunny,0,1
Amrutha Hostel,Saturday,55,30,25,No,Cloudy,1,1
Dwaraka Hostel,Sunday,60,25,20,No,Sunny,1,1`;

    const blob = new Blob([sampleData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample_hostel_data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Dataset
          </CardTitle>
          <CardDescription>
            Upload your own hostel food wastage dataset for analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="file-upload" className="block text-sm font-medium mb-2">
                Select CSV File
              </label>
              <Input
                id="file-upload"
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
              />
            </div>

            {selectedFile && (
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <FileText className="h-4 w-4" />
                <span className="text-sm">{selectedFile.name}</span>
                <Badge variant="secondary">{(selectedFile.size / 1024).toFixed(1)} KB</Badge>
              </div>
            )}

            <Button 
              onClick={handleUpload} 
              disabled={!selectedFile || uploadStatus.status === 'uploading'}
              className="w-full"
            >
              {uploadStatus.status === 'uploading' ? 'Processing...' : 'Upload & Analyze'}
            </Button>
          </div>

          {uploadStatus.message && (
            <Alert className={`${uploadStatus.status === 'success' ? 'border-success' : uploadStatus.status === 'error' ? 'border-destructive' : ''}`}>
              {uploadStatus.status === 'success' && <CheckCircle className="h-4 w-4 text-success" />}
              {uploadStatus.status === 'error' && <AlertTriangle className="h-4 w-4 text-destructive" />}
              <AlertDescription>
                {uploadStatus.message}
                {uploadStatus.recordCount && (
                  <div className="mt-2">
                    <Badge variant="outline">{uploadStatus.recordCount} records processed</Badge>
                  </div>
                )}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dataset Requirements</CardTitle>
          <CardDescription>Required columns for optimal analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "hostel_name", type: "Text", required: true },
                { name: "day_of_week", type: "Text", required: true },
                { name: "total_students", type: "Number", required: true },
                { name: "meals_booked", type: "Number", required: true },
                { name: "meals_consumed", type: "Number", required: false },
                { name: "special_event", type: "Yes/No", required: true },
                { name: "weather_condition", type: "Text", required: true },
                { name: "is_weekend", type: "1/0", required: true },
                { name: "waste_generated", type: "1/0", required: true }
              ].map((column, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <span className="font-medium">{column.name}</span>
                    <div className="text-sm text-muted-foreground">{column.type}</div>
                  </div>
                  <Badge variant={column.required ? "destructive" : "secondary"}>
                    {column.required ? "Required" : "Optional"}
                  </Badge>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t">
              <Button variant="outline" onClick={downloadSampleData} className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Sample Dataset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}