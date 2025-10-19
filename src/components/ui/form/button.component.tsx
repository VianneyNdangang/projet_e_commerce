import { Button } from "@chakra-ui/react";
// import { RiArrowRightLine, RiMailLine } from "react-icons/ri";

type Props = {
  icon?: React.ReactNode;
  label: string;
  //   variant?: "solid" | "outline" | "ghost" | "link" | "unstyled";
  size: "sm" | "md" | "lg";
  color: "blue.500" | "red.500" | "green.500" | "white" | "black";
  bg: "blue.500" | "red.500" | "green.500" | "orange.500" | "white" | "black";
  isLoading?: boolean;
  shadow?: "md" | "lg" | "xl";
  type: "button" | "submit" | "reset";
};

export const CustomButton = ({
  icon,
  label,
  //   variant,
  size,
  color,
  bg,
  isLoading,
  shadow,
  type,
}: Props) => {
  return (
    <>
      <Button
        color={color}
        bg={bg}
        shadow={shadow}
        loading={isLoading}
        type={type}
        size={size}
        variant={"plain"}
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
