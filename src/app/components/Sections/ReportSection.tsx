"use client";
import React from "react";
import type { Profile } from "../../lib/types/types";
import ReportSectionAdult from "./ReportSectionAdult";
import ReportSectionChild from "./ReportSectionChild";

type Props = {
  profile: Profile;
  title: string;
  step: number;
  setProfile?: (updater: (prev: Profile) => Profile) => void;
};

export default function ReportSection({
  profile,
  title,
  step,
  setProfile,
}: Props) {
  // Conditionally render child or adult component based on profile type
  if (profile.isChild === true) {
    return (
      <ReportSectionChild
        profile={profile}
        title={title}
        step={step}
        setProfile={setProfile}
      />
    );
  }

  return (
    <ReportSectionAdult
      profile={profile}
      title={title}
      step={step}
      setProfile={setProfile}
    />
  );
}
