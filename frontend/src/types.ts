export interface ChallanData {
  vehicleNumber: string;
  challanId: string;
  date: string;
  amount: number;
  violation: string;
  location: string;
}

export interface SearchHistory {
  vehicleNumber: string;
  timestamp: string;
  _id: string;
} 