import { cn } from "@/lib/utils";
import { Check } from "../icons/Check";

interface CustomCheckboxProps {
  checked: boolean;
  onChange: () => void;
  children: React.ReactNode;
}

export function CustomCheckbox({
  checked,
  onChange,
  children,
}: CustomCheckboxProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <div
        className={cn(
          "size-5 border border-web-dark flex items-center justify-center transition-colors"
        )}
        onClick={onChange}
      >
        {checked && (
          <p className="relative -top-[1px] -right-1">
            <Check />
          </p>
        )}
      </div>
      {children}
    </label>
  );
}
