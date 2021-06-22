import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2'
import { SyncLoader } from 'react-spinners'

import CountyDropdown from '../CountyDropdown';
import { formatVisitorGraphData } from '../../../util/dataFormatters';
import { fetchCountyVisitors } from '../../../util/fetchFunctions';

const options = {
    plugins: {
        legend: {
            display: false
        },
    },
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
};

export default function CountyTraffic(props) {
    const { counties, setPageAlert } = props
    const [county, setCounty] = useState(props.counties[0])
    const [visitors, setVisitors] = useState()
    const [barData, setBarData] = useState()

    async function getCountyVisitors() {
        const res = await fetchCountyVisitors(county._id)
        if (res.type === 'Success') {
            const fetchedVisitors = res.data
            setVisitors(fetchedVisitors)
        }
        setPageAlert({ type: res.type, message: res.message })

    }

    useEffect(() => {
        getCountyVisitors()
    }, [county])

    useEffect(() => {
        setBarData(formatVisitorGraphData(visitors))
    }, [visitors])

    function renderLoading() {
        return (
            <div className='h-screen flex justify-center items-center'>
                <SyncLoader color={'#374151'} />
            </div>
        )
    }

    return (
        county && visitors && barData ?
            <div className='w-11/12 max-w-3xl m-auto mt-12 p-4 bg-gray-200 flex flex-col'>
                <div className='flex items-center mb-4 px-3'>
                    <p className='text-xl'>{county.name} County</p>
                    <div className='flex items-center ml-auto w-32'>
                        <CountyDropdown selected={county.name} counties={counties} setCounty={setCounty} />
                    </div>
                </div>

                <Bar data={barData} options={options} />
            </div>
            :
            renderLoading()
    )
}