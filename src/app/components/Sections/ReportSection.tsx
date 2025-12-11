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

import { Download } from "lucide-react";

export default function ReportSection({
  profile,
  title,
  step,
  setProfile,
}: Props) {
  const content =
    profile.isChild === true ? (
      <ReportSectionChild
        profile={profile}
        title={title}
        step={step}
        setProfile={setProfile}
      />
    ) : (
      <ReportSectionAdult
        profile={profile}
        title={title}
        step={step}
        setProfile={setProfile}
      />
    );

  return <div className="space-y-8">{content}</div>;
}
