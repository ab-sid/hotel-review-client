import React, { useEffect, useState } from 'react';
import Banner from '../Banner/Banner';
import HotelCard from './HotelCard';

const Home = () => {
    const [hotels, setHotels] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/hotels')
            .then(res => res.json())
            .then(data => setHotels(data))
    }, [])
    return (
        <div>
            <Banner></Banner>
            <div className='container mx-auto'>
                <h1 className='text-2xl font-bold text-center mt-4'>All Hotels</h1>
                <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-7'>
                    {
                        hotels.map(hotel => <HotelCard key={hotel._id} hotel={hotel}></HotelCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;