import { useParams } from "react-router-dom";
import { useState, useEffect, ReactNode } from "react";

import { MoviesModel } from "../models/MoviesModel";
import CustomButton from "../components/CustomButton";
import { secondToHms } from "../utils/secondToHms";
import { CinemaModel } from "../models/CinemaModel";
import { formatTime } from "../utils/formatTime";

interface BookPageProps {
  cinemas: CinemaModel[];
}

const BookPage = ({ cinemas }: BookPageProps) => {
  const [movie, setMovie] = useState<MoviesModel | null>(null);
  // const [seatAmount, setSeatAmount] = useState<number>(0);
  // const [submitAmountSeats, setSubmitAmountSeats] = useState<number>(0);
  const [payment, setPayment] = useState<string>("");
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      const data: MoviesModel = (await MoviesModel.getMovie(id as string))!;
      setMovie(data);
    };

    getData();
  }, []);

  const findCinemaById = (id?: string | undefined): CinemaModel => {
    let foundedCinema: CinemaModel | null = null;
    cinemas?.map((cinema) => {
      if (cinema.id === id) {
        foundedCinema = cinema;
      }
    });
    return foundedCinema!;
  };

  // const handleSubmitSeatNum = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setSubmitAmountSeats(seatAmount);
  //   renderChooseSeat(submitAmountSeats);
  // };

  const renderChooseSeat = (amount: number): ReactNode[] => {
    const temp: ReactNode[] = [];
    for (let i = 0; i < amount; i++) {
      temp.push(<div className="w-10 h-10 cursor-pointer bg-bgColor border border-borderColor rounded-md" />);
    }
    return temp;
  };

  return (
    <section className="pt-28 pb-8 lg:pt-32">
      <div className="container w-full">
        {movie ? (
          <>
            <div className="flex flex-col md:flex-row mb-6 items-center justify-between">
              <div className="mx-4">
                <CustomButton btnType="button" title="Back to Playing Now" to="/playingNow" containerStyles="border-borderColor bg-bgColor hover:border-primary" textStyles="text-white" />
                <h1 className="py-1 text-5xl font-bold text-secondary">{movie.title}</h1>
                <hr className="w-[150px] my-3 p-1 bg-bgColor border border-borderColor rounded-sm" />
                <div className="flex gap-10">
                  <p className="text-xl max-w-xl my-2">
                    Genre : <span className="text-primary">{movie.genre}</span>
                  </p>
                  <p className="text-xl max-w-xl my-2">
                    Cinema :{" "}
                    <span className="text-primary">
                      {findCinemaById(movie.cinemaId).name}, total {findCinemaById(movie.cinemaId).totalSeats} seat's
                    </span>
                  </p>
                </div>
                <p className="text-primary text-xl max-w-xl">{movie.synopsis}</p>
              </div>
              <div className="grid w-full grid-cols-2 gap-3 self-center mx-4 text-primary md:max-w-md mt-5 md:mt-0 ">
                <div className="p-3 py-5 text-center bg-bgColor border-2 border-borderColor rounded-md">
                  <h1 className="text-4xl font-bold text-secondary">{formatTime(movie.playingTime)}</h1>
                  <p className="font-base text-base lg:text-xl">Playing Time</p>
                </div>
                <div className="p-3 py-5 text-center bg-bgColor border-2 border-borderColor rounded-md">
                  <h1 className="text-4xl font-bold text-secondary">{secondToHms(movie.duration)}</h1>
                  <p className="font-base text-base lg:text-xl">Duration</p>
                </div>
              </div>
            </div>
            <div className="mx-4 my-10">
              <p className="text-primary text-xl max-w-xl">How many seat you want to book</p>
              <p className="max-w-xl mt-2 mb-4 text-primary">
                Available : <span className="text-white">{findCinemaById(movie.cinemaId).totalSeats}</span> seat's
              </p>
              <div className={`w-full flex gap-5 justify-between `}>{renderChooseSeat(findCinemaById(movie.cinemaId).totalSeats)}</div>
            </div>
            {/* <form className="flex gap-x-4" onSubmit={handleSubmitSeatNum}>
                <input
                  type="number"
                  className="my-4 p-3 bg-bgColor border-borderColor border-2 rounded-md w-40"
                  placeholder="Seat's"
                  min="1"
                  max={findCinemaById(movie.cinemaId).totalSeats}
                  onChange={(e) => setSeatAmount(+e.target.value)}
                />
                <CustomButton btnType="submit" title="Submit" containerStyles="border-borderColor bg-bgColor hover:border-primary" textStyles="text-white" />
              </form> */}

            {/* {submitAmountSeats !== 0 && renderChooseSeat(submitAmountSeats)} */}
            <div className="mx-4">
              <h1 className="py-1 text-3xl font-bold text-primary">Choose Payment Method</h1>
              <hr className="w-[100px] my-3 p-1 bg-bgColor border border-borderColor rounded-sm" />
              <div className="mb-10 grid grid-cols-2 gap-x-5 w-full self-center">
                <div className="flex flex-col text-primary">
                  <CustomButton
                    btnType="button"
                    heading="Full Pay Online"
                    containerStyles={payment === "now" ? "w-full border-black bg-white hover:bg-[#ededed] rounded-xl" : "w-full border-borderColor bg-black hover:border-primary rounded-xl"}
                    textStyles={payment === "now" ? "text-black hover:text-[#262626]" : "text-white"}
                    onClick={() => setPayment("now")}
                  />
                  <div className="flex items-center justify-center">
                    <p className="max-w-xl text-center">With the "Full Pay Online" method, you need to pay for your ticket's now, this makes it easier for you to watch your favorite movies later on cinema.</p>
                  </div>
                </div>
                <div className="flex flex-col text-center text-primary">
                  <CustomButton
                    btnType="button"
                    heading="Pay Later"
                    containerStyles={payment === "later" ? "w-full border-black bg-white hover:bg-[#ededed] rounded-xl" : "w-full border-borderColor bg-black hover:border-primary rounded-xl"}
                    textStyles={payment === "later" ? "text-black hover:text-[#262626]" : "text-white"}
                    onClick={() => setPayment("later")}
                  />
                  <div className="flex items-center justify-center">
                    <p className="max-w-xl text-center">With the "Pay Later" method, you don't have to pay your ticket's now!, but you need to pay your bill at counter within 72 hours from the booking date.</p>
                  </div>
                </div>
              </div>
              <CustomButton btnType="button" title="Book Now" containerStyles="py-4 w-full border-borderColor bg-bgColor hover:border-primary" textStyles="text-white" />
            </div>
          </>
        ) : (
          <div className="flex h-[500px] items-center justify-center">
            <div className="text-center">
              <h1 className="font-bold text-5xl">Loading</h1>
              <p className="text-primary text-xl mt-3">Hold on, you are on your way</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BookPage;
