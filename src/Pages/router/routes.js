import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main";
import AddHotel from "../AddHotel/AddHotel";
import Home from "../Home/Home/Home";
import Login from "../Login/Login";
import Review from "../Review/Review";
import SignUp from "../SignUp/SignUp";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/home',
                element: <Home></Home>
            },
            {
                path: '/addhotel',
                element: <AddHotel></AddHotel>
            },
            {
                path: '/review/:id',
                element: <Review></Review>,
                loader: ({ params }) => fetch(`http://localhost:5000/hotels/${params.id}`)
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            }
        ]
    }
])