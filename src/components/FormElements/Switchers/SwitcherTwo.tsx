import { productApi } from "@/api/product-api";
import { useState } from "react";

type Props = {
  id: string;
  featured: boolean;
  onToggle: () => void;
};

const SwitcherTwo = ({ id, featured, onToggle }: Props) => {
  const [enabled, setEnabled] = useState(featured);

  return (
    <div>
      <label
        htmlFor={id}
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            id={id}
            type="checkbox"
            className="sr-only"
            onChange={() => {
              setEnabled(!enabled);
              onToggle();
            }}
          />
          <div className="h-5 w-14 rounded-full bg-gray-3 dark:bg-[#5A616B]"></div>
          <div
            className={`dot absolute -top-1 left-0 h-7 w-7 rounded-full bg-white shadow-switch-2 transition ${
              enabled && "!right-0 !translate-x-full !bg-primary dark:!bg-white"
            }`}
          ></div>
        </div>
      </label>
    </div>
  );
};

export default SwitcherTwo;
