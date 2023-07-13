import { useState } from "react";
import CustomButton from "./CustomButton";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { AuthFormProps } from "../types";
import { useNavigate } from "react-router-dom";

const AuthForm = ({ titleBtn1, titleBtn2, toBtn2 }: AuthFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.log("[AUTH]", error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between my-4">
        <p className="text-secondary text-xl max-w-xl">Email</p>
        <input className="ml-8 p-2 border-borderColor border rounded-md" onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="flex items-center justify-between my-4">
        <p className="text-secondary text-xl max-w-xl">Password</p>
        <input type="password" className="ml-8 p-2 border-borderColor border rounded-md" onChange={(e) => setPassword(e.target.value)} />
      </div>
      <CustomButton btnType="submit" title={titleBtn1} containerStyles="border-borderColor bg-secondary hover:border-primary" textStyles="text-white" onClick={onSubmit} />
      <CustomButton to={toBtn2} btnType="button" title={titleBtn2} containerStyles="ml-5 border-black bg-white hover:bg-[#ededed]" textStyles="text-black hover:text-[#262626]" />
    </>
  );
};

export default AuthForm;
