import type { ReactNode } from "react";

import {
  CloseButton,
  Field,
  FieldLabel,
  FieldRoot,
  Input,
  InputGroup,
  NumberInput,
} from "@chakra-ui/react";
import { useController } from "react-hook-form";
import { PasswordInput } from "../password-input";

type TInput = {
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  name: string;
  control: any;
  defaultValue?: any;
  type?: "email"|"checkbox" | "date" | "password" | "number" | "search" | "tel";
  onchange?: any;
  min?: number;
  value?: string;
  icon?: ReactNode;
  variant?: "outline" | "filled" | "unstyled";
  isDisabled?: boolean;
  size?: any;
};

export const CustomInput = ({
  label,
  disabled,
  placeholder,
  control,
  name,
  type,
  min,
  size,
  icon,
  defaultValue,
}: TInput) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name: name,
    control: control,
    defaultValue: defaultValue || "",
  });

  const endElement = field.value ? (
    <CloseButton
      size="xs"
      onClick={() => {
        field.onChange("");
      }}
      me="-2"
      bg={"none"}
      border={"none"}
    />
  ) : undefined;

  return (
    <FieldRoot invalid={error ? true : false}>
      <FieldLabel>{label}</FieldLabel>
      {type === "password" ? (
        <InputGroup startElement={icon}>
          <PasswordInput
            size={size}
            placeholder={placeholder}
            onChange={field.onChange}
            min={min}
            value={field.value}
            borderColor={error ? "red" : "none"}
            border={error ? "1px" : "none"}
            borderWidth={0.2}
            focusRing="none"
            backgroundColor="gray.100"
            disabled={disabled}
            autoComplete="off"
            color={'black'}
          />
        </InputGroup>
      ) : type === "number" ? (
        <NumberInput.Root defaultValue="10" width="200px">
          <NumberInput.Control />
          <InputGroup endElement={endElement} startElement={icon}>
            <NumberInput.Input
              placeholder={placeholder}
              onChange={field.onChange}
              min={min}
              value={field.value}
              borderColor={error ? "red" : "black"}
              border="1px"
              borderWidth={0.2}
              focusRing="none"
              backgroundColor="gray.100"
              disabled={disabled}
              autoComplete="off"
              color={'black'}
            />
          </InputGroup>
        </NumberInput.Root>
      ) : (
        <InputGroup endElement={endElement} startElement={icon}>
          <Input
            placeholder={placeholder}
            size={size}
            border="solid"
            borderColor={error ? "red" : "black"}
            borderWidth={0.2}
            focusRing="none"
            backgroundColor="gray.100"
            onChange={field.onChange}
            value={field.value}
            onBlur={field.onBlur}
            ref={field.ref}
            type={type ?? "text"}
            autoComplete="off"
            min={min}
            color={'black'}
          />
        </InputGroup>
      )}
      {error && error.message && (
        <Field.ErrorText>{error?.message}</Field.ErrorText>
      )}
    </FieldRoot>
  );
};
