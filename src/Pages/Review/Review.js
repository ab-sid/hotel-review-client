import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import './Review.css';
import Comment from '../Comment/Comment';

const Review = () => {
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState('');
    const { user } = useContext(AuthContext);
    let add = 0;
    for (let i = 0; i < reviews.length; i++) {
        add += parseFloat(reviews[i].overall)
    }
    const average = add / reviews.length;

    useEffect(() => {
        fetch(`http://localhost:5000/review?id=${_id}`)
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])
    const { _id, name } = useLoaderData();

    const handleAddReview = event => {
        event.preventDefault();
        const form = event.target;
        const bed = form.bed.value;
        const washroom = form.washroom.value;
        const overall = form.overall.value;
        const comment = form.comment.value;
        if (isNaN(bed) || isNaN(washroom) || isNaN(overall)) {
            const msg = 'Please input a numeric number';
            setError(msg)
            return;
        }
        if (bed > 5 || washroom > 5 || overall > 5) {
            const msg = 'Please give review out of 5';
            setError(msg)
            return;
        }
        const review = {
            bed,
            washroom,
            overall,
            comment,
            id: _id,
            name,
            userName: user.displayName,
            userPhoto: user.photoURL
        }
        fetch('http://localhost:5000/addreview', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(review)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    alert('Review Added Successfully');
                    //Toast.success('Hotel Added Successfully')
                    form.reset();
                }
                const newReviews = [...reviews, data]
                setReviews(newReviews);
                console.log(data)
            })
    }
    return (
        <div>
            <div>
                <h1 className='text-2xl font-bold text-center mt-4 mb-12'>All Review of: {name}</h1>

                <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ml-6 mb-12'>
                    {
                        //reviews.map(review => <p key={review._id}> {review.userPhoto ? <img src={review.userPhoto} className="img-style" alt="" srcset="" /> : <img src={img} className="img-style" alt="" srcset="" />}<br />Name: {review.userName}<br /> Rating: {review.overall} <br /> Comment: {review.comment}</p>)
                        reviews.map(review => <Comment key={review._id} review={review}></Comment>)
                    }
                </div>
            </div>
            <h1 className='text-2xl font-bol text-center mt-6'>You are Reviewing of: <span className='text-2xl font-bold'>{name}</span></h1>

            <div className='w-1/2 mx-auto mt-10'>
                <div>
                    <form onSubmit={handleAddReview}>
                        <div className=''>
                            <label htmlFor="">Bed</label><br />
                            <input type="text" name='bed' placeholder="Type review out of 5" className="input input-bordered w-full max-w-xs" required /><br />

                            <label htmlFor="">Washroom</label><br />
                            <input type="text" name='washroom' placeholder="Type review out of 5" className="input input-bordered w-full max-w-xs" required /><br />
                            <br />

                            <label htmlFor="">Overall</label><br />
                            <input type="text" name='overall' placeholder="Type review out of 5" className="input input-bordered w-full max-w-xs" required /><br />
                            <br />
                            <label htmlFor="">Comment</label><br />
                            <textarea className="textarea textarea-bordered" name='comment' placeholder="Type your comment"></textarea>
                            <br />
                            <input className='btn' type="submit" value="Add Review" />
                            <p>{error}</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Review;