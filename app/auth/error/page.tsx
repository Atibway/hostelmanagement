
import { ErrorCard } from '@/components/auth/ErrorCard'
import { currentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import React from 'react'

const AthErrorPage = async() => {
  const isLoggedIn = await currentUser()

if(isLoggedIn){
  redirect("/")
} else{
  return (
    <div className="relative flex items-center justify-center ">
    <div className="z-50  mt-10 lg:t-20">
    <ErrorCard/>
    </div>
  </div>
  )
}
}

export default AthErrorPage;