import appConfig from "../config/app.config";
import { useState, useEffect, useCallback } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Customers who can be recommended umbrellas',
      },
    },
  };



export function TopCustomersChart() {

    const [chartData, setChartData] = useState(
        {
            labels:[],
            datasets: [],
        } 
    );


    const getTopCustomers = useCallback(async () => {
        try {
            const resp = await fetch(appConfig.apiUrl + "top")
            const jsonData = await resp.json()
            
            const labels = jsonData.map(element=>element.name)
            const dataSet = jsonData.map(element=>element.numberOfEmployees) 
            console.log(labels, dataSet)

            setChartData(
                {
                    labels,
                    datasets: [
                      {
                        label: 'Customer Number of Employees',
                        data: dataSet,
                        backgroundColor: 'rgba(34,139,34, 0.5)',
                      },
                    ],
                }
            )

        } catch {
            console.error({ message: "error happened on getting top customers" })
        }
    },[])

    useEffect(() => {
        getTopCustomers()
    }, [getTopCustomers])


    return <div>
        <Bar options={options} data={chartData} />
    </div>
}