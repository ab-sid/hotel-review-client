import React from 'react';
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import './Star.css';

const Star = ({ average }) => {
    const x = average.toFixed(2)
    const y = parseFloat(x)
    const ratingStar = Array.from({ length: 5 }, (elem, index) => {
        let number = index + 0.5;
        return <span key={index}>
            {
                y >= index + 1 ? <FaStar /> : y >= number ? <FaStarHalfAlt /> : <AiOutlineStar />
            }
        </span>;
    });
    return (
        <div>
            <p>Rating: {y ? y : 0}</p>
            <div className='a mt-2'>
                <span className='a'> {ratingStar}</span>
            </div>
        </div>
    );
};

export default Star;