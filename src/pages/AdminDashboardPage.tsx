import { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";

import AddMovie from "../components/AddMovie";
import CustomButton from "../components/CustomButton";
import ManageMovies from "../components/ManageMovies";
import { moviesCollectionRef } from "../utils/movies";
import ManagePackages from "../components/ManagePackages";

const AdminDashboardPage = () => {
  const [movies, setMovies] = useState<any>([]);
  const [adminRoute, setAdminRoute] = useState<number>(1);

  useEffect(() => {
    const getMovie = onSnapshot(moviesCollectionRef, (querySnapshot) => {
      const items: any[] = [];
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id });
      });
      setMovies(items);
    });

    return () => {
      getMovie();
    };
  }, []);

  console.log(movies);

  const manageMovie = () => {
    setAdminRoute(1);
  };
  const managePackages = () => {
    setAdminRoute(2);
  };
  const createMovie = () => {
    setAdminRoute(3);
  };
  const editMovie = () => {
    setAdminRoute(4);
  };
  const editPackage = () => {
    setAdminRoute(5);
  };

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
              <CustomButton btnType="button" title="Manage Movies" containerStyles="border-black bg-white hover:bg-[#ededed]" textStyles="text-black hover:text-[#262626]" onClick={manageMovie} />
              <CustomButton btnType="button" title="Manage Packages" containerStyles="md:ml-5 border-borderColor bg-secondary hover:border-primary" textStyles="text-white" onClick={managePackages} />
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

        {adminRoute === 1 ? (
          <>
            <ManageMovies movies={movies} createMovie={createMovie} />
          </>
        ) : adminRoute === 2 ? (
          <>
            <ManagePackages />
          </>
        ) : adminRoute === 3 ? (
          <>
            <AddMovie backToManageMovie={manageMovie} />
          </>
        ) : (
          <></>
        )}
      </div>
    </section>
  );
};

export default AdminDashboardPage;
