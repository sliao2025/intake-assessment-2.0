"use client";

import React from "react";
import { ChevronRight } from "lucide-react";

type Props = { onStart: () => void };

const WelcomeStep: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="font-serif text-xl mb-2">Welcome</h2>
      <p className="text-gray-700">
        This intake will take 5–7 minutes. You can type or record answers on
        open‑ended questions.
      </p>
      <ul className="list-disc text-gray-600 pl-5 mt-3">
        <li>You can skip any question. Voice notes are optional.</li>
        <li>Encouraging nudges appear as you progress.</li>
      </ul>
      <div className="flex justify-end mt-4">
        <button
          onClick={onStart}
          className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 font-semibold"
        >
          Start <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default WelcomeStep;
