"use client";

import React, { FC } from "react";

type Props = {
  label: string;
  type?: React.HTMLInputTypeAttribute;
  id?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  textarea?: boolean;
};

const InputText: FC<Props> = ({
  label,
  type = "text",
  id,
  placeholder = "",
  onChange,
  className,
  textarea = false,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-xl font-medium text-gray-700">
        {label}
      </label>
      {!textarea ? (
        <input
          id={id}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          className={`w-full rounded-lg border-gray-200 border-2 p-4 pe-12 text-sm shadow-md sm:text-sm ${className}`}
        />
      ) : (
        <textarea
          id={id}
          onChange={onChange as any}
          placeholder={placeholder}
          className={`w-full rounded-lg border-gray-200 border-2 p-4 pe-12 text-sm shadow-md sm:text-sm ${className}`}
        />
      )}
    </div>
  );
};

export default InputText;
