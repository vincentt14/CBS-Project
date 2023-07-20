import CustomButton from "../components/CustomButton";
import ticket from "../lottie/ticket.json";
import Lottie from "lottie-react";
import { MoviesModel } from "../models/MoviesModel";
import { UserModel } from "../models/UserModel";

interface HomePageProps {
  allUsers: UserModel[];
  movies: MoviesModel[];
  authUser: UserModel | null;
}

const HomePage = ({ authUser, movies, allUsers }: HomePageProps) => {
  return (
    <section className="pt-28 pb-24 lg:pt-44 lg:pb-32">
      <div className="container">
        <div className="flex flex-wrap">
          <div className="w-full self-center px-4 lg:w-1/2">
            <h1 className="py-1 text-5xl font-bold text-secondary">Cinema Booking System</h1>
            <hr className="w-[200px] my-3 p-1 bg-bgColor border border-borderColor rounded-sm" />
            {authUser ? (
              <p className="text-primary text-xl max-w-xl">
                Hello and Welcome back <span className="text-secondary font-bold capitalize">{authUser.name}</span>. Make your day by booking tickets online, <span className="text-secondary capitalize">Easy</span> and{" "}
                <span className="text-secondary capitalize">Simple</span>.
              </p>
            ) : (
              <p className="text-primary text-xl max-w-xl">
                This application is used for <span className="text-secondary">Booking</span> and <span className="text-secondary">Manage Movies, Cinemas and Packages</span>.
              </p>
            )}
            <div className="flex flex-col md:flex-row my-3">
              {authUser ? (
                <>
                  <CustomButton btnType="button" title="Playing Now" to="/playingNow" containerStyles="border-black bg-white hover:bg-[#ededed]" textStyles="text-black hover:text-[#262626]" />
                  {authUser.isAdmin && <CustomButton btnType="button" title="Manage Packages or Movies" to="/adminDashboard" containerStyles="md:ml-5 border-borderColor bg-bgColor hover:border-primary" textStyles="text-white" />}
                </>
              ) : (
                <>
                  <CustomButton btnType="button" title="Login for Book tickets or Manage" to="/login" containerStyles="border-black bg-white hover:bg-[#ededed]" textStyles="text-black hover:text-[#262626]" />
                </>
              )}
            </div>
            <div>
              <div className="mb-6 grid max-w-lg grid-cols-2 gap-0 border-2 border-borderColor bg-bgColor p-6 text-primary md:max-w-md rounded-md">
                <div className="grid grid-cols-3">
                  <div className="col-1 col-span-1 flex items-center justify-center text-2xl font-bold text-primary">{allUsers.length}</div>
                  <div className="col-2 col-span-2">
                    <p className="text-xs lg:text-base">User's</p>
                    <p className="text-xs lg:text-base">Count</p>
                  </div>
                </div>
                <div className="grid grid-cols-3">
                  <div className="col-1 col-span-1 flex items-center justify-center text-2xl font-bold text-primary">{movies.length}</div>
                  <div className="col-2 col-span-2">
                    <p className="text-xs lg:text-base">Movies</p>
                    <p className="text-xs lg:text-base">Playing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden w-full px-4 selft-center md:block lg:w-1/2 border-2 border-borderColor rounded-md p-4 bg-bgColor">
            <Lottie animationData={ticket} style={{ width: "350px", height: "350px" }} className="mx-auto blur-none" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
