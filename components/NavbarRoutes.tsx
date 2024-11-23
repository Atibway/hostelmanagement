"use client"

import {  useRouter } from "next/navigation"

import { ModeToggle } from "./modeToggler"
import { Button } from "./ui/button"
import {  LogOutIcon } from "lucide-react"
import Link from "next/link"
import { useCurrentRole } from "@/hooks/use-current-role"
import { Avatar, AvatarImage } from "./ui/avatar"
import { useCurrentUser } from "@/hooks/use-current-user"
import { HopIcon, Menu } from "lucide-react"


import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { signOut } from "next-auth/react"



export const NavbarRoutes = () => {
 
const userRole = useCurrentRole()
  
const user = useCurrentUser()
const router = useRouter()

const onclick = ()=>{
   signOut()
   router.push("/")
   router.refresh()
}

  return (
    <div>
<header className="px-4 lg:px-6 flex items-center h-[80px] dark:bg-primary-foreground dark:text-white justify-between ">
<Link className="flex items-center justify-center" href="/">
 <HopIcon/>
  <span className="text-primary">FcBlogs</span>
</Link>

<nav className="ml-auto hidden lg:flex  gap-4 sm:gap-6">
  <div className="flex space-x-4 mt-2">

  <Link className="text-sm font-medium hover:underline underline-offset-4 mt-[1px]" href="/">
    Home
  </Link>
  {userRole === "ADMIN" && user?.email ==="ainebyoonaatiidu@gmail.com" && (
    <Link className="text-sm font-medium hover:underline underline-offset-4 mt-[1px]" href="/settings">
    Users
  </Link>
  )}
  <Link className="text-sm font-medium hover:underline underline-offset-4 mt-[1px]" href="/about">
    About
  </Link>
  
  <Link className="text-sm font-medium hover:underline underline-offset-4 mt-1" href="/blogs">
    Blogs
  </Link>
  </div>
  {user?.image && (

<>
<Avatar className="mb-1">
    <AvatarImage
    
    src={user?.image || ""} />
  </Avatar>
    </>
)}
<div>
          {user? (
           
       <Button 
       onClick={onclick}
       variant={"ghost"}>
              <span
              className="flex mt-2"
              >
                    Logout
                    <LogOutIcon className="h-4 w-4 ml-1 mt-1 text-destructive"/>
              </span>
       </Button>
            
                
          ):(
            <Link
          href={"/auth/login"}
            >
            
            <Button
            variant={"ghost"}
            >
              Login
            </Button>
            </Link>
          )}
        </div>
</nav>
<div className="flex space-x-3">
  <div className="lg:mt-[-15px] lg:ml-2">

<ModeToggle/>
  </div>
<Sheet>
  <SheetTrigger asChild>
    <span className="lg:hidden">
      <Menu className="h-6 w-6" />
      <span className="sr-only">Toggle navigation menu</span>
    </span>
  </SheetTrigger>
  <SheetContent className="dark:bg-primary-foreground dark:text-white bg-white" side="right">
    <SheetHeader>
      <SheetTitle>Routes</SheetTitle>
      <SheetDescription>Navigate through the blog</SheetDescription>
    </SheetHeader>
    <nav className="flex mt-2 flex-col gap-4 w-full ">
      <Link className="text-sm font-medium hover:underline underline-offset-4" href="/">
      <Button
      className="w-full"
      >
        Home
      </Button>
      </Link>
      <Link className=" text-sm font-medium hover:underline underline-offset-4" href="/about">
      <Button className="w-full">

        About
      </Button>
      
      </Link>
      <div>
      {userRole === "ADMIN" && user?.email ==="ainebyoonaatiidu@gmail.com" && (
    <Link className="text-sm font-medium hover:underline underline-offset-4 mt-[1px]" href="/settings">
    <Button className="w-full">

Users
</Button>
  </Link>
  )}
      </div>
      <Link className="text-sm font-medium hover:underline underline-offset-4" href="/blogs">
      <Button className="w-full">
        Blogs
      </Button>
      </Link>
    
     
     
      <div>
          {user? (
    
              <Button
              onClick={onclick}
              className="flex mt-2 w-full"
              >
                    Logout
                    <LogOutIcon className="h-4 w-4 ml-1 mt-1 text-destructive"/>
              </Button>
       
         
                
          ):(
            <Link
          href={"/auth/login"}
            >
            
            <Button className="w-full">
              Login
            </Button>
            </Link>
          )}
        </div>

      
    </nav>
  </SheetContent>
</Sheet>
</div>
</header>
    </div>
  )
}
