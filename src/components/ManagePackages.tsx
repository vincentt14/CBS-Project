import { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import { getPackageList } from "../utils/packages";
import ReadMore from "./ReadMore";

interface IPackages {
  name: string;
  price: number;
  description: string;
}

const ManagePackages = () => {
  const [packages, setPackages] = useState<any>([]);

  useEffect(() => {
    const getPackage = async () => {
      const data = await getPackageList();
      setPackages(data);
    };

    getPackage();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="mx-4">
        <hr className="w-[150px] my-3 p-1 bg-secondary border border-borderColor" />
      </div>
      <div className="m-4 grid lg:grid-cols-3 gap-5">
        {packages.map((packagee: IPackages) => (
          <div key={packagee.name}>
            <div className="bg-secondary px-8 pt-8 flex justify-center items-center rounded-t-xl">
              <h1 className="text-white font-bold text-2xl capitalize">{packagee.name}</h1>
            </div>
            <div className="flex flex-col py-4 px-10 bg-secondary rounded-b-xl">
              <p className="mb-2 text-white text-justify">
                Price: <span className="text-primary">{packagee.price}</span>
              </p>
              <ReadMore textSlice={100} pStyle="mb-2 text-primary text-justify">{packagee.description}</ReadMore>
              <CustomButton btnType="button" to="/editPackage" title="Edit" containerStyles="bg-secondary  w-full" textStyles="text-white" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagePackages;
