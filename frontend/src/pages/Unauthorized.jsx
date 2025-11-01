import { Link, useNavigate } from "react-router-dom";

export const Unauthorized = () => {
  return (
    <main className="flex grow items-center justify-center px-4 text-center h-screen">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">401 - Unauthorized</h1>
          <p className="text-muted-foreground">
            You do not have permission to access this page.
          </p>
        </div>
        <div>
          <button
            type="button"
            className="w-40 py-3 active:scale-95 transition text-sm text-white bg-blue-500 cursor-pointer rounded-lg font-medium hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            <p className="mb-0.5">
              <Link to="/">Go back home</Link>
            </p>
          </button>
        </div>
      </div>
    </main>
  );
};
