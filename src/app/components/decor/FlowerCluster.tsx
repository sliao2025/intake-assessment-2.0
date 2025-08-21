

import GrassBlade from "./GrassBlade";
import GardenFlower  from "./GardenFlower";

export default function FlowerCluster({
  colors = ["#f43f5e", "#e11d48", "#fb7185"],
  flip = false,
}: {
  colors?: string[];
  flip?: boolean;
}) {
  const sizes = [22, 26, 30, 24];
  return (
    <div className={`flex items-end gap-2 ${flip ? "scale-x-[-1]" : ""}`}>
      <GrassBlade h={42} bend={8} />
      <GardenFlower size={sizes[0]} color={colors[0]} tilt={-3} />
      <GrassBlade h={26} bend={8} />
      <GardenFlower size={sizes[2]} color={colors[4]} tilt={-3} />
      <GrassBlade h={28} bend={4} />
      <GardenFlower size={sizes[2]} color={colors[2]} tilt={2} />
      <GrassBlade h={24} bend={3} />
      <GardenFlower size={sizes[1]} color={colors[1]} tilt={-1} />
    </div>
  );
}
