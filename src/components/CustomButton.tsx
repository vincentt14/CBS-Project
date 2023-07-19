import { Link } from "react-router-dom";
import { MouseEventHandler } from "react";

export interface CustomButtonProps {
  title?: string;
  heading?: string;
  btnType: "button" | "submit";
  textStyles?: string;
  containerStyles?: string;
  to?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const CustomButton = ({ heading, title, btnType = "button", containerStyles, onClick, textStyles, to }: CustomButtonProps) => {
  if (btnType === "button") {
    return (
      <Link to={to!}>
        <button type={btnType} className={`my-4 py-3 px-6 rounded-md font-semibold border ${containerStyles}`} onClick={onClick}>
          <span className={`${textStyles}`}>{title}</span>
          {heading && <h1 className={`p-5 text-xl font-bold ${textStyles}`}>{heading}</h1>}
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
