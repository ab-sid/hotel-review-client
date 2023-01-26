import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import img from '../../../assets/421-4213036_avatar-hd-png-download.png'
import './Header.css';
const Header = () => {
    const { user, logOut } = useContext(AuthContext);
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(err => console.log(err))
    }
    return (
        <div className="navbar bg-primary-focus">
            <div className="flex-1 text-white">
                <Link to='/'>
                    <a className="btn btn-ghost normal-case ab lg:text-xl">Hotel Review</a>
                </Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal text-white px-1">
                    <div className="avatar">
                        {/* <div className="w-12">
                            {user?.photoURL ? <img src={user.photoURL} className='img-style2' alt="" srcset="" /> : <img src={img} alt="" srcset="" />}
                        </div> */}
                    </div>
                    {/* <li><h1>{user?.uid ? 'Hello' : ''} {user?.displayName}</h1></li> */}
                    <li><Link to='/home'>Home</Link></li>
                    <li><Link to='/addhotel'>Add Hotel</Link></li>
                    {user?.uid ?
                        <>
                            <li><button onClick={handleLogOut}>LogOut</button></li>
                        </>
                        :
                        <>
                            <li><Link to='/login'>Login</Link></li>
                        </>
                    }
                </ul>
            </div>
        </div>

    );
};

export default Header;