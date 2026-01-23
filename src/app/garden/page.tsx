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
import { intPsychTheme, sigmundTheme } from "../components/theme";

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
  gridX: number; // Column index (0-8)
  gridY: number; // Row index (0-4)
  localX: number; // Offset X within the cell (0-1 percentage)
  localY: number; // Offset Y within the cell (0-1 percentage)
  rotation: number;
  scale: number;
  // For smooth dragging visualization
  visualX?: number;
  visualY?: number;
  isDragging?: boolean;
};

type InteractionState = {
  type: "move" | "rotate" | "scale";
  flowerId: number;
  startX: number;
  startY: number;
  initialGridX: number;
  initialGridY: number;
  initialLocalX: number;
  initialLocalY: number;
  initialRotation: number;
  initialScale: number;
  // For move specific
  currentVisualX?: number;
  currentVisualY?: number;
  originalArrayIndex?: number; // Store original position to restore later
} | null;

export default function GardenBuilder() {
  const { data: session } = useSession();
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("flowers");
  const [showLayersMenu, setShowLayersMenu] = useState(false);
  const [hoveredCell, setHoveredCell] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const { draggedType, handleDragStart, setDraggedType } = useDragDrop();

  // Transformation Interaction State
  const [interaction, setInteraction] = useState<InteractionState>(null);
  const gardenRef = useRef<HTMLDivElement>(null);
  // Ref to store rect during drag to avoid layout thrashing
  const gardenRectRef = useRef<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);

  const GRID_ROWS = 5;
  const GRID_COLS = 9;

  // --- Font Import ---
  const FontStyle = () => (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap');
      .font-serif-display { font-family: 'DM Serif Display', serif; }
    `}</style>
  );

  // --- Actions ---

  const getGridCoordinates = (clientX: number, clientY: number) => {
    if (!gardenRef.current) return null;
    const rect = gardenRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const colWidth = rect.width / GRID_COLS;
    const rowHeight = rect.height / GRID_ROWS;

    const gridX = Math.floor(x / colWidth);
    const gridY = Math.floor(y / rowHeight);

    return { gridX, gridY, x, y, colWidth, rowHeight };
  };

  const getCellPlantCount = (gx: number, gy: number, excludeId?: number) => {
    return flowers.filter(
      (f) => f.gridX === gx && f.gridY === gy && f.id !== excludeId
    ).length;
  };

  const canPlaceInCell = (gx: number, gy: number, excludeId?: number) => {
    return getCellPlantCount(gx, gy, excludeId) < 3;
  };

  const addFlower = (e: React.DragEvent) => {
    if (!draggedType || !gardenRef.current) return;
    e.preventDefault();

    const coords = getGridCoordinates(e.clientX, e.clientY);
    if (!coords) return;
    const { gridX, gridY, x, y, colWidth, rowHeight } = coords;

    if (gridX < 0 || gridX >= GRID_COLS || gridY < 0 || gridY >= GRID_ROWS)
      return;
    if (!canPlaceInCell(gridX, gridY)) return;

    // Calculate offset relative to cell
    let localX = (x % colWidth) / colWidth;
    let localY = (y % rowHeight) / rowHeight;

    // Clamp
    localX = Math.max(0.1, Math.min(0.9, localX));
    localY = Math.max(0.1, Math.min(0.9, localY));

    const newFlower: Flower = {
      id: Date.now(),
      type: draggedType,
      gridX,
      gridY,
      localX,
      localY,
      scale: 0.8, // Slightly smaller to fit nicely
      rotation: 0,
    };

    setFlowers((prev) => [...prev, newFlower]);
    setSelectedId(newFlower.id);
    setShowLayersMenu(false);
    setDraggedType(null);
    setHoveredCell(null);
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
    // With the grid, reordering visual z-index might just be array order
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

    // Don't start interaction if clicking on a control button
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest('[role="button"]')) {
      return;
    }

    const flower = flowers.find((f) => f.id === id);
    if (!flower || !gardenRef.current) return;

    if (selectedId !== id) setShowLayersMenu(false);
    setSelectedId(id);

    const rect = gardenRef.current.getBoundingClientRect();
    const colWidth = rect.width / GRID_COLS;
    const rowHeight = rect.height / GRID_ROWS;

    // Calculate current visual center from grid + local
    const currentCenterX = (flower.gridX + flower.localX) * colWidth;
    const currentCenterY = (flower.gridY + flower.localY) * rowHeight;

    // Store original array index for restoration
    const originalIndex = flowers.findIndex((f) => f.id === id);

    setInteraction({
      type: actionType,
      flowerId: id,
      startX: e.clientX,
      startY: e.clientY,
      initialGridX: flower.gridX,
      initialGridY: flower.gridY,
      initialLocalX: flower.localX,
      initialLocalY: flower.localY,
      initialRotation: flower.rotation,
      initialScale: flower.scale,
      currentVisualX: currentCenterX,
      currentVisualY: currentCenterY,
      originalArrayIndex: originalIndex,
    });

    // If moving, mark dragging state and bring to front
    if (actionType === "move") {
      setFlowers((prev) => {
        // Find the flower and move it to the end of the array (front)
        const flowerIndex = prev.findIndex((f) => f.id === id);
        if (flowerIndex === -1) return prev;

        const newArr = [...prev];
        const [flowerToMove] = newArr.splice(flowerIndex, 1);
        newArr.push({
          ...flowerToMove,
          isDragging: true,
          visualX: currentCenterX,
          visualY: currentCenterY,
        });

        return newArr;
      });
    }
  };

  const handleBackgroundMouseDown = (e: React.MouseEvent) => {
    // Allow clearing selection if clicking on grid background
    // But check if it's not a flower
    if (
      e.target === gardenRef.current ||
      (e.target as HTMLElement).closest(".garden-background-elements")
    ) {
      setSelectedId(null);
      setShowLayersMenu(false);
    }
  };

  useEffect(() => {
    let rafId: number | null = null;
    let pendingUpdate = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!interaction || !gardenRef.current) return;

      // Store latest mouse position
      latestMousePosRef.current = { clientX: e.clientX, clientY: e.clientY };

      const {
        type,
        flowerId,
        startX,
        startY,
        initialRotation,
        initialScale,
        currentVisualX,
        currentVisualY,
      } = interaction;

      // Track hovered cell during drag (update immediately for responsiveness)
      if (type === "move" && gardenRef.current) {
        const rect = gardenRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const colWidth = rect.width / GRID_COLS;
        const rowHeight = rect.height / GRID_ROWS;
        const gridX = Math.floor(x / colWidth);
        const gridY = Math.floor(y / rowHeight);

        if (
          gridX >= 0 &&
          gridX < GRID_COLS &&
          gridY >= 0 &&
          gridY < GRID_ROWS
        ) {
          setHoveredCell({ x: gridX, y: gridY });
        } else {
          setHoveredCell(null);
        }
      }

      // Batch state updates using requestAnimationFrame for smooth 60fps
      if (!pendingUpdate) {
        pendingUpdate = true;
        rafId = requestAnimationFrame(() => {
          if (!latestMousePosRef.current) {
            pendingUpdate = false;
            return;
          }

          const deltaX = latestMousePosRef.current.clientX - startX;
          const deltaY = latestMousePosRef.current.clientY - startY;

          setFlowers((prev) =>
            prev.map((f) => {
              if (f.id !== flowerId) return f;
              if (type === "move") {
                return {
                  ...f,
                  visualX: (currentVisualX || 0) + deltaX,
                  visualY: (currentVisualY || 0) + deltaY,
                };
              }
              if (type === "rotate") {
                return {
                  ...f,
                  rotation: initialRotation + deltaX * 0.5,
                };
              }
              if (type === "scale") {
                return {
                  ...f,
                  scale: Math.max(
                    0.3,
                    Math.min(1.5, initialScale + deltaX * 0.01)
                  ),
                };
              }
              return f;
            })
          );
          pendingUpdate = false;
        });
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (!interaction || !gardenRef.current) return;

      const {
        type,
        flowerId,
        startX,
        startY,
        initialGridX,
        initialGridY,
        initialLocalX,
        initialLocalY,
        originalArrayIndex,
      } = interaction;

      if (type === "move") {
        // Check if mouse moved significantly (more than 5px) - if not, it was just a click
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        const movementDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const MOVEMENT_THRESHOLD = 5; // pixels

        // If movement was too small, just cancel the interaction without updating position
        if (movementDistance < MOVEMENT_THRESHOLD) {
          setFlowers((prev) => {
            // Restore flower to original array position
            const currentIndex = prev.findIndex((f) => f.id === flowerId);
            if (currentIndex === -1 || originalArrayIndex === undefined) {
              return prev.map((f) =>
                f.id === flowerId
                  ? {
                      ...f,
                      isDragging: false,
                      visualX: undefined,
                      visualY: undefined,
                    }
                  : f
              );
            }

            const newArr = [...prev];
            const [flowerToRestore] = newArr.splice(currentIndex, 1);
            newArr.splice(originalArrayIndex, 0, {
              ...flowerToRestore,
              isDragging: false,
              visualX: undefined,
              visualY: undefined,
            });
            return newArr;
          });
          setInteraction(null);
          setHoveredCell(null);
          return;
        }

        const rect = gardenRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const colWidth = rect.width / GRID_COLS;
        const rowHeight = rect.height / GRID_ROWS;

        // Calculate Grid Coordinates
        const gridX = Math.floor(x / colWidth);
        const gridY = Math.floor(y / rowHeight);

        // Calculate Local Coordinates (constrained to cell)
        // We allow placing anywhere in the cell
        let localX = (x % colWidth) / colWidth;
        let localY = (y % rowHeight) / rowHeight;

        // Clamp local coordinates to be inside the cell (with some padding perhaps?)
        localX = Math.max(0.1, Math.min(0.9, localX));
        localY = Math.max(0.1, Math.min(0.9, localY));

        const valid =
          gridX >= 0 && gridX < GRID_COLS && gridY >= 0 && gridY < GRID_ROWS;
        const plantCount = flowersRef.current.filter(
          (f) => f.gridX === gridX && f.gridY === gridY && f.id !== flowerId
        ).length;
        const canPlace = plantCount < 3;

        if (valid && canPlace) {
          setFlowers((prev) => {
            // Update position and restore to original array index
            const currentIndex = prev.findIndex((f) => f.id === flowerId);
            if (currentIndex === -1 || originalArrayIndex === undefined) {
              return prev.map((f) =>
                f.id === flowerId
                  ? {
                      ...f,
                      gridX,
                      gridY,
                      localX,
                      localY,
                      isDragging: false,
                      visualX: undefined,
                      visualY: undefined,
                    }
                  : f
              );
            }

            const newArr = [...prev];
            const [flowerToUpdate] = newArr.splice(currentIndex, 1);
            const updatedFlower = {
              ...flowerToUpdate,
              gridX,
              gridY,
              localX,
              localY,
              isDragging: false,
              visualX: undefined,
              visualY: undefined,
            };
            newArr.splice(originalArrayIndex, 0, updatedFlower);
            return newArr;
          });
        } else {
          // Revert position and restore to original array index
          setFlowers((prev) => {
            const currentIndex = prev.findIndex((f) => f.id === flowerId);
            if (currentIndex === -1 || originalArrayIndex === undefined) {
              return prev.map((f) =>
                f.id === flowerId
                  ? {
                      ...f,
                      gridX: initialGridX,
                      gridY: initialGridY,
                      localX: initialLocalX,
                      localY: initialLocalY,
                      isDragging: false,
                      visualX: undefined,
                      visualY: undefined,
                    }
                  : f
              );
            }

            const newArr = [...prev];
            const [flowerToRestore] = newArr.splice(currentIndex, 1);
            newArr.splice(originalArrayIndex, 0, {
              ...flowerToRestore,
              gridX: initialGridX,
              gridY: initialGridY,
              localX: initialLocalX,
              localY: initialLocalY,
              isDragging: false,
              visualX: undefined,
              visualY: undefined,
            });
            return newArr;
          });
        }
      } else {
        // Just clear interaction state for rotate/scale
        setFlowers((prev) =>
          prev.map((f) => (f.id === flowerId ? { ...f, isDragging: false } : f))
        );
      }
      setInteraction(null);
      setHoveredCell(null);
    };

    if (interaction) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };
  }, [interaction]); // Removed flowers dependency, using ref

  const flowersRef = useRef(flowers);
  const latestMousePosRef = useRef<{ clientX: number; clientY: number } | null>(
    null
  );

  useEffect(() => {
    flowersRef.current = flowers;
  }, [flowers]);

  // --- HOISTED LAYER MENU RENDERING ---
  const renderHoistedMenu = () => {
    if (!showLayersMenu || !selectedId || !gardenRef.current) return null;
    const flower = flowers.find((f) => f.id === selectedId);
    if (!flower) return null;

    let x, y;
    if (flower.visualX !== undefined && flower.visualY !== undefined) {
      x = flower.visualX;
      y = flower.visualY;
    } else {
      const rect = gardenRef.current.getBoundingClientRect();
      // Calculate position based on grid + local
      const colWidth = rect.width / GRID_COLS;
      const rowHeight = rect.height / GRID_ROWS;
      x = (flower.gridX + flower.localX) * colWidth;
      y = (flower.gridY + flower.localY) * rowHeight;
    }

    // Position to the left of the flower relative to its current visual bounds
    const offsetX = 60 * flower.scale + 20;

    return (
      <div
        className="absolute z-[99999] flex flex-col gap-1 bg-white rounded-xl shadow-[0_4px_0_0_rgba(0,0,0,0.1)] border-2 border-slate-100 p-2 w-44 animate-in fade-in zoom-in-95 duration-100"
        style={{
          left: x - offsetX,
          top: y,
          transform: "translate(-100%, -50%)",
        }}
      >
        <div className="text-[10px] font-bold text-stone-400 px-3 py-1 uppercase tracking-wider">
          Arrangement
        </div>
        <button
          onClick={() => reorderFlower(flower.id, "front")}
          className={`flex items-center gap-2 px-3 py-2 text-xs font-bold text-stone-600 hover:bg-[${intPsychTheme.secondaryLight}] hover:text-[${intPsychTheme.secondary}] rounded-lg transition-colors text-left uppercase tracking-wide`}
        >
          <BringToFront size={14} /> To Front
        </button>
        <button
          onClick={() => reorderFlower(flower.id, "forward")}
          className={`flex items-center gap-2 px-3 py-2 text-xs font-bold text-stone-600 hover:bg-[${intPsychTheme.secondaryLight}] hover:text-[${intPsychTheme.secondary}] rounded-lg transition-colors text-left uppercase tracking-wide`}
        >
          <ChevronUp size={14} /> Forward
        </button>
        <button
          onClick={() => reorderFlower(flower.id, "backward")}
          className={`flex items-center gap-2 px-3 py-2 text-xs font-bold text-stone-600 hover:bg-[${intPsychTheme.secondaryLight}] hover:text-[${intPsychTheme.secondary}] rounded-lg transition-colors text-left uppercase tracking-wide`}
        >
          <ChevronDown size={14} /> Backward
        </button>
        <button
          onClick={() => reorderFlower(flower.id, "back")}
          className={`flex items-center gap-2 px-3 py-2 text-xs font-bold text-stone-600 hover:bg-[${intPsychTheme.secondaryLight}] hover:text-[${intPsychTheme.secondary}] rounded-lg transition-colors text-left uppercase tracking-wide`}
        >
          <SendToBack size={14} /> To Back
        </button>
      </div>
    );
  };

  return (
    <PortalLayout>
      <div
        style={{ backgroundColor: intPsychTheme.background }}
        className={`flex h-full w-full font-sans overflow-hidden text-[#1c1917] select-none ${dm_sans.className}`}
      >
        <FontStyle />

        {/* --- MAIN AREA: GARDEN CANVAS --- */}
        <main className="flex-1 relative flex flex-col bg-[#86efac] order-1 m-4 rounded-[2rem] overflow-hidden shadow-[inset_0_0_40px_rgba(22,101,52,0.2)] border-8 border-[#166534]">
          <header className="absolute top-6 left-6 right-6 flex justify-between items-center pointer-events-none z-30">
            <div
              style={{ borderColor: sigmundTheme.border }}
              className={`bg-white/90 backdrop-blur px-6 py-3 rounded-2xl border shadow-sm`}
            >
              <span className="font-serif-display text-2xl text-[#1c1917]">
                {session?.user?.name?.split(" ")[0]}'s Garden
              </span>
            </div>
            <div
              style={{ borderColor: sigmundTheme.border }}
              className={`bg-white/90 backdrop-blur px-4 py-3 rounded-2xl border shadow-sm text-xs font-bold text-stone-400 tracking-widest uppercase`}
            >
              {flowers.length} Plants
            </div>
          </header>

          {/* Grass Texture Overlay */}
          <div
            className="absolute inset-0 opacity-30 pointer-events-none z-0"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, #bbf7d0 2px, transparent 2px), radial-gradient(circle at 25% 25%, #bbf7d0 2px, transparent 2px)`,
              backgroundSize: "20px 20px",
            }}
          />

          {/* Centered Garden Container with Grass surrounding */}
          <div className="flex-1 flex items-center justify-center p-4 overflow-hidden relative z-10">
            <div
              ref={gardenRef}
              onDragOver={(e) => {
                e.preventDefault();
              }}
              onDrop={addFlower}
              onMouseDown={handleBackgroundMouseDown}
              // Reduced size by 10% to max-w-[85%]
              className="relative w-full max-w-[85%] aspect-[16/9] cursor-default z-10"
            >
              {/* Light brown background wrapper with padding as border */}
              <div className="absolute inset-0 bg-[#d4a574] rounded-3xl p-4 pointer-events-none border-b-9 border-black/10">
                {/* --- GRID BACKGROUND (Separated Tiles) --- */}
                <div className="w-full h-full grid grid-rows-5 grid-cols-9 gap-3 p-2 pointer-events-none">
                  {Array.from({ length: GRID_ROWS * GRID_COLS }).map((_, i) => {
                    const r = Math.floor(i / GRID_COLS);
                    const c = i % GRID_COLS;
                    const isHovered =
                      hoveredCell?.x === c && hoveredCell?.y === r;
                    const isEven = (r + c) % 2 === 0;

                    return (
                      <div
                        key={i}
                        className={`w-full h-full rounded-xl hover:scale-105 transition-all duration-200 shadow-sm border-b-6  border-black/10
                        ${isHovered ? "brightness-110 scale-[1.02] z-10 shadow-md bg-yellow-400/60" : ""}
                        ${isEven ? "bg-[#78503e]" : "bg-[#8d5e49]"}
                      `}
                      >
                        {/* Inner "Hole" or texture */}
                        <div className="w-full h-full flex items-center justify-center opacity-20">
                          <div className="w-2/3 h-2/3 bg-black/20 rounded-full blur-md" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* --- PLANTED ITEMS --- */}
              {flowers.map((flower, index) => {
                const typeDef = ITEMS.find((t) => t.id === flower.type);
                const isSelected = selectedId === flower.id;

                // Determine size based on scale
                const width = 100 * flower.scale;
                const height = 120 * flower.scale;

                // Position
                let left, top;
                if (
                  flower.visualX !== undefined &&
                  flower.visualY !== undefined
                ) {
                  left = `${flower.visualX}px`;
                  top = `${flower.visualY}px`;
                } else {
                  // Percentage based center + local offset
                  const totalGridWidthPercent = 100 / GRID_COLS;
                  const totalGridHeightPercent = 100 / GRID_ROWS;

                  left = `${(flower.gridX + flower.localX) * totalGridWidthPercent}%`;
                  top = `${(flower.gridY + flower.localY) * totalGridHeightPercent}%`;
                }

                // Z-Index calculation based on row, local Y, and position within same tile
                // Find the position of this flower among flowers in the same tile
                const flowersInSameTile = flowers.filter(
                  (f) => f.gridX === flower.gridX && f.gridY === flower.gridY
                );
                const tilePosition = flowersInSameTile
                  .sort((a, b) => {
                    // Sort by array index to maintain order
                    const indexA = flowers.findIndex((f) => f.id === a.id);
                    const indexB = flowers.findIndex((f) => f.id === b.id);
                    return indexA - indexB;
                  })
                  .findIndex((f) => f.id === flower.id);

                // Calculate base z-index for non-dragging flowers
                const baseZIndex =
                  10000 +
                  flower.gridY * 1000 +
                  Math.floor(flower.localY * 100) +
                  tilePosition * 10;

                // When dragging, use a very high z-index to ensure it's always on top
                // Use a value much higher than any possible base z-index
                const zIndex = flower.isDragging ? 999999 : baseZIndex;

                return (
                  <div
                    key={flower.id}
                    className="absolute"
                    style={{
                      left,
                      top,
                      transform: `translate(-50%, -50%) rotate(${flower.rotation}deg)`,
                      width: `${width}px`,
                      height: `${height}px`,
                      zIndex,
                      cursor: interaction ? "grabbing" : "grab",
                      pointerEvents:
                        interaction?.flowerId === flower.id &&
                        interaction.type === "move"
                          ? "none"
                          : "auto",
                      willChange: flower.isDragging
                        ? "transform, left, top"
                        : "auto",
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
                    {isSelected && !flower.isDragging && (
                      <div
                        className={`absolute -inset-4 border-2 border-[${intPsychTheme.accent}] border-dashed rounded-3xl pointer-events-none animate-fade-in bg-[${intPsychTheme.accent}]/10`}
                      >
                        {/* Rotate Handle */}
                        <div
                          className={`absolute -top-10 left-1/2 -translate-x-1/2 h-10 w-0.5 bg-[${intPsychTheme.accent}] flex flex-col justify-start items-center`}
                        >
                          <div
                            className={`w-10 h-10 -mt-5 bg-white rounded-full shadow-md border border-[${intPsychTheme.accent}]/30 flex items-center justify-center cursor-ew-resize pointer-events-auto hover:bg-[#f0fdf4] hover:text-[${intPsychTheme.accent}] hover:scale-110 transition-all`}
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
                            onMouseDown={(e) => e.stopPropagation()}
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
                          className={`absolute -bottom-3 -right-3 w-10 h-10 bg-white rounded-full shadow-md border border-[${intPsychTheme.accent}]/30 flex items-center justify-center cursor-nwse-resize pointer-events-auto hover:bg-[#f0fdf4] hover:scale-110 transition-all`}
                          onMouseDown={(e) =>
                            handleMouseDown(e, flower.id, "scale")
                          }
                          title="Scale"
                        >
                          <Maximize
                            size={18}
                            className={`text-[${intPsychTheme.accent}]`}
                          />
                        </div>

                        {/* Layer Menu Button */}
                        <div className="absolute -left-12 top-1/2 -translate-y-1/2 pointer-events-auto">
                          <button
                            onMouseDown={(e) => {
                              e.stopPropagation();
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowLayersMenu(!showLayersMenu);
                            }}
                            className={`bg-white p-3 rounded-full shadow-md hover:scale-110 transition-all border ${showLayersMenu ? `text-[${intPsychTheme.accent}] border-[${intPsychTheme.accent}] bg-[#f0fdf4]` : `text-stone-500 border-[${sigmundTheme.border}]`}`}
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

              {/* Layer Menu */}
              {renderHoistedMenu()}
            </div>
          </div>
        </main>

        {/* --- RIGHT SIDEBAR: PALETTE --- */}
        <aside
          className={`w-72 flex flex-col z-20 order-2 mr-4 my-4 bg-white rounded-[2rem] border border-[${sigmundTheme.border}] overflow-hidden shadow-sm`}
        >
          {/* Tabs */}
          <div
            className={`flex p-3 gap-2 border-b border-[${sigmundTheme.border}] bg-[${intPsychTheme.background}]`}
          >
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
                  ? `text-[${intPsychTheme.accent}] bg-white shadow-sm border-b-4 border-[${intPsychTheme.accent}] translate-y-[-1px]`
                  : "text-stone-400 hover:text-stone-600 hover:bg-white"
              }`}
            >
              Trees
            </button>
            <button
              onClick={() => setActiveTab("bushes")}
              className={`flex-1 cursor-pointer rounded-xl py-3 text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "bushes"
                  ? `text-[${intPsychTheme.accent}] bg-white shadow-sm border-b-4 border-[${intPsychTheme.accent}] translate-y-[-1px]`
                  : "text-stone-400 hover:text-stone-600 hover:bg-white"
              }`}
            >
              Bushes
            </button>
          </div>

          <div
            className={`flex-1 overflow-y-auto p-8 space-y-6 scrollbar-thin bg-[${intPsychTheme.background}]`}
          >
            {ITEMS.filter((i) => i.category === activeTab).map((item) => {
              return (
                <div
                  key={item.id}
                  draggable
                  onDragStart={() => handleDragStart(item.id)}
                  className="group flex flex-col items-center cursor-grab active:cursor-grabbing"
                >
                  <div
                    className={`w-full aspect-square relative flex items-center justify-center bg-white rounded-2xl border border-[${sigmundTheme.border}] group-hover:scale-105 group-hover:shadow-md transition-all duration-300 p-6`}
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
                    className={`mt-3 text-sm font-medium text-stone-500 group-hover:text-[${intPsychTheme.accent}] transition-colors`}
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
