"use client"

import { CardWrapper } from "./card-wrapper"
import { FormError } from "../form-error"
import { useSearchParams } from "next/navigation"
import { Button } from "../ui/button"
import Link from "next/link"


export const LoginForm = () => {
  const searchParams = useSearchParams()
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked"? "Email already in use with a different provider": "";
  
 
 

  return (
    <CardWrapper
    headerLabel="Welcome back To Being a Member of FcBlogs"
    showSocial
    >
       <FormError message={ urlError}/>
       <Link href={"/"}>
      <Button
      variant={"link"}
      >
        Back To Home Page
      </Button>
       </Link>
    </CardWrapper>
  )
}
