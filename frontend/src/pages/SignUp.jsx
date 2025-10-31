import { Link } from "react-router-dom";
export const SignUp = () => {
  return (
    <>
      <div className="bg-white text-gray-500 w-96 mx-4 md:p-6 p-4 text-left text-sm rounded-xl border border-slate-300/50 shadow">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Create your account
        </h2>

        <form className="flex flex-col gap-4 mb-4">
          <input
            id="name"
            className="w-full bg-transparent border border-gray-500/30 outline-none rounded py-2.5 px-4"
            type="email"
            placeholder="Enter your name"
            required
          />
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

          <input
            id="password_confirmation"
            className="w-full bg-transparent border border-gray-500/30 outline-none rounded py-2.5 px-4"
            type="password"
            placeholder="Confirm your password"
            required
          />

          <button
            type="submit"
            className="w-full bg-indigo-500 py-2.5 rounded text-white mt-2"
          >
            Log in
          </button>
        </form>

        <p className="text-center">
          Already have an account?{" "}
          <Link to={"/sign-in"} className="text-blue-500 underline">
            Signin
          </Link>
        </p>
      </div>
    </>
  );
};
