import Image from "next/image";
import { MouseEventHandler } from "react";

type Props = {
  title: string;
  type?: "button" | "submit" | "reset";
  leftIcon?: string;
  rightIcon?: string;
  isSubmitting: boolean;
  handleClick?: MouseEventHandler;
  bgColor?: string;
  textColor?: string;
};

export default function Button({
  title,
  type,
  leftIcon,
  isSubmitting,
  rightIcon,
  handleClick,
  bgColor = "#CB33FF",
  textColor = "#fff",
}: Props) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      className="flexCenter gap-3 px-4 py-3 rounded-md"
      type={type || "button"}
      disabled={isSubmitting}
      onClick={handleClick}
    >
      {leftIcon && (
        <Image src={leftIcon} alt="leftIcon" width={14} height={14} />
      )}
      {title}
      {rightIcon && (
        <Image src={rightIcon} alt="rightIcon" width={14} height={14} />
      )}
    </button>
  );
}
