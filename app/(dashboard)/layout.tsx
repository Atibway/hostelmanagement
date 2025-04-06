
import React from 'react'
import { NavbarRoutes } from './_components/NavbarRoutes';
import { currentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';


const DashboardLayout = async({
    children
}:
{
    children: React.ReactNode;
}) => {
  const user = await currentUser()

  if(!user){
redirect("/auth/login")
  }
  if(user.role === "USER"){
    redirect("/")
  }
  return (
    <>
    <NavbarRoutes/>
    <div className='min-h-screen dark:text-white dark:bg-primary-foreground'>
        {children}
    </div>
    </>
    
  )
}

export default DashboardLayout