"use client";

import { useId } from "react";
import { Upload, CheckCircle2 } from "lucide-react";

interface IFileUploadField {
  label?: string;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  file?: File | null;
  onFileChange: (file: File | null) => void;
  accept?: string;
  id?: string;
  containerClassName?: string;
}

export default function FileUploadField({
  label,
  required = false,
  error = false,
  errorMessage,
  helperText = "PDF, PNG, JPG up to 10MB",
  file,
  onFileChange,
  accept = "image/*,.pdf",
  id,
  containerClassName = "",
}: IFileUploadField) {
  // Auto-generate a stable, unique id when the caller doesn't supply one -
  // multiple upload fields on the same page must never share an id, or the
  // browser binds every <label htmlFor> to whichever input came first.
  const autoId = useId();
  const inputId = id || autoId;
  return (
    <div className={`flex flex-col gap-2.5 ${containerClassName}`}>
      {label && (
        <label
          htmlFor={inputId}
          className={`text-sm font-medium ${
            required ? "after:content-['*'] after:ml-1 after:text-gray-700" : ""
          } ${error ? "text-red-500" : "text-gray-800"}`}
        >
          {label}
        </label>
      )}

      <label
        htmlFor={inputId}
        className={`
          flex flex-col items-center justify-center w-full py-6 px-4 rounded-lg cursor-pointer text-center
          bg-white/40 backdrop-blur-xl
          border-[1.5px] border-dashed ${error ? "border-red-400" : "border-[#7f22fe]/60"}
          shadow-sm
          transition-all duration-300 ease-out
          hover:border-[#7f22fe]/80 hover:bg-white/55
        `}
      >
        <input
          id={inputId}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => onFileChange(e.target.files?.[0] || null)}
        />

        {file ? (
          <>
            <CheckCircle2 size={22} className="text-[#7f22fe] mb-2" />
            <p className="text-sm font-medium text-gray-900">{file.name}</p>
            <p className="text-xs text-gray-500 mt-0.5">Click to replace</p>
          </>
        ) : (
          <>
            <Upload size={22} className="text-[#7f22fe]/70 mb-2" />
            <p className="text-sm text-gray-700">
              <span className="font-medium text-[#7f22fe]">
                Click to upload
              </span>{" "}
              or drag and drop
            </p>
            <p className="text-xs text-gray-500 mt-0.5">{helperText}</p>
          </>
        )}
      </label>

      {error && errorMessage && (
        <p className="text-xs text-red-500">{errorMessage}</p>
      )}
    </div>
  );
}
