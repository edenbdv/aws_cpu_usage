//cpuController

import { fetchCPUUsage } from "../services/cpuService.js";
import { TIME_PERIODS } from "../constants.js";
import {
  validateTimePeriod,
  validateInterval,
  validateIPAddress,
} from "../utils/validators.js";


const getCPUUsage = async (req, res) => {
  const { ipAddress, timePeriod, interval } = req.body;

  // Input Validation
  if (!validateTimePeriod(timePeriod)) {
    return res
      .status(400)
      .json({ error: "Invalid time period. Use 'Last Hour' or 'Last Day'." });
  }

  if (!validateInterval(timePeriod, interval)) {
    const maxInterval =
    timePeriod === "Last Hour" ? TIME_PERIODS.LAST_HOUR : TIME_PERIODS.LAST_DAY;

   return res.status(400).json({
    error: `Invalid interval. For '${timePeriod}', interval must be a positive number ≤ ${maxInterval} seconds.`,
  });
  }
  
  if (!validateIPAddress(ipAddress)) {
    return res.status(400).json({ error: "Invalid IP address format." });
  }

  const endTime = new Date();
  const periodInSeconds =
  timePeriod === "Last Hour"
    ? TIME_PERIODS.LAST_HOUR
    : TIME_PERIODS.LAST_DAY;
    
  const startTime = new Date(endTime - periodInSeconds * 1000);

  
  try {
    const cpuData = await fetchCPUUsage(ipAddress, startTime, endTime, interval);
    res.json(cpuData);
  } catch (error) {
    console.error("Error fetching CPU usage:", error);
    res.status(500).json({ error: "Error fetching CPU data" });
  }
};

export { getCPUUsage };
