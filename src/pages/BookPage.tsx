import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect, ReactNode } from "react";

import { IPackage } from "../App";
import { UserModel } from "../models/UserModel";
import { formatTime } from "../utils/formatTime";
import { secondToHms } from "../utils/secondToHms";
import { CinemaModel } from "../models/CinemaModel";
import { MoviesModel } from "../models/MoviesModel";
import CustomButton from "../components/CustomButton";
import { BookingModel } from "../models/BookingModel";
import { BeaniePackageModel } from "../models/BeaniePackageModel";
import { DeluxePackageModel } from "../models/DeluxePackageModel";
import { ClassicPackageModel } from "../models/ClassicPackageModel";

interface BookPageProps {
  cinemas: CinemaModel[];
  authUser: UserModel | null;
  packages: IPackage[];
}

const BookPage = ({ cinemas, authUser, packages }: BookPageProps) => {
  const [movie, setMovie] = useState<MoviesModel | null>(null);
  const [cinema, setCinema] = useState<CinemaModel | null>(null);
  const [packagee, setpackagee] = useState<BeaniePackageModel | DeluxePackageModel | ClassicPackageModel | null>(null);
  const [isBooked, setIsBooked] = useState<boolean[]>([]);
  const [seatsChoosed, setSeatsChoosed] = useState<boolean[]>([]);
  const [payment, setPayment] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      const data: MoviesModel = (await MoviesModel.getMovie(id as string))!;
      setMovie(data);
      setCinema(findCinemaById(data.cinemaId));
    };

    getData();
  }, [id]);

  useEffect(() => {
    const initialAvailableSeats: boolean[] = new Array(cinema?.totalSeats).fill(false);
    setSeatsChoosed(initialAvailableSeats);
    const initialBookedSeats: boolean[] = new Array(cinema?.totalSeats).fill(false);
    (cinema?.seats ?? []).forEach((v) => (initialBookedSeats[v] = true));
    setIsBooked(initialBookedSeats);
    setpackagee(findPackageByCodeId());
  }, [cinema]);

  const findCinemaById = (id?: string | undefined): CinemaModel => {
    let foundedCinema: CinemaModel | null = null;
    cinemas?.map((cinema) => {
      if (cinema.id === id) {
        foundedCinema = cinema;
      }
    });
    return foundedCinema!;
  };

  const findPackageByCodeId = (): BeaniePackageModel | DeluxePackageModel | ClassicPackageModel => {
    let foundedPackage: BeaniePackageModel | DeluxePackageModel | ClassicPackageModel | null = null;
    packages?.forEach((pack: IPackage) => {
      if (cinema?.packageId === "BN" && pack.data.codeId === "BN") {
        foundedPackage = BeaniePackageModel.fromFirebase(pack.data, pack.id);
        return;
      } else if (cinema?.packageId === "DX" && pack.data.codeId === "DX") {
        foundedPackage = DeluxePackageModel.fromFirebase(pack.data, pack.id);
        return;
      } else if (cinema?.packageId === "CS" && pack.data.codeId === "CS") {
        foundedPackage = ClassicPackageModel.fromFirebase(pack.data, pack.id);
        return;
      }
    });
    return foundedPackage!;
  };

  const chooseSeatHandler = (id: number) => {
    if (isBooked[id]) {
      return;
    }

    const temp = seatsChoosed.map((value) => value);
    temp[id] = !temp[id];
    setSeatsChoosed(temp);
  };

  const handlingColor = (isBooked: boolean, seatsChoosed: boolean) => {
    if (isBooked) {
      return "w-11 h-11 bg-red-300 border-2 border-red-600 rounded-md";
    }
    if (seatsChoosed === true) {
      return "w-11 h-11 bg-green-300 border-2 border-green-600 rounded-md cursor-pointer";
    }
    return "w-11 h-11 cursor-pointer bg-bgColor border border-borderColor rounded-md";
  };

  const renderChooseSeat = (amount: number): ReactNode[] => {
    const temp: ReactNode[] = [];
    for (let i = 0; i < amount; i++) {
      temp.push(
        <div className={`${handlingColor(isBooked[i], seatsChoosed[i])} flex items-center justify-center font-light text-primary text-sm`} key={`A-${i}`} onClick={(e: React.MouseEvent<HTMLDivElement>) => chooseSeatHandler(i)}>
          A{i + 1}
        </div>
      );
    }
    return temp;
  };

  const countAvailableSeats = (available: number) => {
    const temp: number[] = [];
    for (let i = 0; i < isBooked.length; i++) {
      if (isBooked[i] === true) {
        temp.push(i);
      }
    }
    return available - temp.length;
  };

  const countPrice = (packagePrice: number): number => {
    const tempBooking: number[] = [];
    for (let i = 0; i < seatsChoosed.length; i++) {
      if (seatsChoosed[i] === true) {
        tempBooking.push(i);
      }
    }
    const totalPrice = tempBooking.length * packagePrice;

    return totalPrice;  
  };

  const handleBook = async () => {
    /// cinemas/:id/seats
    const tempCinema: number[] = []; // red and green

    /// booking/:id/seats
    const tempBooking: number[] = []; // only green

    for (let i = 0; i < isBooked.length; i++) {
      if (isBooked[i] === true) {
        tempCinema.push(i);
      }
    }
    for (let i = 0; i < seatsChoosed.length; i++) {
      if (seatsChoosed[i] === true) {
        tempCinema.push(i);
        tempBooking.push(i);
      }
    }

    setPrice(countPrice(packagee!.price));
    console.log(price);

    if (payment != "" && tempBooking.length != 0) {
      Swal.showLoading();
      const resBooking = await BookingModel.create(authUser!.id, movie!.id, payment, tempBooking, price);
      const resCinema = await CinemaModel.updateSeats(cinema!.id, tempCinema);

      if (resBooking.success && resCinema.success) {
        Swal.fire({
          icon: "success",
          background: "#111",
          title: "Booking Success",
          showConfirmButton: false,
          timer: 1000,
        });
        navigate("/userDashboard");
      } else {
        Swal.fire({
          icon: "error",
          background: "#111",
          title: "Booking Failed",
          text: `${resBooking.message} \n ${resCinema.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      Swal.fire({
        icon: "warning",
        background: "#111",
        title: "You must choose at least 1 seat & payment method",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <section className="pt-28 pb-8 lg:pt-32">
      <div className="container w-full">
        {movie && cinema && packagee ? (
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
                      {cinema.name}, total {cinema.totalSeats} seat's
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
              <div className="flex flex-col md:flex-row items-center justify-between">
                <p className="py-1 text-3xl font-bold text-primary">Choose your seat's</p>
                <div className="flex items-center justify-between space-x-3">
                  <p className="text-primary lg:text-xl max-w-xl">Available</p>
                  <div className="w-10 h-10 bg-bgColor border border-borderColor rounded-md" />
                  <p className="text-primary lg:text-xl max-w-xl">Choosed</p>
                  <div className="w-10 h-10 bg-green-300 border-2 border-green-600 rounded-md" />
                  <p className="text-primary lg:text-xl max-w-xl">Booked</p>
                  <div className="w-10 h-10 bg-red-300 border-2 border-red-600 rounded-md" />
                </div>
              </div>
              <p className="max-w-xl mt-2 text-primary">
                Available : <span className="text-white">{countAvailableSeats(cinema.totalAvailableSeats)}</span> seat's
              </p>
              <div className={`w-full my-5 flex flex-wrap gap-5 justify-between items-center`}>{renderChooseSeat(cinema.totalSeats)}</div>
              <div className="mt-14 w-full h-20 bg-bgColor border border-borderColor flex items-center justify-center rounded-xl">
                <h1 className="font-bold text-xl text-primary">Movie Screen</h1>
              </div>
            </div>
            <div className="mx-4">
              <div className="my-5">
                <div className="flex justify-between items-center gap-x-5">
                  <h1 className="py-1 text-3xl font-bold text-primary">Total Price:</h1>
                  <h1 className="py-1 text-3xl font-bold text-white">{countPrice(packagee.price)}</h1>
                </div>
                {packages.map((pack) => {
                  if (pack.data.codeId === packagee.codeId) {
                    return (
                      <div key={pack.id}>
                        <div className="flex justify-between items-center gap-x-5">
                          {pack.data.souvenir && (
                            <>
                              <p className="text-primary text-xl max-w-xl">Free Souvenir</p>
                              <p className="capitalize text-white text-xl max-w-xl">{pack.data.souvenir}</p>
                            </>
                          )}
                        </div>
                        <div className="flex justify-between items-center gap-x-5">
                          {pack.data.foodDiscount && (
                            <>
                              <p className="text-primary text-xl max-w-xl">Food Discount Voucher</p>
                              <p className="text-white text-xl max-w-xl">{pack.data.foodDiscount}%</p>
                            </>
                          )}
                        </div>
                        <div className="flex justify-between items-center gap-x-5">
                          {pack.data.bedType && (
                            <>
                              <p className="text-primary text-xl max-w-xl">Cinema Bed Type</p>
                              <p className="capitalize text-white text-xl max-w-xl">{pack.data.bedType}</p>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
              <h1 className="py-1 text-3xl font-bold text-primary">Choose Payment Method</h1>
              <hr className="w-[100px] my-3 p-1 bg-bgColor border border-borderColor rounded-sm" />
              <div className="mb-10 grid grid-cols-2 gap-x-5 w-full self-center">
                <div className="flex flex-col text-primary">
                  <CustomButton
                    btnType="button"
                    heading="Full Pay Online"
                    containerStyles={payment === "fullPay" ? "w-full border-black bg-white hover:bg-[#ededed] rounded-xl" : "w-full border-borderColor bg-black hover:border-primary rounded-xl"}
                    textStyles={payment === "fullPay" ? "text-black hover:text-[#262626]" : "text-white"}
                    onClick={() => setPayment("fullPay")}
                  />
                  <div className="flex items-center justify-center">
                    <p className="max-w-xl text-center">With the "Full Pay Online" method, you need to pay for your ticket's now, this makes it easier for you to watch your favorite movies later on cinema.</p>
                  </div>
                </div>
                <div className="flex flex-col text-center text-primary">
                  <CustomButton
                    btnType="button"
                    heading="Pay Later"
                    containerStyles={payment === "payLater" ? "w-full border-black bg-white hover:bg-[#ededed] rounded-xl" : "w-full border-borderColor bg-black hover:border-primary rounded-xl"}
                    textStyles={payment === "payLater" ? "text-black hover:text-[#262626]" : "text-white"}
                    onClick={() => setPayment("payLater")}
                  />
                  <div className="flex items-center justify-center">
                    <p className="max-w-xl text-center">With the "Pay Later" method, you don't have to pay your ticket's now!, but you need to pay your bill at counter within 72 hours from the booking date.</p>
                  </div>
                </div>
              </div>
              <CustomButton btnType="button" title="Book Now" containerStyles="py-4 w-full border-borderColor bg-bgColor hover:border-primary" textStyles="text-white" onClick={handleBook} />
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
