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
  compact?: boolean;
}

export function getWeatherIcon(iconName: string, compact: boolean = false) {
  const size = compact ? "w-5 h-5" : "w-7 h-7";
  const iconProps = { className: size };
  switch (iconName) {
    case "sun":
      return <Sun {...iconProps} />;
    case "cloud":
      return <Cloud {...iconProps} />;
    case "cloud-rain":
      return <CloudRain {...iconProps} />;
    case "cloud-lightning":
      return <CloudLightning {...iconProps} />;
    case "snowflake":
      return <Snowflake {...iconProps} />;
    case "cloud-drizzle":
      return <CloudDrizzle {...iconProps} />;
    default:
      return <Cloud {...iconProps} />;
  }
}

export default function WeatherWidget({
  weather,
  compact = false,
}: WeatherWidgetProps) {
  if (!weather) {
    return null;
  }

  return (
    <div
      className={`flex items-center gap-3 rounded-xl ${
        compact ? "px-3 py-1.5 border" : "px-5 py-3 border-2 border-b-5"
      } bg-white border-[${
        sigmundTheme.border
      }] hover:translate-y-[-1px] transition-transform ${dm_sans.className}`}
    >
      <div style={{ color: sigmundTheme.primary }} className={`p-2 rounded-lg`}>
        {getWeatherIcon(weather.icon, compact)}
      </div>
      <div className="flex flex-col">
        <span
          style={{ color: sigmundTheme.secondaryDark }}
          className={`font-bold leading-none ${dm_serif.className} ${
            compact ? "text-sm" : "text-lg"
          }`}
        >
          {weather.temp}°F
        </span>
        <span
          className={`${
            compact ? "text-[10px]" : "text-xs"
          } font-bold text-stone-400 uppercase tracking-wider`}
        >
          {weather.condition.toLowerCase()}
        </span>
      </div>
    </div>
  );
}
