import { CustomButtonProps } from "../types";
import { Link } from "react-router-dom";

const CustomButton = ({ title, btnType, containerStyles, handleClick, textStyles, to }: CustomButtonProps) => {
  return (
    <Link to={to}>
      <button type={btnType || "button"} className={`my-4 py-3 px-6 rounded-md font-semibold border ${containerStyles}`} onClick={handleClick}>
        <span className={`${textStyles}`}>{title}</span>
      </button>
    </Link>
  );
};

export default CustomButton;
