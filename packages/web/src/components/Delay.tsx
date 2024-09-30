import { useLayoutEffect, useState, type ReactNode } from "react";

export default function Delay({
  ms,
  children,
}: {
  ms: number;
  children: ReactNode;
}) {
  const [show, setShow] = useState(false);
  useLayoutEffect(() => {
    const timeout = setTimeout(() => setShow(true), ms);
    return () => {
      clearTimeout(timeout);
    };
  }, [ms]);

  return show ? <>{children}</> : null;
}
