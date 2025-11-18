"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PortalLayout from "../components/portal/Layout/PortalLayout";
import { Calendar, Smile, Frown, Meh } from "lucide-react";
import { DM_Serif_Text } from "next/font/google";
import { intPsychTheme } from "../components/theme";
import { useSession } from "next-auth/react";
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
  const router = useRouter();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [newContent, setNewContent] = useState("");
  const [selectedMood, setSelectedMood] = useState<number | null>(null);

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

  const getMoodIcon = (mood: number) => {
    if (mood <= 2) return <Frown className="w-5 h-5 text-red-600" />;
    if (mood <= 3) return <Meh className="w-5 h-5 text-yellow-600" />;
    return <Smile className="w-5 h-5 text-[#7FB885]" />;
  };

  const getMoodLabel = (mood: number) => {
    if (mood <= 2) return "Difficult";
    if (mood <= 3) return "Neutral";
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
      label: "Neutral",
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
      label: "Difficult",
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
                    backgroundColor:
                      !newContent.trim() || selectedMood === null
                        ? "#ffd9b3"
                        : intPsychTheme.secondary,
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
                  className="cursor-pointer w-full text-white border rounded-xl py-3 px-4 transition-colors"
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
                      onClick={() => router.push(`/journal/${entry.id}`)}
                      className="bg-white shadow-[0_1px_2px_rgba(15,23,42,0.08)] rounded-3xl p-6 cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-gray-500" />
                          <span className="text-gray-900">
                            {formatDate(entry.createdAt)}
                          </span>
                        </div>
                        <div
                          className={`flex items-center gap-2 px-3 py-1 rounded-full ${moodColors.bg}`}
                        >
                          {getMoodIcon(entry.mood)}
                          <span className={moodColors.text}>{moodLabel}</span>
                        </div>
                      </div>
                      <p className="text-gray-700">{entry.content}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </PortalLayout>
  );
}
