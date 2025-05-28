# Vehicle Challan Backend

This is the backend service for the Vehicle Challan application.

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
MONGODB_URI=your_mongodb_atlas_connection_string
PORT=5000
```

3. Start the server:
```bash
npm start
```

## API Endpoints

1. POST /api/challan
   - Body: { "vehicleNumber": "string" }
   - Returns: Dummy challan data

2. GET /api/history
   - Returns: Last 5 search records

## Deployment

The backend is configured to be deployed on Render. Make sure to set the environment variables in the Render dashboard. 