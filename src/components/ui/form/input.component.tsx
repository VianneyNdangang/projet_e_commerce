import type { ReactNode } from "react";

import {
  TextField,
  FormControl,
  FormHelperText,
  Box,
} from "@mui/material";
import { useController } from "react-hook-form";
import type { Control } from "react-hook-form";

type TInput = {
  label?: string;
  placeholder?: string;
  name: string;
  control?: Control<Record<string, unknown>>;
  defaultValue?: string;
  type?: "email"|"checkbox" | "date" | "password" | "number" | "search" | "tel";
  onchange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  min?: number;
  value?: string;
  icon?: ReactNode;
  variant?: "outline" | "filled" | "unstyled";
  isDisabled?: boolean;
};

export const CustomInput = ({
  label,
  control,
  name,
  type,
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

  return (
    <FormControl error={Boolean(error)} fullWidth>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {icon && <Box sx={{ color: 'action.active', display: 'flex' }}>{icon}</Box>}
        <TextField
          value={field.value}
          onChange={(e) => field.onChange(e.target.value)}
          onBlur={field.onBlur}
          inputRef={field.ref}
          type={type ?? "text"}
          label={label}
          size="small"
          fullWidth
          variant="standard"
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
      </Box>

      {error && error.message && (
        <FormHelperText>{error?.message}</FormHelperText>
      )}
    </FormControl>
  );
};
