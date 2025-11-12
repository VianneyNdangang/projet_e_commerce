import { Button } from "@chakra-ui/react";
// import { RiArrowRightLine, RiMailLine } from "react-icons/ri";

type Props = {
  icon?: React.ReactNode;
  label?: string;
  w?: string;
  size?: "sm" | "md" | "lg" |"xs"| "2xs";
  color: "blue.500" | "red.500" | "green.500" | "white" | "black";
  bg:
    | "blue.500"
    | "red.500"
    | "white"
    | "black"
  isLoading?: boolean;
  shadow?: "md" | "sm" | "xl" | "lg";
  type: "button" | "submit" | "reset";
  bg_H?:
    | "blue.500"
    | "blue.600"
    | "red.500"
    | "green.500"
    | "orange.500"
    | "white"
    | "black"
    | "gray.100"
    | "gray.200";
  color_H?: "blue.500" | "red.500" | "green.500" | "white" | "black";
  shadow_h?: "md" | "sm" | "xl" | "lg";
  disabled?: boolean;
  onClick?: () => void;
};

export const CustomButton = ({
  icon,
  label,
  w,
  size,
  color,
  bg,
  isLoading,
  shadow,
  shadow_h,
  color_H,
  disabled,
  bg_H,
  type,
  onClick,
}: Props) => {
  return (
    <>
      <Button
        color={color}
        bg={bg}
        shadow={shadow}
        rounded={"sm"}
        loading={isLoading}
        w={w}
        onClick={onClick}
        p={"4"}
        type={type}
        size={size}
        variant={"plain"}
        disabled={disabled}
        border={"none"}
        _hover={{
          transform: "translateY(-2px)",
          shadow: shadow_h,
          color: color_H,
          bg: bg_H,
        }}
        _focus={{
          outline: 'none'
        }}
      >
        {icon}
        {label}
      </Button>
      {/* <Button colorPalette="teal" variant="outline">
        Call us <RiArrowRightLine />
      </Button> */}
    </>
  );
};
