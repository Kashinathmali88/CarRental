import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useCarContext } from "../context/Car.context";

function Login() {
  const [state, setState] = useState("login");
  const { axios, toast, setShowLogin, setIsLoggedIn, fetchUser } =
    useCarContext();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const payload =
      state === "login"
        ? { email: data.email, password: data.password }
        : { name: data.name, email: data.email, password: data.password };
    const url = state === "login" ? "/api/user/login" : "/api/user/register";
    axios
      .post(url, payload, { withCredentials: true })
      .then((response) => {
        if (response.data.success) {
          if (state === "login") {
            setIsLoggedIn(true);
            fetchUser();
            toast.success(response.data.message);
            setShowLogin(false);
          } else {
            setState("login");
            toast.success(response.data.message);
          }
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error during login/register:", error);
        toast.error(error.response.data.message);
      });
  };
  return (
    <div
      onClick={() => setShowLogin(false)}
      className="fixed  right-[30%] bottom-[50%] top-0 left-0 sm:right-0 sm:bottom-0 z-100 flex items-center justify-center bg-black/50"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-borderColor bg-white"
      >
        <p className="text-2xl font-medium m-auto">
          <span className="text-primary">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>
        {state === "register" && (
          <div className="w-full">
            <p>Name</p>
            <input
              {...register("name")}
              name="name"
              placeholder="type here"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
              type="text"
              required
            />
          </div>
        )}
        <div className="w-full ">
          <p>Email</p>
          <input
            {...register("email")}
            name="email"
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            type="email"
            required
          />
        </div>
        <div className="w-full ">
          <p>Password</p>
          <input
            {...register("password")}
            name="password"
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            type="password"
            required
          />
        </div>
        {state === "register" ? (
          <p>
            Already have account?{" "}
            <span
              onClick={() => setState("login")}
              className="text-primary cursor-pointer"
            >
              click here
            </span>
          </p>
        ) : (
          <p>
            Create an account?{" "}
            <span
              onClick={() => setState("register")}
              className="text-primary cursor-pointer"
            >
              click here
            </span>
          </p>
        )}
        <button className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer">
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
