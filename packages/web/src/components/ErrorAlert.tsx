import { Alert } from "@mui/material";

export default function ErrorAlert({ error }: { error: Error }) {
  return <Alert severity="error">{error.message}</Alert>;
}
