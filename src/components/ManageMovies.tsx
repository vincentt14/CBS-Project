import Swal from "sweetalert2";

import ReadMore from "./ReadMore";
import CustomButton from "./CustomButton";
import { MoviesModel } from "../models/MoviesModel";

interface ManageMoviesProps {
  movies: MoviesModel[];
}

const ManageMovies = ({ movies }: ManageMoviesProps) => {
  const onDeleteMovie = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      background: "#111",
      confirmButtonText: "Delete",
      confirmButtonColor: "#000",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await MoviesModel.deleteMovie(id);
        if (result.success) {
          Swal.fire({
            icon: "success",
            background: "#111",
            title: "Delete Success",
            showConfirmButton: false,
            timer: 1000,
          });
        } else {
          Swal.fire({
            icon: "error",
            background: "#111",
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
        <hr className="w-[150px] my-3 p-1 bg-bgColor border border-borderColor rounded-sm" />
      </div>
      <div className="m-4 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="border-2 border-borderColor bg-bgColor rounded-md flex flex-col justify-center items-center p-8">
          <h1 className="text-white font-bold text-2xl">Add Movie</h1>
          <CustomButton btnType="button" title="Add" containerStyles="border-borderColor bg-black hover:border-primary w-full" textStyles="text-white" to="/adminDashboard/addMovie" />
        </div>
        {movies.map((movie: MoviesModel) => (
          <div key={movie.id} className="border-2 border-borderColor bg-bgColor rounded-md">
            <div className="bg-black p-8 h-[120px] flex justify-center items-center border rounded-md border-borderColor">
              <h1 className="text-white font-bold text-2xl">{movie.title}</h1>
            </div>
            <div className="flex flex-col px-4 pt-4">
              <p className="mb-2 text-justify">{movie.genre}</p>
              <div className="flex justify-between text-justify">
                <p className="mb-2 text-primary">
                  Playing at <span className="text-white">{movie.playingTime}</span>
                </p>
                <p className="mb-2 text-white">{movie.duration}</p>
              </div>
              <p className="mb-2 text-primary">
                Cinema <span className="text-white">{movie.cinemaId}</span>
              </p>
              <ReadMore textSlice={60} pStyle="mb-2 text-justify text-primary">
                {movie.synopsis}
              </ReadMore>
            </div>
            <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
              <CustomButton btnType="button" title="Edit" containerStyles="w-full border-black bg-white hover:bg-[#ededed]" textStyles="text-black hover:text-[#262626]" to={`/adminDashboard/editMovie/${movie.id}`} />
              <CustomButton btnType="button" title="Delete" containerStyles="w-full border-borderColor bg-black hover:border-primary" textStyles="text-white" onClick={() => onDeleteMovie(movie.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageMovies;
