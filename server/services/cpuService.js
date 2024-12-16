import {fetchCloudWatchMetrics}  from "./cloudWatchService.js";
import { getInstanceIdFromIP } from "./ec2Service.js";


  const fetchCPUUsage = async (ipAddress, startTime, endTime, interval) => {
       
    try {
       // Get Instance ID from IP
      const instanceId = await getInstanceIdFromIP(ipAddress);

      // Construct parameters for CloudWatch
      const params = {
        StartTime: startTime,
        EndTime: endTime,
        Period: interval,
        MetricName: "CPUUtilization",
        Namespace: "AWS/EC2",
        Statistics: ["Average"],
        Dimensions: [
          {
            Name: "InstanceId",
            Value: instanceId,
          },
        ],    };


       // Fetch data from CloudWatch
       const data = await fetchCloudWatchMetrics(params);

      // Transform AWS response into the required format
      return data.Datapoints.map((dp) => ({
        time: dp.Timestamp,
        cpu: dp.Average,

      })).sort((a, b) => new Date(a.time) - new Date(b.time)); 

    } catch (error) {
      console.error("Error fetching data from CloudWatch:", error);
      throw new Error("Failed to fetch data from AWS CloudWatch.");
    }
    
  };
  
  export { fetchCPUUsage };
