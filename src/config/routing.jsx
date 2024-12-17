import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePageLayout from '../pages/landing';  // Layout Component
import About from '../pages/about/about';  // About page
import Landing from '../pages/landing/landing';  // Landing page
import Login from '../components/login/login.component';
import RegistrationForm from '../components/registration/registration.component';



// Define the routes using `createBrowserRouter`
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePageLayout />,  // Layout component that wraps the child pages
    children: [
      {
        index: true,  // Default route ("/")
        element: <Landing />,  
      },
      {
        path: "about",  // Route for "/about"
        element: <About />,  // About component
      },
      {
        path:"login",
        element:<Login />
      },
      {
        path:"register",
        element:<RegistrationForm/>
      }
    ],
  },
]);

// The Routing component now uses RouterProvider to provide the router to the app
const Routing = () => {
  return <RouterProvider router={router} />;
};

export default Routing;
