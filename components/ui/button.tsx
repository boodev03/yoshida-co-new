import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap",
  {
    variants: {
      variant: {
        default:
          "bg-web-main border border-transparent hover:border-web-main hover:bg-white hover:text-web-main rounded-[25px] text-white text-base leading-[12px] font-bold tracking-[0.02em] transition-all duration-300",
        outline:
          "border border-web-main hover:bg-web-main hover:text-white rounded-[25px] text-web-main text-base leading-[12px] font-bold tracking-[0.02em] transition-all duration-300",
      },
      size: {
        default: "py-4 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
