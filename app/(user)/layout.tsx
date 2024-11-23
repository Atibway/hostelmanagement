
import { NavbarRoutes } from '@/components/NavbarRoutes';
import React from 'react'


const DashboardLayout = ({
    children
}:
{
    children: React.ReactNode;
}) => {
  
  return (
    <>
    <NavbarRoutes/>
    <div className='max-h-screen'>
        {children}
    </div>
    </>
    
  )
}

export default DashboardLayout