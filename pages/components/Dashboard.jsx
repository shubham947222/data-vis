'use client'
import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    Filler,
} from 'chart.js';
import 'chartjs-plugin-zoom';
import { useRouter } from 'next/router';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    Filler
);

const Dashboard = () => {
    const [chartData, setChartData] = useState({});
    const [dateRange, setDateRange] = useState(['2022-04-10', '2022-04-10']);
    const [ageFilter, setAgeFilter] = useState('all');
    const [genderFilter, setGenderFilter] = useState('all');

    const router = useRouter();
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/data');
            const data = await response.json();
            processData(data);
        };

        fetchData();
    }, [ageFilter, genderFilter, dateRange]);

    useEffect(() => {
        const query = router.query;

        if (query.age) setAgeFilter(query.age);
        if (query.gender) setGenderFilter(query.gender);
    }, [router.query]);

    const processData = (data) => {
        const filteredData = data.filter((item) => {
            const isAgeValid = ageFilter === 'all' || item.Age === ageFilter;
            const isGenderValid = genderFilter === 'all' || item.Gender === genderFilter;
            return isAgeValid && isGenderValid;
        });

        const labels = filteredData.map((item) => item.Day);
        const datasetA = filteredData.map((item) => item.A);
        const datasetB = filteredData.map((item) => item.B);
        const datasetC = filteredData.map((item) => item.C);

        setChartData({
            labels: labels,
            datasets: [
                {
                    label: 'Feature A',
                    data: datasetA,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                },
                {
                    label: 'Feature B',
                    data: datasetB,
                    backgroundColor: 'rgba(153, 102, 255, 0.6)',
                },
                {
                    label: 'Feature C',
                    data: datasetC,
                    fill: false,
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    type: 'line',
                },
            ],
        });
    };

    const handleAgeFilterChange = (event) => {
        const newAgeFilter = event.target.value;
        setAgeFilter(newAgeFilter);

        router.push({
            pathname: '/',
            query: { ...router.query, age: newAgeFilter },
        }, undefined, { shallow: true });
    };

    const handleGenderFilterChange = (event) => {
        const newGenderFilter = event.target.value;
        setGenderFilter(newGenderFilter);

        router.push({
            pathname: '/',
            query: { ...router.query, gender: newGenderFilter },
        }, undefined, { shallow: true });
    };

    return (
        <div >
            <h1 className='text-black'>Data Visualization Dashboard</h1>

            <div className='flex gap-2 mx-2'>
                <label className='text-black'>
                    Age Filter:
                    <select value={ageFilter} onChange={handleAgeFilterChange}>
                        <option value="all">All</option>
                        <option value="15-25">15-25</option>
                        <option value=">25"> 25</option>
                    </select>
                </label>
                <label className='text-black'>
                    Gender Filter:
                    <select value={genderFilter} onChange={handleGenderFilterChange}>
                        <option value="all">All</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </label>
            </div>

            {chartData?.labels && (
                <div style={{ display: 'flex', flexWrap: "wrap" }}>
                    <div style={{ margin: '20px', width: '600px', height: '500px' }}>
                        <Bar
                            data={chartData}
                            options={{
                                indexAxis: 'y',
                                responsive: true,
                                plugins: {
                                    legend: {
                                        display: true,
                                    },
                                },
                                scales: {
                                    x: {
                                        title: {
                                            display: true,
                                            text: 'Total Time Spent',
                                        },
                                    },
                                    y: {
                                        title: {
                                            display: true,
                                            text: 'Date',
                                        },
                                    },
                                },
                            }}
                            width={600}
                            height={500}
                        />
                    </div>

                    <div style={{ margin: '20px', width: '600px', height: '400px' }}>
                        <Line
                            data={{
                                labels: chartData.labels,
                                datasets: [
                                    {
                                        label: 'Feature C (Line)',
                                        data: chartData.datasets[2]?.data,
                                        fill: false,
                                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                        borderColor: 'rgba(255, 99, 132, 1)',
                                    },
                                ],
                            }}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: {
                                        display: true,
                                    },
                                },
                                scales: {
                                    x: {
                                        title: {
                                            display: true,
                                            text: 'Date',
                                        },
                                    },
                                    y: {
                                        title: {
                                            display: true,
                                            text: 'Total Time Spent',
                                        },
                                    },
                                },
                            }}
                            width={1000}
                            height={1000}
                        />
                    </div>
                </div>
            )}

        </div>
    );
};

export default Dashboard;
