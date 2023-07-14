import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/CustomButton";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // const onSubmit = async () => {
  //   try {
  //     signInWithEmailAndPassword(auth, email, password);
  //     navigate("/");
  //   } catch (error) {
  //     console.log("[Login]", error);
  //   }
  // };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen text-center">
      <div className="border-borderColor border-2 py-5 px-20 rounded-md">
        <h1 className="text-4xl font-bold text-secondary">Login</h1>
        <hr className="w-12 my-4 p-1 bg-secondary border border-borderColor rounded-sm mx-auto" />
        <div className="flex items-center justify-between my-4">
          <p className="text-secondary text-xl max-w-xl">Email</p>
          <input className="ml-8 p-2 border-borderColor border rounded-md" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="flex items-center justify-between my-4">
          <p className="text-secondary text-xl max-w-xl">Password</p>
          <input type="password" className="ml-8 p-2 border-borderColor border rounded-md" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <CustomButton btnType="submit" title="Login" containerStyles="border-borderColor bg-secondary hover:border-primary" textStyles="text-white" />
        <CustomButton to="/register" btnType="button" title="Register" containerStyles="ml-5 border-black bg-white hover:bg-[#ededed]" textStyles="text-black hover:text-[#262626]" />
      </div>
    </div>
  );
};

export default LoginPage;
