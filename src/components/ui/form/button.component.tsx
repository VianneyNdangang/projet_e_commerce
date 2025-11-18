import { Button as MuiButton } from "@mui/material";

type Props = {
  icon?: React.ReactNode;
  label?: string;
  w?: string;
  isLoading?: boolean;
  shadow?: "md" | "sm" | "xl" | "lg";
  type: "button" | "submit" | "reset";
  shadow_h?: "md" | "sm" | "xl" | "lg";
  disabled?: boolean;
  onClick?: () => void;
};

export const CustomButton = ({
  icon,
  label,
  shadow,
  shadow_h,
  disabled,
  type,
  onClick,
}: Props) => {
  return (
    <>
      <MuiButton
        color="inherit"
        variant="contained"
        size="medium"
        sx={{
          backgroundColor: "#ED8936",
          color: "white",
          // width: '100%',
          borderRadius: "30px",
          fontSize: "16px",
          boxShadow: shadow,
          textTransform: "none",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: shadow_h,
            backgroundColor: "#D97706"
          },
          "&:focus": {
            outline: "none"
          }
        }}
        disabled={disabled}
        type={type}
        onClick={onClick}
      >
        {icon}
        {label}
      </MuiButton>
      {/* <Button colorPalette="teal" variant="outline">
        Call us <RiArrowRightLine />
      </Button> */}
    </>
  );
};
