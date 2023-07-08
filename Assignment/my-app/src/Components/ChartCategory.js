
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const ChartCategory = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/products');
      const serviceCategories = response.data.reduce((acc, product) => {
        const serviceCategory = product.ServiceCategory;
        if (serviceCategory && !acc.includes(serviceCategory)) {
          acc.push(serviceCategory);
        }
        return acc;
      }, []);
      const chartData = serviceCategories.map(serviceCategory => {
        const count = response.data.filter(product => product.ServiceCategory === serviceCategory).length;
        return { name: serviceCategory, value: count };
      });
      setData(chartData);
    } catch (error) {
      console.log(error);
    }
  };

  const COLORS = ['#36A2EB', '#FFCE56', '#FF6384', '#FF8A76'];

  return (
    <div>
      
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
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
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartCategory;