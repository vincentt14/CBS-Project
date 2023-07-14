import { useState } from "react";

interface ReadMoreProps {
  children: string;
  pStyle: string;
  textSlice: number;
}

const ReadMore = ({ children, pStyle, textSlice }: ReadMoreProps) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <p className={pStyle}>
      {isReadMore ? text.slice(0, textSlice) : text}
      <span onClick={toggleReadMore} className="text-primary cursor-pointer hover:text-secondary">
        {isReadMore ? "...read more" : " show less"}
      </span>
    </p>
  );
};

export default ReadMore;
