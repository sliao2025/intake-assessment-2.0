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
} from "lucide-react";
import { DM_Serif_Text } from "next/font/google";
import { intPsychTheme } from "../components/theme";
import { useSession } from "next-auth/react";
import Drawer from "../components/Drawer";
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
export default function JournalPage() {
  const { data: session } = useSession();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [newContent, setNewContent] = useState("");
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);

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
    event.stopPropagation(); // Prevent navigation to entry detail page
    try {
      const response = await fetch(`/api/portal/journal?id=${entryId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setEntries((prev) => prev.filter((entry) => entry.id !== entryId));
        // Close drawer if the deleted entry was being viewed
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
        // Update the entry in the list
        setEntries((prev) =>
          prev.map((entry) =>
            entry.id === entryId ? { ...entry, ...data.entry } : entry
          )
        );
        // Update the selected entry
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
    if (mood <= 2) return <Frown className="w-5 h-5 text-red-600" />;
    if (mood <= 3) return <Meh className="w-5 h-5 text-yellow-600" />;
    return <Smile className="w-5 h-5 text-[#7FB885]" />;
  };

  const getMoodLabel = (mood: number) => {
    if (mood <= 2) return "Down";
    if (mood <= 3) return "Okay";
    return "Good";
  };

  const getMoodColor = (mood: number) => {
    if (mood <= 2) return { bg: "bg-red-50", text: "text-red-600" };
    if (mood <= 3) return { bg: "bg-yellow-50", text: "text-yellow-600" };
    return { bg: "bg-[#E8F0E6]", text: "text-[#7FB885]" };
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const moodOptions = [
    {
      label: "Good",
      value: 5,
      icon: <Smile className="w-5 h-5" />,
      bg: "bg-[#E8F0E6]",
      border: "border-[#7FB885]",
      text: "text-[#1F6B3D]",
      selectedBg: "bg-[#CFE8D5]",
      selectedBorder: "border-[#5AA36E]",
      selectedText: "text-[#0F4F21]",
    },
    {
      label: "Okay",
      value: 3,
      icon: <Meh className="w-5 h-5" />,
      bg: "bg-yellow-50",
      border: "border-yellow-400",
      text: "text-[#8C6E00]",
      selectedBg: "bg-[#FDE6C0]",
      selectedBorder: "border-[#D98205]",
      selectedText: "text-[#6B4B00]",
    },
    {
      label: "Down",
      value: 1,
      icon: <Frown className="w-5 h-5" />,
      bg: "bg-red-50",
      border: "border-red-400",
      text: "text-[#B1222B]",
      selectedBg: "bg-[#F5C6C8]",
      selectedBorder: "border-[#C62B38]",
      selectedText: "text-[#81131E]",
    },
  ];

  return (
    <PortalLayout>
      <div className="min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1
              style={{ color: intPsychTheme.primary }}
              className={`${dm_serif.className} text-3xl text-gray-900 mb-2`}
            >
              {session?.user?.name
                ? `${session?.user?.name?.split(" ")[0]}'s Journal`
                : "Your Journal"}
            </h1>
            <p className="text-sm font-thin text-gray-600">
              Track your thoughts, feelings, and daily experiences
            </p>
          </div>

          {/* New Entry Section - Exact Figma */}
          <section className="mb-8">
            <h2
              style={{ color: intPsychTheme.primary }}
              className={`font-serif text-xl text-gray-900 mb-2`}
            >
              New Entry
            </h2>
            <div className="bg-white shadow-[0_1px_2px_rgba(15,23,42,0.08)] rounded-3xl p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">
                    How are you feeling today?
                  </label>
                  <div className="flex gap-3">
                    {moodOptions.map((option) => {
                      const isSelected = selectedMood === option.value;
                      return (
                        <button
                          key={option.label}
                          type="button"
                          onClick={() => setSelectedMood(option.value)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors focus:outline-none ${
                            isSelected
                              ? `${option.selectedBg ?? option.bg} ${option.selectedBorder ?? option.border} ${option.selectedText ?? option.text} opacity-100`
                              : `${option.bg} ${option.border} ${option.text} opacity-70 hover:opacity-100`
                          }`}
                        >
                          {option.icon}
                          <span
                            className={
                              isSelected
                                ? (option.selectedText ?? option.text)
                                : option.text
                            }
                          >
                            {option.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="journal-entry"
                    className="block text-gray-700 mb-2"
                  >
                    Your thoughts
                  </label>
                  <textarea
                    id="journal-entry"
                    placeholder="Write about your day, how you're feeling, what's on your mind..."
                    rows={6}
                    value={newContent}
                    onChange={(event) => setNewContent(event.target.value)}
                    className="w-full border border-[#2B4E6B] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#7FB885]"
                  />
                </div>

                <button
                  type="button"
                  onClick={async () => {
                    if (!newContent.trim() || selectedMood === null) {
                      return;
                    }
                    await createJournalEntry(newContent.trim(), selectedMood);
                    setNewContent("");
                    setSelectedMood(null);
                  }}
                  disabled={!newContent.trim() || selectedMood === null}
                  style={{
                    backgroundColor: intPsychTheme.secondary,
                    borderColor:
                      !newContent.trim() || selectedMood === null
                        ? "#ffc994"
                        : "#e69333",
                  }}
                  onMouseEnter={(e) => {
                    if (!(!newContent.trim() || selectedMood === null)) {
                      e.currentTarget.style.backgroundColor = "#e69333";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!(!newContent.trim() || selectedMood === null)) {
                      e.currentTarget.style.backgroundColor =
                        intPsychTheme.secondary;
                    }
                  }}
                  className={`${!newContent.trim() || selectedMood === null ? "cursor-not-allowed" : "cursor-pointer"} w-full text-white border rounded-xl py-3 px-4 transition-colors`}
                >
                  Save Entry
                </button>
              </div>
            </div>
          </section>

          {/* Previous Entries Section - Exact Figma */}
          <section>
            <h2
              style={{ color: intPsychTheme.primary }}
              className={`font-serif text-xl text-gray-900 mb-2`}
            >
              Previous Entries
            </h2>
            {loading ? (
              <div className="text-center py-12 text-gray-600">
                Loading entries...
              </div>
            ) : entries.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center shadow-[0_1px_2px_rgba(15,23,42,0.08)]">
                <p className="text-gray-600 mb-4">
                  You haven't written any journal entries yet.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {entries.map((entry) => {
                  const moodColors = getMoodColor(entry.mood);
                  const moodLabel = getMoodLabel(entry.mood);

                  return (
                    <div
                      key={entry.id}
                      onClick={() => openDrawer(entry)}
                      className="bg-white shadow-[0_1px_2px_rgba(15,23,42,0.08)] rounded-3xl p-6 cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-gray-500" />
                          <span className="text-gray-900">
                            {formatDate(entry.createdAt)}
                          </span>
                          <div
                            className={`flex items-center gap-2 px-3 py-1 rounded-full ${moodColors.bg}`}
                          >
                            {getMoodIcon(entry.mood)}

                            <span className={moodColors.text}>{moodLabel}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Trash2
                            onClick={(e) => deleteJournalEntry(entry.id, e)}
                            className="hover:text-red-500 w-5 h-5 text-gray-500 cursor-pointer"
                          />
                          <Eye
                            onClick={(e) => openDrawer(entry, e)}
                            className="hover:text-blue-500 w-5 h-5 text-gray-500 cursor-pointer"
                          />
                        </div>
                      </div>
                      <p className="line-clamp-3 text-gray-700">
                        {entry.content}
                      </p>
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
          <div className="space-y-6">
            {/* Header with date and mood */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-500" />
                <span className="text-gray-900">
                  {formatDate(selectedEntry.createdAt)}
                </span>
              </div>
              <div
                className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                  getMoodColor(selectedEntry.mood).bg
                }`}
              >
                {getMoodIcon(selectedEntry.mood)}
                <span className={getMoodColor(selectedEntry.mood).text}>
                  {getMoodLabel(selectedEntry.mood)}
                </span>
              </div>
            </div>

            {/* Entry content */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3
                  className="text-lg font-semibold"
                  style={{ color: intPsychTheme.primary }}
                >
                  Journal Entry
                </h3>
                {!isEditing && (
                  <button
                    onClick={startEditing}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#7FB885]"
                    aria-label="Edit entry"
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
                    rows={10}
                    className="w-full border border-[#2B4E6B] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#7FB885] text-gray-700 leading-relaxed resize-none"
                    placeholder="Write about your day, how you're feeling, what's on your mind..."
                  />
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleSave}
                      disabled={isSaving || !editedContent.trim()}
                      style={{
                        backgroundColor:
                          isSaving || !editedContent.trim()
                            ? "#ffd9b3"
                            : intPsychTheme.secondary,
                        borderColor:
                          isSaving || !editedContent.trim()
                            ? "#ffc994"
                            : "#e69333",
                      }}
                      className="cursor-pointer flex items-center gap-2 px-4 py-2 text-white border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#7FB885] disabled:cursor-not-allowed"
                    >
                      <Check className="w-4 h-4" />
                      {isSaving ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={cancelEditing}
                      disabled={isSaving}
                      className="cursor-pointer flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {selectedEntry.content}
                </p>
              )}
            </div>

            {/* Sentiment analysis if available */}
            {selectedEntry.sentimentResult && (
              <div className="border-t border-gray-200 pt-6">
                <h3
                  className="text-lg font-semibold mb-3"
                  style={{ color: intPsychTheme.primary }}
                >
                  Sentiment Analysis
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Average Score:</span>
                    <span className="font-semibold text-gray-900">
                      {selectedEntry.sentimentResult.average_score.toFixed(2)}
                    </span>
                  </div>
                  <div className="space-y-1 pt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Positive:</span>
                      <span className="font-medium text-green-600">
                        {(
                          selectedEntry.sentimentResult.breakdown.positive * 100
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Neutral:</span>
                      <span className="font-medium text-gray-600">
                        {(
                          selectedEntry.sentimentResult.breakdown.neutral * 100
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Negative:</span>
                      <span className="font-medium text-red-600">
                        {(
                          selectedEntry.sentimentResult.breakdown.negative * 100
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </Drawer>
    </PortalLayout>
  );
}
