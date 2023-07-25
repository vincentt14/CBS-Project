import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CustomButton from "./CustomButton";
import { CinemaModel } from "../models/CinemaModel";
import { IPackage } from "../App";
import { DocumentData } from "firebase/firestore";

interface EditCinemaProps {
  packages: IPackage[];
}

const EditCinema = ({ packages }: EditCinemaProps) => {
  const [name, setName] = useState<string>("");
  const [totalSeats, setTotalSeats] = useState<number>(0);
  const [packageId, setPackageId] = useState<string>("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const data: DocumentData = (await CinemaModel.getCinema(id as string))!;

      setName(data.name);
      setTotalSeats(data.totalSeats);
      setPackageId(data.packageId);
    };
    getData();
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Swal.showLoading();
    const data = await CinemaModel.updateCinema(id as string, name, totalSeats, packageId);
    if (data.success) {
      Swal.fire({
        icon: "success",
        background: "#111",
        title: "Cinema Updated",
        showConfirmButton: false,
        timer: 1000,
      });
      navigate("/adminDashboard/manageCinemas");
    } else {
      Swal.fire({
        icon: "error",
        background: "#111",
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
        <hr className="w-[150px] my-3 p-1 bg-bgColor border border-borderColor rounded-sm" />
      </div>
      <form className="m-4 grid lg:grid-cols-3 gap-5 border-borderColor border-2 rounded-md" onSubmit={onSubmit}>
        <div className=" bg-bgColor border border-borderColor flex justify-center items-center p-5">
          <h1 className="text-white font-bold text-2xl">Edit Cinema</h1>
        </div>
        <div className="flex flex-col items-center justify-start text-center">
          <div className="p-5">
            <div className="flex items-center justify-between my-4">
              <p className="text-primary text-xl max-w-xl">Name</p>
              <input required className="ml-8 p-2 border-borderColor border rounded-md bg-bgColor" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="flex items-center justify-between my-4">
              <p className="text-primary text-xl max-w-xl">Total Seats</p>
              <input required type="number" max="100" className="ml-8 p-2 border-borderColor border rounded-md bg-bgColor" value={totalSeats} onChange={(e) => setTotalSeats(+e.target.value)} />
            </div>
            <div className="grid grid-cols-2 self-center justify-center">
              <CustomButton btnType="button" title="Back to Manage" containerStyles="border-borderColor bg-black hover:border-primary" textStyles="text-white" to="/adminDashboard/manageCinemas" />
              <CustomButton btnType="submit" title="Edit Cinema" containerStyles="ml-4 border-black bg-white hover:bg-[#ededed]" textStyles="text-black hover:text-[#262626]" />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-start text-center">
          <div className="p-5">
            <div className="flex items-center justify-between my-4">
              <p className="text-primary text-xl max-w-xl">Package</p>
              <select required value={packageId} className="w-[200px] bg-bgColor ml-8 p-3  border-borderColor border rounded-md" onChange={(e) => setPackageId(e.target.value)}>
                {packages.map((packagee: IPackage) => (
                  <option value={packagee.data.codeId}>{packagee.data.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditCinema;
