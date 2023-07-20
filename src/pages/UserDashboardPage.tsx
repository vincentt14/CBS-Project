import { Outlet } from "react-router-dom";

import CustomButton from "../components/CustomButton";
import { useState } from "react";
import { MoviesModel } from "../models/MoviesModel";
import { UserModel } from "../models/UserModel";
import { secondToHms } from "../utils/secondToHms";

interface AdminDahsboardProps {
  authUser: UserModel | null;
  movies: MoviesModel[];
}

const UserDashboardPage = ({ authUser, movies }: AdminDahsboardProps) => {
  const [menu, setMenu] = useState<string>("");

  return (
    <section className="pt-28 pb-8 lg:pt-32">
      <div className="container w-full">
        {authUser ? (
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
                <div className="p-3 text-center bg-bgColor border-2 border-borderColor rounded-md">
                  <h1 className="text-4xl font-bold text-secondary lg:text-5xl">{movies.length}</h1>
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
                  <div className="flex flex-col">
                    <h1 className="text-3xl font-bold text-primary mx-auto">Ticket's</h1>
                    <CustomButton
                      btnType="button"
                      title="Elemental Forces of Nature"
                      containerStyles={menu === "m" ? "w-full border-black bg-white hover:bg-[#ededed]" : "w-full border-borderColor bg-black hover:border-primary"}
                      textStyles={menu === "m" ? "text-black hover:text-[#262626]" : "text-white"}
                      to=""
                      onClick={() => setMenu("m")}
                    />
                    <CustomButton
                      btnType="button"
                      title="John Wick: Chapter 4"
                      containerStyles={menu === "c" ? "w-full border-black bg-white hover:bg-[#ededed]" : "w-full border-borderColor bg-black hover:border-primary"}
                      textStyles={menu === "c" ? "text-black hover:text-[#262626]" : "text-white"}
                      to=""
                      onClick={() => setMenu("c")}
                    />
                    <CustomButton
                      btnType="button"
                      title="Fast X"
                      containerStyles={menu === "p" ? "w-full border-black bg-white hover:bg-[#ededed]" : "w-full border-borderColor bg-black hover:border-primary"}
                      textStyles={menu === "p" ? "text-black hover:text-[#262626]" : "text-white"}
                      to=""
                      onClick={() => setMenu("p")}
                    />
                  </div>
                </div>

                <Outlet />
                {/* yg dibawah ini outlet */}
                <div className="border-2 border-borderColor bg-bgColor rounded-md">
                  <div className="bg-black p-8 h-[120px] flex justify-center items-center border rounded-md border-borderColor">
                    <h1 className="text-white font-bold text-2xl">{movies[1].title}</h1>
                  </div>
                  <div className="flex flex-col p-4 lg:px-28 lg:py-8">
                    <h1 className="text-primary font-bold text-2xl mb-8 mx-auto">Pay within 72 hours at counter</h1>
                    <div className="flex justify-between text-justify">
                      <p className="mb-2 text-justify">{movies[1].genre}</p>
                      <p className="mb-2 text-primary">
                        Cinema: <span className="text-white">{movies[1].cinemaId}</span>
                      </p>
                    </div>
                    <div className="flex justify-between text-justify">
                      <p className="mb-2 text-primary">
                        Playing at <span className="text-white">{movies[1].playingTime}</span>
                      </p>
                      <p className="mb-2 text-white">{secondToHms(movies[1].duration)}</p>
                    </div>
                    <p className="mb-2 text-justify text-primary">{movies[1].synopsis}</p>
                  </div>
                </div>
                {/* outlet selesai */}
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
