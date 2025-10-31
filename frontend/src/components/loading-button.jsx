import { LoaderCircle } from "lucide-react";

export const LoadingButton = ({ loading, children, ...props }) => {
  return (
    <button
      className="w-full bg-indigo-500 py-2.5 rounded text-white mt-2 cursor-pointer text-center flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={loading}
      {...props}
    >
      {loading ? <LoaderCircle className="animate-spin" /> : children}
    </button>
  );
};
