
import { TIME_PERIODS } from "../constants.js";

  export const validateTimePeriod = (timePeriod) => {
    return ["Last Hour", "Last Day"].includes(timePeriod);
  };
  
  export const validateInterval = (timePeriod, interval) => {
    if (interval <= 0) return false;
  
    if (timePeriod === "Last Hour" && interval > TIME_PERIODS.LAST_HOUR) return false; 
    if (timePeriod === "Last Day" && interval > TIME_PERIODS.LAST_DAY) return false; 
  
    return true;
  };
  
  export const validateIPAddress = (ipAddress) => {
    const regex = /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/;
    return regex.test(ipAddress);
  };
  
  
  