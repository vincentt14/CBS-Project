import { useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";
import { getMovieList } from "../utils/movies";

interface IMovies {
  title: string;
  synopsis: string;
  playing_time: string;
  genre: string;
  duration: string;
}

const PlayingNowPage = () => {
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
    <section className="pt-28 pb-24 lg:py-32">
      <div className="container w-full">
        <div className="flex flex-col">
          <div className="mx-4">
            <h1 className="py-1 text-5xl font-bold text-secondary">Now Showing In Cinemas.</h1>
            <hr className="w-[300px] my-3 p-1 bg-secondary border border-borderColor rounded-sm" />
          </div>
          <input className="m-4 p-3 border-borderColor border rounded-md max-w-sm" placeholder="Search Movies" />
          <div className="m-4 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {movies.map((movie: IMovies) => (
              <div key={movie.title} className="border-2 border-borderColor rounded-md">
                <div className="bg-secondary p-8 flex justify-center items-center ">
                  <h1 className="text-white font-bold text-2xl">{movie.title}</h1>
                </div>
                <div className="flex flex-col p-4 ">
                  <p className="mb-2">{movie.genre}</p>
                  <div className="flex justify-between">
                    <p className="mb-2 text-primary">Playing at {movie.playing_time}</p>
                    <p className="mb-2 text-primary">{movie.duration}</p>
                  </div>
                  <p className="mb-2">{movie.synopsis}</p>
                  <CustomButton btnType="button" to="/detail" title="Book Now" containerStyles="bg-secondary  w-full" textStyles="text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlayingNowPage;