import React, { useState } from 'react';
import axios from 'axios';
import { ChallanData } from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Home: React.FC = () => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [challanData, setChallanData] = useState<ChallanData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setChallanData(null);

    try {
      const response = await axios.post(`${API_URL}/api/challan`, { vehicleNumber });
      setChallanData(response.data);
    } catch (err) {
      setError('Failed to fetch challan data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Search Vehicle Challan</h1>
        
        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <label htmlFor="vehicleNumber" className="block text-sm font-medium text-gray-700">
              Vehicle Number
            </label>
            <input
              type="text"
              id="vehicleNumber"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter vehicle number"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {challanData && (
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h2 className="text-lg font-semibold mb-4">Challan Details</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Challan ID:</span> {challanData.challanId}</p>
              <p><span className="font-medium">Date:</span> {new Date(challanData.date).toLocaleDateString()}</p>
              <p><span className="font-medium">Amount:</span> ₹{challanData.amount}</p>
              <p><span className="font-medium">Violation:</span> {challanData.violation}</p>
              <p><span className="font-medium">Location:</span> {challanData.location}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home; 