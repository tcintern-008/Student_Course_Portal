import Link from "next/link";

const styles = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  outline: "border border-border hover:border-blue-600 hover:text-blue-600",
  link: "text-blue-600 hover:gap-2",
};

export default function Button({ href, children, variant = "primary", className = "", ...props }) {
  const base = "inline-flex items-center justify-center gap-1 rounded-full text-sm font-semibold transition-all";
  const size = variant === "link" ? "" : "px-6 py-3";

  const classes = `${base} ${size} ${styles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
