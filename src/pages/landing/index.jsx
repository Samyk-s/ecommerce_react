import React from 'react';
import HomeHeader from "../../components/headers/header.component";
import HomeFooter from "../../components/footers/footer.component";
import { Outlet } from "react-router-dom"; // Use Outlet to render the page-specific content

function HomePageLayout() {
  return (
    <>
      <HomeHeader />  {/* Header will be visible on all pages */}
      
      
        <Outlet />  {/* Page-specific content will be rendered here */}
      

      <HomeFooter />  {/* Footer will be visible on all pages */}
    </>
  );
}

export default HomePageLayout;
