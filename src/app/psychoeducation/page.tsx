"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PortalLayout from "../components/portal/Layout/PortalLayout";
import { BookOpen, CheckCircle, Clock, Play } from "lucide-react";

interface Module {
  id: string;
  title: string;
  description: string;
  category: string;
  totalSteps: number;
  duration: number;
  progress?: {
    currentStep: number;
    isCompleted: boolean;
  };
}

export default function ModulesPage() {
  const router = useRouter();
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch("/api/portal/modules");
        if (response.ok) {
          const data = await response.json();
          setModules(data.modules || []);
        }
      } catch (error) {
        console.error("Failed to load modules:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, []);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "coping-skills": "bg-purple-100 text-purple-700",
      mindfulness: "bg-teal-100 text-teal-700",
      "sleep-hygiene": "bg-blue-100 text-blue-700",
      nutrition: "bg-green-100 text-green-700",
      exercise: "bg-orange-100 text-orange-700",
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  const getProgressPercentage = (module: Module) => {
    if (!module.progress) return 0;
    return Math.round((module.progress.currentStep / module.totalSteps) * 100);
  };

  return (
    <PortalLayout>
      <div className="p-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Psychoeducation Modules
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Learn evidence-based strategies for mental wellness
          </p>
        </div>

        {/* Modules Grid */}
        {loading ? (
          <div className="text-center py-12 text-gray-600">
            Loading modules...
          </div>
        ) : modules.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
            <p className="text-gray-600">
              No psychoeducation modules available yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.map((module) => {
              const progressPercent = getProgressPercentage(module);
              const isStarted = module.progress && module.progress.currentStep > 0;
              const isCompleted = module.progress?.isCompleted;

              return (
                <div
                  key={module.id}
                  onClick={() => router.push(`/modules/${module.id}`)}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer"
                >
                  {/* Category Badge */}
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-medium uppercase mb-3 ${getCategoryColor(
                      module.category
                    )}`}
                  >
                    {module.category.replace("-", " ")}
                  </span>

                  {/* Title and Description */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {module.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {module.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{module.totalSteps} steps</span>
                    </div>
                    {module.duration && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{module.duration} min</span>
                      </div>
                    )}
                  </div>

                  {/* Progress Bar (if started) */}
                  {isStarted && !isCompleted && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{progressPercent}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-teal-600 h-2 rounded-full transition-all"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <div className="flex items-center justify-between">
                    {isCompleted ? (
                      <div className="flex items-center gap-2 text-teal-600 font-medium">
                        <CheckCircle className="w-5 h-5" />
                        <span>Completed</span>
                      </div>
                    ) : isStarted ? (
                      <div className="flex items-center gap-2 text-teal-600 font-medium">
                        <Play className="w-5 h-5" />
                        <span>Continue</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-gray-600 font-medium">
                        <Play className="w-5 h-5" />
                        <span>Start Module</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </PortalLayout>
  );
}

