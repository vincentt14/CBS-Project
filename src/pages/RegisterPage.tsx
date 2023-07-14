import Swal from "sweetalert2";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import CustomButton from "../components/CustomButton";
import { register } from "../utils/authentication";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    Swal.showLoading();
    const data = await register(name, email, password);
    if (data.success) {
      Swal.fire({
        icon: "success",
        title: "Register Success",
        showConfirmButton: false,
        timer: 1000,
      });
      navigate("/");
    } else {
      Swal.fire({
        icon: "error",
        title: "Register Failed",
        text: `${data.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen text-center">
      <form onSubmit={onSubmit}>
        <div className="border-borderColor border-2 py-5 px-20 rounded-md">
          <h1 className="text-4xl font-bold text-secondary">Register</h1>
          <hr className="w-20 my-4 p-1 bg-secondary border border-borderColor rounded-sm mx-auto" />
          <div className="flex items-center justify-between my-4">
            <p className="text-secondary text-xl max-w-xl">Name</p>
            <input required className="ml-8 p-2 border-borderColor border rounded-md" onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="flex items-center justify-between my-4">
            <p className="text-secondary text-xl max-w-xl">Email</p>
            <input required className="ml-8 p-2 border-borderColor border rounded-md" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="flex items-center justify-between my-4">
            <p className="text-secondary text-xl max-w-xl">Password</p>
            <input required type="password" className="ml-8 p-2 border-borderColor border rounded-md" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <CustomButton btnType="submit" title="Register" containerStyles="border-borderColor bg-secondary hover:border-primary" textStyles="text-white" />
          <CustomButton to="/login" btnType="button" title="Login" containerStyles="ml-5 border-black bg-white hover:bg-[#ededed]" textStyles="text-black hover:text-[#262626]" />
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
