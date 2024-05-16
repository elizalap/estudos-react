import { Navigate, createBrowserRouter, } from 'react-router-dom';
import Login from "./assets/views/Login.jsx";
import Signup from "./assets/views/Signup.jsx";
import Users from "./assets/views/Users.jsx";
import NotFound from "./assets/views/NotFound.jsx";
import Dashboard from "./assets/views/Dashboard.jsx";
import DefaultLayout from './assets/components/DefaultLayout.jsx';
import GuestLayout from './assets/components/GuestLayout.jsx';

const router = createBrowserRouter([
   {
      path: '/',
      element: <DefaultLayout />,
      children: [
         {
            path: "/",
            element: <Navigate to="/users" />
         },
         {
            path: '/dashboard',
            element: <Dashboard />,
         },
         {
            path: '/users',
            element: <Users />,
         },
      ]
   },
   {
      path: "/",
      element: <GuestLayout />,
      children: [
         {
            path: '/login',
            element: <Login />
         },
         {
            path: '/signup',
            element: <Signup />
         },
      ]
   },
   {
      path: '*',
      element: <NotFound />
   },
])
export default router;