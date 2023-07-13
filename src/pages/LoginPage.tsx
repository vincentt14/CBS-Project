import AuthForm from "../components/AuthForm";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen text-center">
      <div className="border-borderColor border-2 py-5 px-20 rounded-md">
        <h1 className="text-4xl font-bold text-secondary">Login</h1>
        <hr className="w-12 my-4 p-1 bg-secondary border border-borderColor rounded-sm mx-auto" />
        <AuthForm titleBtn1="Login" titleBtn2="Register" toBtn2="/register" />
      </div>
    </div>
  );
};

export default LoginPage;
