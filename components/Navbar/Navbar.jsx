"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { Button } from "../ui/button";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../ui/avatar";
import { LogOut, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { ModeToggle } from "../dark-mode";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get("/api/user/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        router.push("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-white/10 
    bg-white/80 dark:bg-linear-to-r dark:from-[#0f172a]/90 dark:via-[#1e1b4b]/90 dark:to-[#312e81]/90 
    backdrop-blur-lg text-gray-800 dark:text-white shadow-sm dark:shadow-md">

      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight bg-linear-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent"
        >
          BitLinks
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
          {["Home", "About", "Shorten", "My-Urls"].map((item) => (
            <Link key={item} href={`/${item === "Home" ? "" : item.toLowerCase()}`}>
              <li className="relative group cursor-pointer">
                <span className="group-hover:text-purple-500 dark:group-hover:text-purple-300 transition">
                  {item}
                </span>
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full"></span>
              </li>
            </Link>
          ))}

          <Link href="/shorten">
            <button className="ml-2 px-4 py-1.5 rounded-md bg-linear-to-r from-purple-500 to-indigo-500 hover:opacity-90 transition font-semibold shadow-md text-white">
              Try Now
            </button>
          </Link>
        </ul>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-3">

          {/* 🌗 Mode Toggle */}
          <div className="rounded-md border border-gray-200 dark:border-white/20 
          bg-white dark:bg-transparent 
          hover:bg-gray-100 dark:hover:bg-white/10 transition">
            <ModeToggle />
          </div>

          {!user ? (
            <>
              <Link href="/login">
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-100 
                  dark:border-white/20 dark:text-white dark:hover:bg-white/10"
                >
                  Login
                </Button>
              </Link>

              <Link href="/signup">
                <Button className="bg-linear-to-r from-purple-500 to-indigo-500 hover:opacity-90 shadow-md text-white">
                  Signup
                </Button>
              </Link>
            </>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer ring-2 ring-purple-500/40 hover:ring-purple-400 transition">
                  <AvatarImage src={user?.profile?.profilePhoto} />
                  <AvatarFallback>
                    {user?.fullName?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>

              <PopoverContent
                align="end"
                sideOffset={10}
                className="w-72 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-200 dark:border-gray-700 shadow-xl rounded-xl"
              >
                <div className="flex gap-3 items-center">
                  <Avatar>
                    <AvatarImage src={user?.profile?.profilePhoto} />
                    <AvatarFallback>
                      {user?.fullName?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {user?.fullName}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <Button
                    onClick={logoutHandler}
                    variant="ghost"
                    className="w-full flex items-center gap-2 justify-start text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <LogOut size={16} /> Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-white/10 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-[#0f172a] border-t border-gray-200 dark:border-white/10 px-6 py-6 flex flex-col gap-5 text-center backdrop-blur-lg">

          {["Home", "About", "Shorten", "My-Urls"].map((item) => (
            <Link
              key={item}
              href={`/${item === "Home" ? "" : item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="text-lg hover:text-purple-500 dark:hover:text-purple-400 transition"
            >
              {item}
            </Link>
          ))}

          <Link href="/shorten" onClick={() => setMenuOpen(false)}>
            <button className="w-full py-2 rounded-md bg-linear-to-r from-purple-500 to-indigo-500 text-white">
              Try Now
            </button>
          </Link>

          {/* 🌗 Toggle Centered */}
          <div className="flex justify-center">
            <div className="rounded-md border border-gray-200 dark:border-white/20 
            bg-white dark:bg-transparent 
            hover:bg-gray-100 dark:hover:bg-white/10 transition">
              <ModeToggle />
            </div>
          </div>

          {!user ? (
            <>
              <Link href="/login" onClick={() => setMenuOpen(false)}>
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>

              <Link href="/signup" onClick={() => setMenuOpen(false)}>
                <Button className="w-full bg-linear-to-r from-purple-500 to-indigo-500 text-white">
                  Signup
                </Button>
              </Link>
            </>
          ) : (
            <Button
              variant="ghost"
              onClick={() => {
                logoutHandler();
                setMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 text-red-500"
            >
              <LogOut size={16} /> Logout
            </Button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar; 