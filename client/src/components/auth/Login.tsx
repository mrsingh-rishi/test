"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../variable";

const Login: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      // Rest of your code
      if (token) {
        router.push("/");
      }
    }
  }, [router]);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email,
          password
         }),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful login (e.g., redirect to home)
        localStorage.setItem("token", data.token);
        router.push("/");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      setError("An unexpected error occurred in login");
    }
  };

  return (
    <div
      className={`w-[648px] rounded-2xl [background:linear-gradient(180deg,_#f7f7f7,_#f0f0f0)] box-border flex flex-col items-center justify-start py-[58px] px-[59px] gap-[32px] max-w-full text-center text-29xl text-darkslategray font-barlow border-[1px] border-solid border-lightgray mq675:gap-[16px] mq675:py-[38px] mq675:px-[29px] mq675:box-border`}
    >
      <h1 className="m-0 self-stretch relative text-inherit font-semibold mq450:text-10xl mq750:text-19xl">
        <span>Login to </span>
        <span className="text-slateblue">Workflow</span>
        <span>!</span>
      </h1>
      <div className="self-stretch flex flex-col items-center justify-start mq675:gap-[21px]">
        <form
          className="m-0 self-stretch flex flex-col items-start justify-start gap-[22px]"
          onSubmit={handleLogin}
        >
          <div className="self-stretch flex flex-col items-start justify-start gap-[24px]">
            <input
              className="w-full border-none outline-none bg-whitesmoke h-14 rounded-lg flex items-center justify-start py-4 px-3 box-border font-inter text-xl text-darkgray min-w-[250px] cursor-pointer"
              placeholder="Your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="w-full border-none outline-none bg-whitesmoke h-14 rounded-lg flex items-center justify-start py-4 px-3 box-border font-inter text-xl text-darkgray min-w-[250px] cursor-pointer"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="cursor-pointer py-3 px-5 bg-transparent self-stretch shadow-[0px_12px_16px_rgba(186,_186,_186,_0.2)_inset,_0px_4px_16px_rgba(0,_0,_0,_0.1)] rounded-lg bg-gradient-to-b from-purple-500 to-blue-900 border border-blueviolet hover:bg-gainsboro hover:border-mediumslateblue"
            type="submit"
          >
            <div className="relative text-xl font-inter text-white text-left inline-block min-w-[52px] mq450:text-base">
              Login
            </div>
          </button>
        </form>
        {error && <p className="text-red-500 text-xl">{error}</p>}
      </div>
      <div className="flex flex-row items-start justify-center gap-1 text-xl text-dimgray font-inter mq675:flex-wrap">
        <div className="relative mq450:text-base">
          Don&apos;t have an account? Create a
        </div>
        <div
          className="h-6 relative inline-block min-w-[127px] cursor-pointer text-darkslateblue mq450:text-base"
          onClick={() => router.push("/register")}
        >
          <span>new account</span>
          <span className="text-black">.</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
