import { LoadingButton } from "../components/loading-button";
import { HeadingSmall } from "../components/HeadingSmall";
import z from "zod";
import { passwordSchema } from "../utils/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { changePassword } from "../lib/api";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

const changePasswordSchema = z
  .object({
    current_password: z.string().min(1, "Current password is required"),
    new_password: passwordSchema,
    new_password_confirmation: z
      .string()
      .min(1, "Please confirm your new password"),
  })
  .refine((data) => data.new_password === data.new_password_confirmation, {
    message: "New passwords do not match",
    path: ["new_password_confirmation"],
  });

export const Password = () => {
  const [isloading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      new_password_confirmation: "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: changePassword,
    onMutate: () => setIsLoading(true),
    onError: (error) => {
      toast.error(error.response.data.message || "Failed to update profile.");
      setIsLoading(false);
    },
    onSuccess: async (data) => {
      toast.success("Profile updated successfully!");
      setIsLoading(false);
      reset();
    },
  });

  const onSubmit = (formData) => {
    mutate(formData);
  };

  return (
    <>
      <HeadingSmall
        title="Password Settings"
        description="Change your account password regularly to keep your account secure."
      />
      <div className="bg-white p-6 rounded shadow ">
        <form
          className="space-y-6"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label
              htmlFor="current_pasword"
              className="block text-sm font-medium mb-2"
            >
              Current Password
            </label>
            <input
              type="password"
              id="current_pasword"
              className={
                errors.current_password
                  ? "w-full bg-transparent border border-red-500 outline-none rounded py-2.5 px-4"
                  : "w-full bg-transparent border border-gray-500/30 outline-none rounded py-2.5 px-4"
              }
              placeholder="Current Password"
              {...register("current_password")}
            />
          </div>

          <div>
            <label
              htmlFor="new_password"
              className="block text-sm font-medium mb-2"
            >
              New Password
            </label>
            <input
              type="password"
              id="new_password"
              className={
                errors.new_password
                  ? "w-full bg-transparent border border-red-500 outline-none rounded py-2.5 px-4"
                  : "w-full bg-transparent border border-gray-500/30 outline-none rounded py-2.5 px-4"
              }
              placeholder="New Password"
              {...register("new_password")}
            />
          </div>

          <div>
            <label
              htmlFor="confirm_new_password"
              className="block text-sm font-medium mb-2"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirm_new_password"
              className={
                errors.new_password_confirmation
                  ? "w-full bg-transparent border border-red-500 outline-none rounded py-2.5 px-4"
                  : "w-full bg-transparent border border-gray-500/30 outline-none rounded py-2.5 px-4"
              }
              placeholder="Confirm New Password"
              {...register("new_password_confirmation")}
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
