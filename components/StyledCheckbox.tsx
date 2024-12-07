import React from "react";
import { Check } from "lucide-react";
import clsx from "clsx";

interface CircleCheckboxProps {
  checked: boolean;
  onChange: () => void;
}

const CircleCheckbox: React.FC<CircleCheckboxProps> = ({
  checked,
  onChange,
}) => {
  return (
    <div
      onClick={onChange}
      className={clsx(
        "flex mr-3 mt-1 items-center justify-center w-6 h-6 rounded-full border-2 cursor-pointer transition-all",
        checked ? "bg-black border-black text-white" : "bg-white border-black"
      )}
    >
      {checked && <Check className="w-4 h-4" />}
    </div>
  );
};

export default CircleCheckbox;
