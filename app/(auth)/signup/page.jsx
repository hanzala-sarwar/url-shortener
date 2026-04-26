"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { setLoading } from "@/redux/authSlice";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Signup = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.fullName || !input.email || !input.password) {
      return toast.error("All fields are required");
    }

    try {
      dispatch(setLoading(true));

      const res = await axios.post("/api/user/register", input, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.data.success) {
        toast.success(res.data.message);
        router.push("/login");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 
    bg-purple-50 dark:bg-[#0f172a] transition-colors">

      <form
        onSubmit={submitHandler}
        className="w-full max-w-md p-6 sm:p-8 rounded-2xl 
        bg-white dark:bg-[#020617] 
        border border-gray-200 dark:border-gray-800 
        shadow-md dark:shadow-xl"
      >
        {/* TITLE */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 
        text-gray-800 dark:text-white">
          Create Account
        </h1>

        {/* FULL NAME */}
        <div className="mb-4">
          <label className="block mb-1 text-sm text-gray-700 dark:text-gray-300">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={input.fullName}
            onChange={changeEventHandler}
            placeholder="Enter your name"
            className="w-full p-3 rounded-lg 
            border border-gray-300 dark:border-gray-700 
            bg-white dark:bg-[#0f172a] 
            text-gray-800 dark:text-white 
            placeholder:text-gray-400 dark:placeholder:text-gray-500
            focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="block mb-1 text-sm text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            placeholder="Enter email"
            className="w-full p-3 rounded-lg 
            border border-gray-300 dark:border-gray-700 
            bg-white dark:bg-[#0f172a] 
            text-gray-800 dark:text-white 
            placeholder:text-gray-400 dark:placeholder:text-gray-500
            focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-4">
          <label className="block mb-1 text-sm text-gray-700 dark:text-gray-300">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            placeholder="Enter password"
            className="w-full p-3 rounded-lg 
            border border-gray-300 dark:border-gray-700 
            bg-white dark:bg-[#0f172a] 
            text-gray-800 dark:text-white 
            placeholder:text-gray-400 dark:placeholder:text-gray-500
            focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>

        {/* BUTTON */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full mt-4 bg-linear-to-r from-purple-500 to-indigo-500 
          hover:opacity-90 text-white font-semibold py-3 rounded-lg transition"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Account...
            </>
          ) : (
            "Sign Up"
          )}
        </Button>

        {/* FOOTER */}
        <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-purple-600 dark:text-purple-400 hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;