import { LoadingButton } from "../components/loading-button";
import { HeadingSmall } from "../components/HeadingSmall";

export const Profile = () => {
  return (
    <>
      <HeadingSmall
        title="Profile Settings"
        description="Update your personal information and email address."
      />
      <div className="bg-white p-6 rounded shadow ">
        <form className="space-y-6" noValidate>
          <div className=" ">
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
              placeholder="Your name"
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
