"use client";

import React from "react";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

type Props = {
  step: number;
  total: number;
  onBack: () => void;
  onNext: () => void;
  onFinish: () => void;
  nextDisabled?: boolean;
};

const Navigation: React.FC<Props> = ({
  step,
  total,
  onBack,
  onNext,
  onFinish,
  nextDisabled,
}) => {
  return (
    <div className="mt-6 flex justify-between">
      <button
        disabled={step === 0}
        onClick={onBack}
        className="px-3 py-2 border rounded flex gap-2 items-center disabled:opacity-40"
      >
        <ChevronLeft className="h-4 w-4" /> Back
      </button>

      {step < total - 1 ? (
        <button
          onClick={onNext}
          disabled={nextDisabled}
          className="px-4 py-2 bg-green-600 text-white rounded flex gap-2 items-center disabled:opacity-40"
        >
          Next <ChevronRight className="h-4 w-4" />
        </button>
      ) : (
        <button
          onClick={onFinish}
          className="px-4 py-2 bg-lime-600 text-white rounded flex gap-2 items-center"
        >
          <CheckCircle2 className="h-5 w-5" /> Finish
        </button>
      )}
    </div>
  );
};

export default Navigation;
