import Swal from "sweetalert2";
import { useState } from "react";

import CustomButton from "./CustomButton";
import { useNavigate } from "react-router-dom";
import { CinemaModel } from "../models/CinemaModel";

const AddCinema = () => {
  const [name, setName] = useState<string>("");
  const [totalSeats, setTotalSeats] = useState<number>(0);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Swal.showLoading();
    const data = await CinemaModel.createCinema(name, totalSeats);
    if (data.success) {
      Swal.fire({
        icon: "success",
        background: "#111",
        title: "Cinema Created",
        showConfirmButton: false,
        timer: 1000,
      });
      navigate("/adminDashboard/manageCinemas");
    } else {
      Swal.fire({
        icon: "error",
        background: "#111",
        title: "Create Failed",
        text: `${data.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="flex flex-col">
      <div className="mx-4">
        <hr className="w-[150px] my-3 p-1 bg-bgColor border border-borderColor rounded-sm" />
      </div>
      <form className="m-4 grid lg:grid-cols-3 gap-5 border-borderColor border-2 rounded-md" onSubmit={onSubmit}>
        <div className=" bg-bgColor border border-borderColor flex justify-center items-center p-5">
          <h1 className="text-white font-bold text-2xl">Add Cinema</h1>
        </div>
        <div className="flex flex-col items-center justify-center text-center">
          <div className="p-5">
            <div className="flex items-center justify-between my-4">
              <p className="text-primary text-xl max-w-xl">Name</p>
              <input required className="bg-bgColor ml-8 p-2 border-borderColor border rounded-md" onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="flex items-center justify-between my-4">
              <p className="text-primary text-xl max-w-xl">Total Seats</p>
              <input required type="number" className="bg-bgColor ml-8 p-2 border-borderColor border rounded-md" onChange={(e) => setTotalSeats(+e.target.value)} />
            </div>
            <div className="flex items-center justify-between">
              <CustomButton btnType="button" title="Back to Manage" containerStyles="border-black bg-white hover:bg-[#ededed]" textStyles="text-black hover:text-[#262626]" to="/adminDashboard/manageCinemas" />
              <CustomButton btnType="submit" title="Add Cinema" containerStyles="ml-4 border-borderColor bg-black hover:border-primary" textStyles="text-white" />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center text-center">
          <div className="p-5">
            <div className="flex items-center justify-between my-4">
              <p className="text-secondary text-xl max-w-xl">Package</p>
              <input className="bg-bgColor ml-8 p-2 border-borderColor border rounded-md" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCinema;
