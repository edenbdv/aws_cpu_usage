import React, { useState } from 'react';
import { PORT } from "./constants.js";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import './DynamicChart.css'; 

// Register necessary chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  TimeScale
);

const DynamicChart = () => {
  const [timePeriod, setTimePeriod] = useState('Last Hour'); 
  const [interval, setInterval] = useState(600); 
  const [ipAddress, setIpAddress] = useState('');
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false); 

  const roundToNearestInterval = (date, intervalMinutes) => {
    const roundedDate = new Date(date);
    const minutes = roundedDate.getMinutes();
    roundedDate.setMinutes(
      Math.floor(minutes / intervalMinutes) * intervalMinutes,
      0,
      0
    ); // Round down
    return roundedDate;
  };

  const getMinTime = (timePeriod) => {
    const now = new Date();
    if (timePeriod === 'Last Hour') {
      now.setMinutes(
        Math.floor(now.getMinutes() / 10) * 10 - 60,
        0,
        0
      ); // Start 1 hour ago, rounded
    } else if (timePeriod === 'Last Day') {
      now.setHours(now.getHours() - 24, 0, 0, 0); // Start 24 hours ago, rounded
    }
    return now;
  };

  const getMaxTime = (timePeriod) => {
    const now = new Date();
    if (timePeriod === 'Last Hour') {
      now.setMinutes(
        Math.floor(now.getMinutes() / 10) * 10,
        0,
        0
      ); // End at the nearest 10-minute interval
    } else if (timePeriod === 'Last Day') {
      now.setMinutes(0, 0, 0); // End at the current rounded hour
    }
    return now;
  };


  const fetchData = async () => {
    setLoading(true); 

    try {
      const response = await fetch(`http://localhost:${PORT}/api/cpu-usage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ipAddress, timePeriod, interval }),
      });


      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error); 
        return;
      }

      const data = await response.json();
      console.log(data);

      if (Array.isArray(data)) {
        const roundedTimes = data.map((item) =>
          roundToNearestInterval(
            item.time,
            timePeriod === 'Last Hour' ? 10 : 60
          )
        );
        const cpuUsage = data.map((item) => item.cpu);

        setChartData({
          labels: roundedTimes, 
          datasets: [
            {
              label: 'CPU Usage (%)',
              data: cpuUsage,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: true,
              pointRadius: 3,
            },
          ],
        });
      } else {
        console.error('Unexpected data format:', data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }  finally {
      setLoading(false); 
    }
  };

  return (
    <div className="chart-container" >
      <h1>AWS Instance CPU Usage</h1>

      <div className="controls" >
        <label>
          Time Period:
          <select
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
          >
            <option value="Last Hour">Last Hour</option>
            <option value="Last Day">Last Day</option>
          </select>
        </label>

        <label>
          Period (Seconds):
          <input
            type="number"
            value={interval}
            onChange={(e) => setInterval(Number(e.target.value))}
            min="1"
          />
        </label>

        <label>
          IP Address:
          <input
            type="text"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
            placeholder="Enter IP Address"
          />
        </label>

        <button onClick={fetchData}>Load</button>
      </div>

      {loading && <div className="loading">Loading...</div>} 

      {chartData && (
        <div className="chart-wrapper" >
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              
              scales: {
                x: {
                  type: 'time',
                  time: {
                    unit: timePeriod === 'Last Hour' ? 'minute' : 'hour',
                    displayFormats: {
                      minute: 'h:mm a', // Format for 10-minute ticks
                      hour: 'h a', // Format for hourly ticks
                    },
                    tooltipFormat: 'h:mm a', // Tooltip format
                  },
                  min: getMinTime(timePeriod),
                  max: getMaxTime(timePeriod),
                  ticks: {
                    autoSkip: false,
                    stepSize: timePeriod === 'Last Hour' ? 10 : 1, // 10-minute steps for Last Hour, 1-hour for Last Day
                    callback: function (value) {
                      const date = new Date(value);
                      return date.toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute:
                          timePeriod === 'Last Hour' ? '2-digit' : undefined,
                        hour12: true,
                      });
                    },
                    maxTicksLimit: timePeriod === 'Last Hour' ? 6 : 24, // Ensure 6 ticks for Last Hour, 24 for Last Day
                    maxRotation: 0,
                    padding: 10,
                  },
                },

                y: {
                  title: {
                    display: true,
                    text: 'CPU Usage (%)',
                  },
                },
              },
              plugins: {
                legend: {
                  display: true,
                },
                tooltip: {
                  callbacks: {
                    label: (context) =>
                      `CPU Usage: ${context.raw.toFixed(2)}%`,
                  },
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DynamicChart;
