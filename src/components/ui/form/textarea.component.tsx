import { Field, Textarea } from "@chakra-ui/react"
import { useController } from "react-hook-form"

type TAreaProps = {
  label: string,
  disabled?: boolean;
  placeholder: string,
  control: any
  name: string
  defaultValue?: any
}

export const CustomTextarea = ({
  label,
  placeholder,
  control,
  disabled,
  name,
  defaultValue
}: TAreaProps) => {
  const { field, fieldState: { error } } = useController({
    name: name,
    control: control,
    defaultValue: defaultValue || "",
  });
  return (
    <>
      <Field.Root invalid={error ? true : false}>
        <Field.Label>{label}</Field.Label>
        <Textarea
          placeholder={placeholder}
          size="md"
          border="solid"
          w="full"
          borderColor={error ? "red" : "black"}
          borderWidth={0.2}
          focusRing="none"
          backgroundColor="gray.100"
          disabled={disabled}
          onChange={field.onChange}
          value={field.value}
          onBlur={field.onBlur}
          ref={field.ref}
        />
        {error && error.message && (
          <Field.ErrorText>{error.message}</Field.ErrorText>
        )}
      </Field.Root>
    </>
  );
}