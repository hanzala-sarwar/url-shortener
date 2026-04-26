"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Login = () => {
  const [input, setInput] = useState({
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

    try {
      dispatch(setLoading(true));

      const res = await axios.post("/api/user/login", input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        router.push("/");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong. Please try again."
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
          Login
        </h1>

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

        {/* BUTTON (FIXED - no nested button) */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full mt-4 bg-linear-to-r from-purple-500 to-indigo-500 
          hover:opacity-90 text-white font-semibold py-3 rounded-lg transition"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            "Login"
          )}
        </Button>

        {/* FOOTER */}
        <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-400">
          Don’t have an account?{" "}
          <Link
            href="/signup"
            className="text-purple-600 dark:text-purple-400 hover:underline"
          >
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login; 