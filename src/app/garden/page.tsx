"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Trash2,
  RotateCw,
  Maximize,
  BringToFront,
  SendToBack,
  ChevronUp,
  ChevronDown,
  Layers,
  Sprout,
} from "lucide-react";
import PortalLayout from "../components/portal/Layout/PortalLayout";
import { useSession } from "next-auth/react";
import { DM_Sans } from "next/font/google";
import { intPsychTheme } from "../components/theme";

const dm_sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

/* --- ASSETS: Vector Components --- */

// Trees and Bushes stay as SVGs
const TreePine = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 140" className={className} fill="none">
    <defs>
      <linearGradient id="pineGrad" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="#34D399" />
        <stop offset="100%" stopColor="#065F46" />
      </linearGradient>
    </defs>
    {/* Trunk */}
    <rect x="45" y="100" width="10" height="40" fill="#78350F" />
    {/* Layers */}
    <path d="M10 110 L50 20 L90 110 Z" fill="url(#pineGrad)" />
    <path d="M15 80 L50 10 L85 80 Z" fill="url(#pineGrad)" opacity="0.9" />
    <path d="M20 50 L50 0 L80 50 Z" fill="url(#pineGrad)" opacity="0.95" />
  </svg>
);

const TreeOak = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 140" className={className} fill="none">
    <defs>
      <linearGradient id="oakGrad" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="#A3E635" />
        <stop offset="100%" stopColor="#15803d" />
      </linearGradient>
    </defs>
    {/* Trunk */}
    <path d="M40 140 L45 80 L55 80 L60 140 Z" fill="#78350F" />
    <path
      d="M45 80 L30 60"
      stroke="#78350F"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M55 80 L70 65"
      stroke="#78350F"
      strokeWidth="4"
      strokeLinecap="round"
    />
    {/* Foliage Clouds */}
    <circle cx="30" cy="50" r="25" fill="url(#oakGrad)" />
    <circle cx="70" cy="50" r="25" fill="url(#oakGrad)" />
    <circle cx="50" cy="30" r="30" fill="url(#oakGrad)" />
    <circle cx="50" cy="60" r="25" fill="url(#oakGrad)" />
  </svg>
);

const BushRound = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <radialGradient id="bushGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#86EFAC" />
        <stop offset="100%" stopColor="#166534" />
      </radialGradient>
    </defs>
    <circle cx="25" cy="60" r="20" fill="url(#bushGrad)" />
    <circle cx="75" cy="60" r="20" fill="url(#bushGrad)" />
    <circle cx="50" cy="40" r="25" fill="url(#bushGrad)" />
    <circle cx="50" cy="60" r="20" fill="url(#bushGrad)" />
    {/* Berries */}
    <circle cx="30" cy="50" r="3" fill="#EF4444" />
    <circle cx="60" cy="35" r="3" fill="#EF4444" />
    <circle cx="70" cy="65" r="3" fill="#EF4444" />
  </svg>
);

const BushSpiky = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <linearGradient id="spikyGrad" x1="50%" y1="100%" x2="50%" y2="0%">
        <stop offset="0%" stopColor="#064E3B" />
        <stop offset="100%" stopColor="#34D399" />
      </linearGradient>
    </defs>
    <path d="M10 90 L30 20 L50 90 Z" fill="url(#spikyGrad)" />
    <path d="M30 90 L50 30 L70 90 Z" fill="url(#spikyGrad)" />
    <path d="M50 90 L70 20 L90 90 Z" fill="url(#spikyGrad)" />
    <path d="M20 90 L40 50 L60 90 Z" fill="url(#spikyGrad)" />
    <path d="M40 90 L60 50 L80 90 Z" fill="url(#spikyGrad)" />
  </svg>
);

/* --- DATA --- */

