import { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";

import ReadMore from "./ReadMore";
import CustomButton from "./CustomButton";
import { FirebaseSingleton } from "../models/FirebaseSingleton";

interface IPackages {
  id: string;
  name: string;
  price: number;
  bedType: string;
  souvenir: string;
  description: string;
  foodDiscount: number;
}

const ManagePackages = () => {
  const [packages, setPackages] = useState<any>([]);

  useEffect(() => {
    const getPackages = onSnapshot(FirebaseSingleton.packagesCollectionRef(), (querySnapshot) => {
      const items: any[] = [];
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id });
      });
      setPackages(items);
    });

    return () => {
      getPackages();
    };
  }, []);

  console.log(packages);

  return (
    <div className="flex flex-col">
      <div className="mx-4">
        <hr className="w-[150px] my-3 p-1 bg-bgColor border border-borderColor" />
      </div>
      <div className="m-4 grid lg:grid-cols-3 gap-5">
        {packages.map((packagee: IPackages) => (
          <div key={packagee.id} className="bg-bgColor border-2 border-borderColor rounded-xl">
            <div className="border-2 border-borderColor bg-black px-8 p-5 flex justify-center items-center rounded-t-xl">
              <h1 className="text-white font-bold text-2xl capitalize">{packagee.name}</h1>
            </div>
            <div className="flex flex-col py-4 px-10 bg-bgColor rounded-b-xl">
              <div className="flex justify-between">
                <p className="mb-2 text-white text-justify">
                  Price: <span className="text-white">{packagee.price}</span>
                </p>
                {packagee.souvenir ? (
                  <p className="mb-2 text-white text-justify">
                    Souvenir: <span className="text-white">{packagee.souvenir}</span>
                  </p>
                ) : (
                  <p className="mb-2 text-primary text-justify">
                    Souvenir: <span className="text-primary">-</span>
                  </p>
                )}
              </div>
              <div className="flex justify-between">
                {packagee.foodDiscount ? (
                  <p className="mb-2 text-white text-justify">
                    Food Discount: <span className="text-white">{packagee.foodDiscount}</span>
                  </p>
                ) : (
                  <p className="mb-2 text-primary text-justify">
                    Food Discount: <span className="text-primary">-</span>
                  </p>
                )}
                {packagee.bedType ? (
                  <p className="mb-2 text-white text-justify">
                    Bed Type: <span className="text-white">{packagee.bedType}</span>
                  </p>
                ) : (
                  <p className="mb-2 text-primary text-justify">
                    Bed Type: <span className="text-primary">-</span>
                  </p>
                )}
              </div>
              <ReadMore textSlice={100} pStyle="mb-2 text-primary text-justify">
                {packagee.description}
              </ReadMore>
              <CustomButton btnType="button" to={`/adminDashboard/editPackage/${packagee.id}`} title="Edit" containerStyles="border-borderColor bg-black hover:border-primary  w-full" textStyles="text-white" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagePackages;
