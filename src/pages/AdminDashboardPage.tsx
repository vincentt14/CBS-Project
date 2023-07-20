import { Outlet } from "react-router-dom";

import CustomButton from "../components/CustomButton";
import { useState } from "react";
import { MoviesModel } from "../models/MoviesModel";
import { CinemaModel } from "../models/CinemaModel";

interface AdminDahsboardProps {
  movies: MoviesModel[],
  cinemas: CinemaModel[]
}

const AdminDashboardPage = ({ movies, cinemas }: AdminDahsboardProps) => {
  const [menu, setMenu] = useState<string>("");

  return (
    <section className="pt-28 pb-8 lg:pt-32">
      <div className="container w-full">
        <div className="flex flex-col md:flex-row mb-6 items-center justify-between">
          <div className="mx-4">
            <h1 className="py-1 text-5xl font-bold text-secondary">Admin Dashboard</h1>
            <hr className="w-[150px] my-3 p-1 bg-bgColor border border-borderColor rounded-sm" />
            <p className="text-primary text-xl max-w-xl">
              Wellcome back <span className="text-secondary capitalize">Admin</span>. You can manage <span className="text-secondary capitalize">Movies</span> and <span className="text-secondary capitalize">Packages</span> here.
            </p>
            <div className="flex gap-x-3 flex-col md:flex-row my-3">
              <CustomButton
                btnType="button"
                title="Manage Movies"
                containerStyles={menu === "m" ? "my-1 border-black bg-white hover:bg-[#ededed]" : "my-1 border-borderColor bg-black hover:border-primary"}
                textStyles={menu === "m" ? "text-black hover:text-[#262626]" : "text-white"}
                to="/adminDashboard/manageMovies"
                onClick={() => setMenu("m")}
              />
              <CustomButton
                btnType="button"
                title="Manage Cinemas"
                containerStyles={menu === "c" ? "my-1 border-black bg-white hover:bg-[#ededed]" : "my-1 border-borderColor bg-black hover:border-primary"}
                textStyles={menu === "c" ? "text-black hover:text-[#262626]" : "text-white"}
                to="/adminDashboard/manageCinemas"
                onClick={() => setMenu("c")}
              />
              <CustomButton
                btnType="button"
                title="Manage Packages"
                containerStyles={menu === "p" ? "my-1 border-black bg-white hover:bg-[#ededed]" : "my-1 border-borderColor bg-black hover:border-primary"}
                textStyles={menu === "p" ? "text-black hover:text-[#262626]" : "text-white"}
                to="/adminDashboard/managePackages"
                onClick={() => setMenu("p")}
              />
            </div>
          </div>

          <div className="grid w-full grid-cols-3 gap-2 self-center mx-4 text-primary md:max-w-md mt-5 md:mt-0 ">
            <div className="p-3 text-center bg-bgColor border-2 border-borderColor rounded-md">
              <h1 className="text-4xl font-bold text-secondary lg:text-5xl">{movies.length}</h1>
              <p className="font-base text-base lg:text-xl">Movies</p>
            </div>
            <div className="p-3 text-center bg-bgColor border-2 border-borderColor rounded-md">
              <h1 className="text-4xl font-bold text-secondary lg:text-5xl">{cinemas.length}</h1>
              <p className="font-base text-base lg:text-xl">Cinema</p>
            </div>
            <div className="p-3 text-center bg-bgColor border-2 border-borderColor rounded-md">
              <h1 className="text-4xl font-bold text-secondary lg:text-5xl">3</h1>
              <p className="font-base text-base lg:text-xl">Packages</p>
            </div>
          </div>
        </div>

        <Outlet />
      </div>
    </section>
  );
};

export default AdminDashboardPage;
