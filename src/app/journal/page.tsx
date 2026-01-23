"use client";

import React, { useEffect, useState } from "react";
import PortalLayout from "../components/portal/Layout/PortalLayout";
import {
  Calendar,
  Trash2,
  Pencil,
  Check,
  BookOpen,
  Feather,
} from "lucide-react";
import { DM_Serif_Text, DM_Sans } from "next/font/google";
import { intPsychTheme, sigmundTheme } from "../components/theme";
import Drawer from "../components/Drawer";
import { useWeather } from "../lib/hooks/useWeather";
import WeatherWidget from "../components/WeatherWidget";
import LinearGauge from "../components/primitives/LinearGauge";
import CircularGauge from "../components/primitives/CircularGauge";
import { RiInformation2Line } from "react-icons/ri";

import {
  FaRegFaceGrinStars,
  FaRegFaceSmileBeam,
  FaRegFaceMeh,
  FaRegFaceFrownOpen,
  FaRegFaceTired,
} from "react-icons/fa6";

interface EmotionTag {
  emotion: string;
  class: string;
  field?: string;
}

interface JournalEntry {
  id: string;
  content: string;
  mood: number;
  createdAt: string;
  emotions?: EmotionTag[];
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

/**
 * Normalizes a score from -1 to 1 range to 0-100 range
 * -1 -> 0, 0 -> 50, 1 -> 100
 */
const normalizeScore = (score: number | undefined | null): number => {
  if (score === undefined || score === null) return 50;
  return Math.round(((score + 1) / 2) * 100);
};

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
  const [pendingExtractions, setPendingExtractions] = useState<Set<string>>(
    new Set()
  );
  const [pendingSentiment, setPendingSentiment] = useState<Set<string>>(
    new Set()
  );
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

  // Sync selectedEntry with entries updates (e.g. when background analysis completes)
  useEffect(() => {
    if (selectedEntry) {
      const updatedEntry = entries.find((e) => e.id === selectedEntry.id);
      if (updatedEntry && updatedEntry !== selectedEntry) {
        setSelectedEntry(updatedEntry);
      }
    }
  }, [entries, selectedEntry]);

