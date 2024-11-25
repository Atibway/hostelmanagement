
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
    <div className='min-h-screen dark:bg-primary-foreground'>
        {children}
    </div>
    </>
    
  )
}

export default DashboardLayout