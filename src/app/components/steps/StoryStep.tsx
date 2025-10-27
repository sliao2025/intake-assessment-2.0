"use client";

import React from "react";
import VoiceRecorder from "../VoiceRecorder";

type Props = {
  storyText: string;
  setStoryText: (v: string) => void;
  setStoryAudio: (url: string | null) => void;
};

const StoryStep: React.FC<Props> = ({
  storyText,
  setStoryText,
  setStoryAudio,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="font-serif text-xl">Your Story</h2>
      <label className="block">
        <div className="mb-1 text-sm text-slate-700">
          What's the main goal you'd like us to help you with? (type or record)
        </div>
        <textarea
          rows={6}
          className="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900"
          placeholder="Share anything important in your own words…"
          value={storyText}
          onChange={(e) => setStoryText(e.target.value)}
        />
      </label>
      <VoiceRecorder
        fieldName="story"
        onAttach={(data) => {
          // Extract just the URL from the data object to match the parent component's API
          setStoryAudio(data ? data.url : null);
        }}
      />
    </div>
  );
};

export default StoryStep;
