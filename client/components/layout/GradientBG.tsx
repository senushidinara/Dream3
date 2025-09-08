import React from "react";

export const GradientBG: React.FC<
  { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>
> = ({ children, className = "", ...rest }) => {
  return (
    <div className={"relative " + className} {...rest}>
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_10%_-10%,hsl(var(--primary)/0.35),transparent),radial-gradient(1000px_500px_at_90%_10%,hsl(var(--accent)/0.25),transparent)]" />
        <div className="absolute inset-x-0 top-[-10%] h-[400px] bg-gradient-to-b from-primary/10 to-transparent blur-2xl" />
      </div>
      {children}
    </div>
  );
};
