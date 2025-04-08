
import { ErrorCard } from '@/components/auth/ErrorCard'
import { Button } from '@/components/ui/button'
import { currentUser } from '@/lib/auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const AthErrorPage = async() => {
  const isLoggedIn = await currentUser()

if(isLoggedIn){
  redirect("/")
} else{
  return (
    <div className="hostel-bg min-h-screen flex items-center justify-center p-4">
    {/* Animated background shapes */}
    <div className="hostel-shape shape-1 animate-float" style={{ animationDelay: "0s" }}></div>
    <div className="hostel-shape shape-2 animate-float" style={{ animationDelay: "1s" }}></div>
    <div className="hostel-shape shape-3 animate-float" style={{ animationDelay: "2s" }}></div>
    <div className="hostel-shape shape-4 animate-float" style={{ animationDelay: "1.5s" }}></div>
    <div>
      <ErrorCard/>
      <Link href={"/"}>
 <Button
 className='text-center mt-4 w-full'
 variant={"link"}
 >
  Go Back Home
 </Button>
      </Link>

      <Link href={"/auth/login"}>  
 <Button
 className='text-center  w-full'
 variant={"link"}
 >
  Go Back Login
 </Button>
      </Link>
    </div>
  </div>
  )
}
}

export default AthErrorPage;