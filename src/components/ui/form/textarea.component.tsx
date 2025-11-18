import type { ReactNode } from "react";
import {
  TextField,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { useController } from "react-hook-form";
import type { Control } from "react-hook-form";

type TAreaProps = {
  label: string;
  disabled?: boolean;
  placeholder: string;
  control?: Control<Record<string, unknown>>;
  name: string;
  defaultValue?: string;
  icon?: ReactNode;
};

export const CustomTextarea = ({
  label,
  placeholder,
  control,
  disabled,
  name,
  defaultValue,
}: TAreaProps) => {
  // Use react-hook-form's useController hook to manage field state
  const { field, fieldState: { error } } = useController({
    name: name,
    control: control,
    defaultValue: defaultValue || "",
  });

  return (
    <FormControl error={Boolean(error)} fullWidth>      
      <TextField
        value={field.value}
        onChange={(e) => field.onChange(e.target.value)}
        onBlur={field.onBlur}
        label={label}
        inputRef={field.ref}
        multiline
        rows={4}
        placeholder={placeholder}
        disabled={disabled}
        variant="standard"
        fullWidth
        sx={{
          color: "black",
          '& .MuiInput-underline:before': {
            borderBottomColor: error ? 'red' : 'rgba(0,0,0,0.23)',
          },
          '& .MuiInput-underline:hover:before': {
            borderBottomColor: error ? 'red' : 'rgba(0,0,0,0.87)',
          },
        }}
      />

      {/* Display error message if exists */}
      {error && error.message && (
        <FormHelperText>{error.message}</FormHelperText>
      )}
    </FormControl>
  );
};