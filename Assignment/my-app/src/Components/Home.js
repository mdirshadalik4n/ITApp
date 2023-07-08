import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import ChartService from './ChartService';
import ChartCategory from './ChartCategory';
import NavBar from './Navbar';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/products');
      const chartData = response.data.reduce((acc, product) => {
        const status = product.Status;
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      }, {});
      setData(Object.entries(chartData).map(([name, value]) => ({ name, value })));
    } catch (error) {
      console.log(error);
    }
  };

  const COLORS = ['#36A2EB', '#FFCE56', '#FF6384'];
  const chartStyle = {
    stroke: 'none',
    strokeWidth: 0,
  };

  return (
    <div>
      <NavBar></NavBar>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div
          style={{
            flexBasis: '30%',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '10px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h3 style={{ fontSize: '14px', marginBottom: '10px' }}>Status Chart</h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart style={chartStyle}>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

                  return (
                    <text
                      x={x}
                      y={y}
                      fill="#fff"
                      textAnchor={x > cx ? 'start' : 'end'}
                      dominantBaseline="central"
                      fontSize={12}
                    >
                      {`${(percent * 100).toFixed(0)}%`}
                    </text>
                  );
                }}
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend iconType="circle" iconSize={10} wrapperStyle={{ paddingTop: '10px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div
          style={{
            flexBasis: '30%',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '10px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h3 style={{ fontSize: '14px', marginBottom: '10px' }}>Service Type - Chart</h3>
          <ChartService />
        </div>
        <div
          style={{
            flexBasis: '30%',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '10px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h3 style={{ fontSize: '14px', marginBottom: '10px' }}>Service Category - Chart</h3>
          <ChartCategory />
        </div>
      </div>
    </div>
  );
};

export default Home;