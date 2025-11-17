"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import PortalLayout from "../../components/portal/Layout/PortalLayout";
import { ArrowLeft, Save } from "lucide-react";

export default function NewJournalPage() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [mood, setMood] = useState(3);
  const [saving, setSaving] = useState(false);

  const moodLabels = ["Very Low", "Low", "Stable", "Good", "Very Good"];

  const handleSave = async () => {
    if (!content.trim()) {
      alert("Please write something before saving.");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch("/api/portal/journal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          mood,
        }),
      });

      if (response.ok) {
        router.push("/journal");
      } else {
        alert("Failed to save journal entry. Please try again.");
      }
    } catch (error) {
      console.error("Failed to save journal entry:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <PortalLayout>
      <div className="p-8 max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/journal")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                New Journal Entry
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Save className="w-5 h-5" />
            {saving ? "Saving..." : "Save Entry"}
          </button>
        </div>

        {/* Mood Selector */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            How are you feeling today?
          </label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                onClick={() => setMood(value)}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all text-sm font-medium ${
                  mood === value
                    ? "border-teal-600 bg-teal-50 text-teal-700"
                    : "border-gray-200 hover:border-gray-300 text-gray-600"
                }`}
              >
                {moodLabels[value - 1]}
              </button>
            ))}
          </div>
        </div>

        {/* Content Editor */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write about your day, your thoughts, or how you're feeling..."
            className="w-full h-96 p-6 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800"
          />
          <div className="px-6 py-3 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
            <span>{content.length} characters</span>
            <span>Your journal is private and secure</span>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}

