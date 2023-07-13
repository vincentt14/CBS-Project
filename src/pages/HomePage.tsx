import { useState } from "react";
import Lottie from "lottie-react";

import CustomButton from "../components/CustomButton";
import office from "../assets/lottie/office.json";

const HomePage = () => {
  const [login, setLogin] = useState(true);

  return (
    <section className="pt-28 pb-24 lg:pt-36 lg:pb-32">
      <div className="container">
        <div className="flex flex-wrap">
          <div className="w-full self-center px-4 lg:w-1/2">
            <h1 className="py-1 text-5xl font-bold bg-gradient-to-r from-red-600 to-secondary inline-block text-transparent bg-clip-text">Employee Management</h1>
            <hr className="w-[200px] my-3 p-1 bg-bgColor border border-borderColor rounded-sm" />
            <p className="text-primary text-xl max-w-xl">
              This application is used for <span className="text-white">Employee Attendance</span> and <span className="text-white">Employee Management</span>.
            </p>
            <div className="flex flex-col md:flex-row my-3">
              {login ? (
                <>
                  <CustomButton title="Attend" to="/attend" containerStyles="border-black bg-white hover:bg-[#ededed]" textStyles="text-black hover:text-[#262626]" />
                  <CustomButton title="Employee Management" to="/employeeManagement" containerStyles="md:ml-5 border-borderColor bg-bgColor hover:border-primary" textStyles="text-white" />
                </>
              ) : (
                <>
                  <CustomButton title="Login for Attendance or Management" to="/login" containerStyles="border-black bg-white hover:bg-[#ededed]" textStyles="text-black hover:text-[#262626]" />
                </>
              )}
            </div>
            <div>
              <div className="mb-6 grid max-w-lg grid-cols-2 gap-0 border-2 border-borderColor bg-bgColor p-6 text-primary md:max-w-md rounded-md">
                <div className="grid grid-cols-3">
                  <div className="col-1 col-span-1 flex items-center justify-center text-2xl font-bold text-primary">12</div>
                  <div className="col-2 col-span-2">
                    <p className="text-xs lg:text-base">Employee</p>
                    <p className="text-xs lg:text-base">Counts</p>
                  </div>
                </div>
                <div className="grid grid-cols-3">
                  <div className="col-1 col-span-1 flex items-center justify-center text-2xl font-bold text-primary">12</div>
                  <div className="col-2 col-span-2">
                    <p className="text-xs lg:text-base">Attendance</p>
                    <p className="text-xs lg:text-base">is made</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden w-full px-4 selft-center md:block lg:w-1/2 border-2 border-borderColor rounded-md p-4 bg-bgColor">
            <Lottie animationData={office} style={{ width: "400px", height: "400px" }} className="mx-auto blur-none" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
