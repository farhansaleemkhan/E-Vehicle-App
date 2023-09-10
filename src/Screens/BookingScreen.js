import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Components/Loader';
import Error from '../Components/Error';
import moment from "moment"
import swal from "sweetalert2";
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
    duration : 1000
  });


const BookingScreen = () => {

    const [parking, setParking] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [totalAmount, setTotalAmount]=useState();

    const { parkingid , fromDate, toDate } = useParams();

    const fromdate =moment(fromDate , 'DD-MM-YYYY')//for total days count
    const todate =moment(toDate , 'DD-MM-YYYY')//for total days count
    const totalDays=moment.duration(todate.diff(fromdate)).asDays()+1;

    useEffect(() => {
        const fetchData = async () => {
            if(!localStorage.getItem('currentUser')){
                window.location.reload='/login'
            }
            try {
                setLoading(true);
                const data = (await axios.post('/api/Parkings/getparkingbyid', { parkingid: parkingid })).data;
                setTotalAmount(totalDays * data.rentperday);
                setParking(data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(true);
            }
        }
        fetchData()
    }, [])

    async function bookParking(){
        const bookingDetails={
            parking,
            user: JSON.parse(localStorage.getItem('currentUser')),
            fromDate,
            toDate,
            totalAmount,
            totalDays
        }
        try {
            const result=await axios.post('/api/bookings/bookparking', bookingDetails)
            setLoading(false)
            swal.fire('Congrats' , 'Parking Booked Successfully' , 'Success')
        } catch (error) {
            setLoading(false)
            setError(true)
            swal.fire('Oops','Someting Went Wrong','error')
        }
    }


    return (
        <div className='m-5 shadow' data-aos='flip-left'>
            {loading ? (<Loader />) : parking ? (
            <div>
                <div className='row justify-content-center mt-5 shadow'>
                    <div className='col-md-6'>
                        <h1>{parking.name}</h1>
                        <img src={parking.image[0]} className='bigimg'></img>
                    </div>
                    <div className='col-md-6'>
                        <h1>Booking Details</h1>
                        <hr />
                        <div style={{ textAlign: 'right' }}>
                            <b>
                                <p>Name: {JSON.parse(localStorage.getItem('currentUser')).name}</p>
                                <p>From Date: {fromDate}</p>
                                <p>To Date: {toDate}</p>
                                {/* <p>Max Count: {parking.maxcount}</p> */}
                            </b>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <b>
                                <h1>Amount </h1>
                                <hr />
                                <p>Total Days: {totalDays}</p>
                                <p>Rent Per Day: {parking.rentperday}</p>
                                <p>Total Amount: {totalAmount}</p>
                            </b>
                        </div>
                        <div style={{ float: 'right' }}>
                            <button className='btn btn-success' onClick={bookParking}>Pay Now</button>
                        </div>
                    </div>
                </div>
            </div>) : (<Error message="Something went wrong, Please try again later." />)}
        </div>
    )
}

export default BookingScreen;