import Swal from "sweetalert2";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import CustomButton from "../components/CustomButton";
import { UserModel } from "../models/UserModel";

const RegisterPage = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (gender !== "") {
      Swal.showLoading();
      const data = await UserModel.register(name, email, password, gender, isAdmin);
      if (data.success) {
        Swal.fire({
          icon: "success",
          background: "#111",
          title: "Register Success",
          showConfirmButton: false,
          timer: 1000,
        });
        navigate("/");
      } else {
        Swal.fire({
          icon: "error",
          background: "#111",
          title: "Register Failed",
          text: `${data.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "You must choose your gender",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen text-center">
      <form onSubmit={onSubmit}>
        <div className="border-borderColor bg-bgColor border-2 py-5 px-20 rounded-md">
          <h1 className="text-4xl font-bold text-secondary">Register</h1>
          <hr className="w-12 my-4 p-1 bg-black border border-borderColor rounded-sm mx-auto" />
          <div className="flex items-center justify-between my-4">
            <p className="text-primary text-xl max-w-xl">Name</p>
            <input required className="ml-8 p-2 border-borderColor border rounded-md bg-black" onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="flex items-center justify-between my-4">
            <p className="text-primary text-xl max-w-xl">Gender</p>
            <div className="flex gap-3 ml-8">
              <CustomButton
                btnType="button"
                title="Male"
                containerStyles={gender === "m" ? "my-1 border-black bg-white hover:bg-[#ededed]" : "my-1 border-borderColor bg-black hover:border-primary"}
                textStyles={gender === "m" ? "text-black hover:text-[#262626]" : "text-white"}
                onClick={() => {
                  setGender("m");
                }}
              />
              <CustomButton
                btnType="button"
                title="Female"
                containerStyles={gender === "f" ? "my-1 border-black bg-white hover:bg-[#ededed]" : "my-1 border-borderColor bg-black hover:border-primary"}
                textStyles={gender === "f" ? "text-black hover:text-[#262626]" : "text-white"}
                onClick={() => {
                  setGender("f");
                }}
              />
            </div>
          </div>
          <div className="flex items-center justify-between my-4">
            <p className="text-primary text-xl max-w-xl">Email</p>
            <input required type="email" className="ml-8 p-2 border-borderColor border rounded-md bg-black" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="flex items-center justify-between my-4">
            <p className="text-primary text-xl max-w-xl">Password</p>
            <input required type="password" className="ml-8 p-2 border-borderColor border rounded-md bg-black" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="flex flex-col">
            <CustomButton btnType="submit" title="Register" containerStyles="my-1 border-borderColor bg-black hover:border-primary" textStyles="text-white" />
            <div className="flex py-2 mx-8 text-primary">
              <p>Already have an account?</p>
              <Link to="/login" className="ml-2 cursor-pointer hover:text-secondary">
                Click Here
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
