import React from 'react'
import { NavLink } from "react-router-dom"
function HomeFooter(){
    return(
        <>
        <footer className="p-4 bg-white dark:bg-gray-800">
  <div className="mx-auto max-w-screen-xl text-center z-10">
      <ul className="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
          <li>
              <NavLink to="#" className="mr-4 hover:underline md:mr-6 ">About</NavLink >
          </li>
          <li>
              <NavLink to="#" className="mr-4 hover:underline md:mr-6">Premium</NavLink >
          </li>
          <li>
              <NavLink to="#" className="mr-4 hover:underline md:mr-6 ">Campaigns</NavLink >
          </li>
          <li>
              <NavLink to="#" className="mr-4 hover:underline md:mr-6">Blog</NavLink >
          </li>
          <li>
              <NavLink to="#" className="mr-4 hover:underline md:mr-6">Affiliate Program</NavLink >
          </li>
          <li>
              <NavLink to="#" className="mr-4 hover:underline md:mr-6">FAQs</NavLink >
          </li>
          <li>
              <NavLink to="#" className="mr-4 hover:underline md:mr-6">Contact</NavLink >
          </li>
      </ul>
  </div>
</footer>
        </>
    )
}

export default HomeFooter 