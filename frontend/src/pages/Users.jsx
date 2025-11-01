import { useQueryClient } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";

export const Users = () => {
  const queryClient = useQueryClient();
  const { user } = queryClient.getQueryData(["profile"]);

  if (!user || user.role !== "admin") {
    return <Navigate to="/unauthorized" />;
  }

  return <div>Users</div>;
};
