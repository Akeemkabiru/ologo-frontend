"use client";

import React from "react";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
  loading?: boolean;
}

export const Form: React.FC<FormProps> = ({
  children,
  onSubmit,
  loading,
  ...props
}) => {
  return (
    <form
      onSubmit={onSubmit}
      {...props}
      className={`space-y-4 ${props.className || ""}`}
    >
      {children}
    </form>
  );
};

interface FormGroupProps {
  children: React.ReactNode;
  className?: string;
}

export const FormGroup: React.FC<FormGroupProps> = ({
  children,
  className,
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className || ""}`}>{children}</div>
  );
};

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const FormLabel: React.FC<FormLabelProps> = ({
  required,
  children,
  ...props
}) => {
  return (
    <label
      {...props}
      className={`block text-sm font-semibold text-gray-900 ${props.className || ""}`}
    >
      {children}
      {required && <span className="text-gray-700 ml-1">*</span>}
    </label>
  );
};

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  required?: boolean;
  icon?: React.ReactNode;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  error,
  errorMessage,
  helperText,
  required,
  icon,
  ...props
}) => {
  return (
    <FormGroup>
      {label && <FormLabel required={required}>{label}</FormLabel>}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-3 text-gray-400">{icon}</div>
        )}
        <input
          {...props}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
            icon ? "pl-10" : ""
          } ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-200 focus:ring-blue-500"
          } ${props.className || ""}`}
        />
      </div>
      {error && errorMessage && (
        <p className="text-sm text-gray-700">{errorMessage}</p>
      )}
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </FormGroup>
  );
};

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  required?: boolean;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  error,
  errorMessage,
  helperText,
  required,
  ...props
}) => {
  return (
    <FormGroup>
      {label && <FormLabel required={required}>{label}</FormLabel>}
      <textarea
        {...props}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors resize-none ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-200 focus:ring-blue-500"
        } ${props.className || ""}`}
      />
      {error && errorMessage && (
        <p className="text-sm text-gray-700">{errorMessage}</p>
      )}
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </FormGroup>
  );
};

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  required?: boolean;
  options: { label: string; value: string }[];
}

export const FormSelect: React.FC<FormSelectProps> = ({
  label,
  error,
  errorMessage,
  helperText,
  required,
  options,
  ...props
}) => {
  return (
    <FormGroup>
      {label && <FormLabel required={required}>{label}</FormLabel>}
      <select
        {...props}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-200 focus:ring-blue-500"
        } ${props.className || ""}`}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && errorMessage && (
        <p className="text-sm text-gray-700">{errorMessage}</p>
      )}
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </FormGroup>
  );
};

interface FormCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  errorMessage?: string;
}

export const FormCheckbox: React.FC<FormCheckboxProps> = ({
  label,
  error,
  errorMessage,
  ...props
}) => {
  return (
    <FormGroup>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          {...props}
          className={`w-5 h-5 rounded border ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-200 focus:ring-blue-500"
          } cursor-pointer`}
        />
        {label && (
          <label className="text-sm text-gray-700 cursor-pointer">
            {label}
          </label>
        )}
      </div>
      {error && errorMessage && (
        <p className="text-sm text-gray-700">{errorMessage}</p>
      )}
    </FormGroup>
  );
};

interface FormRadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  options: { label: string; value: string }[];
  error?: boolean;
  errorMessage?: string;
}

export const FormRadio: React.FC<FormRadioProps> = ({
  label,
  options,
  error,
  errorMessage,
  ...props
}) => {
  return (
    <FormGroup>
      {label && <FormLabel>{label}</FormLabel>}
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center gap-2">
            <input
              type="radio"
              {...props}
              value={option.value}
              className="w-4 h-4 cursor-pointer"
            />
            <label className="text-sm text-gray-700 cursor-pointer">
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {error && errorMessage && (
        <p className="text-sm text-gray-700">{errorMessage}</p>
      )}
    </FormGroup>
  );
};

interface FormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
}

export const FormButton: React.FC<FormButtonProps> = ({
  loading,
  variant = "primary",
  size = "md",
  children,
  disabled,
  ...props
}) => {
  const baseStyles = "font-semibold rounded-lg transition-colors font-medium";
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3 text-lg",
  };

  const variantStyles = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-400 disabled:cursor-not-allowed",
    secondary:
      "bg-gray-200 hover:bg-gray-300 text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed",
    danger:
      "bg-gray-600 hover:bg-gray-700 text-white disabled:bg-gray-400 disabled:cursor-not-allowed",
  };

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${
        props.className || ""
      }`}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

interface FormFileUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  maxSize?: number; // in MB
  onFileChange?: (file: File | null) => void;
}

export const FormFileUpload: React.FC<FormFileUploadProps> = ({
  label,
  error,
  errorMessage,
  helperText,
  maxSize,
  onFileChange,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && maxSize && file.size > maxSize * 1024 * 1024) {
      return;
    }
    onFileChange?.(file || null);
    props.onChange?.(e);
  };

  return (
    <FormGroup>
      {label && <FormLabel>{label}</FormLabel>}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
        <input
          type="file"
          {...props}
          onChange={handleChange}
          className="hidden"
          id={props.id || "file-upload"}
        />
        <label htmlFor={props.id || "file-upload"} className="cursor-pointer">
          <svg
            className="w-8 h-8 mx-auto mb-2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <p className="text-sm text-gray-600">
            Click to upload or drag and drop
          </p>
        </label>
      </div>
      {error && errorMessage && (
        <p className="text-sm text-gray-700">{errorMessage}</p>
      )}
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </FormGroup>
  );
};
