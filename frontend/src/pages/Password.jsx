import { LoadingButton } from "../components/loading-button";
import { HeadingSmall } from "../components/HeadingSmall";

export const Password = () => {
  return (
    <>
      <HeadingSmall
        title="Password Settings"
        description="Change your account password regularly to keep your account secure."
      />
      <div className="bg-white p-6 rounded shadow ">
        <form className="space-y-6" noValidate>
          <div className=" ">
            <label
              htmlFor="current_pasword"
              className="block text-sm font-medium mb-2"
            >
              Current Password
            </label>
            <input
              type="password"
              id="current_pasword"
              className="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
              placeholder="Current Password"
            />
          </div>

          <div className=" ">
            <label
              htmlFor="new_password"
              className="block text-sm font-medium mb-2"
            >
              New Password
            </label>
            <input
              type="password"
              id="new_password"
              className="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
              placeholder="New Password"
            />
          </div>

          <div className=" ">
            <label
              htmlFor="confirm_new_password"
              className="block text-sm font-medium mb-2"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirm_new_password"
              className="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
              placeholder="Confirm New Password"
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
