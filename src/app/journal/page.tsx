"use client";

import React, { useEffect, useState } from "react";
import PortalLayout from "../components/portal/Layout/PortalLayout";
import {
  Calendar,
  Smile,
  Frown,
  Meh,
  Trash2,
  Eye,
  Pencil,
  Check,
  X,
  Plus,
  Heart,
  BookOpen,
  Feather,
} from "lucide-react";
import { DM_Serif_Text, DM_Sans } from "next/font/google";
import { intPsychTheme } from "../components/theme";
import { useSession } from "next-auth/react";
import Drawer from "../components/Drawer";
import { useWeather } from "../lib/hooks/useWeather";
import WeatherWidget from "../components/WeatherWidget";

interface JournalEntry {
  id: string;
  content: string;
  mood: number;
  createdAt: string;
  sentimentResult?: {
    average_score: number;
    breakdown: {
      positive: number;
      neutral: number;
      negative: number;
    };
  };
}

const dm_serif = DM_Serif_Text({ subsets: ["latin"], weight: ["400"] });
const dm_sans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"] });

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [newContent, setNewContent] = useState("");
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const { weather } = useWeather();

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await fetch("/api/portal/journal");
        if (response.ok) {
          const data = await response.json();
          setEntries(data.entries || []);
        }
      } catch (error) {
        console.error("Failed to load journal entries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  const createJournalEntry = async (content: string, mood: number) => {
    try {
      const response = await fetch("/api/portal/journal", {
        method: "POST",
        body: JSON.stringify({ content, mood }),
      });
      if (response.ok) {
        const data = await response.json();
        setEntries((prev) => [data.entry, ...prev]);
      }
    } catch (error) {
      console.error("Failed to create journal entry:", error);
    }
  };

  const deleteJournalEntry = async (
    entryId: string,
    event: React.MouseEvent
  ) => {
    event.stopPropagation();
    try {
      const response = await fetch(`/api/portal/journal?id=${entryId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setEntries((prev) => prev.filter((entry) => entry.id !== entryId));
        if (selectedEntry?.id === entryId) {
          setIsDrawerOpen(false);
          setSelectedEntry(null);
        }
      } else {
        const data = await response.json();
        console.error("Failed to delete journal entry:", data.error);
      }
    } catch (error) {
      console.error("Failed to delete journal entry:", error);
    }
  };

  const openDrawer = (entry: JournalEntry, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }
    setSelectedEntry(entry);
    setEditedContent(entry.content);
    setIsEditing(false);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedEntry(null);
    setIsEditing(false);
    setEditedContent("");
  };

  const startEditing = () => {
    if (selectedEntry) {
      setEditedContent(selectedEntry.content);
      setIsEditing(true);
    }
  };

  const cancelEditing = () => {
    if (selectedEntry) {
      setEditedContent(selectedEntry.content);
      setIsEditing(false);
    }
  };

  const updateJournalEntry = async (entryId: string, content: string) => {
    setIsSaving(true);
    try {
      const response = await fetch(`/api/portal/journal?id=${entryId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      if (response.ok) {
        const data = await response.json();
        setEntries((prev) =>
          prev.map((entry) =>
            entry.id === entryId ? { ...entry, ...data.entry } : entry
          )
        );
        if (selectedEntry?.id === entryId) {
          setSelectedEntry({ ...selectedEntry, ...data.entry });
        }
        setIsEditing(false);
      } else {
        const errorData = await response.json();
        console.error("Failed to update journal entry:", errorData.error);
        alert("Failed to update journal entry. Please try again.");
      }
    } catch (error) {
      console.error("Failed to update journal entry:", error);
      alert("Failed to update journal entry. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSave = () => {
    if (!selectedEntry || !editedContent.trim()) {
      return;
    }
    updateJournalEntry(selectedEntry.id, editedContent.trim());
  };

  const getMoodIcon = (mood: number) => {
    if (mood <= 2) return <Frown className="w-6 h-6 text-[#e11d48]" />;
    if (mood <= 3) return <Meh className="w-6 h-6 text-[#ca8a04]" />;
    return <Smile className="w-6 h-6 text-[#15803d]" />;
  };

  const getMoodLabel = (mood: number) => {
    if (mood <= 2) return "Low";
    if (mood <= 3) return "Okay";
    return "Good";
  };

  const getMoodColor = (mood: number) => {
    if (mood <= 2)
      return {
        bg: "bg-[#ffe4e6]",
        text: "text-[#e11d48]",
        border: "border-[#fda4af]",
      };
    if (mood <= 3)
      return {
        bg: "bg-[#fef9c3]",
        text: "text-[#ca8a04]",
        border: "border-[#fde047]",
      };
    return {
      bg: "bg-[#dcfce7]",
      text: "text-[#15803d]",
      border: "border-[#86efac]",
    };
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const moodOptions = [
    {
      label: "Good",
      value: 5,
      icon: <Smile className="w-6 h-6" />,
      bg: "bg-[#f0fdf4]",
      border: "border-[#bbf7d0]",
      text: "text-[#15803d]",
      selectedBg: "bg-[#dcfce7]",
      selectedBorder: "border-[#15803d]",
      selectedText: "text-[#14532d]",
    },
    {
      label: "Okay",
      value: 3,
      icon: <Meh className="w-6 h-6" />,
      bg: "bg-[#fefce8]",
      border: "border-[#fef08a]",
      text: "text-[#854d0e]",
      selectedBg: "bg-[#fef9c3]",
      selectedBorder: "border-[#ca8a04]",
      selectedText: "text-[#713f12]",
    },
    {
      label: "Low",
      value: 1,
      icon: <Frown className="w-6 h-6" />,
      bg: "bg-[#fff1f2]",
      border: "border-[#fecdd3]",
      text: "text-[#be123c]",
      selectedBg: "bg-[#ffe4e6]",
      selectedBorder: "border-[#e11d48]",
      selectedText: "text-[#9f1239]",
    },
  ];

  return (
    <PortalLayout>
      <div className={`min-h-screen p-6 md:p-8 ${dm_sans.className}`}>
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1
                className={`${dm_serif.className} text-4xl mb-2`}
                style={{ color: intPsychTheme.primary }}
              >
                Your Journal
              </h1>
              <p className="text-stone-500 text-lg font-medium">
                A quiet space for your thoughts and growth.
              </p>
            </div>
            <WeatherWidget weather={weather} />
          </div>

          {/* New Entry Section */}
          <section className="bg-white rounded-2xl border-b-4 border-[#fde047]/50 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#fef9c3] p-2 rounded-lg">
                <Feather className="w-6 h-6 text-[#ca8a04]" />
              </div>
              <h2 className={`${dm_serif.className} text-2xl text-[#1c1917]`}>
                New Entry
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-stone-400 uppercase tracking-wide mb-3">
                  How are you feeling today?
                </label>
                <div className="flex gap-4">
                  {moodOptions.map((option) => {
                    const isSelected = selectedMood === option.value;
                    return (
                      <button
                        key={option.label}
                        type="button"
                        onClick={() => setSelectedMood(option.value)}
                        className={`flex-1 flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all ${
                          isSelected
                            ? `${option.selectedBg} ${option.selectedBorder} border-2 ${option.selectedText} shadow-inner scale-[0.98]`
                            : `${option.bg} ${option.border} ${option.text} hover:scale-[1.02] hover:shadow-sm`
                        }`}
                      >
                        {option.icon}
                        <span className="font-bold">{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label
                  htmlFor="journal-entry"
                  className="block text-sm font-bold text-stone-400 uppercase tracking-wide mb-3"
                >
                  Reflection
                </label>
                <textarea
                  id="journal-entry"
                  placeholder="What's on your mind today?"
                  rows={6}
                  value={newContent}
                  onChange={(event) => setNewContent(event.target.value)}
                  className="w-full bg-[#fafaf9] border border-[#e7e5e4] rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#ca8a04]/20 focus:border-[#ca8a04] transition-all text-lg placeholder:text-stone-400 font-medium resize-none text-[#1c1917] leading-relaxed"
                />
              </div>

              <button
                type="button"
                onClick={async () => {
                  if (!newContent.trim() || selectedMood === null) return;
                  await createJournalEntry(newContent.trim(), selectedMood);
                  setNewContent("");
                  setSelectedMood(null);
                  setSelectedEmotions([]);
                }}
                disabled={!newContent.trim() || selectedMood === null}
                className={`w-full py-3.5 rounded-xl font-bold uppercase tracking-wide transition-all flex items-center justify-center gap-2 shadow-[0_2px_0_0_rgba(0,0,0,0.05)] text-sm ${
                  !newContent.trim() || selectedMood === null
                    ? "bg-[#f5f5f4] text-stone-400 cursor-not-allowed shadow-none border border-[#e7e5e4]"
                    : "bg-[#ffa440] text-white border-b-4 border-[#f58402] hover:bg-[#f58402] hover:translate-y-[-1px] active:translate-y-[1px] active:border-b-0 active:shadow-none"
                }`}
              >
                <Check className="w-5 h-5" />
                Save Entry
              </button>
            </div>
          </section>

          {/* Previous Entries */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-6 h-6 text-[#0ea5e9]" />
              <h2 className={`${dm_serif.className} text-2xl text-[#1c1917]`}>
                Your Journal
              </h2>
            </div>

            {loading ? (
              <div className="text-center py-12 text-stone-400 font-bold">
                Loading your entries...
              </div>
            ) : entries.length === 0 ? (
              <div className="bg-[#f0f9ff] rounded-2xl p-12 text-center border border-[#bae6fd] border-dashed">
                <p className="text-stone-500 font-medium text-lg">
                  Your journal is waiting for its first story.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {entries.map((entry) => {
                  const moodColors = getMoodColor(entry.mood);
                  const moodLabel = getMoodLabel(entry.mood);

                  return (
                    <div
                      key={entry.id}
                      onClick={() => openDrawer(entry)}
                      className="bg-white rounded-xl border border-[#e7e5e4] border-b-2 p-5 cursor-pointer hover:border-[#0ea5e9]/30 hover:bg-[#f0f9ff]/30 transition-all group shadow-sm"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2 bg-[#fafaf9] px-3 py-1.5 rounded-lg text-xs font-bold text-stone-500 uppercase tracking-wide border border-[#e7e5e4]">
                          <Calendar className="w-3 h-3" />
                          {new Date(entry.createdAt).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric" }
                          )}
                        </div>

                        <div
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${moodColors.bg} ${moodColors.text} text-xs font-bold uppercase border ${moodColors.border}`}
                        >
                          {getMoodIcon(entry.mood)}
                          {moodLabel}
                        </div>
                      </div>

                      <p className="text-stone-600 font-medium line-clamp-3 mb-4 leading-relaxed text-base">
                        {entry.content}
                      </p>

                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => deleteJournalEntry(entry.id, e)}
                          className="p-2 text-stone-400 hover:text-[#e11d48] hover:bg-[#ffe4e6] rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Drawer for viewing full entry */}
      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer}>
        {selectedEntry && (
          <div className={`space-y-6 ${dm_sans.className}`}>
            {/* Header with date and mood */}
            <div className="flex items-center justify-between border-b border-[#e7e5e4] pb-6">
              <div className="flex items-center gap-2">
                <div className="bg-[#f5f5f4] p-2 rounded-lg">
                  <Calendar className="w-5 h-5 text-stone-500" />
                </div>
                <span className="text-lg font-bold text-[#1c1917]">
                  {formatDate(selectedEntry.createdAt)}
                </span>
              </div>
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                  getMoodColor(selectedEntry.mood).bg
                } ${getMoodColor(selectedEntry.mood).border}`}
              >
                {getMoodIcon(selectedEntry.mood)}
                <span
                  className={`font-bold uppercase tracking-wide text-sm ${getMoodColor(selectedEntry.mood).text}`}
                >
                  {getMoodLabel(selectedEntry.mood)}
                </span>
              </div>
            </div>

            {/* Entry content */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`${dm_serif.className} text-2xl text-[#1c1917]`}>
                  Entry Details
                </h3>
                {!isEditing && (
                  <button
                    onClick={startEditing}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-stone-600 bg-[#f5f5f4] hover:bg-[#e7e5e4] transition-colors uppercase tracking-wide"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    rows={12}
                    className="w-full bg-[#fafaf9] border border-[#e7e5e4] rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#ca8a04]/20 focus:border-[#ca8a04] transition-all text-lg text-[#1c1917] leading-relaxed resize-none font-medium"
                    placeholder="Write about your day..."
                  />
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleSave}
                      disabled={isSaving || !editedContent.trim()}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#ffa440] text-white rounded-xl font-bold border-b-4 border-[#f58402] hover:bg-[#f58402] hover:translate-y-[-1px] active:translate-y-[1px] active:border-b-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm uppercase tracking-wide"
                    >
                      <Check className="w-5 h-5" />
                      {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                      onClick={cancelEditing}
                      disabled={isSaving}
                      className="px-6 py-3 bg-[#f5f5f4] text-stone-600 rounded-xl font-bold border-b-4 border-[#d6d3d1] hover:bg-[#e7e5e4] hover:translate-y-[-1px] active:translate-y-[1px] active:border-b-0 transition-all text-sm uppercase tracking-wide"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-[#fafaf9] p-6 rounded-xl border border-[#e7e5e4]">
                  <p className="text-[#1c1917] whitespace-pre-wrap leading-relaxed text-lg font-medium">
                    {selectedEntry.content}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </Drawer>
    </PortalLayout>
  );
}
