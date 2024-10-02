import { TextField } from "@mui/material";
import { useCallback } from "react";

type Props = {
  onChange: (res: string) => void;
};

const OtpInput2 = ({ onChange }: Props) => {
  const onFieldChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );
  return <TextField placeholder="Enter code" onChange={onFieldChange} />;
};

export default OtpInput2;
