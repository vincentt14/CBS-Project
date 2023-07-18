import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CustomButton from "./CustomButton";
import { MoviesModel } from "../models/MoviesModel";

const EditPackage = () => {
  const [previousValue, setPreviousValue] = useState<any>(null);
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(9000);
  const [souvenir, setSouvenir] = useState<string | null>("");
  const [foodDiscount, setFoodDiscount] = useState<number | null>(0);
  const [bedType, setBedType] = useState<string | null>("");
  const [description, setDescription] = useState<string>("");
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      const data = await MoviesModel.getMovie(id);
      setPreviousValue(data);
    };

    getData();
  }, []);

  console.log(previousValue);

  return (
    <div className="flex flex-col">
      <div className="mx-4">
        <hr className="w-[150px] my-3 p-1 bg-secondary border border-borderColor rounded-sm" />
      </div>
      <form className="m-4 grid lg:grid-cols-3 gap-5 border-borderColor border-2 rounded-md">
        <div className=" bg-secondary flex justify-center items-center p-5">
          <h1 className="text-white font-bold text-2xl">Edit Package</h1>
        </div>
        <div className="flex flex-col items-center justify-center text-center">
          <div className="p-5">
            <div className="flex items-center justify-between my-4">
              <p className="text-secondary text-xl max-w-xl">Name</p>
              <input disabled required className="ml-8 p-2 border-borderColor border rounded-md text-primary" value={name} />
            </div>
            <div className="flex items-center justify-between my-4">
              <p className="text-secondary text-xl max-w-xl">Price</p>
              <input required className="ml-8 p-2 border-borderColor border rounded-md" type="number" value={price} />
            </div>
            {souvenir ? (
              <div className="flex items-center justify-between my-4">
                <p className="text-secondary text-xl max-w-xl">Souvenir</p>
                <input required className="ml-8 p-2 border-borderColor border rounded-md" value={souvenir} onChange={(e) => setSouvenir(e.target.value)} />
              </div>
            ) : (
              <div className="flex items-center justify-between my-4">
                <p className="text-secondary text-xl max-w-xl">Souvenir</p>
                <input disabled required className="ml-8 p-2 border-borderColor border rounded-md text-primary" value="none" />
              </div>
            )}
            <div className="flex items-center justify-between">
              <CustomButton btnType="button" title="Back to Manage" containerStyles="border-black bg-white hover:bg-[#ededed]" textStyles="text-black hover:text-[#262626]" to="/adminDashboard/managePackages" />
              <CustomButton btnType="submit" title="Edit Package" containerStyles="ml-4 border-borderColor bg-secondary hover:border-primary" textStyles="text-white" />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center text-center">
          <div className="p-5">
            {foodDiscount ? (
              <div className="flex items-center justify-between my-4">
                <p className="text-secondary text-xl max-w-xl">Food Discount</p>
                <input required className="ml-8 p-2 border-borderColor border rounded-md" type="number" value={foodDiscount} />
              </div>
            ) : (
              <div className="flex items-center justify-between my-4">
                <p className="text-secondary text-xl max-w-xl">Food Discount</p>
                <input disabled required className="ml-8 p-2 border-borderColor border rounded-md text-primary" value="none" />
              </div>
            )}
            {bedType ? (
              <div className="flex items-center justify-between my-4">
                <p className="text-secondary text-xl max-w-xl">Bed Type</p>
                <input required className="ml-8 p-2 border-borderColor border rounded-md" value={bedType} onChange={(e) => setBedType(e.target.value)} />
              </div>
            ) : (
              <div className="flex items-center justify-between my-4">
                <p className="text-secondary text-xl max-w-xl">Bed Type</p>
                <input disabled required className="ml-8 p-2 border-borderColor border rounded-md text-primary" value="none" />
              </div>
            )}
            <div className="flex items-center justify-between my-4">
              <p className="text-secondary text-xl max-w-xl">Description</p>
              <textarea required className="ml-8 p-2 border-borderColor border rounded-md w-[198px] h-32" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditPackage;
