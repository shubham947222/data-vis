'use client'
import React, { useEffect, useState } from 'react';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from 'chart.js';
import dynamic from 'next/dynamic';

const Dashboard = dynamic(() => import('./components/Dashboard'), { ssr: false });


Chart.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement);

const ChartComponent = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const mockData = [
      { Day: '4/10/2022', Age: '15-25', Gender: 'Male', A: 370, B: 519, C: 233, D: 256, E: 211, F: 774 },
      { Day: '4/10/2022', Age: '>25', Gender: 'Male', A: 979, B: 787, C: 444, D: 408, E: 976, F: 556 },
      { Day: '4/10/2022', Age: '15-25', Gender: 'Female', A: 235, B: 333, C: 349, D: 643, E: 95, F: 11 },
      { Day: '4/10/2022', Age: '>25', Gender: 'Female', A: 49, B: 125, C: 375, D: 370, E: 875, F: 228 },
      { Day: '5/10/2022', Age: '15-25', Gender: 'Male', A: 735, B: 547, C: 303, D: 462, E: 686, F: 548 },
      { Day: '5/10/2022', Age: '>25', Gender: 'Male', A: 443, B: 257, C: 15, D: 893, E: 374, F: 790 },
    ];

    const labels = mockData.map(item => item.Day);
    const dataA = mockData.map(item => item.A);
    const dataB = mockData.map(item => item.B);
    const dataC = mockData.map(item => item.C);

    setChartData({
      labels,
      datasets: [
        {
          label: 'Feature A (Bar)',
          data: dataA,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          type: 'bar',
        },
        {
          label: 'Feature B (Bar)',
          data: dataB,
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1,
          type: 'bar',
        },
        {
          label: 'Feature C (Line)',
          data: dataC,
          fill: false,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2,
          type: 'line',
        },
      ],
    });
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', height: '400px', overflow: 'hidden' }}>
      <Dashboard />
    </div>
  );
};

export default ChartComponent;
