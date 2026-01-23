import React from "react";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudLightning,
  Snowflake,
  CloudDrizzle,
} from "lucide-react";
import { intPsychTheme, sigmundTheme } from "./theme";
import { WeatherData } from "../lib/hooks/useWeather";
import { DM_Sans, DM_Serif_Text } from "next/font/google";

const dm_sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const dm_serif = DM_Serif_Text({ subsets: ["latin"], weight: ["400"] });

interface WeatherWidgetProps {
  weather: WeatherData | null;
}

export function getWeatherIcon(iconName: string) {
  const iconProps = { className: "w-6 h-6" };
  switch (iconName) {
    case "sun":
      return (
        <Sun
          {...iconProps}
          className={`w-6 h-6 text-[${intPsychTheme.secondary}]`}
        />
      ); // Secondary Orange
    case "cloud":
      return (
        <Cloud
          {...iconProps}
          className={`w-6 h-6 text-[${intPsychTheme.accent}]`}
        />
      ); // Accent Blue
    case "cloud-rain":
      return (
        <CloudRain
          {...iconProps}
          className={`w-6 h-6 text-[${intPsychTheme.primary}]`}
        />
      ); // Primary Navy
    case "cloud-lightning":
      return (
        <CloudLightning
          {...iconProps}
          className={`w-6 h-6 text-[${intPsychTheme.primary}]`}
        />
      );
    case "snowflake":
      return (
        <Snowflake
          {...iconProps}
          className={`w-6 h-6 text-[${intPsychTheme.accent}]`}
        />
      );
    case "cloud-drizzle":
      return (
        <CloudDrizzle
          {...iconProps}
          className={`w-6 h-6 text-[${intPsychTheme.accent}]`}
        />
      );
    default:
      return (
        <Cloud
          {...iconProps}
          className={`w-6 h-6 text-[${intPsychTheme.accent}]`}
        />
      );
  }
}

export default function WeatherWidget({ weather }: WeatherWidgetProps) {
  if (!weather) {
    return null;
  }

  return (
    <div
      className={`flex items-center gap-3 rounded-xl px-5 py-3 bg-white border-b-4 border-[${sigmundTheme.border}] shadow-sm hover:translate-y-[-1px] transition-transform ${dm_sans.className}`}
    >
      <div className={`bg-[${sigmundTheme.background}] p-2 rounded-lg`}>
        {getWeatherIcon(weather.icon)}
      </div>
      <div className="flex flex-col">
        <span
          style={{ color: sigmundTheme.secondaryDark }}
          className={`font-bold text-lg leading-none ${dm_serif.className}`}
        >
          {weather.temp}°F
        </span>
        <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
          {weather.condition.toLowerCase()}
        </span>
      </div>
    </div>
  );
}
