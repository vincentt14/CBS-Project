import { useEffect, useState } from "react";
import { createMovie } from "../utils/movies";
import CustomButton from "./CustomButton";
import Swal from "sweetalert2";

interface IMovies {
  title: string;
  synopsis: string;
  playing_time: string;
  genre: string;
  duration: string;
}

interface AddMovieProps {
  manageMovie: () => void;
}

const AddMovie = ({ manageMovie }: AddMovieProps) => {
  const [title, setTitle] = useState("");
  const [playingTime, setPlayingTime] = useState("");
  const [duration, setDuration] = useState("");
  const [genre, setGenre] = useState("");
  const [synopsis, setSynopsis] = useState("");

  const onSubmit = async (e: any) => {
    e.preventDefault();
    Swal.showLoading();
    const data = await createMovie(title, synopsis, playingTime, genre, duration);
    if (data.success) {
      Swal.fire({
        icon: "success",
        title: "Movie Created",
        showConfirmButton: false,
        timer: 1000,
      });
      manageMovie();
    } else {
      Swal.fire({
        icon: "error",
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
        <hr className="w-[150px] my-3 p-1 bg-secondary border border-borderColor rounded-sm" />
      </div>
      <form className="m-4 grid lg:grid-cols-3 gap-5 border-borderColor border-2 rounded-md" onSubmit={onSubmit}>
        <div className=" bg-secondary flex justify-center items-center p-5">
          <h1 className="text-white font-bold text-2xl">Add Movie</h1>
        </div>
        <div className="flex flex-col items-center justify-center text-center">
          <div className="p-5">
            <div className="flex items-center justify-between my-4">
              <p className="text-secondary text-xl max-w-xl">Title</p>
              <input required className="ml-8 p-2 border-borderColor border rounded-md" onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="flex items-center justify-between my-4">
              <p className="text-secondary text-xl max-w-xl">Playing Time</p>
              <input required className="ml-8 p-2 border-borderColor border rounded-md" onChange={(e) => setPlayingTime(e.target.value)} />
            </div>
            <div className="flex items-center justify-between my-4">
              <p className="text-secondary text-xl max-w-xl">Duration</p>
              <input required className="ml-8 p-2 border-borderColor border rounded-md" onChange={(e) => setDuration(e.target.value)} />
            </div>
            <div className="flex items-center justify-between">
              <CustomButton btnType="button" title="Back to Manage Movie" containerStyles="border-black bg-white hover:bg-[#ededed]" textStyles="text-black hover:text-[#262626]" onClick={manageMovie} />
              <CustomButton btnType="submit" title="Add Movie" containerStyles="ml-4 border-borderColor bg-secondary hover:border-primary" textStyles="text-white" />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center text-center">
          <div className="p-5">
            <div className="flex items-center justify-between my-4">
              <p className="text-secondary text-xl max-w-xl">Genre</p>
              <input required className="ml-8 p-2 border-borderColor border rounded-md" onChange={(e) => setGenre(e.target.value)} />
            </div>
            <div className="flex items-center justify-between my-4">
              <p className="text-secondary text-xl max-w-xl">Synopsis</p>
              <textarea required className="ml-8 p-2 border-borderColor border rounded-md w-[198px] h-44" onChange={(e) => setSynopsis(e.target.value)} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddMovie;
