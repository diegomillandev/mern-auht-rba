import { Link } from "react-router-dom";
import { LoadingButton } from "../components/loading-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useEffect } from "react";

const schemaSignIn = z.object({
  email: z.email({ mesage: "Invalid email address" }),
  password: z.string().min(6, { message: "Password is required" }),
});

export const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schemaSignIn),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      toast.error("All fields are required");
    }
  }, [errors]);

  const onSubmit = (data) => {
    try {
    } catch (error) {}
  };

  return (
    <>
      <div className="bg-white text-gray-500 w-96 mx-4 md:p-6 p-4 text-left text-sm rounded-xl border border-slate-300/50 shadow">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Welcome back
        </h2>

        <form
          className="flex flex-col gap-4 mb-4"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
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
              errors.email
                ? "w-full bg-transparent border border-red-500 outline-none rounded py-2.5 px-4"
                : "w-full bg-transparent border border-gray-500/30 outline-none rounded py-2.5 px-4"
            }
            type="password"
            placeholder="Enter your password"
            required
            {...register("password")}
          />

          <LoadingButton>Sign In</LoadingButton>
        </form>

        <p className="text-center">
          Don’t have an account?{" "}
          <Link to={"/sign-up"} className="text-blue-500 underline">
            Signup
          </Link>
        </p>
      </div>
    </>
  );
};
