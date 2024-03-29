import { useEffect, useState } from "react";

import ReadMore from "../components/ReadMore";
import { formatTime } from "../utils/formatTime";
import { secondToHms } from "../utils/secondToHms";
import { MoviesModel } from "../models/MoviesModel";
import { CinemaModel } from "../models/CinemaModel";
import CustomButton from "../components/CustomButton";

interface PlayingNowPageProps {
  movies: MoviesModel[];
  cinemas: CinemaModel[];
}

const PlayingNowPage = ({ movies, cinemas }: PlayingNowPageProps) => {
  const [search, setSearch] = useState<string>("");
  const [filteredMovie, setFilteredMovie] = useState<MoviesModel[]>([]);

  useEffect(() => {
    setFilteredMovie(movies.filter((item) => item.title.toLowerCase().includes(search.toLowerCase())));
  }, [search, movies]);

  const findCinemaById = (id: string): CinemaModel => {
    let foundedCinema: CinemaModel | null = null;
    cinemas.map((cinema) => {
      if (cinema.id === id) {
        foundedCinema = cinema;
      }
    });
    return foundedCinema!;
  };

  return (
    <section className="pt-28 pb-24 lg:py-32">
      <div className="container w-full">
        <div className="flex flex-col">
          <div className="mx-4">
            <h1 className="py-1 text-5xl font-bold text-secondary">Playing Now In Cinemas</h1>
            <hr className="w-[300px] my-3 p-1 bg-bgColor border border-borderColor rounded-sm" />
          </div>
          <div className="m-4 max-w-sm">
            <input className="p-3 bg-bgColor border-borderColor border-2 rounded-md w-full" placeholder="Search Movies" onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="m-4 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredMovie.map((movie: MoviesModel) => (
              <div key={movie.title} className="border-2 border-borderColor bg-bgColor rounded-md">
                <div className="bg-black p-8 h-[120px] flex justify-center items-center border rounded-md border-borderColor">
                  <h1 className="text-white font-bold text-2xl text-center">{movie.title}</h1>
                </div>
                <div className="flex flex-col p-4 ">
                  <div className="flex justify-between text-justify">
                    <p className="mb-2 text-justify">{movie.genre}</p>
                    <p className="mb-2 text-primary">
                      Cinema: <span className="text-white">{findCinemaById(movie.cinemaId).name}</span>
                    </p>
                  </div>
                  <div className="flex justify-between text-justify">
                    <p className="mb-2 text-primary">
                      Playing at <span className="text-white">{formatTime(movie.playingTime)}</span>
                    </p>
                    <p className="mb-2 text-white">{secondToHms(movie.duration)}</p>
                  </div>
                  <ReadMore textSlice={70} pStyle="mb-2 text-justify text-primary">
                    {movie.synopsis}
                  </ReadMore>
                  <CustomButton btnType="button" to={`/book/${movie.id}`} title="Book Now" containerStyles="border-borderColor bg-black hover:border-primary w-full" textStyles="text-white" />
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
