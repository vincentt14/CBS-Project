import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CustomButton from "./CustomButton";
import { MoviesModel } from "../models/MoviesModel";
import { DocumentData } from "firebase/firestore";

const EditMovie = () => {
  const [title, setTitle] = useState<string>("");
  const [playingTime, setPlayingTime] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [synopsis, setSynopsis] = useState<string>("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const data: DocumentData = (await MoviesModel.getMovie(id as string))!;

      setTitle(data.title);
      setPlayingTime(data.playingTime);
      setDuration(data.duration);
      setGenre(data.genre);
      setSynopsis(data.synopsis);
    };

    getData();
  }, []);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    Swal.showLoading();
    const data = await MoviesModel.updateMovie(id, title, synopsis, playingTime, duration, genre);
    if (data.success) {
      Swal.fire({
        icon: "success",
        title: "Movie Updated",
        showConfirmButton: false,
        timer: 1000,
      });
      navigate("/adminDashboard/manageMovies");
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
          <h1 className="text-white font-bold text-2xl">Edit Movie</h1>
        </div>
        <div className="flex flex-col items-center justify-center text-center">
          <div className="p-5">
            <div className="flex items-center justify-between my-4">
              <p className="text-secondary text-xl max-w-xl">Title</p>
              <input required className="ml-8 p-2 border-borderColor border rounded-md" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="flex items-center justify-between my-4">
              <p className="text-secondary text-xl max-w-xl">Playing Time</p>
              <input required className="ml-8 p-2 border-borderColor border rounded-md" value={playingTime} onChange={(e) => setPlayingTime(e.target.value)} />
            </div>
            <div className="flex items-center justify-between my-4">
              <p className="text-secondary text-xl max-w-xl">Duration</p>
              <input required className="ml-8 p-2 border-borderColor border rounded-md" value={duration} onChange={(e) => setDuration(e.target.value)} />
            </div>
            <div className="flex items-center justify-between">
              <CustomButton btnType="button" title="Back to Manage" containerStyles="border-black bg-white hover:bg-[#ededed]" textStyles="text-black hover:text-[#262626]" to="/adminDashboard/manageMovies" />
              <CustomButton btnType="submit" title="Edit Movie" containerStyles="ml-4 border-borderColor bg-secondary hover:border-primary" textStyles="text-white" />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center text-center">
          <div className="p-5">
            <div className="flex items-center justify-between my-4">
              <p className="text-secondary text-xl max-w-xl">Genre</p>
              <input required className="ml-8 p-2 border-borderColor border rounded-md" value={genre} onChange={(e) => setGenre(e.target.value)} />
            </div>
            <div className="flex items-center justify-between my-4">
              <p className="text-secondary text-xl max-w-xl">Synopsis</p>
              <textarea required className="ml-8 p-2 border-borderColor border rounded-md w-[198px] h-44" value={synopsis} onChange={(e) => setSynopsis(e.target.value)} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditMovie;
