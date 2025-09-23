"use client";

import React from "react";

export default function SuicideRedirect() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
      <div className="max-w-3xl rounded-xl shadow-lg p-10 bg-white text-center">
        <h1 className="text-2xl font-bold mb-6">
          At this point in time, we are concerned with your immediate safety.
        </h1>

        <p className="mb-6 text-lg">
          Our <strong>urgent recommendation</strong> is for you to get help as
          quickly as possible.
        </p>

        <p className="mb-4">Please, follow these steps right away:</p>

        <ol className="list-decimal list-inside space-y-3 text-left mx-auto max-w-xl mb-6">
          <li className="font-medium">
            Call <strong>911</strong>.
          </li>
          <li className="font-medium">
            Go to your nearest <strong>Emergency Room</strong> to be evaluated
            by the providers on duty.
          </li>
          <li className="font-medium">
            Call the Lifeline: <strong>1-800-273-8255</strong>.
          </li>
          <li className="font-medium">
            Text the Lifeline: Text <strong>"HOME"</strong> to{" "}
            <strong>741741</strong>.
          </li>
          <li className="font-medium">
            NYC: Call this Crisis Lifeline:{" "}
            <strong>1-888-NYC-WELL (1-888-692-9355)</strong>.
          </li>
        </ol>

        <p className="text-sm text-gray-600">
          If you are not in the U.S., please contact your local emergency number
          or crisis service immediately.
        </p>
      </div>
    </div>
  );
}
