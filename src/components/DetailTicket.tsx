import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { formatTime } from "../utils/formatTime";
import { secondToHms } from "../utils/secondToHms";
import { CinemaModel } from "../models/CinemaModel";
import { MoviesModel } from "../models/MoviesModel";
import { BookingModel } from "../models/BookingModel";

interface DetailTicketProps {
  movies: MoviesModel[];
  cinemas: CinemaModel[];
}

const DetailTicket = ({ movies, cinemas }: DetailTicketProps) => {
  const [booking, setBooking] = useState<BookingModel | null>(null);
  const [movie, setMovie] = useState<MoviesModel | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      const data = await BookingModel.get(id as string);
      setBooking(data);
      setMovie(findMovieById(data!.movieId));
    };

    getData();
  }, [id]);

  const findMovieById = (id: string): MoviesModel => {
    let foundedmovie: MoviesModel | null = null;
    movies.map((movie) => {
      if (movie.id === id) {
        foundedmovie = movie;
      }
    });
    return foundedmovie!;
  };

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
    <div className="border-2 border-borderColor bg-bgColor rounded-md">
      {movie && booking ? (
        <>
          <div className="bg-black p-8 h-[120px] flex justify-center items-center border rounded-md border-borderColor">
            <h1 className="text-white font-bold text-2xl text-center">{movie?.title}</h1>
          </div>
          <div className="flex flex-col p-4 lg:px-28 lg:py-8">
            <div className="mb-4 mx-auto text-primary text-center">
              <div className="grid grid-cols-2">
                <div className="text-left">
                  <h1 className="font-bold text-2xl">Price: </h1>
                  <h1 className="font-bold text-2xl text-white">{booking.price}</h1>
                </div>
                <h1 className="font-bold text-2xl text-left">{booking.paymentId === "fullPay" ? "Fully Paid" : "Pay within 72 hours at counter"}</h1>
              </div>
              <p className="mt-2">Seat's:</p>
              <div className="flex flex-wrap gap-x-3 items-center justify-between">
                {booking.seats.map((item) => (
                  <p key={item}>A{item + 1}</p>
                ))}
              </div>
            </div>
            <div className="flex justify-between text-justify">
              <p className="mb-2 text-primary">
                Genre: <span className="text-white">{movie.genre}</span>
              </p>
              <p className="mb-2 text-white">{findCinemaById(movie.cinemaId).name}</p>
            </div>
            <div className="flex justify-between text-justify">
              <p className="mb-2 text-primary">
                Playing at <span className="text-white">{formatTime(movie.playingTime)}</span>
              </p>
              <p className="mb-2 text-white">{secondToHms(movie.duration)}</p>
            </div>
            <p className="mb-2 text-justify text-primary">{movie.synopsis}</p>
          </div>
        </>
      ) : (
        <div className="flex h-[500px] items-center justify-center">
          <div className="text-center">
            <p className="text-primary text-xl mt-3">Loading</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailTicket;
