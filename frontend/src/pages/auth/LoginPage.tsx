import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../../components/LoginForm";
import { useFormUserContext } from "../../context/formUserContext/FormUserContext";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { userInfo } = useFormUserContext();

  useEffect(() => {
    if (userInfo.isAuthenticated) {
      return navigate("/home");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

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
