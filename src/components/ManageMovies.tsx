import Swal from "sweetalert2";

import ReadMore from "./ReadMore";
import CustomButton from "./CustomButton";
import { deleteMovie } from "../utils/movies";

interface IMovies {
  id: string;
  title: string;
  synopsis: string;
  playing_time: string;
  genre: string;
  duration: string;
}

interface ManageMoviesProps {
  movies: any;
  createMovie: () => void;
}

const ManageMovies = ({ movies, createMovie }: ManageMoviesProps) => {
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
        const result = await deleteMovie(id);
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
          <h1 className="text-white font-bold text-2xl">Add Movie</h1>
          <CustomButton btnType="button" title="Add" containerStyles="bg-secondary w-full" textStyles="text-white" onClick={createMovie} />
        </div>
        {movies.map((movie: IMovies) => (
          <div key={movie.id} className="border-2 border-borderColor rounded-md">
            <div className="bg-secondary p-8 h-[120px] flex justify-center items-center">
              <h1 className="text-white font-bold text-2xl">{movie.title}</h1>
            </div>
            <div className="flex flex-col px-4 pt-4">
              <p className="mb-2 text-justify">{movie.genre}</p>
              <div className="flex justify-between text-justify">
                <p className="mb-2 text-primary">Playing at {movie.playing_time}</p>
                <p className="mb-2 text-primary">{movie.duration}</p>
              </div>
              <ReadMore textSlice={55} pStyle="mb-2 text-justify">
                {movie.synopsis}
              </ReadMore>
            </div>
            <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
              <CustomButton btnType="button" to="/editMovie" title="Edit" containerStyles="w-full border-black bg-white hover:bg-[#ededed]" textStyles="text-black hover:text-[#262626]" />
              <CustomButton btnType="button" title="Delete" containerStyles="w-full bg-secondary hover:border-primary" textStyles="text-white" onClick={() => onDeleteMovie(movie.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageMovies;
