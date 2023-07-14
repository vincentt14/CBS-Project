import { useEffect, useState } from "react";
import { getMovieList } from "../utils/movies";
import CustomButton from "./CustomButton";
import ReadMore from "./ReadMore";

interface IMovies {
  title: string;
  synopsis: string;
  playing_time: string;
  genre: string;
  duration: string;
}

const ManageMovies = () => {
  const [movies, setMovies] = useState<any>([]);

  useEffect(() => {
    const getMovie = async () => {
      const data = await getMovieList();
      setMovies(data);
    };

    getMovie();
  }, []);

  console.log(movies);

  return (
    <div className="flex flex-col">
      <div className="mx-4">
        <hr className="w-[150px] my-3 p-1 bg-secondary border border-borderColor rounded-sm" />
      </div>
      <div className="m-4 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="border-2 border-borderColor bg-secondary rounded-md flex flex-col justify-center items-center">
          <h1 className="text-white font-bold text-2xl">Add Movie</h1>
          <CustomButton btnType="button" to="/detail" title="Book Now" containerStyles="bg-secondary  w-full" textStyles="text-white" />
        </div>
        {movies.map((movie: IMovies) => (
          <div key={movie.title} className="border-2 border-borderColor rounded-md">
            <div className="bg-secondary p-8 flex justify-center items-center ">
              <h1 className="text-white font-bold text-2xl">{movie.title}</h1>
            </div>
            <div className="flex flex-col p-4 ">
              <p className="mb-2 text-justify">{movie.genre}</p>
              <div className="flex justify-between text-justify">
                <p className="mb-2 text-primary">Playing at {movie.playing_time}</p>
                <p className="mb-2 text-primary">{movie.duration}</p>
              </div>
              <ReadMore pStyle="mb-2 text-justify">{movie.synopsis}</ReadMore>
              <CustomButton btnType="button" to="/detail" title="Book Now" containerStyles="bg-secondary  w-full" textStyles="text-white" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageMovies;
