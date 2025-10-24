import { Button, Field, Input, InputGroup, NumberInput } from "@chakra-ui/react";
import { PasswordInput } from "../password-input";
// import { LuUser } from "react-icons/lu";
import type { ReactNode } from "react";
import { LuDollarSign } from "react-icons/lu";
// import { useFormAction } from "react-router";

type Props = {
  placeholder: string;
  value?: string;
  icon?: ReactNode;
  label?: string
  type:
    | "text"
    | "number"
    | "email"
    | "password"
    | "tel"
    | "url"
    | "search"
    | "date"
    | "time"
    | "datetime-local"
    | "month"
    | "week";
  size: "sm" | "md" | "lg" |"xs";
  variant?: "outline" | "filled" | "unstyled";
  isDisabled?: boolean;
};

export const CustomInput = ({
  placeholder,
  value,
  type,
  label,
  size,
//   variant,
  isDisabled,
  icon,
}: Props) => {
  // const {
  //     control,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useFormAction<FormValues>({
  //     resolver: standardSchemaResolver(formSchema),
  //   })
  return (
    <Field.Root >
      <Field.Label>{label}</Field.Label>
      <div>
        {type === "password" ? (
          <PasswordInput />
        ) : type === "number" ? (
          <NumberInput.Root defaultValue="10" width="200px">
            <NumberInput.Control />
            <InputGroup startElement={<LuDollarSign />}>
              <NumberInput.Input />
            </InputGroup>
          </NumberInput.Root>
        ) : (
          <InputGroup startElement={icon}>
            <Input
            bg={"gray.100"}
              placeholder={placeholder}
              color={"gray.800"}
              value={value}
              disabled={isDisabled}
              type={type}
              size={size}
              variant= "outline"
            />
          </InputGroup>
          
        )}
      </div>
      {/* <Field.ErrorText>This field is required</Field.ErrorText> */}
    </Field.Root>
  );
};
