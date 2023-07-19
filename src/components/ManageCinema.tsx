import Swal from "sweetalert2";

import CustomButton from "./CustomButton";
import { CinemaModel } from "../models/CinemaModel";

interface ManageCinemaProps {
  movies: {
    id: string;
    name: string;
    totalSeats: number;
  }[];
}

const ManageCinemas = ({ cinemas }: any) => {
  const onDeleteMovie = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#000",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await CinemaModel.deleteCinema(id);
        if (result.success) {
          Swal.fire({
            icon: "success",
            title: "Delete Success",
            showConfirmButton: false,
            timer: 1000,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Delete Failed",
            text: `${result.message}`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  return (
    <div className="flex flex-col">
      <div className="mx-4">
        <hr className="w-[150px] my-3 p-1 bg-secondary border border-borderColor rounded-sm" />
      </div>
      <div className="m-4 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="border-2 border-borderColor bg-secondary rounded-md flex flex-col justify-center items-center p-8">
          <h1 className="text-white font-bold text-2xl">Add Cinema</h1>
          <CustomButton btnType="button" title="Add" containerStyles="bg-secondary w-full" textStyles="text-white" to="/adminDashboard/addCinema" />
        </div>
        {cinemas.map((cinema: CinemaModel) => (
          <div key={cinema.id} className="border-2 border-borderColor rounded-md">
            <div className="bg-secondary p-8 h-[120px] flex justify-center items-center">
              <h1 className="text-white font-bold text-2xl">{cinema.name}</h1>
            </div>
            <div className="flex flex-col px-4 pt-4">
              <p className="mb-2 text-secondary">Total Seats: {cinema.totalSeats}</p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
              <CustomButton btnType="button" title="Edit" containerStyles="w-full border-black bg-white hover:bg-[#ededed]" textStyles="text-black hover:text-[#262626]" to={`/adminDashboard/editCinema/${cinema.id}`} />
              <CustomButton btnType="button" title="Delete" containerStyles="w-full bg-secondary hover:border-primary" textStyles="text-white" onClick={() => onDeleteMovie(cinema.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageCinemas;
