import FlowerCluster from "./FlowerCluster";

export default function MeadowRow({
  count = 8,
  flip = false,
  scale = 1,
  colors = ["#f43f5e", "#e11d48", "#fb7185"],
}: {
  count?: number;
  flip?: boolean;
  scale?: number;
  colors?: string[];
}) {
  // Evenly distribute clusters across a responsive row
  return (
    <div
      className="pointer-events-none w-full grid"
      style={{
        gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))`,
        transform: `scale(${scale})`,
      }}
      aria-hidden
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`garden-sway ${
            i % 2 ? "sway-fast" : "sway-slow"
          } flex items-end justify-center ${
            flip && i % 2 ? "scale-x-[-1]" : ""
          }`}
          style={{ animationDelay: `${(i % 6) * 0.3}s` }}
        >
          <FlowerCluster colors={colors} flip={flip && i % 2 === 0} />
        </div>
      ))}
    </div>
  );
}
