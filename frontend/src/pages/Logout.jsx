import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../lib/api";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";

export const Logout = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
      localStorage.clear();
      window.location.href = "/sign-in";
    },
  });

  useEffect(() => {
    mutate();
  }, [mutate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <LoaderCircle className="animate-spin text-blue-500" size={36} />
      </div>
    );
  }
};
