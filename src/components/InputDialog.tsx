import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useCallback, useState, type ReactNode } from "react";
import { useData, useSetInputs, type Inputs } from "../data";

export default function InputDialog({
  label,
  field,
  open,
  onClose,
}: {
  label: ReactNode;
  field: keyof Inputs;
  open: boolean;
  onClose: () => void;
}) {
  const data = useData()!;
  const [value, setValue] = useState(data.inputs[field]);
  const [loading, setLoading] = useState(false);
  const setInputs = useSetInputs();

  const save = useCallback(async () => {
    setLoading(true);

    try {
      await setInputs({ ...data.inputs, [field]: value });
      onClose();
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  }, [data.inputs, field, onClose, setInputs, value]);

  return (
    <Dialog maxWidth="xs" fullWidth open={open} onClose={onClose}>
      <DialogTitle>{label}</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 1 }}>
          <TextField
            label={label}
            type="date"
            slotProps={{ inputLabel: { shrink: true } }}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="text" color="inherit" type="reset" onClick={onClose}>
          Abbrechen
        </Button>
        <LoadingButton
          variant="contained"
          color="primary"
          type="submit"
          onClick={save}
          loading={loading}
        >
          Speichern
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
