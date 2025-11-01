import { LoadingButton } from "../components/loading-button";
import { HeadingSmall } from "../components/HeadingSmall";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { updateProfile } from "../lib/api";
import { toast } from "sonner";
import { useState } from "react";

const profileSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters"),
  email: z.email("Invalid email address"),
  role: z.string(),
});

export const Profile = () => {
  const [isloading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();
  const { user } = queryClient.getQueryData(["profile"]);

  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
    reset,
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: user?.username,
      email: user?.email,
      role: user?.role,
    },
  });

  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onMutate: () => setIsLoading(true),
    onError: (error) => {
      toast.error(error.response.data.message || "Failed to update profile.");
      setIsLoading(false);
    },
    onSuccess: async (data) => {
      toast.success("Profile updated successfully!");
      await queryClient.refetchQueries({ queryKey: ["profile"] });

      const updatedData = queryClient.getQueryData(["profile"]);
      const updatedUser = updatedData?.user;
      if (updatedUser) {
        reset({
          username: updatedUser.username,
          email: updatedUser.email,
          role: updatedUser.role,
        });
      }
      setIsLoading(false);
    },
  });

  const onSubmit = ({ username, email }) => {
    mutate({ username, email });
  };
  return (
    <>
      <HeadingSmall
        title="Profile Settings"
        description="Update your personal information and email address."
      />
      <div className="bg-white p-6 rounded shadow ">
        <form
          className="space-y-6"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className=" ">
            <label
              htmlFor="username"
              className="block text-sm font-medium mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="username"
              className={
                errors.username
                  ? "w-full bg-transparent border border-red-500 outline-none rounded py-2.5 px-4"
                  : "w-full bg-transparent border border-gray-500/30 outline-none rounded py-2.5 px-4"
              }
              placeholder="Your name"
              {...register("username")}
            />
          </div>

          <div className="">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className={
                user?.role !== "admin"
                  ? "py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none read-only:bg-gray-100 read-only:cursor-not-allowed"
                  : errors.email
                  ? "w-full bg-transparent border border-red-500 outline-none rounded py-2.5 px-4"
                  : "w-full bg-transparent border border-gray-500/30 outline-none rounded py-2.5 px-4"
              }
              placeholder="you@site.com"
              {...register("email")}
              readOnly={user?.role !== "admin"}
              disabled={user?.role !== "admin"}
            />
          </div>
          <div className="">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Role
            </label>
            <input
              type="email"
              id="email"
              className="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none read-only:bg-gray-100 read-only:cursor-not-allowed focus:focus-none capitalize"
              placeholder="User"
              {...register("role")}
              readOnly
              disabled={true}
            />
          </div>

          <div className="w-96 ms-auto">
            <LoadingButton disabled={!isDirty} loading={isloading}>
              Save changes
            </LoadingButton>
          </div>
        </form>
      </div>
    </>
  );
};
