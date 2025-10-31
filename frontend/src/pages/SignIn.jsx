import { Link } from "react-router-dom";

export const SignIn = () => {
  return (
    <>
      <div className="bg-white text-gray-500 w-96 mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Welcome back
        </h2>

        <form className="flex flex-col gap-4 mb-4">
          <input
            id="email"
            className="w-full bg-transparent border border-gray-500/30 outline-none rounded py-2.5 px-4"
            type="email"
            placeholder="Enter your email"
            required
          />

          <input
            id="password"
            className="w-full bg-transparent border border-gray-500/30 outline-none rounded py-2.5 px-4"
            type="password"
            placeholder="Enter your password"
            required
          />

          <button
            type="submit"
            className="w-full bg-indigo-500 py-2.5 rounded text-white mt-4"
          >
            Log in
          </button>
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
