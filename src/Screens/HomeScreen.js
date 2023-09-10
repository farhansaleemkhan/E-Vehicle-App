import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { DatePicker, Space } from 'antd';
import Parking from '../Components/Parking';
import Loader from '../Components/Loader';

const { RangePicker } = DatePicker;

const HomeScreen = () => {
    const[parkings, setParkings]=useState([]);
    const[loading, setLoading]=useState();
    const[error, setError]=useState();
    const[fromDate, setFromDate]=useState();
    const[toDate, setToDate]=useState();
    const[duplicateParking, setDuplicateParking]=useState([]);
    const [searchKey, setSearchKey]=useState('');
    const [type, setType]=useState('all');

    useEffect(()=>{
        // (async function() {
        const fetchData=async () =>{
            try {
                setLoading(true);
                // const data = (await axios.get('/api/Parkings/getallparkings')).data
                // console.log(data)
                // setParkings(data);
                // setDuplicateParking(data);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        }
        fetchData()
        // })();
    },[])

    function filterByDate(dates){
        setFromDate(moment(dates[0].format('DD-MM-YYYY')));
        setToDate(moment(dates[1].format('DD-MM-YYYY')));

        let tempParkings=[]
        let availability=false;
        for(const parking of duplicateParking){
            if(parking.currentbooking.length>0){
                for(const booking of parking.currentbooking){
                    if(!moment(moment(dates[0]).format('DD-MM-YYYY')).isBetween(booking.fromDate, booking.toDate) && !moment(moment(dates[1]).format('DD-MM-YYYY')).isBetween(booking.fromDate, booking.toDate)){
                        if(moment(dates[0]).format("DD-MM-YYYY") !== booking.fromDate && moment(dates[0]).format("DD-MM-YYYY") !== booking.toDate && moment(dates[1]).format("DD-MM-YYYY") !== booking.fromDate && moment(dates[1]).format("DD-MM-YYYY") !== booking.toDate){
                            availability = true;
                        }
                    }
                }
            }
            if(availability === true || parking.currentbooking.length === 0){
                tempParkings.push(parking)
            }
            setParkings(tempParkings)
        }
    }
    function filterBySearch(){
        const tempParkings = duplicateParking.filter(parking=>parking.name.toLowerCase().includes(searchKey.toLowerCase()))
        setParkings(tempParkings)
    }
    function filterByType(e){
        setType(e)
        if(e!=='all'){
            const tempParkings=duplicateParking.filter(parking=>parking.type.toLowerCase()===e.toLowerCase())
            setParkings(tempParkings)
        }
        else{
            setParkings(duplicateParking)
        }
    }

  return (
    <div className='container'>
        <div className='row mt-5 shadow'>
            <div className='col-md-3'>
                <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
            </div>

            <div className='col-md-5'>
                <input type='text' className='form-control' placeholder='Search Parkings' value={searchKey} onChange={(e)=>{setSearchKey(e.target.value)}} onKeyUp={filterBySearch} />
            </div>
            
            <div className='col-md-3'>
                <select className='form-control' value={type} onChange={(e)=>{filterByType(e.target.value)}}>
                    <option value='all'>All</option>
                    <option value='covered'>Covered</option>
                    <option value='non-covered'>Non-Covered</option>
                </select>
            </div>
        </div>

        <div className='row justify-content-center mt-5'>
        {loading ? (<Loader />) : (parkings.map(parking=>{
            return <div className='col-md-9 mt-2'>
                <Parking parking={parking} fromDate={fromDate} toDate={toDate} />
                </div>
        }))}
        </div>
    </div>
  )
}

export default HomeScreen;