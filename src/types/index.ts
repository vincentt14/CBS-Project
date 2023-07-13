import { MouseEventHandler } from "react";

export interface CustomButtonProps {
  title: string;
  btnType?: "button" | "submit";
  textStyles?: string;
  containerStyles?: string;
  to: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}
