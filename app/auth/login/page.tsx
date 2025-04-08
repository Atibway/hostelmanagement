"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LoaderPinwheelIcon } from "lucide-react";
import HostelLogo from '@/components/HostelLogo';
import { useCurrentUser } from '@/hooks/use-current-user';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormError } from '@/components/form-error';
import {FaGithub} from "react-icons/fa"
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";


const Index = () => {
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingGithub, setLoadingGithub] = useState(false);
    const searchParams = useSearchParams()
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked"? "Email already in use with a different provider": "";
  const isLoggedIn = useCurrentUser()
  const router = useRouter()
if(isLoggedIn){
  router.push("/")
} 


  const handleGoogleLogin = () => {
    setLoadingGoogle(true);
    signIn("google", {
      callbackUrl:DEFAULT_LOGIN_REDIRECT
  }).then(() => {
      setLoadingGoogle(false);
    }
    )
    
  };

  const handleGithubLogin = () => {
    setLoadingGithub(true);
    signIn("github", {
      callbackUrl:DEFAULT_LOGIN_REDIRECT
  }).then(() => {
      setLoadingGithub(false);
    })
  };



  return (
    <div className="hostel-bg min-h-screen flex items-center justify-center p-4">
      {/* Animated background shapes */}
      <div className="hostel-shape shape-1 animate-float" style={{ animationDelay: "0s" }}></div>
      <div className="hostel-shape shape-2 animate-float" style={{ animationDelay: "1s" }}></div>
      <div className="hostel-shape shape-3 animate-float" style={{ animationDelay: "2s" }}></div>
      <div className="hostel-shape shape-4 animate-float" style={{ animationDelay: "1.5s" }}></div>

      {/* Login Card */}
      <Card className="login-card w-full max-w-md mx-auto overflow-hidden">
        <CardHeader className="pb-0">
          <div className="flex flex-col items-center pt-4">
            <HostelLogo />
            <h1 className="text-2xl font-bold text-white">Login</h1>
          </div>
        </CardHeader>
        <CardContent className="px-8 py-6">
          {/* Social Login Options */}
          <div className="space-y-4">
            <Button
              variant="outline"
              className={`w-full bg-white text-gray-800 hover:bg-gray-100 flex items-center justify-center gap-2 h-11 ${loadingGoogle ? 'opacity-50 pointer-events-none' : ''}`}
              onClick={handleGoogleLogin}
              disabled={loadingGoogle}
            >
              {loadingGoogle ? (
                <LoaderPinwheelIcon className='animate-spin h-8 w-8'/>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    <path d="M1 1h22v22H1z" fill="none" />
                  </svg>
                  <span>Continue with Google</span>
                </>
              )}
            </Button>

            <Button
              variant="outline"
              className={`w-full bg-[#24292e] text-white hover:bg-[#1b1f23] flex items-center justify-center gap-2 h-11 ${loadingGithub ? 'opacity-50 pointer-events-none' : ''}`}
              onClick={handleGithubLogin}
              disabled={loadingGithub}
            >
              {loadingGithub ? (
               <LoaderPinwheelIcon className='animate-spin h-8 w-8'/>
              ) : (
                <>
                  <FaGithub size={20} />
                  <span>Continue with GitHub</span>
                </>
              )}
            </Button>
          </div>

        <FormError message={ urlError}/>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;


// import { LoginForm } from '@/components/auth/LoginForm'
// import { currentUser } from '@/lib/auth'
// import { redirect } from 'next/navigation'

// import React from 'react'

// const LoginPage =async () => {
//   const isLoggedIn = await currentUser()
// if(isLoggedIn){
//   redirect("/")
// } else{
//   return (
//     <LoginForm/>
//   )
// }
// }

// export default LoginPage;