import { useData } from "./data";
import { useSettings } from "./settings";

export default function Status() {
  const settings = useSettings();
  const data = useData();
  return <pre>{JSON.stringify({ settings, data }, null, 2)}</pre>;
}