  const createJournalEntry = async (content: string, mood: number) => {
    try {
      console.log("Creating journal entry...");
      const response = await fetch("/api/portal/journal", {
        method: "POST",
        body: JSON.stringify({ content, mood }),
      });
      if (response.ok) {
        const data = await response.json();
        const newEntryId = data.entry.id;

        // Add entry to list and mark as pending extraction
        setEntries((prev) => [data.entry, ...prev]);
        setPendingExtractions((prev) => new Set(prev).add(newEntryId));
        setNewContent("");
        setSelectedMood(null);
        setSelectedEmotions([]);

        // Trigger emotion extraction and sentiment analysis in parallel
        setPendingSentiment((prev) => new Set(prev).add(newEntryId));

        try {
          const [extractionResponse, sentimentResponse] =
            await Promise.allSettled([
              fetch("/api/portal/journal/emotion-extraction", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ journalId: newEntryId }),
              }),
              fetch("/api/insights/sentiment-analysis", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ journalId: newEntryId }),
              }),
            ]);

          if (extractionResponse.status === "fulfilled") {
            const extractionData = await extractionResponse.value.json();
            console.log("Emotion Extraction Response:", extractionData);
          }

          if (sentimentResponse.status === "fulfilled") {
            const sentimentData = await sentimentResponse.value.json();
            console.log("Sentiment Analysis Response:", sentimentData);
          }

          // Refetch entries from database to get saved data
          const refreshResponse = await fetch("/api/portal/journal");
          if (refreshResponse.ok) {
            const refreshData = await refreshResponse.json();
            setEntries(refreshData.entries || []);
          }
        } catch (err) {
          console.error("Failed to trigger analysis:", err);
        } finally {
          // Remove from pending regardless of success/failure
          setPendingExtractions((prev) => {
            const next = new Set(prev);
            next.delete(newEntryId);
            return next;
          });
          setPendingSentiment((prev) => {
            const next = new Set(prev);
            next.delete(newEntryId);
            return next;
          });
        }
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
    console.log("Selected Entry:", entry);
    console.log(
      "Normalized Entry:",
      normalizeScore(entry.sentimentResult?.average_score)
    );
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

        // Mark as pending extraction
        setPendingExtractions((prev) => new Set(prev).add(entryId));

        setEntries((prev) =>
          prev.map((entry) =>
            entry.id === entryId
              ? { ...entry, ...data.entry, emotions: undefined }
              : entry
          )
        );
        if (selectedEntry?.id === entryId) {
          setSelectedEntry({
            ...selectedEntry,
            ...data.entry,
            emotions: undefined,
          });
        }
        setIsEditing(false);

        // Re-trigger emotion extraction and sentiment analysis for updated content
        setPendingSentiment((prev) => new Set(prev).add(entryId));

        try {
          const [extractionResponse, sentimentResponse] =
            await Promise.allSettled([
              fetch("/api/portal/journal/emotion-extraction", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ journalId: entryId }),
              }),
              fetch("/api/insights/sentiment-analysis", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ journalId: entryId }),
              }),
            ]);

          if (extractionResponse.status === "fulfilled") {
            const extractionData = await extractionResponse.value.json();
            console.log(
              "Emotion Extraction Response (update):",
              extractionData
            );
          }

          if (sentimentResponse.status === "fulfilled") {
            const sentimentData = await sentimentResponse.value.json();
            console.log("Sentiment Analysis Response (update):", sentimentData);
          }

          // Refetch entries from database to get saved data
          const refreshResponse = await fetch("/api/portal/journal");
          if (refreshResponse.ok) {
            const refreshData = await refreshResponse.json();
            setEntries(refreshData.entries || []);
            // Update selectedEntry from refreshed data
            const updatedEntry = refreshData.entries?.find(
              (e: JournalEntry) => e.id === entryId
            );
            if (updatedEntry) {
              setSelectedEntry(updatedEntry);
            }
          }
        } catch (err) {
          console.error("Failed to trigger analysis:", err);
        } finally {
          setPendingExtractions((prev) => {
            const next = new Set(prev);
            next.delete(entryId);
            return next;
          });
          setPendingSentiment((prev) => {
            const next = new Set(prev);
            next.delete(entryId);
            return next;
          });
        }
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
    switch (mood) {
      case 5:
        return <FaRegFaceGrinStars className="w-6 h-6 text-[#16a34a]" />;
      case 4:
        return <FaRegFaceSmileBeam className="w-6 h-6 text-[#84cc16]" />;
      case 3:
        return <FaRegFaceMeh className="w-6 h-6 text-[#ca8a04]" />;
      case 2:
        return <FaRegFaceFrownOpen className="w-6 h-6 text-[#ffa440]" />;
      case 1:
        return <FaRegFaceTired className="w-6 h-6 text-[#f43f5e]" />;
      default:
        return <FaRegFaceSmileBeam className="w-6 h-6 text-[#84cc16]" />;
    }
  };

  const getMoodLabel = (mood: number) => {
    switch (mood) {
      case 5:
        return "Amazing";
      case 4:
        return "Good";
      case 3:
        return "Meh";
      case 2:
        return "Bad";
      case 1:
        return "Terrible";
      default:
        return "Good";
    }
  };

  const getMoodColor = (mood: number) => {
    switch (mood) {
      case 5:
        return {
          bg: "bg-[#f0fdf4]",
          text: "text-[#16a34a]",
          border: "border-[#bbf7d0]",
        };
      case 4:
        return {
          bg: "bg-[#f7fee7]",
          text: "text-[#84cc16]",
          border: "border-[#d9f99d]",
        };
      case 3:
        return {
          bg: "bg-[#fef9c3]",
          text: "text-[#ca8a04]",
          border: "border-[#fde047]",
        };
      case 2:
        return {
          bg: "bg-[#fff7ed]",
          text: "text-[#ffa440]",
          border: "border-[#fed7aa]",
        };
      case 1:
        return {
          bg: "bg-[#fff1f2]",
          text: "text-[#f43f5e]",
          border: "border-[#fecdd3]",
        };
      default:
        return {
          bg: "bg-[#f0fdf4]",
          text: "text-[#16a34a]",
          border: "border-[#bbf7d0]",
        };
    }
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
      label: "Amazing",
      value: 5,
      icon: <FaRegFaceGrinStars className="w-6 h-6" />,
      bg: "bg-[#f0fdf4]",
      border: "border-[#bbf7d0]",
      text: "text-[#16a34a]",
      selectedBg: "bg-[#dcfce7]",
      selectedBorder: "border-[#15803d]",
      selectedText: "text-[#14532d]",
    },
    {
      label: "Good",
      value: 4,
      icon: <FaRegFaceSmileBeam className="w-6 h-6" />,
      bg: "bg-[#f7fee7]",
      border: "border-[#d9f99d]",
      text: "text-[#84cc16]",
      selectedBg: "bg-[#ecfccb]",
      selectedBorder: "border-[#4d7c0f]",
      selectedText: "text-[#365314]",
    },
    {
      label: "Meh",
      value: 3,
      icon: <FaRegFaceMeh className="w-6 h-6" />,
      bg: "bg-[#fef9c3]",
      border: "border-[#fde047]",
      text: "text-[#ca8a04]",
      selectedBg: "bg-[#fde047]",
      selectedBorder: "border-[#ca8a04]",
      selectedText: "text-[#854d0e]",
    },
    {
      label: "Bad",
      value: 2,
      icon: <FaRegFaceFrownOpen className="w-6 h-6" />,
      bg: "bg-[#fff7ed]",
      border: "border-[#fed7aa]",
      text: "text-[#ffa440]",
      selectedBg: "bg-[#ffedd5]",
      selectedBorder: "border-[#c2410c]",
      selectedText: "text-[#7c2d12]",
    },
    {
      label: "Terrible",
      value: 1,
      icon: <FaRegFaceTired className="w-6 h-6" />,
      bg: "bg-[#fff1f2]",
      border: "border-[#fecdd3]",
      text: "text-[#f43f5e]",
      selectedBg: "bg-[#ffe4e6]",
      selectedBorder: "border-[#be123c]",
      selectedText: "text-[#881337]",
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
                style={{ color: sigmundTheme.accent }}
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
                  className={`w-full bg-[${sigmundTheme.background}] border border-[${sigmundTheme.border}] rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#ca8a04]/20 focus:border-[#ca8a04] transition-all text-lg placeholder:text-stone-400 font-medium resize-none text-[#1c1917] leading-relaxed`}
                />
              </div>

              <button
                type="button"
                onClick={async () => {
                  if (!newContent.trim() || selectedMood === null) return;
                  await createJournalEntry(newContent.trim(), selectedMood);
                }}
                disabled={!newContent.trim() || selectedMood === null}
                className={`w-full py-3.5 rounded-xl font-bold uppercase tracking-wide transition-all flex items-center justify-center gap-2 shadow-[0_2px_0_0_rgba(0,0,0,0.05)] text-sm ${
                  !newContent.trim() || selectedMood === null
                    ? `bg-[#f5f5f4] text-stone-400 cursor-not-allowed shadow-none border border-[${sigmundTheme.border}]`
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
                Your entries
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
                      className="bg-white rounded-xl border border-[#e7e5e4] border-b-4 p-5 cursor-pointer hover:scale-[1.01] hover:shadow-xs transition-all group"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={`flex items-center gap-2 bg-[${sigmundTheme.background}] px-3 py-1.5 rounded-lg text-xs font-bold text-stone-500 uppercase tracking-wide border border-[${sigmundTheme.border}]`}
                        >
                          <Calendar className="w-3 h-3" />
                          {new Date(entry.createdAt).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric" }
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => deleteJournalEntry(entry.id, e)}
                            className="p-1.5 text-stone-400 hover:text-[#e11d48] hover:bg-[#ffe4e6] rounded-lg transition-all opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          {(entry.sentimentResult?.average_score !==
                            undefined ||
                            pendingSentiment.has(entry.id)) && (
                            <CircularGauge
                              score={normalizeScore(
                                entry.sentimentResult?.average_score
                              )}
                              size={32}
                              showLabel={false}
                              animate={false}
                              isLoading={pendingSentiment.has(entry.id)}
                            />
                          )}
                          <div
                            className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${moodColors.bg} ${moodColors.text} text-xs font-bold uppercase border ${moodColors.border}`}
                          >
                            {getMoodIcon(entry.mood)}
                            {moodLabel}
                          </div>
                        </div>
                      </div>

                      <p className="text-stone-600 font-medium line-clamp-3 mb-4 leading-relaxed text-base">
                        {entry.content}
                      </p>

                      {/* Emotion Tags */}
                      {(pendingExtractions.has(entry.id) ||
                        (entry.emotions && entry.emotions.length > 0)) && (
                        <div className="mb-4">
                          <span className="text-xs font-bold text-stone-400 uppercase tracking-wide mb-2 block">
                            Feelings and Emotions
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {pendingExtractions.has(entry.id) ? (
                              <span className="text-xs text-stone-400 italic animate-pulse">
                                Creating emotion tags...
                              </span>
                            ) : (
                              <>
                                {entry.emotions
                                  ?.slice(0, 3)
                                  .map((emotion, idx) => (
                                    <span
                                      key={idx}
                                      className="px-2.5 py-1 bg-[#b2bfa233] text-[#426459] text-xs font-medium rounded-full border border-[#b2bfa2]"
                                    >
                                      {emotion.emotion}
                                    </span>
                                  ))}
                                {entry.emotions &&
                                  entry.emotions.length > 3 && (
                                    <span
                                      className={`px-2.5 py-1 bg-[${sigmundTheme.background}] text-stone-500 text-xs font-medium rounded-full border border-[${sigmundTheme.border}]`}
                                    >
                                      +{entry.emotions.length - 3} more
                                    </span>
                                  )}
                              </>
                            )}
                          </div>
                        </div>
                      )}
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
            <div
              className={`flex items-center justify-between border-b border-[${sigmundTheme.border}] pb-6`}
            >
              <div className="flex items-center gap-2">
                <div className="bg-[#f5f5f4] p-2 rounded-lg">
                  <Calendar className="w-5 h-5 text-stone-500" />
                </div>
                <span className="text-lg font-bold text-[#1c1917]">
                  {formatDate(selectedEntry.createdAt)}
                </span>
              </div>
              <div className="flex items-center gap-3">
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
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-stone-600 bg-[#f5f5f4] hover:bg-stone-200 transition-colors uppercase tracking-wide"
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
                    className={`w-full bg-[${sigmundTheme.background}] border border-[${sigmundTheme.border}] rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#ca8a04]/20 focus:border-[#ca8a04] transition-all text-lg text-[#1c1917] leading-relaxed resize-none font-medium`}
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
                <div
                  className={`bg-[${sigmundTheme.background}] p-6 rounded-xl border border-[${sigmundTheme.border}]`}
                >
                  <p className="text-[#1c1917] whitespace-pre-wrap leading-relaxed text-lg font-medium">
                    {selectedEntry.content}
                  </p>
                </div>
              )}
            </div>

            {/* Sigmund's Score Section */}
            {(selectedEntry.sentimentResult ||
              pendingSentiment.has(selectedEntry.id)) && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h3
                    className={`${dm_serif.className} text-2xl text-[#1c1917]`}
                  >
                    Sigmund's Index
                  </h3>
                  <div className="group relative">
                    <RiInformation2Line className="w-5 h-5 text-stone-400 cursor-help" />
                    <div className="border-b-4 absolute left-full top-1/2 -translate-y-1/2 ml-3 w-80 p-4 bg-white text-[#1c1917] text-xs font-medium rounded-xl border border-stone-200 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 leading-relaxed">
                      Sigmund's Index evaluates the emotional tone of each
                      sentence in your entry and computes a composite score.
                      {/* Arrow Tail */}
                      <div className="absolute right-full top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-l border-t border-stone-200 rotate-[-45deg] translate-x-[7px]" />
                    </div>
                  </div>
                </div>

                {pendingSentiment.has(selectedEntry.id) ? (
                  <div
                    className={`flex flex-col items-center py-8 gap-3 bg-[${sigmundTheme.background}] rounded-xl border border-[${sigmundTheme.border}]`}
                  >
                    <div className="w-10 h-10 border-4 border-stone-200 border-t-[#0072ce] rounded-full animate-spin" />
                    <p className="text-sm text-stone-500">
                      Sigmund is reflecting on your entry...
                    </p>
                  </div>
                ) : (
                  <div
                    className={`bg-[${sigmundTheme.background}] p-6 rounded-xl border border-[${sigmundTheme.border}]`}
                  >
                    <LinearGauge
                      score={normalizeScore(
                        selectedEntry.sentimentResult?.average_score
                      )}
                      isLoading={pendingSentiment.has(selectedEntry.id)}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Emotions Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className={`${dm_serif.className} text-2xl text-[#1c1917]`}>
                  Feelings and Emotions
                </h3>
                <div className="group relative">
                  <RiInformation2Line className="w-5 h-5 text-stone-400 cursor-help" />
                  <div className="border-b-4 absolute left-full top-1/2 -translate-y-1/2 ml-3 w-80 p-4 bg-white text-[#1c1917] text-xs font-medium rounded-xl border border-stone-200 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 leading-relaxed">
                    This analysis extracts the feelings and emotions you express
                    in your entry.
                    {/* Arrow Tail */}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-l border-t border-stone-200 rotate-[-45deg] translate-x-[7px]" />
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {pendingExtractions.has(selectedEntry.id) ? (
                  <span className="text-sm text-stone-400 italic animate-pulse">
                    Creating emotion tags...
                  </span>
                ) : selectedEntry.emotions &&
                  selectedEntry.emotions.length > 0 ? (
                  selectedEntry.emotions.map((emotion, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-[#b2bfa233] text-[#426459] text-sm font-medium rounded-full border border-[#b2bfa2]"
                    >
                      {emotion.emotion}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-stone-400 italic">
                    No emotions detected
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </PortalLayout>
  );
}
