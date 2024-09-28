import { forwardRef } from "react";
import {
  Link as RouterLink,
  type LinkProps as RouterLinkProps,
} from "react-router-dom";

const LinkBehavior = forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>((props, ref) => {
  const { href, ...other } = props;

  if (
    typeof href === "string" &&
    (href.startsWith("http") || href.startsWith("mailto"))
  ) {
    return <a ref={ref} href={href} {...other} />;
  }

  return <RouterLink ref={ref} to={href} {...other} />;
});

export default LinkBehavior;
