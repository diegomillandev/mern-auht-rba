import { Link, useNavigate } from "react-router-dom";
import { LoadingButton } from "../components/loading-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useEffect, useState } from "react";
import api from "../config/axios";
import { passwordSchema } from "../utils/validation";

const schemaSignUp = z
  .object({
    username: z.string().min(1, { message: "Name is required" }),
    email: z.email({ mesage: "Invalid email address" }),
    password: passwordSchema,
    password_confirmation: z
      .string()
      .min(1, { message: "Password confirmation is required" }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

export const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schemaSignUp),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      toast.error("All fields are required");
    }
  }, [errors]);

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const { data } = await api.post("/auth/register", formData);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
      reset();
      setTimeout(() => {
        navigate("/sign-in");
      }, 1500);
    }
  };

  return (
    <>
      <div className="bg-white text-gray-500 w-96 mx-4 md:p-6 p-4 text-left text-sm rounded-xl border border-slate-300/50 shadow">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Create your account
        </h2>

        <form
          className="flex flex-col gap-4 mb-4"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <input
            id="username"
            className={
              errors.username
                ? "w-full bg-transparent border border-red-500 outline-none rounded py-2.5 px-4"
                : "w-full bg-transparent border border-gray-500/30 outline-none rounded py-2.5 px-4"
            }
            type="text"
            placeholder="Enter your name"
            required
            {...register("username")}
          />
          <input
            id="email"
            className={
              errors.email
                ? "w-full bg-transparent border border-red-500 outline-none rounded py-2.5 px-4"
                : "w-full bg-transparent border border-gray-500/30 outline-none rounded py-2.5 px-4"
            }
            type="email"
            placeholder="Enter your email"
            required
            {...register("email")}
          />

          <input
            id="password"
            className={
              errors.password
                ? "w-full bg-transparent border border-red-500 outline-none rounded py-2.5 px-4"
                : "w-full bg-transparent border border-gray-500/30 outline-none rounded py-2.5 px-4"
            }
            type="password"
            placeholder="Enter your password"
            required
            {...register("password")}
          />

          <input
            id="password_confirmation"
            className={
              errors.password_confirmation
                ? "w-full bg-transparent border border-red-500 outline-none rounded py-2.5 px-4"
                : "w-full bg-transparent border border-gray-500/30 outline-none rounded py-2.5 px-4"
            }
            type="password"
            placeholder="Confirm your password"
            required
            {...register("password_confirmation")}
          />

          <LoadingButton loading={loading}>Sign Up</LoadingButton>
        </form>

        <p className="text-center">
          Already have an account?{" "}
          <Link to={"/sign-in"} className="text-blue-500 underline">
            Signin
          </Link>
        </p>
      </div>
    </>
  );
};
