import { CustomButtonProps } from "../types";
import { Link } from "react-router-dom";

const CustomButton = ({ title, btnType = "button", containerStyles, onClick, textStyles, to }: CustomButtonProps) => {
  if (btnType === "button") {
    return (
      <Link to={to!}>
        <button type={btnType} className={`my-4 py-3 px-6 rounded-md font-semibold border ${containerStyles}`} onClick={onClick}>
          <span className={`${textStyles}`}>{title}</span>
        </button>
      </Link>
    );
  }

  return (
    <button type={btnType} className={`my-4 py-3 px-6 rounded-md font-semibold border ${containerStyles}`} onClick={onClick}>
      <span className={`${textStyles}`}>{title}</span>
    </button>
  );
};

export default CustomButton;
