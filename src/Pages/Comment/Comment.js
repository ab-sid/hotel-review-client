import React from 'react';
import avatar1 from '../../assets/421-4213036_avatar-hd-png-download.png'

const Comment = ({ review }) => {
    const { userPhoto, userName, overall, comment } = review;
    return (
        <div className="chat chat-start">
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    {userPhoto ? <img src={userPhoto} alt="" srcset="" /> : <img src={avatar1} alt="" srcset="" />}
                </div>
            </div>
            <div className="chat-bubble">Name: {userName}<br />Rating: {overall}<br />Comment: {comment} </div>

        </div>
    );
};

export default Comment;