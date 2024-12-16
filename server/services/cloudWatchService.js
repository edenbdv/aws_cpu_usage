//cloudWatch service


import { CloudWatchClient, GetMetricStatisticsCommand } from "@aws-sdk/client-cloudwatch";
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

// Initialize CloudWatch client
const cloudwatch = new CloudWatchClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});



// Export a function to fetch data
export const fetchCloudWatchMetrics = async (params) => {
    try {

      const command = new GetMetricStatisticsCommand(params);
      const response = await cloudwatch.send(command);
      return response;
    } catch (error) {
      console.error("Error fetching CloudWatch metrics:", error);
      throw error;
    }
  };