// Note: Ensure these images exist in your public/assets/garden/ directory
const ITEMS = [
  // Flowers (Using Images)
  {
    id: "blue",
    category: "flowers",
    type: "image",
    src: "/assets/garden/flower_blue.png", // Placeholder path
    label: "Mystic Blue",
  },
  {
    id: "orange",
    category: "flowers",
    type: "image",
    src: "/assets/garden/flower_orange.png", // Placeholder path
    label: "Sun Cup",
  },
  {
    id: "pink",
    category: "flowers",
    type: "image",
    src: "/assets/garden/flower_pink.png", // Placeholder path
    label: "Fairy Bells",
  },
  {
    id: "cyan",
    category: "flowers",
    type: "image",
    src: "/assets/garden/flower_cyan.png", // Placeholder path
    label: "Star Mint",
  },
  {
    id: "cream",
    category: "flowers",
    type: "image",
    src: "/assets/garden/flower_cream.png", // Placeholder path
    label: "Golden Rose",
  },
  // Trees
  {
    id: "pine",
    category: "trees",
    type: "image",
    src: "/assets/garden/tree_pine.png",
    label: "Alpine Pine",
  },
  {
    id: "elm",
    category: "trees",
    type: "image",
    src: "/assets/garden/tree_elm.png",
    label: "Grand Elm",
  },
  // Bushes
  {
    id: "bush_round",
    category: "bushes",
    type: "component",
    Component: BushRound,
    label: "Berry Bush",
  },
  {
    id: "bush_spiky",
    category: "bushes",
    type: "component",
    Component: BushSpiky,
    label: "Fern Bush",
  },
];

/* --- HELPER HOOKS --- */

function useDragDrop() {
  const [draggedType, setDraggedType] = useState<string | null>(null);
  const handleDragStart = (type: string) => setDraggedType(type);
  return { draggedType, handleDragStart, setDraggedType };
}

/* --- MAIN APP COMPONENT --- */

type Flower = {
  id: number;
  type: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
};

type InteractionState = {
  type: "move" | "rotate" | "scale";
  flowerId: number;
  startX: number;
  startY: number;
  originalX: number;
  originalY: number;
  originalRotation: number;
  originalScale: number;
} | null;

