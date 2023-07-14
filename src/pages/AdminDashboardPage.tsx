import { useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";
import { getMovieList } from "../utils/movies";
import ManageMovies from "../components/ManageMovies";
import ManagePackages from "../components/ManagePackages";

const AdminDashboardPage = () => {
  const [movies, setMovies] = useState<any>([]);
  const [isPackages, setIsPackages] = useState(false);

  useEffect(() => {
    const getMovie = async () => {
      const data = await getMovieList();
      setMovies(data);
    };

    getMovie();
  }, []);

  return (
    <section className="pt-28 pb-8 lg:pt-32">
      <div className="container w-full">
        <div className="flex flex-col md:flex-row mb-6 items-center justify-between">
          <div className="mx-4">
            <h1 className="py-1 text-5xl font-bold text-secondary">Admin Dashboard.</h1>
            <hr className="w-[150px] my-3 p-1 bg-secondary border border-borderColor rounded-sm" />
            <p className="text-primary text-xl max-w-xl">
              Wellcome back <span className="text-secondary capitalize">Admin</span>. You can manage <span className="text-secondary capitalize">Movies</span> and <span className="text-secondary capitalize">Packages</span> here.
            </p>
            <div className="flex flex-col md:flex-row my-3">
              <CustomButton btnType="button" title="Manage Movies" containerStyles="border-black bg-white hover:bg-[#ededed]" textStyles="text-black hover:text-[#262626]" onClick={() => setIsPackages(false)} />
              <CustomButton btnType="button" title="Manage Packages" containerStyles="md:ml-5 border-borderColor bg-secondary hover:border-primary" textStyles="text-white" onClick={() => setIsPackages(true)} />
            </div>
          </div>

          <div className="grid w-full grid-cols-2 gap-3 self-center mx-4 text-primary md:max-w-md mt-5 md:mt-0 ">
            <div className="p-3 py-5 text-center border-2 border-borderColor rounded-md">
              <h1 className="text-4xl font-bold text-secondary lg:text-5xl">{movies.length}</h1>
              <p className="font-base text-base lg:text-xl">Movies</p>
            </div>
            <div className="p-3 py-5 text-center border-2 border-borderColor rounded-md">
              <h1 className="text-4xl font-bold text-secondary lg:text-5xl">3</h1>
              <p className="font-base text-base lg:text-xl">Packages</p>
            </div>
          </div>
        </div>

        {!isPackages ? (
          <>
            <ManageMovies />
          </>
        ) : (
          <>
            <ManagePackages />
          </>
        )}
      </div>
    </section>
  );
};

export default AdminDashboardPage;
