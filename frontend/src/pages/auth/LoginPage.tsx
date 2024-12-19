import { LoginForm } from "../../components/LoginForm";

export const LoginPage = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center pt-14 pb-6">
      <div className="inline-flex gap-2 items-center justify-center mb-4 w-full sm:max-w-[450px]">
        <p className="prata-regular text-3xl text-gray-500">
          Welcome{" "}
          <span className="prata-regular text-gray-700 font-medium">Back</span>
        </p>

        <div className="w-10 md:w-12 h-[1px] sm:h-[2px] bg-gray-700"></div>
      </div>

      <LoginForm />
    </div>
  );
};
