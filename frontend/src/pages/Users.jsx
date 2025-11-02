import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { getUsers } from "../lib/api";
import { LoaderCircle } from "lucide-react";

export const Users = () => {
  const queryClient = useQueryClient();
  const { user } = queryClient.getQueryData(["profile"]);

  if (!user || user.role !== "admin") {
    return <Navigate to="/unauthorized" />;
  }

  const { data, isLoading, error } = useQuery({
    queryFn: getUsers,
    queryKey: ["tableData"],
  });

  const columns = [
    {
      header: "Name",
      accessorKey: "username",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Role",
      accessorKey: "role",
    },
    {
      header: "Date Registered",
      accessorKey: "createdAt",
    },
    {
      header: "Actions",
      accessorKey: "actions",
    },
  ];

  const table = useReactTable({
    data: data ? data.users : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <LoaderCircle className="animate-spin text-blue-500" size={36} />
      </div>
    );
  }

  console.log("Fetched Users Data:", data.users);
  return (
    <>
      <div className="w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 pl-3">
          <div>
            <h3 className="text-xl font-semibold text-slate-800">Users</h3>
            <p className="text-sm text-slate-500">
              List of all registered users in the system.
            </p>
          </div>
        </div>

        {/* Table Container */}
        <div className="relative overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-700">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-3 border-b border-slate-100 font-medium text-slate-900"
                    >
                      {header.isPlaceholder
                        ? null
                        : header.column.columnDef.header}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 border-b border-slate-100"
                    >
                      {cell.column.columnDef.accessorKey === "createdAt"
                        ? new Date(cell.getValue()).toLocaleDateString()
                        : cell.getValue()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
