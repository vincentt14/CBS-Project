import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";

import CustomButton from "./CustomButton";
import { CinemaModel } from "../models/CinemaModel";

const EditCinema = () => {
  const [name, setName] = useState<string>("");
  const [totalSeats, setTotalSeats] = useState<number>(0);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const data: DocumentData = (await CinemaModel.getCinema(id as string))!;

      setName(data.name);
      setTotalSeats(data.totalSeats);
    };
    getData();
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Swal.showLoading();
    const data = await CinemaModel.updateCinema(id as string, name, totalSeats);
    if (data.success) {
      Swal.fire({
        icon: "success",
        title: "Cinema Updated",
        showConfirmButton: false,
        timer: 1000,
      });
      navigate("/adminDashboard/manageCinemas");
    } else {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: `${data.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="flex flex-col">
      <div className="mx-4">
        <hr className="w-[150px] my-3 p-1 bg-secondary border border-borderColor rounded-sm" />
      </div>
      <form className="m-4 grid lg:grid-cols-3 gap-5 border-borderColor border-2 rounded-md" onSubmit={onSubmit}>
        <div className=" bg-secondary flex justify-center items-center p-5">
          <h1 className="text-white font-bold text-2xl">Add Cinema</h1>
        </div>
        <div className="flex flex-col items-center justify-center text-center">
          <div className="p-5">
            <div className="flex items-center justify-between my-4">
              <p className="text-secondary text-xl max-w-xl">Name</p>
              <input required className="ml-8 p-2 border-borderColor border rounded-md" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="flex items-center justify-between my-4">
              <p className="text-secondary text-xl max-w-xl">Total Seats</p>
              <input required type="number" className="ml-8 p-2 border-borderColor border rounded-md" value={totalSeats} onChange={(e) => setTotalSeats(+e.target.value)} />
            </div>
            <div className="flex items-center justify-between">
              <CustomButton btnType="button" title="Back to Manage" containerStyles="border-black bg-white hover:bg-[#ededed]" textStyles="text-black hover:text-[#262626]" to="/adminDashboard/manageCinemas" />
              <CustomButton btnType="submit" title="Edit Cinema" containerStyles="ml-4 border-borderColor bg-secondary hover:border-primary" textStyles="text-white" />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center text-center">
          <div className="p-5">
            <div className="flex items-center justify-between my-4">
              <p className="text-secondary text-xl max-w-xl">Package</p>
              <input className="ml-8 p-2 border-borderColor border rounded-md" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditCinema;
