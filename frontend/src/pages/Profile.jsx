import { LoadingButton } from "../components/loading-button";
import { HeadingSmall } from "../components/HeadingSmall";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

export const Profile = () => {
  const queryClient = useQueryClient();
  const { user } = queryClient.getQueryData(["profile"]);

  const { register } = useForm({
    defaultValues: {
      username: user?.username,
      email: user?.email,
      role: user?.role,
    },
  });

  return (
    <>
      <HeadingSmall
        title="Profile Settings"
        description="Update your personal information and email address."
      />
      <div className="bg-white p-6 rounded shadow ">
        <form className="space-y-6" noValidate>
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
              className="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
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
              className="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
              placeholder="you@site.com"
              {...register("email")}
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
            />
          </div>

          <div className="w-96 ms-auto">
            <LoadingButton type="button">Save changes</LoadingButton>
          </div>
        </form>
      </div>
    </>
  );
};
