import { EC2Client, DescribeInstancesCommand } from "@aws-sdk/client-ec2";
import dotenv from "dotenv";

dotenv.config();

// Initialize EC2 client
const ec2Client = new EC2Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Function to fetch Instance ID from an IP address
export const getInstanceIdFromIP = async (ipAddress) => {
  const params = {
    Filters: [
      {
        Name: "network-interface.addresses.private-ip-address", 
        Values: [ipAddress],
      },
    ],
  };

  try {

    const command = new DescribeInstancesCommand(params);
    const response = await ec2Client.send(command);

    // Extract the instance ID
    if (
      response.Reservations &&
      response.Reservations.length > 0 &&
      response.Reservations[0].Instances.length > 0
    ) {
      const instanceId = response.Reservations[0].Instances[0].InstanceId;
      return instanceId;
    } else {
      throw new Error(`No instance found with IP: ${ipAddress}`);
    }
  } catch (error) {
    console.error("Error fetching Instance ID:", error);
    throw error;
  }
};

