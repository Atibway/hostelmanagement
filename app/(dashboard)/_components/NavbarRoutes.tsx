"use client";

import { usePathname, useRouter } from "next/navigation";
import { ModeToggle } from "@/components/modeToggler";
import { Button } from "@/components/ui/button";
import { BedDouble, LogOutIcon, Menu } from "lucide-react";
import Link from "next/link";


import { useCurrentUser } from "@/hooks/use-current-user";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { signOut } from "next-auth/react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export const NavbarRoutes = () => {
  const user = useCurrentUser();
  const router = useRouter();
  const pathName = usePathname()
  const handleLogout = () => {
    signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <div>
      <header
        className="px-4 lg:px-6 fixed top-0 z-50 w-full flex items-center h-[80px] bg-white dark:bg-primary-foreground dark:text-white justify-between shadow-md"
      >
        {/* Logo */}
        <Link className="flex items-center" href="/">
          <BedDouble className="h-6 w-6" />
          <span className="ml-2 text-2xl font-bold">HostelWorld</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="ml-auto hidden lg:flex gap-4">
          <div className="flex items-center space-x-6">
            {user?.role === "ADMIN" && (
              <>
              {pathName.startsWith("/admin")? (
              <Link
              href={"/"}
              >
                <Button>
              Exit
                </Button>
              </Link>
              ):(
                <Link
              href={"/admin"}
              >
                <Button>
              Dashboard
                </Button>
              </Link> 
              )}
              </>
            )}
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="/admin/hostels"
            >
              Hostels
            </Link>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="/admin/bookings"
            >
              Bookings
            </Link>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="/admin/users"
            >
              Users
            </Link>
        
          </div>

          {/* User Avatar or Login/Logout */}
          {user?.image && (
            <Avatar className="ml-4">
              <AvatarImage src={user?.image || ""} />
            </Avatar>
          )}
          <div>
            {user ? (
              <Button variant="ghost" onClick={handleLogout}>
                <span className="flex items-center">
                  Logout
                  <LogOutIcon className="h-4 w-4 ml-1 text-destructive" />
                </span>
              </Button>
            ) : (
              <Link href="/auth/login">
                <Button variant="ghost">Login</Button>
              </Link>
            )}
          </div>
          <div>
          <ModeToggle />
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center space-x-3 lg:hidden">
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Menu className="h-6 w-6 cursor-pointer" />
            </SheetTrigger>
            <SheetContent
              className="dark:bg-primary-foreground dark:text-white bg-white"
              side="right"
            >
              <SheetHeader>
                <Link className="flex items-center" href="/">
                  <BedDouble className="h-6 w-6" />
                  <span className="ml-2 text-2xl font-bold">HostelWorld</span>
                </Link>
                <SheetDescription>Navigate through our pages</SheetDescription>
              </SheetHeader>
              <nav className="mt-4 flex flex-col gap-4">
              {user?.role === "ADMIN" && (
              <>
              {pathName === "/admin"? (
              <Link
              href={"/"}
              >
                <Button
                className="w-full"
                >
              Exit
                </Button>
              </Link>
              ):(
                <Link
              href={"/admin"}
              >
                <Button
                className="w-full"
                >
              Dashboard
                </Button>
              </Link> 
              )}
              </>
            )}
                <Link href="/admin/hostels">
                  <Button className="w-full">Hostels</Button>
                </Link>
                <Link href="/admin/bookings">
                  <Button className="w-full">Bookings</Button>
                </Link>
                <Link href="/admin/users">
                  <Button className="w-full">Users</Button>
                </Link>

                <div>
                  {user ? (
                    <Button
                      onClick={handleLogout}
                      className="w-full text-destructive"
                    >
                      Logout
                      <LogOutIcon className="h-4 w-4 ml-1" />
                    </Button>
                  ) : (
                    <Link href="/auth/login">
                      <Button className="w-full">Login</Button>
                    </Link>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      {/* Add padding-top to offset fixed header height */}
      <div className="h-[80px]" />
    </div>
  );
};
