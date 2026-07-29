"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Building2 } from "lucide-react";
import { FormButton } from "@/components/forms/FormComponents";
import { ACCOUNT_TYPE_KEY } from "@/lib/constants";

interface EntityTypeStepProps {
  nextHref: string;
  title?: string;
  description?: string;
}

const options = [
  {
    value: "individual",
    label: "Individual",
    description: "Verifying as a person",
    icon: User,
  },
  {
    value: "organisation",
    label: "Organisation",
    description: "Verifying as a business, NGO, or group",
    icon: Building2,
  },
];

export default function EntityTypeStep({
  nextHref,
  title = "How would you like to verify?",
  description = "Choose whether you're verifying as an individual or on behalf of an organisation.",
}: EntityTypeStepProps) {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(ACCOUNT_TYPE_KEY);
    if (saved) setSelected(saved);
  }, []);

  const handleContinue = () => {
    if (!selected) return;
    localStorage.setItem(ACCOUNT_TYPE_KEY, selected);
    router.push(nextHref);
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-lg font-bold text-gray-900 mb-1">{title}</h1>
      <p className="text-gray-500 text-sm mb-8 leading-relaxed">
        {description}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 sm:mb-10 md:mb-12">
        {options.map((option) => {
          const Icon = option.icon;
          const isSelected = selected === option.value;
          return (
            <button
              key={option.value}
              onClick={() => setSelected(option.value)}
              className={`p-5 rounded-2xl transition-all duration-200 text-left flex flex-col items-start ${
                isSelected
                  ? "border-violet-600 border-2 bg-violet-50 shadow-lg"
                  : "bg-white/40 border-2 border-white/50"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${
                  isSelected
                    ? "bg-violet-600 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <Icon size={18} />
              </div>
              <h3
                className={`font-semibold text-base mb-1 ${
                  isSelected ? "text-violet-600" : "text-gray-700"
                }`}
              >
                {option.label}
              </h3>
              <p className="text-xs text-gray-600 leading-snug">
                {option.description}
              </p>
            </button>
          );
        })}
      </div>

      <FormButton
        onClick={handleContinue}
        disabled={!selected}
        className="w-full"
        size="lg"
      >
        Continue
      </FormButton>
    </div>
  );
}
