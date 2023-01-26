import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Login = () => {
    const { loginUser, googleLogin } = useContext(AuthContext);
    const googleProvider = new GoogleAuthProvider();
    const navigate = useNavigate();
    const handleGoogleLogin = () => {
        googleLogin(googleProvider)
            .then(result => {
                const user = result.user;
                console.log(user);
                navigate('/home')
            })
            .catch(err => console.error(err));
    }
    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        loginUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                // alert('Login Successful');
                // form.reset();
                navigate('/home');

            })
            .catch(err => console.error(err));
    }
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" name='email' placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                                <p>Already have an accout? <Link to='/signup'>Sign Up</Link></p>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>

                    </div>
                    <div className="form-control mt-6">
                        <button onClick={handleGoogleLogin} className="btn btn-primary">Continue with google</button>
                    </div>
                </div>
            </div>

        </div>

    );
};

export default Login;