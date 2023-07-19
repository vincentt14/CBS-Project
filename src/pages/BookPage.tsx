import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { MoviesModel } from "../models/MoviesModel";

const Bookpage = () => {
  const [movie, setMovie] = useState<MoviesModel | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      const data: MoviesModel = (await MoviesModel.getMovie(id as string))!;
      setMovie(data);
    };

    getData();
  }, []);

  console.log(movie);

  return (
    <section className="pt-28 pb-8 lg:pt-32">
      <div className="container w-full">
        <div className="flex flex-col md:flex-row mb-6 items-center justify-between">
          <div className="mx-4">
            <h1 className="py-1 text-5xl font-bold text-secondary">{movie?.title ?? ""}</h1>
            <hr className="w-[150px] my-3 p-1 bg-bgColor border border-borderColor rounded-sm" />
            <p className="text-xl max-w-xl my-2">
              Genre : <span className="text-primary">{movie?.genre ?? ""}</span>
            </p>
            <p className="text-primary text-xl max-w-xl">{movie?.synopsis ?? ""}</p>
          </div>

          <div className="grid w-full grid-cols-2 gap-3 self-center mx-4 text-primary md:max-w-md mt-5 md:mt-0 ">
            <div className="p-3 py-5 text-center border-2 border-borderColor rounded-md">
              <h1 className="text-4xl font-bold bg-bgColor text-secondary">{movie?.playingTime ?? ""}</h1>
              <p className="font-base text-base lg:text-xl">Playing Time</p>
            </div>
            <div className="p-3 py-5 text-center bg-bgColor border-2 border-borderColor rounded-md">
              <h1 className="text-4xl font-bold text-secondary">{movie?.duration ?? ""}</h1>
              <p className="font-base text-base lg:text-xl">Duration</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bookpage;