export default function GardenBuilder() {
  const { data: session } = useSession();
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("flowers");
  const [showLayersMenu, setShowLayersMenu] = useState(false);

  const { draggedType, handleDragStart, setDraggedType } = useDragDrop();

  // Transformation Interaction State
  const [interaction, setInteraction] = useState<InteractionState>(null);
  const gardenRef = useRef<HTMLDivElement>(null);

  // --- Font Import ---
  const FontStyle = () => (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap');
      .font-serif-display { font-family: 'DM Serif Display', serif; }
    `}</style>
  );

  // --- Actions ---

  const addFlower = (e: React.DragEvent) => {
    if (!draggedType || !gardenRef.current) return;
    const rect = gardenRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newFlower: Flower = {
      id: Date.now(),
      type: draggedType,
      x: x,
      y: y,
      scale: 1,
      rotation: 0,
    };

    setFlowers((prev) => [...prev, newFlower]);
    setSelectedId(newFlower.id);
    setShowLayersMenu(false);
    setDraggedType(null);
  };

  const deleteFlower = (id: number) => {
    setFlowers(flowers.filter((f) => f.id !== id));
    if (selectedId === id) {
      setSelectedId(null);
      setShowLayersMenu(false);
    }
  };

  const reorderFlower = (
    id: number,
    direction: "front" | "back" | "forward" | "backward"
  ) => {
    setFlowers((prev) => {
      const index = prev.findIndex((f) => f.id === id);
      if (index === -1) return prev;
      const newArr = [...prev];
      const [flower] = newArr.splice(index, 1);
      if (direction === "front") newArr.push(flower);
      else if (direction === "back") newArr.unshift(flower);
      else if (direction === "forward")
        newArr.splice(Math.min(index + 1, newArr.length), 0, flower);
      else if (direction === "backward")
        newArr.splice(Math.max(index - 1, 0), 0, flower);
      return newArr;
    });
    setShowLayersMenu(false);
  };

  // --- Mouse Handlers ---

  const handleMouseDown = (
    e: React.MouseEvent,
    id: number,
    actionType: "move" | "rotate" | "scale"
  ) => {
    e.stopPropagation();

    const flower = flowers.find((f) => f.id === id);
    if (!flower) return;

    if (selectedId !== id) setShowLayersMenu(false);
    setSelectedId(id);

    setInteraction({
      type: actionType,
      flowerId: id,
      startX: e.clientX,
      startY: e.clientY,
      originalX: flower.x,
      originalY: flower.y,
      originalRotation: flower.rotation,
      originalScale: flower.scale,
    });
  };

  const handleBackgroundMouseDown = (e: React.MouseEvent) => {
    if (
      e.target === gardenRef.current ||
      (e.target as HTMLElement).closest(".garden-background-elements")
    ) {
      setSelectedId(null);
      setShowLayersMenu(false);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!interaction) return;
      const {
        type,
        flowerId,
        startX,
        startY,
        originalX,
        originalY,
        originalRotation,
        originalScale,
      } = interaction;

      setFlowers((prev) =>
        prev.map((f) => {
          if (f.id !== flowerId) return f;
          if (type === "move") {
            return {
              ...f,
              x: originalX + (e.clientX - startX),
              y: originalY + (e.clientY - startY),
            };
          }
          if (type === "rotate") {
            return {
              ...f,
              rotation: originalRotation + (e.clientX - startX) * 0.5,
            };
          }
          if (type === "scale") {
            // Limit minimum scale to 0.3
            return {
              ...f,
              scale: Math.max(0.3, originalScale + (e.clientX - startX) * 0.01),
            };
          }
          return f;
        })
      );
    };

    const handleMouseUp = () => setInteraction(null);

    if (interaction) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [interaction]);

  // --- HOISTED LAYER MENU RENDERING ---
  const renderHoistedMenu = () => {
    if (!showLayersMenu || !selectedId) return null;
    const flower = flowers.find((f) => f.id === selectedId);
    if (!flower) return null;

    // Position to the left of the flower relative to its current visual bounds
    const offsetX = 60 * flower.scale + 20;

    return (
      <div
        className="absolute z-[99999] flex flex-col gap-1 bg-white rounded-xl shadow-[0_4px_0_0_rgba(0,0,0,0.1)] border-2 border-slate-100 p-2 w-44 animate-in fade-in zoom-in-95 duration-100"
        style={{
          left: flower.x - offsetX,
          top: flower.y,
          transform: "translate(-100%, -50%)",
        }}
      >
        <div className="text-[10px] font-bold text-stone-400 px-3 py-1 uppercase tracking-wider">
          Arrangement
        </div>
        <button
          onClick={() => reorderFlower(flower.id, "front")}
          className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-stone-600 hover:bg-[#f0fdf4] hover:text-[#15803d] rounded-lg transition-colors text-left uppercase tracking-wide"
        >
          <BringToFront size={14} /> To Front
        </button>
        <button
          onClick={() => reorderFlower(flower.id, "forward")}
          className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-stone-600 hover:bg-[#f0fdf4] hover:text-[#15803d] rounded-lg transition-colors text-left uppercase tracking-wide"
        >
          <ChevronUp size={14} /> Forward
        </button>
        <button
          onClick={() => reorderFlower(flower.id, "backward")}
          className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-stone-600 hover:bg-[#f0fdf4] hover:text-[#15803d] rounded-lg transition-colors text-left uppercase tracking-wide"
        >
          <ChevronDown size={14} /> Backward
        </button>
        <button
          onClick={() => reorderFlower(flower.id, "back")}
          className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-stone-600 hover:bg-[#f0fdf4] hover:text-[#15803d] rounded-lg transition-colors text-left uppercase tracking-wide"
        >
          <SendToBack size={14} /> To Back
        </button>
      </div>
    );
  };

  return (
    <PortalLayout>
      <div
        className={`flex h-full w-full bg-[#f8fafc] font-sans overflow-hidden text-[#1c1917] select-none ${dm_sans.className}`}
      >
        <FontStyle />

        {/* --- MAIN AREA: GARDEN CANVAS --- */}
        <main className="flex-1 relative flex flex-col bg-[#e0f2fe] order-1 m-4 rounded-[2rem] overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] border-4 border-white/50">
          <header className="absolute top-6 left-6 right-6 flex justify-between items-center pointer-events-none z-30">
            <div className="bg-white/90 backdrop-blur px-6 py-3 rounded-2xl border border-[#e7e5e4] shadow-sm">
              <span className="font-serif-display text-2xl text-[#1c1917]">
                {session?.user?.name?.split(" ")[0]}'s Garden
              </span>
            </div>
            <div className="bg-white/90 backdrop-blur px-4 py-3 rounded-2xl border border-[#e7e5e4] shadow-sm text-xs font-bold text-stone-400 tracking-widest uppercase">
              {flowers.length} Plants
            </div>
          </header>

          <div
            ref={gardenRef}
            onDragOver={(e) => e.preventDefault()}
            onDrop={addFlower}
            onMouseDown={handleBackgroundMouseDown}
            className="flex-1 relative overflow-hidden cursor-default"
          >
            {/* --- GLOBAL HOISTED MENU --- */}
            {renderHoistedMenu()}

            {/* --- BACKGROUND ART --- */}
            <div className="absolute inset-0 pointer-events-none z-0 garden-background-elements">
              <div className="absolute inset-0 bg-gradient-to-b from-[#e0f2fe] via-[#f0f9ff] to-[#fdfbf7]" />
              <div
                className="absolute inset-0 opacity-20 mix-blend-multiply"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E")`,
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 h-[45%] w-full">
                <svg
                  className="absolute inset-0 w-full h-full"
                  preserveAspectRatio="none"
                  viewBox="0 0 1200 450"
                >
                  <defs>
                    <linearGradient
                      id="dirtBack"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#78350F" />
                      <stop offset="100%" stopColor="#451a03" />
                    </linearGradient>
                    <linearGradient
                      id="dirtMid"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#92400e" />
                      <stop offset="100%" stopColor="#78350F" />
                    </linearGradient>
                    <linearGradient
                      id="dirtFront"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#b45309" />
                      <stop offset="100%" stopColor="#92400e" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,180 Q300,120 600,200 T1200,150 L1200,450 L0,450 Z"
                    fill="url(#dirtBack)"
                  />
                  <path
                    d="M0,250 Q400,180 800,280 T1200,230 L1200,450 L0,450 Z"
                    fill="url(#dirtMid)"
                  />
                  <path
                    d="M0,330 Q500,230 1200,350 L1200,450 L0,450 Z"
                    fill="url(#dirtFront)"
                  />
                </svg>
              </div>
            </div>

            {/* --- PLANTED ITEMS --- */}
            {flowers.map((flower, index) => {
              const typeDef = ITEMS.find((t) => t.id === flower.type);
              const isSelected = selectedId === flower.id;
              const zIndex = index + 10;

              // Determine size based on scale
              const width = 120 * flower.scale;
              const height = 140 * flower.scale;

              return (
                <div
                  key={flower.id}
                  className="absolute"
                  style={{
                    left: flower.x,
                    top: flower.y,
                    // IMPORTANT: We only rotate here, scale is handled by width/height
                    transform: `translate(-50%, -50%) rotate(${flower.rotation}deg)`,
                    width: `${width}px`,
                    height: `${height}px`,
                    zIndex: zIndex,
                    cursor: interaction ? "grabbing" : "grab",
                  }}
                  onMouseDown={(e) => handleMouseDown(e, flower.id, "move")}
                >
                  {typeDef?.type === "image" && typeDef.src ? (
                    <img
                      src={typeDef.src}
                      alt={typeDef.label}
                      className="w-full h-full object-contain drop-shadow-xl pointer-events-none select-none"
                      draggable={false}
                    />
                  ) : typeDef?.Component ? (
                    <typeDef.Component className="w-full h-full drop-shadow-xl pointer-events-none" />
                  ) : null}

                  {/* Selection UI */}
                  {isSelected && (
                    <div className="absolute -inset-4 border-2 border-[#15803d] border-dashed rounded-3xl pointer-events-none animate-fade-in bg-[#15803d]/10">
                      {/* Rotate Handle */}
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 h-10 w-0.5 bg-[#15803d] flex flex-col justify-start items-center">
                        <div
                          className="w-10 h-10 -mt-5 bg-white rounded-full shadow-md border border-[#15803d]/30 flex items-center justify-center cursor-ew-resize pointer-events-auto hover:bg-[#f0fdf4] hover:text-[#15803d] hover:scale-110 transition-all"
                          onMouseDown={(e) =>
                            handleMouseDown(e, flower.id, "rotate")
                          }
                          title="Rotate"
                        >
                          <RotateCw size={20} className="text-stone-600" />
                        </div>
                      </div>

                      {/* Trash */}
                      <div className="absolute -top-5 -right-12 pointer-events-auto">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteFlower(flower.id);
                          }}
                          className="bg-white p-3 rounded-full shadow-md text-red-500 hover:bg-red-50 hover:scale-110 transition-all border border-red-200"
                          title="Remove"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>

                      {/* Scale Handle */}
                      <div
                        className="absolute -bottom-3 -right-3 w-10 h-10 bg-white rounded-full shadow-md border border-[#15803d]/30 flex items-center justify-center cursor-nwse-resize pointer-events-auto hover:bg-[#f0fdf4] hover:scale-110 transition-all"
                        onMouseDown={(e) =>
                          handleMouseDown(e, flower.id, "scale")
                        }
                        title="Scale"
                      >
                        <Maximize size={18} className="text-[#15803d]" />
                      </div>

                      {/* Layer Menu Button */}
                      <div className="absolute -left-12 top-1/2 -translate-y-1/2 pointer-events-auto">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowLayersMenu(!showLayersMenu);
                          }}
                          className={`bg-white p-3 rounded-full shadow-md hover:scale-110 transition-all border ${showLayersMenu ? "text-[#15803d] border-[#15803d] bg-[#f0fdf4]" : "text-stone-500 border-[#e7e5e4]"}`}
                          title="Layers"
                        >
                          <Layers size={20} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {flowers.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 z-10">
                <div className="text-center bg-white/50 backdrop-blur-sm p-8 rounded-[2rem] shadow-sm border border-white/60">
                  <Sprout size={64} className="mx-auto mb-4 text-stone-400" />
                  <p className="text-xl font-serif-display text-stone-600">
                    Your sanctuary awaits
                  </p>
                  <p className="text-sm font-bold text-stone-400 mt-2 uppercase tracking-wider">
                    Drag plants here
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* --- RIGHT SIDEBAR: PALETTE --- */}
        <aside className="w-72 flex flex-col z-20 order-2 mr-4 my-4 bg-white rounded-[2rem] border border-[#e7e5e4] overflow-hidden shadow-sm">
          {/* Tabs */}
          <div className="flex p-3 gap-2 border-b border-[#e7e5e4] bg-[#f8fafc]">
            <button
              onClick={() => setActiveTab("flowers")}
              style={{
                color:
                  activeTab === "flowers" ? intPsychTheme.accent : undefined,
                borderColor:
                  activeTab === "flowers" ? intPsychTheme.accent : undefined,
              }}
              className={`flex-1 cursor-pointer rounded-xl py-3 text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "flowers"
                  ? "bg-white shadow-sm border-b-4 translate-y-[-1px]"
                  : "text-stone-400 hover:text-stone-600 hover:bg-white"
              }`}
            >
              Flowers
            </button>
            <button
              onClick={() => setActiveTab("trees")}
              className={`flex-1 cursor-pointer rounded-xl py-3 text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "trees"
                  ? "text-[#15803d] bg-white shadow-sm border-b-4 border-[#15803d] translate-y-[-1px]"
                  : "text-stone-400 hover:text-stone-600 hover:bg-white"
              }`}
            >
              Trees
            </button>
            <button
              onClick={() => setActiveTab("bushes")}
              className={`flex-1 cursor-pointer rounded-xl py-3 text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "bushes"
                  ? "text-[#4d7c0f] bg-white shadow-sm border-b-4 border-[#4d7c0f] translate-y-[-1px]"
                  : "text-stone-400 hover:text-stone-600 hover:bg-white"
              }`}
            >
              Bushes
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-thin bg-[#f8fafc]">
            {ITEMS.filter((i) => i.category === activeTab).map((item) => {
              return (
                <div
                  key={item.id}
                  draggable
                  onDragStart={() => handleDragStart(item.id)}
                  className="group flex flex-col items-center cursor-grab active:cursor-grabbing"
                >
                  <div
                    className="w-full aspect-square relative flex items-center justify-center bg-white rounded-2xl border border-[#e7e5e4] group-hover:scale-105 group-hover:shadow-md transition-all duration-300 p-6"
                    style={{
                      borderColor: undefined, // handled by hover
                    }}
                  >
                    {item.type === "image" && item.src ? (
                      <img
                        src={item.src}
                        alt={item.label}
                        className="w-full h-full object-contain drop-shadow-md transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110"
                        draggable={false}
                      />
                    ) : (
                      item.Component && (
                        <item.Component className="w-full h-full drop-shadow-md transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110" />
                      )
                    )}
                  </div>
                  <span
                    style={{ color: undefined }}
                    className="mt-3 text-sm font-medium text-stone-500 group-hover:text-[#0072ce] transition-colors"
                  >
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </aside>
      </div>
    </PortalLayout>
  );
}
