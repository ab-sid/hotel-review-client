import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Star from '../../Star/Star';

const HotelCard = ({ hotel }) => {
    const { _id, image, name, location } = hotel;
    const [rev, setRev] = useState([]);
    let add = 0;
    for (let i = 0; i < rev.length; i++) {
        add += parseFloat(rev[i].overall)
    }
    const average = add / rev.length;

    useEffect(() => {
        fetch(`http://localhost:5000?name=${name}`)
            .then(res => res.json())
            .then(data => setRev(data))
    }, [])
    return (
        <div className=''>
            <div className="card card-compact w-96 bg-base-100 shadow-xl">
                <figure><img className='w-full h-60' src={image} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">Name: {name}</h2>
                    <p>Location: {location}</p>
                    {/* <p>Rating: {average ? average : 0}</p> */}
                    <div className='grid grid-cols-3'>
                        <Star average={average}></Star>
                    </div>
                    <div className="card-actions justify-end">
                        <Link to={`/review/${_id}`}>
                            <button className="btn btn-primary">Add Your Review</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelCard;