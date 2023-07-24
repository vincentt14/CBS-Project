import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CustomButton from "./CustomButton";
import { FirebaseSingleton } from "../models/FirebaseSingleton";
import { DocumentData, getDoc } from "firebase/firestore";
import { BeaniePackageModel } from "../models/BeaniePackageModel";
import { DeluxePackageModel } from "../models/DeluxePackageModel";
import { ClassicPackageModel } from "../models/ClassicPackageModel";
import { PackageResponse } from "../models/RoomPackageModel";

const EditPackage = () => {
  const [packagee, setPackagee] = useState<DocumentData | null>(null);
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [souvenir, setSouvenir] = useState<string>("");
  const [foodDiscount, setFoodDiscount] = useState<number>(0);
  const [bedType, setBedType] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getData = async (id: string) => {
      const ref = FirebaseSingleton.packagesDocRef(id as string);
      const result = await getDoc(ref);
      if (result.exists()) {
        setPackagee(result.data());
      }
    };

    getData(id as string);
  }, []);

  useEffect(() => {
    setName(packagee?.name);
    setPrice(packagee?.price);
    setSouvenir(packagee?.souvenir);
    setFoodDiscount(packagee?.foodDiscount);
    setBedType(packagee?.bedType);
    setDescription(packagee?.description);
  }, [packagee]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Swal.showLoading();

    let data: PackageResponse | null = null;
    if (packagee!.codeId === "BN") {
      data = await BeaniePackageModel.updatePackage(id as string, description, price, souvenir);
    } else if (packagee!.codeId === "DX") {
      data = await DeluxePackageModel.updatePackage(id as string, price, description, foodDiscount, souvenir, bedType);
    } else if (packagee!.codeId === "CS") {
      data = await ClassicPackageModel.updatePackage(id as string, price, description, foodDiscount);
    }

    if (data === null) {
      return;
    }
    if (data.success) {
      Swal.fire({
        icon: "success",
        background: "#111",
        title: "Package Updated",
        showConfirmButton: false,
        timer: 1000,
      });
      navigate("/adminDashboard/managePackages");
    } else {
      Swal.fire({
        icon: "error",
        background: "#111",
        title: "Update Failed",
        text: `${data.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="flex flex-col">
      {packagee && (
        <>
          <div className="mx-4">
            <hr className="w-[150px] my-3 p-1 bg-bgColor border border-borderColor rounded-sm" />
          </div>
          <form className="m-4 grid lg:grid-cols-3 gap-5 border-borderColor border-2 rounded-md" onSubmit={onSubmit}>
            <div className=" bg-bgColor border border-borderColor flex justify-center items-center p-5 mr-3 md:mr-0">
              <h1 className="text-white font-bold text-2xl">Edit Package</h1>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <div className="p-5">
                <div className="flex items-center justify-between my-4">
                  <p className="text-primary text-xl max-w-xl">Name</p>
                  <input disabled required className="ml-8 p-2 border-borderColor border rounded-md bg-bgColor" value={name} />
                </div>
                <div className="flex items-center justify-between my-4">
                  <p className="text-primary text-xl max-w-xl">Price</p>
                  <input required className="ml-8 p-2 border-borderColor border rounded-md bg-bgColor" type="number" value={price} onChange={(e) => setPrice(+e.target.value)} />
                </div>
                {packagee.souvenir ? (
                  <div className="flex items-center justify-between my-4">
                    <p className="text-primary text-xl max-w-xl">Souvenir</p>
                    <input className="ml-8 p-2 border-borderColor border rounded-md bg-bgColor" value={souvenir} onChange={(e) => setSouvenir(e.target.value)} />
                  </div>
                ) : (
                  <div className="flex items-center justify-between my-4">
                    <p className="text-primary text-xl max-w-xl">Souvenir</p>
                    <input disabled className="ml-8 p-2 border-borderColor border rounded-md bg-bgColor" value="none" />
                  </div>
                )}
                <div className="grid grid-cols-2 self-center justify-center">
                  <CustomButton btnType="button" title="Back to Manage" containerStyles="border-borderColor bg-black hover:border-primary" textStyles="text-white" to="/adminDashboard/managePackages" />
                  <CustomButton btnType="submit" title="Edit Package" containerStyles="ml-4 border-black bg-white hover:bg-[#ededed]" textStyles="text-black hover:text-[#262626]" />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <div className="p-5">
                {packagee.foodDiscount ? (
                  <div className="flex items-center justify-between my-4">
                    <p className="text-primary text-xl max-w-xl">Food Discount</p>
                    <input required className="ml-8 p-2 border-borderColor border rounded-md bg-bgColor" type="number" value={foodDiscount} onChange={(e) => setFoodDiscount(+e.target.value)} />
                  </div>
                ) : (
                  <div className="flex items-center justify-between my-4">
                    <p className="text-primary text-xl max-w-xl">Food Discount</p>
                    <input disabled required className="ml-8 p-2 border-borderColor border rounded-md bg-bgColor" value="none" />
                  </div>
                )}
                {packagee.bedType ? (
                  <div className="flex items-center justify-between my-4">
                    <p className="text-primary text-xl max-w-xl">Bed Type</p>
                    <input required className="ml-8 p-2 border-borderColor border rounded-md bg-bgColor" value={bedType} onChange={(e) => setBedType(e.target.value)} />
                  </div>
                ) : (
                  <div className="flex items-center justify-between my-4">
                    <p className="text-primary text-xl max-w-xl">Bed Type</p>
                    <input disabled required className="ml-8 p-2 border-borderColor border rounded-md bg-bgColor" value="none" />
                  </div>
                )}
                <div className="flex items-center justify-between my-4">
                  <p className="text-primary text-xl max-w-xl">Description</p>
                  <textarea style={{ overflow: "hidden" }} required className="ml-8 p-2 border-borderColor border rounded-md w-[198px] h-32 bg-bgColor" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default EditPackage;
