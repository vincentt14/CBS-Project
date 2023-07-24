import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDocs, query, where } from "firebase/firestore";

import CustomButton from "../components/CustomButton";
import { MoviesModel } from "../models/MoviesModel";
import { UserModel } from "../models/UserModel";
import { secondToHms } from "../utils/secondToHms";
import { formatTime } from "../utils/formatTime";
import { FirebaseSingleton } from "../models/FirebaseSingleton";
import { BookingModel } from "../models/BookingModel";
import { CinemaModel } from "../models/CinemaModel";

interface AdminDahsboardProps {
  authUser: UserModel | null;
  movies: MoviesModel[];
}

const UserDashboardPage = ({ authUser, movies }: AdminDahsboardProps) => {
  const [allBooking, setAllBooking] = useState<BookingModel[] | null>(null);
  const [menu, setMenu] = useState<string>("");

  useEffect(() => {
    const findBookingBasedOnUser = async () => {
      const ref = query(FirebaseSingleton.bookingsCollectionRef(), where("userId", "==", authUser?.id));

      const querySnapshot = await getDocs(ref);
      const items: BookingModel[] = [];
      querySnapshot.forEach((doc) => {
        const result = BookingModel.fromFirebase(doc.data(), doc.id);
        items.push(result);
      });
      setAllBooking(items);
    };

    findBookingBasedOnUser();
  }, []);

  const findMovieById = (id: string): MoviesModel => {
    let foundedmovie: MoviesModel | null = null;
    movies.map((movie) => {
      if (movie.id === id) {
        foundedmovie = movie;
      }
    });
    return foundedmovie!;
  };

  return (
    <section className="pt-28 pb-8 lg:pt-32">
      <div className="container w-full">
        {authUser && allBooking ? (
          <>
            <div className="flex flex-col md:flex-row mb-6 items-center justify-between">
              <div className="mx-4">
                <h1 className="py-1 text-5xl font-bold text-secondary capitalize">{authUser.name} Dashboard</h1>
                <hr className="w-[150px] my-3 p-1 bg-bgColor border border-borderColor rounded-sm" />
                <p className="text-primary text-xl max-w-xl">
                  Hello <span className="text-secondary capitalize">{authUser.name}</span> welcome to Dashboard. You can view all your <span className="text-secondary capitalize">Booked Movies Ticket</span> here.
                </p>
              </div>

              <div className="grid w-full grid-cols-1 gap-2 self-center mx-4 text-primary md:max-w-md mt-5 md:mt-0 ">
                <div className="mx-4 p-3 text-center bg-bgColor border-2 border-borderColor rounded-md">
                  <h1 className="text-4xl font-bold text-secondary lg:text-5xl">{allBooking.length}</h1>
                  <p className="font-base text-base lg:text-xl">Ticket's</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="mx-4">
                <hr className="w-[150px] my-3 p-1 bg-bgColor border border-borderColor rounded-sm" />
              </div>
              <div className="m-4 grid md:grid-cols-2 gap-5">
                <div className="border-2 border-borderColor bg-bgColor rounded-md flex flex-col justify-center items-center p-8">
                  <div className="flex flex-col w-full">
                    <h1 className="text-3xl font-bold text-primary mx-auto mb-5">Ticket's</h1>
                    <div className={`grid grid-rows-1 w-full gap-y-2 justify-center items-center`}>
                      {allBooking.map((item: BookingModel) => (
                        <CustomButton
                          key={item.id}
                          btnType="button"
                          title={findMovieById(item.movieId).title}
                          containerStyles={menu === `${item.id}` ? "w-full my-0 border-black bg-white hover:bg-[#ededed]" : "w-full my-0 border-borderColor bg-black hover:border-primary"}
                          textStyles={menu === `${item.id}` ? "text-black hover:text-[#262626]" : "text-white"}
                          to={`/userDashboard/${item.id}`}
                          onClick={() => setMenu(`${item.id}`)}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <Outlet />
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-[500px] items-center justify-center">
            <div className="text-center">
              <h1 className="font-bold text-5xl">Not Auth</h1>
              <p className="text-primary text-xl mt-3">Login for access user dashboard</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default UserDashboardPage;
