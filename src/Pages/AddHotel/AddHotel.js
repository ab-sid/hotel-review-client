import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddHotel = () => {
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    const navigate = useNavigate();

    const handleAddHotel = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const location = form.location.value;
        const image = form.image.files[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const hotel = {
                        name,
                        location,
                        image: imgData.data.url
                    }
                    fetch('http://localhost:5000/addhotel', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(hotel)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.acknowledged) {
                                alert('Hotel Added Successfully');
                                //Toast.success('Hotel Added Successfully')
                                form.reset();
                                navigate('/home');
                            }
                            console.log(data)
                        })
                }
            })



    }
    return (
        <div className='w-1/2 mx-auto mt-10'>
            <h1 className='text-2xl font-bold text-center mb-10'>Add Your Hotel</h1>
            <div>
                <form onSubmit={handleAddHotel}>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                        <input type="text" name='name' placeholder="Type hotel name" className="input input-bordered w-full max-w-xs" required />
                        <input type="text" name='location' placeholder="Type hotel location" className="input input-bordered w-full max-w-xs" required />
                        <input accept='image/*' type="file" name='image' className="file-input file-input-bordered w-full max-w-xs" required />
                        <br />
                        <input className='btn' type="submit" value="Add Hotel" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddHotel;