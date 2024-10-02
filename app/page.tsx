"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Login() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const router = useRouter();

  const handleClick = () => {
    let isValid = true;

    if (email.trim() === "") {
      setEmailError(true);
      isValid = false;
    }

    if (password.trim() === "") {
      setPasswordError(true);
      isValid = false;
    }

    if (isValid) {
      router.push("/servers");
    }
  };

  return (
    <div
      id="login-page"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      <Image
        src="/login.png"
        alt="Login"
        layout="fill"
        objectFit="cover"
        className="z-0"
      />
      <div
        className="bg-[#36393f] w-[40vw] lg:w-[40vw] md:w-[50vw] min-h-[50vh] sm:w-[80vw] flex flex-row z-30 rounded-md shadow-2xl"
        id="login-container"
      >
        <div
          className="flex items-center flex-col w-full min-h-[50vh] p-8"
          id="left-side-box"
        >
          <div
            className="min-h-[12vh] w-full mb-6 flex flex-col justify-center text-center"
            id="welcome-box"
          >
            <h1 className="text-2xl text-white font-bold mb-2">
              Welcome back!
            </h1>
            <h2 className="text-[#b9bbbe] text-base">
              We're so excited to see you getting bullied on discord again!
            </h2>
          </div>
          <div className="w-full space-y-4" id="login-password-section">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold text-[#b9bbbe] uppercase mb-2"
              >
                Email or Phone Number <span className="text-red-900">*</span>
              </label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError(false);
                }}
                className="w-full px-3 py-2 bg-[#202225] text-white border-none rounded focus:outline-none focus:ring-2 focus:ring-[#00a8fc]"
              />
              {emailError && (
                <h1 className="text-red-700 text-sm">Enter a valid email</h1>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-bold text-[#b9bbbe] uppercase mb-2"
              >
                Password <span className="text-red-900">*</span>
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError(false);
                }}
                className="w-full px-3 py-2 bg-[#202225] text-white border-none rounded focus:outline-none focus:ring-2 focus:ring-[#00a8fc]"
              />
              {passwordError && (
                <h1 className="text-red-700 text-sm">Enter a valid password</h1>
              )}
            </div>
            <a href="#" className="text-sm text-[#00a8fc] hover:underline">
              Forgot your password?
            </a>
            <button
              onClick={handleClick}
              className="w-full bg-[#5865f2] hover:bg-[#4752c4] text-white font-medium py-2 px-4 rounded transition duration-200"
            >
              Log In
            </button>
            <p className="text-sm text-[#b9bbbe]">
              Need an account?{" "}
              <a href="#" className="text-[#00a8fc] hover:underline">
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
