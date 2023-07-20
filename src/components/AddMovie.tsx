import Swal from "sweetalert2";
import { useState } from "react";

import CustomButton from "./CustomButton";
import { MoviesModel } from "../models/MoviesModel";
import { useNavigate } from "react-router-dom";
import { CinemaModel } from "../models/CinemaModel";

interface AddMovieProps {
  cinemas: CinemaModel[];
}

const AddMovie = ({ cinemas }: AddMovieProps) => {
  const [title, setTitle] = useState<string>("");
  const [playingTime, setPlayingTime] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);
  const [genre, setGenre] = useState<string>("");
  const [synopsis, setSynopsis] = useState<string>("");
  const [cinemaId, setCinemaId] = useState<string>("");
  const navigate = useNavigate();

  console.log(cinemas);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Swal.showLoading();
    const data = await MoviesModel.createMovie(title, synopsis, playingTime, duration, cinemaId, genre);
    if (data.success) {
      Swal.fire({
        icon: "success",
        background: "#111",
        title: "Movie Created",
        showConfirmButton: false,
        timer: 1000,
      });
      navigate("/adminDashboard/manageMovies");
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
          <h1 className="text-white font-bold text-2xl">Add Movie</h1>
        </div>
        <div className="flex flex-col items-center justify-center text-center">
          <div className="p-5">
            <div className="flex items-center justify-between my-4">
              <p className="text-primary text-xl max-w-xl">Title</p>
              <input required className="bg-bgColor ml-8 p-2 border-borderColor border rounded-md" onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="flex items-center justify-between my-4">
              <p className="text-primary text-xl max-w-xl">Playing Time</p>
              <input required className="bg-bgColor ml-8 p-2 border-borderColor border rounded-md" onChange={(e) => setPlayingTime(e.target.value)} />
            </div>
            <div className="flex items-center justify-between my-4">
              <p className="text-primary text-xl max-w-xl">Duration</p>
              <input required type="number" className="bg-bgColor ml-8 p-2 border-borderColor border rounded-md" onChange={(e) => setDuration(+e.target.value)} />
            </div>
            <div className="flex items-center justify-between">
              <CustomButton btnType="button" title="Back to Manage" containerStyles="border-borderColor bg-black hover:border-primary" textStyles="text-white" to="/adminDashboard/manageMovies" />
              <CustomButton btnType="submit" title="Add Movie" containerStyles="ml-4 border-black bg-white hover:bg-[#ededed]" textStyles="text-black hover:text-[#262626]" />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center text-center">
          <div className="p-5">
            <div className="flex items-center justify-between my-4">
              <p className="text-primary text-xl max-w-xl">Genre</p>
              <input required className="bg-bgColor ml-8 p-2 border-borderColor border rounded-md" onChange={(e) => setGenre(e.target.value)} />
            </div>
            <div className="flex items-center justify-between my-4">
              <p className="text-primary text-xl max-w-xl">Package</p>
              <select required value={cinemaId} className="w-[200px] bg-bgColor ml-8 p-3  border-borderColor border rounded-md" onChange={(e) => setCinemaId(e.target.value)}>
                {cinemas.map((cinema: CinemaModel) => (
                  <option value={cinema.id}>{cinema.name}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-between my-4">
              <p className="text-primary text-xl max-w-xl">Synopsis</p>
              <textarea style={{ overflow: "hidden" }} required className="bg-bgColor ml-8 p-2 border-borderColor border rounded-md w-[198px] h-28" onChange={(e) => setSynopsis(e.target.value)} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddMovie;
