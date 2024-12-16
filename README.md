# AWS CPU Usage Dashboard

This project is a full-stack application that fetches CPU usage data for AWS EC2 instances and displays it in a dynamic chart.

## Features
- Fetches CPU utilization data using AWS CloudWatch.
- Displays data in a responsive line chart.
- Provides time-period options (`Last Hour`, `Last Day`) and adjustable intervals.

## Prerequisites
1. **Node.js** and **npm** installed on your system.
2. AWS credentials with the necessary permissions for CloudWatch and EC2.

---

## Steps to Run

1. **Clone the repository**:
   ```bash
   git clone https://github.com/edenbdv/aws_cpu_usage.git
   cd aws_cpu_usage

2. **Create a .env file in the server folder:**:
The server requires AWS credentials. Create a file named .env in the server directory with the following content:
```bash
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region

Replace your_aws_access_key, your_aws_secret_key, and your_aws_region with your valid AWS credentials and region.

3. **Install dependencies::**:
   Install required packages for both the client and server.

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

4. **Run the server::**:
Start the backend server.
``bash
cd server
node app.js
The server will start at http://localhost:5000.

5. **Run the client::**:
Start the React frontend in diffrent terminal

``bash
cd client
npm start
The frontend will be accessible at http://localhost:3000.

6. **Access the Dashboard:::**:
Open http://localhost:3000 in your browser and input the required details (e.g., IP Address, time period) to fetch and visualize the CPU usage data.

# Notes
- Ensure you have valid AWS credentials with access to **CloudWatch** and **EC2** to retrieve metrics.
- The .env file is not included in the repository for security reasons. **You must create it manually** with the variables specified above


# Technologies Used
- **Frontend**: React.js, Chart.js
- **Backend**: Node.js, Express.js
- **AWS Services**: CloudWatch, EC2
- **Other**: dotenv, AWS SDK v3



