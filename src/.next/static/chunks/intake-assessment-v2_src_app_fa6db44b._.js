(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/intake-assessment-v2/src/app/components/theme.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ease",
    ()=>ease,
    "praises",
    ()=>praises,
    "theme",
    ()=>theme
]);
const theme = {
    primary: "#16a34a",
    accent: "#84cc16",
    bgSoft: "#f4f7f4",
    card: "#ffffff",
    text: "#0f172a",
    textMuted: "#475569"
};
const ease = [
    0.22,
    1,
    0.36,
    1
];
const praises = [
    "Nice progress!",
    "You're doing great!",
    "Love the detail—keep going!",
    "Halfway there!",
    "Awesome focus!",
    "Great job finishing this section!"
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/intake-assessment-v2/src/app/components/ProgressHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/app/components/theme.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
const ProgressHeader = (param)=>{
    let { step, total, praise, onStepClick, stepTitles, canNext } = param;
    const progress = Math.round((step + 1) / total * 100);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "sticky top-0 z-40 backdrop-blur bg-white/80 border-b border-gray-200",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-4xl px-4 py-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-8 w-8 rounded-xl flex items-center justify-center",
                                    style: {
                                        background: __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].primary
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                        className: "h-4 w-4 text-white"
                                    }, void 0, false, {
                                        fileName: "[project]/intake-assessment-v2/src/app/components/ProgressHeader.tsx",
                                        lineNumber: 36,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/intake-assessment-v2/src/app/components/ProgressHeader.tsx",
                                    lineNumber: 32,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-semibold font-serif",
                                    style: {
                                        color: __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].text
                                    },
                                    children: "Assessment"
                                }, void 0, false, {
                                    fileName: "[project]/intake-assessment-v2/src/app/components/ProgressHeader.tsx",
                                    lineNumber: 38,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/intake-assessment-v2/src/app/components/ProgressHeader.tsx",
                            lineNumber: 31,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        praise && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                y: -10,
                                opacity: 0
                            },
                            animate: {
                                y: 0,
                                opacity: 1
                            },
                            exit: {
                                y: -10,
                                opacity: 0
                            },
                            className: "hidden md:flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium bg-green-100 text-green-700",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/intake-assessment-v2/src/app/components/ProgressHeader.tsx",
                                    lineNumber: 53,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                " ",
                                praise
                            ]
                        }, void 0, true, {
                            fileName: "[project]/intake-assessment-v2/src/app/components/ProgressHeader.tsx",
                            lineNumber: 47,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/intake-assessment-v2/src/app/components/ProgressHeader.tsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-3 flex items-center gap-3 overflow-x-auto text-sm",
                    children: stepTitles.map((title, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-1 cursor-pointer ".concat(i === step ? "font-semibold text-green-700" : "text-gray-500"),
                            onClick: ()=>{
                                const isBackOrCurrent = i <= step;
                                const isForwardAllowed = i > step && canNext;
                                if (isBackOrCurrent || isForwardAllowed) {
                                    onStepClick(i);
                                }
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-2 w-2 rounded-full ".concat(i <= step ? "bg-green-600" : "bg-gray-300")
                                }, void 0, false, {
                                    fileName: "[project]/intake-assessment-v2/src/app/components/ProgressHeader.tsx",
                                    lineNumber: 73,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                " ",
                                title
                            ]
                        }, title, true, {
                            fileName: "[project]/intake-assessment-v2/src/app/components/ProgressHeader.tsx",
                            lineNumber: 60,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)))
                }, void 0, false, {
                    fileName: "[project]/intake-assessment-v2/src/app/components/ProgressHeader.tsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-200",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "h-2",
                        style: {
                            background: "linear-gradient(90deg, ".concat(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].primary, ", ").concat(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].accent, ")")
                        },
                        initial: {
                            width: 0
                        },
                        animate: {
                            width: "".concat(progress, "%")
                        },
                        transition: {
                            duration: 0.6,
                            ease: __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ease"]
                        }
                    }, void 0, false, {
                        fileName: "[project]/intake-assessment-v2/src/app/components/ProgressHeader.tsx",
                        lineNumber: 84,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/intake-assessment-v2/src/app/components/ProgressHeader.tsx",
                    lineNumber: 83,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/intake-assessment-v2/src/app/components/ProgressHeader.tsx",
            lineNumber: 29,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/intake-assessment-v2/src/app/components/ProgressHeader.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = ProgressHeader;
const __TURBOPACK__default__export__ = ProgressHeader;
var _c;
__turbopack_context__.k.register(_c, "ProgressHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/intake-assessment-v2/src/app/components/ConfettiBurst.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/app/components/theme.ts [app-client] (ecmascript)");
"use client";
;
;
;
const ConfettiBurst = (param)=>{
    let { show } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: show && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0
            },
            animate: {
                opacity: 1
            },
            exit: {
                opacity: 0
            },
            transition: {
                duration: 0.4
            },
            className: "pointer-events-none fixed inset-0 z-50 overflow-hidden",
            children: Array.from({
                length: 24
            }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        x: Math.random() * window.innerWidth,
                        y: window.innerHeight + 40,
                        rotate: 0
                    },
                    animate: {
                        y: -60 - Math.random() * 200,
                        rotate: 360 * (Math.random() > 0.5 ? 1 : -1)
                    },
                    transition: {
                        duration: 1.2 + Math.random() * 0.8,
                        ease: __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ease"]
                    },
                    className: "absolute text-2xl",
                    children: Math.random() > 0.5 ? "✨" : "🌿"
                }, i, false, {
                    fileName: "[project]/intake-assessment-v2/src/app/components/ConfettiBurst.tsx",
                    lineNumber: 18,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)))
        }, void 0, false, {
            fileName: "[project]/intake-assessment-v2/src/app/components/ConfettiBurst.tsx",
            lineNumber: 10,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/intake-assessment-v2/src/app/components/ConfettiBurst.tsx",
        lineNumber: 8,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
};
_c = ConfettiBurst;
const __TURBOPACK__default__export__ = ConfettiBurst;
var _c;
__turbopack_context__.k.register(_c, "ConfettiBurst");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/intake-assessment-v2/src/app/components/StepTitle.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/app/components/theme.ts [app-client] (ecmascript)");
"use client";
;
;
const StepTitle = (param)=>{
    let { n, title } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold",
                style: {
                    background: __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].accent,
                    color: "white"
                },
                children: n
            }, void 0, false, {
                fileName: "[project]/intake-assessment-v2/src/app/components/StepTitle.tsx",
                lineNumber: 8,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-2xl font-serif",
                style: {
                    color: __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].text
                },
                children: title
            }, void 0, false, {
                fileName: "[project]/intake-assessment-v2/src/app/components/StepTitle.tsx",
                lineNumber: 14,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/intake-assessment-v2/src/app/components/StepTitle.tsx",
        lineNumber: 7,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
};
_c = StepTitle;
const __TURBOPACK__default__export__ = StepTitle;
var _c;
__turbopack_context__.k.register(_c, "StepTitle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>VoiceRecorder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/node_modules/lucide-react/dist/esm/icons/mic.js [app-client] (ecmascript) <export default as Mic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/node_modules/lucide-react/dist/esm/icons/square.js [app-client] (ecmascript) <export default as Square>");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/node_modules/lucide-react/dist/esm/icons/pause.js [app-client] (ecmascript) <export default as Pause>");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
;
const theme = {
    primary: "#16a34a",
    accent: "#84cc16"
};
function useRecorder() {
    _s();
    const mediaRecorderRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const chunksRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const [recording, setRecording] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [permissionError, setPermissionError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [audioURL, setAudioURL] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [elapsed, setElapsed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const timerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const start = async ()=>{
        setPermissionError(null);
        setAudioURL(null);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true
            });
            const mr = new MediaRecorder(stream);
            chunksRef.current = [];
            mr.ondataavailable = (e)=>{
                if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
            };
            mr.onstop = ()=>{
                const blob = new Blob(chunksRef.current, {
                    type: "audio/webm"
                });
                setAudioURL(URL.createObjectURL(blob));
                chunksRef.current = [];
                stream.getTracks().forEach((t)=>t.stop());
            };
            mediaRecorderRef.current = mr;
            mr.start();
            setRecording(true);
            setElapsed(0);
            timerRef.current = window.setInterval(()=>setElapsed((s)=>s + 1), 1000);
        } catch (err) {
            setPermissionError((err === null || err === void 0 ? void 0 : err.message) || "Microphone not available.");
        }
    };
    const stop = ()=>{
        var _mediaRecorderRef_current;
        (_mediaRecorderRef_current = mediaRecorderRef.current) === null || _mediaRecorderRef_current === void 0 ? void 0 : _mediaRecorderRef_current.stop();
        setRecording(false);
        if (timerRef.current) window.clearInterval(timerRef.current);
    };
    const reset = ()=>{
        setAudioURL(null);
        setElapsed(0);
    };
    return {
        start,
        stop,
        reset,
        recording,
        permissionError,
        audioURL,
        elapsed
    };
}
_s(useRecorder, "fnfWe1Slnv66ZviEBnMLtXlx5ZI=");
function VoiceRecorder(param) {
    let { onAttach, label = "Record a quick answer (optional)" } = param;
    _s1();
    const { start, stop, reset, recording, permissionError, audioURL, elapsed } = useRecorder();
    const [playing, setPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const audioRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rafRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const audioCtxRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const analyserRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VoiceRecorder.useEffect": ()=>{
            if (onAttach) onAttach(audioURL || null);
        }
    }["VoiceRecorder.useEffect"], [
        audioURL
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VoiceRecorder.useEffect": ()=>{
            const a = audioRef.current;
            if (!a) return;
            const onEnd = {
                "VoiceRecorder.useEffect.onEnd": ()=>setPlaying(false)
            }["VoiceRecorder.useEffect.onEnd"];
            a.addEventListener("ended", onEnd);
            return ({
                "VoiceRecorder.useEffect": ()=>a.removeEventListener("ended", onEnd)
            })["VoiceRecorder.useEffect"];
        }
    }["VoiceRecorder.useEffect"], []);
    const mmss = (s)=>"".concat(String(Math.floor(s / 60)).padStart(2, "0"), ":").concat(String(s % 60).padStart(2, "0"));
    const startVisualizer = (stream)=>{
        stopVisualizer();
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 128;
        analyser.smoothingTimeConstant = 0.7;
        const src = audioCtx.createMediaStreamSource(stream);
        src.connect(analyser);
        audioCtxRef.current = audioCtx;
        analyserRef.current = analyser;
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        const draw = ()=>{
            rafRef.current = requestAnimationFrame(draw);
            const canvas = canvasRef.current;
            const wrap = canvasRef.current;
            if (!canvas || !wrap) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            analyser.getByteFrequencyData(dataArray);
            const w = wrap.clientWidth;
            const h = wrap.clientHeight;
            ctx.clearRect(0, 0, w, h);
            const bars = 96;
            const step = Math.floor(dataArray.length / bars);
            const barWidth = Math.max(2, (w - (bars - 1) * 3) / bars);
            for(let i = 0; i < bars; i++){
                const v = dataArray[i * step] / 255;
                const barHeight = Math.max(2, v * (h - 6));
                const x = i * (barWidth + 3);
                const y = h - barHeight;
                const grad = ctx.createLinearGradient(0, y, 0, y + barHeight);
                grad.addColorStop(0, theme.accent);
                grad.addColorStop(1, theme.primary);
                ctx.fillStyle = grad;
                ctx.fillRect(x, y, barWidth, barHeight);
                ctx.globalAlpha = 1;
                ctx.fillStyle = "#0f172a";
                ctx.fillRect(x, y + barHeight - 2, barWidth, 2);
                ctx.globalAlpha = 1;
            }
        };
        draw();
    };
    const stopVisualizer = ()=>{
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        if (audioCtxRef.current && audioCtxRef.current.state !== "closed") audioCtxRef.current.close();
        rafRef.current = null;
        audioCtxRef.current = null;
        analyserRef.current = null;
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    };
    const handleStart = async ()=>{
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true
            });
            startVisualizer(stream);
            await start();
        } catch (e) {}
    };
    const handleStop = ()=>{
        stop();
        stopVisualizer();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-2xl border border-slate-300 p-3 md:p-4 bg-slate-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-600 font-medium",
                                children: label
                            }, void 0, false, {
                                fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                                lineNumber: 176,
                                columnNumber: 11
                            }, this),
                            permissionError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-amber-700 mt-1",
                                children: permissionError
                            }, void 0, false, {
                                fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                                lineNumber: 178,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                        lineNumber: 175,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: !recording ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleStart,
                            className: "inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold shadow-sm border border-lime-400",
                            style: {
                                background: theme.accent,
                                color: "white"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                                    lineNumber: 188,
                                    columnNumber: 15
                                }, this),
                                " Record"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                            lineNumber: 183,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleStop,
                            className: "inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold bg-red-600 text-white shadow-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__["Square"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                                    lineNumber: 195,
                                    columnNumber: 15
                                }, this),
                                " Stop"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                            lineNumber: 191,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                        lineNumber: 181,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                lineNumber: 174,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 flex items-center justify-between text-xs text-slate-600",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: recording ? "Recording…" : audioURL ? "Recorded clip" : "No recording yet"
                    }, void 0, false, {
                        fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                        lineNumber: 201,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono",
                        children: mmss(elapsed)
                    }, void 0, false, {
                        fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                        lineNumber: 208,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                lineNumber: 200,
                columnNumber: 7
            }, this),
            recording && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2 h-12 w-full overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                    ref: canvasRef,
                    className: "h-full w-full"
                }, void 0, false, {
                    fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                    lineNumber: 212,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                lineNumber: 211,
                columnNumber: 9
            }, this),
            audioURL && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("audio", {
                        ref: audioRef,
                        src: audioURL
                    }, void 0, false, {
                        fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                        lineNumber: 217,
                        columnNumber: 11
                    }, this),
                    !playing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            var _audioRef_current;
                            setPlaying(true);
                            (_audioRef_current = audioRef.current) === null || _audioRef_current === void 0 ? void 0 : _audioRef_current.play();
                        },
                        className: "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold border border-slate-300 text-slate-800",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                                lineNumber: 226,
                                columnNumber: 15
                            }, this),
                            " Play"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                        lineNumber: 219,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            var _audioRef_current;
                            (_audioRef_current = audioRef.current) === null || _audioRef_current === void 0 ? void 0 : _audioRef_current.pause();
                            setPlaying(false);
                        },
                        className: "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold border border-slate-300 text-slate-800",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__["Pause"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                                lineNumber: 236,
                                columnNumber: 15
                            }, this),
                            " Pause"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                        lineNumber: 229,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            var _audioRef_current;
                            (_audioRef_current = audioRef.current) === null || _audioRef_current === void 0 ? void 0 : _audioRef_current.pause();
                            setPlaying(false);
                            reset();
                            if (onAttach) onAttach(null);
                        },
                        className: "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold border border-slate-300 text-slate-800",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                                lineNumber: 248,
                                columnNumber: 13
                            }, this),
                            " Remove"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                        lineNumber: 239,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                lineNumber: 216,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
        lineNumber: 173,
        columnNumber: 5
    }, this);
}
_s1(VoiceRecorder, "NJ8Z4tbzPcRNE9ExqJ3Vkgrn/GY=", false, function() {
    return [
        useRecorder
    ];
});
_c = VoiceRecorder;
var _c;
__turbopack_context__.k.register(_c, "VoiceRecorder");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/intake-assessment-v2/src/app/components/primitives/Field.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
const Field = (param)=>{
    let { label, required, children } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
        className: "block",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-1 text-sm text-slate-700",
                children: [
                    label,
                    " ",
                    required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-rose-600",
                        children: "*"
                    }, void 0, false, {
                        fileName: "[project]/intake-assessment-v2/src/app/components/primitives/Field.tsx",
                        lineNumber: 12,
                        columnNumber: 28
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/intake-assessment-v2/src/app/components/primitives/Field.tsx",
                lineNumber: 11,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/intake-assessment-v2/src/app/components/primitives/Field.tsx",
        lineNumber: 10,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Field;
const __TURBOPACK__default__export__ = Field;
var _c;
__turbopack_context__.k.register(_c, "Field");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/intake-assessment-v2/src/app/components/primitives/Likert.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/app/components/theme.ts [app-client] (ecmascript)");
"use client";
;
;
const Likert = (param)=>{
    let { id, label, value, onChange } = param;
    const options = [
        {
            key: "0",
            label: "Not at all"
        },
        {
            key: "1",
            label: "Several days"
        },
        {
            key: "2",
            label: "More than half the days"
        },
        {
            key: "3",
            label: "Nearly every day"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-2xl border border-slate-300 p-4 bg-slate-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-slate-800 mb-3",
                children: label
            }, void 0, false, {
                fileName: "[project]/intake-assessment-v2/src/app/components/primitives/Likert.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 sm:grid-cols-4 gap-2",
                children: options.map((o)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onChange(o.key),
                        className: "rounded-xl border px-3 py-2 text-sm transition ".concat(value === o.key ? "border-transparent text-white" : "border-slate-300 text-slate-700 hover:border-slate-400"),
                        style: value === o.key ? {
                            background: "linear-gradient(90deg, ".concat(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].accent, ", ").concat(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].primary, ")")
                        } : {},
                        children: o.label
                    }, o.key, false, {
                        fileName: "[project]/intake-assessment-v2/src/app/components/primitives/Likert.tsx",
                        lineNumber: 25,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/intake-assessment-v2/src/app/components/primitives/Likert.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/intake-assessment-v2/src/app/components/primitives/Likert.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Likert;
const __TURBOPACK__default__export__ = Likert;
var _c;
__turbopack_context__.k.register(_c, "Likert");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/intake-assessment-v2/src/app/components/primitives/ToggleRow.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/app/components/theme.ts [app-client] (ecmascript)");
"use client";
;
;
const ToggleRow = (param)=>{
    let { label, checked, onChange } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: ()=>onChange(!checked),
        className: "flex items-center justify-between rounded-2xl border px-4 py-3 text-left ".concat(checked ? "border-transparent" : "border-slate-300"),
        style: checked ? {
            background: "linear-gradient(90deg, ".concat(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].primary, ", ").concat(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].accent, ")"),
            color: "white"
        } : {
            color: __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].text
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-sm",
                children: label
            }, void 0, false, {
                fileName: "[project]/intake-assessment-v2/src/app/components/primitives/ToggleRow.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "h-5 w-10 rounded-full transition ".concat(checked ? "bg-white/40" : "bg-slate-300"),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "block h-5 w-5 rounded-full bg-white transition ".concat(checked ? "translate-x-5" : "translate-x-0")
                }, void 0, false, {
                    fileName: "[project]/intake-assessment-v2/src/app/components/primitives/ToggleRow.tsx",
                    lineNumber: 33,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/intake-assessment-v2/src/app/components/primitives/ToggleRow.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/intake-assessment-v2/src/app/components/primitives/ToggleRow.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = ToggleRow;
const __TURBOPACK__default__export__ = ToggleRow;
var _c;
__turbopack_context__.k.register(_c, "ToggleRow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/intake-assessment-v2/src/app/components/primitives/ReviewItem.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
const ReviewItem = (param)=>{
    let { label, value } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-slate-600 mb-1",
                children: label
            }, void 0, false, {
                fileName: "[project]/intake-assessment-v2/src/app/components/primitives/ReviewItem.tsx",
                lineNumber: 10,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-slate-900",
                children: value || "—"
            }, void 0, false, {
                fileName: "[project]/intake-assessment-v2/src/app/components/primitives/ReviewItem.tsx",
                lineNumber: 11,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/intake-assessment-v2/src/app/components/primitives/ReviewItem.tsx",
        lineNumber: 9,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
};
_c = ReviewItem;
const __TURBOPACK__default__export__ = ReviewItem;
var _c;
__turbopack_context__.k.register(_c, "ReviewItem");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/intake-assessment-v2/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Page
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$ProgressHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/app/components/ProgressHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$ConfettiBurst$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/app/components/ConfettiBurst.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$StepTitle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/app/components/StepTitle.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$VoiceRecorder$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$primitives$2f$Field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/app/components/primitives/Field.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$primitives$2f$Likert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/app/components/primitives/Likert.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$primitives$2f$ToggleRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/app/components/primitives/ToggleRow.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$primitives$2f$ReviewItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/app/components/primitives/ReviewItem.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/app/components/theme.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
const steps = [
    {
        key: "welcome",
        title: "Welcome",
        type: "intro"
    },
    {
        key: "profile",
        title: "About You",
        type: "form"
    },
    {
        key: "story",
        title: "Your Story",
        type: "open"
    },
    {
        key: "symptoms",
        title: "Quick Check-In",
        type: "quiz"
    },
    {
        key: "lifestyle",
        title: "Sleep & Lifestyle",
        type: "form"
    },
    {
        key: "review",
        title: "Review",
        type: "review"
    }
];
function Page() {
    _s();
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [praise, setPraise] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [burst, setBurst] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [profile, setProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: "",
        age: "",
        pronouns: "",
        email: ""
    });
    const [storyText, setStoryText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [storyAudio, setStoryAudio] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [symptoms, setSymptoms] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        phq1: "",
        phq2: "",
        gad1: "",
        gad2: ""
    });
    const [sleepEarly, setSleepEarly] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [sleepLate, setSleepLate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [usesNicotine, setUsesNicotine] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [usesCannabis, setUsesCannabis] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const canNext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Page.useMemo[canNext]": ()=>{
            if (steps[step].key === "profile") return Boolean(profile.name && profile.age && profile.email.includes("@"));
            if (steps[step].key === "story") return storyText.trim().length > 30 || Boolean(storyAudio);
            if (steps[step].key === "symptoms") return Boolean(symptoms.phq1 && symptoms.phq2 && symptoms.gad1 && symptoms.gad2);
            return true;
        }
    }["Page.useMemo[canNext]"], [
        step,
        profile,
        storyText,
        storyAudio,
        symptoms
    ]);
    const progressTitles = steps.map((s)=>s.title);
    const goNext = ()=>{
        const next = Math.min(step + 1, steps.length - 1);
        if (next !== step) {
            setPraise(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["praises"][Math.floor(Math.random() * __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["praises"].length)]);
            setBurst(true);
            setTimeout(()=>setBurst(false), 1200);
            setTimeout(()=>setPraise(null), 2000);
            setStep(next);
        }
    };
    const goBack = ()=>setStep((s)=>Math.max(0, s - 1));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen w-full",
        style: {
            background: __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].bgSoft,
            color: __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].text
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$ConfettiBurst$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                show: burst
            }, void 0, false, {
                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$ProgressHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                step: step,
                total: steps.length,
                praise: praise,
                onStepClick: setStep,
                stepTitles: progressTitles,
                canNext: canNext
            }, void 0, false, {
                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto max-w-4xl px-4 py-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            y: 12,
                            opacity: 0
                        },
                        animate: {
                            y: 0,
                            opacity: 1
                        },
                        exit: {
                            y: -12,
                            opacity: 0
                        },
                        transition: {
                            duration: 0.4,
                            ease: __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ease"]
                        },
                        className: "rounded-3xl border border-gray-200 bg-white p-6 md:p-8 shadow",
                        children: [
                            steps[step].key === "welcome" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$StepTitle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        n: 1,
                                        title: "Welcome"
                                    }, void 0, false, {
                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                        lineNumber: 111,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-700 font-sans",
                                        children: "This guided intake helps your clinician understand what matters most to you. It takes ~5–7 minutes. You can type or speak on open questions."
                                    }, void 0, false, {
                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                        lineNumber: 112,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "list-disc text-gray-600 pl-5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: "Progress saves locally while this page is open."
                                            }, void 0, false, {
                                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                lineNumber: 118,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: "You can skip any question. Voice notes are optional."
                                            }, void 0, false, {
                                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                lineNumber: 119,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: "We’ll show short encouragements as you move along."
                                            }, void 0, false, {
                                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                lineNumber: 120,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                        lineNumber: 117,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                lineNumber: 110,
                                columnNumber: 13
                            }, this),
                            steps[step].key === "profile" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$StepTitle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        n: 2,
                                        title: "About You"
                                    }, void 0, false, {
                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                        lineNumber: 127,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$primitives$2f$Field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                label: "Full name",
                                                required: true,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    className: "w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900 placeholder:text-slate-400",
                                                    placeholder: "e.g., Alex Rivera",
                                                    value: profile.name,
                                                    onChange: (e)=>setProfile((p)=>({
                                                                ...p,
                                                                name: e.target.value
                                                            }))
                                                }, void 0, false, {
                                                    fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                    lineNumber: 130,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                lineNumber: 129,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$primitives$2f$Field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                label: "Age",
                                                required: true,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    min: 1,
                                                    className: "w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900",
                                                    placeholder: "e.g., 28",
                                                    value: profile.age,
                                                    onChange: (e)=>setProfile((p)=>({
                                                                ...p,
                                                                age: e.target.value
                                                            }))
                                                }, void 0, false, {
                                                    fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                    lineNumber: 140,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                lineNumber: 139,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$primitives$2f$Field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                label: "Pronouns",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    className: "w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900",
                                                    value: profile.pronouns,
                                                    onChange: (e)=>setProfile((p)=>({
                                                                ...p,
                                                                pronouns: e.target.value
                                                            })),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: "Choose…"
                                                        }, void 0, false, {
                                                            fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                            lineNumber: 159,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            children: "She/Her"
                                                        }, void 0, false, {
                                                            fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                            lineNumber: 160,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            children: "He/Him"
                                                        }, void 0, false, {
                                                            fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                            lineNumber: 161,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            children: "They/Them"
                                                        }, void 0, false, {
                                                            fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                            lineNumber: 162,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            children: "Prefer to self-describe"
                                                        }, void 0, false, {
                                                            fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                            lineNumber: 163,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                    lineNumber: 152,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                lineNumber: 151,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$primitives$2f$Field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                label: "Email",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "email",
                                                    className: "w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900",
                                                    placeholder: "you@example.com",
                                                    value: profile.email,
                                                    onChange: (e)=>setProfile((p)=>({
                                                                ...p,
                                                                email: e.target.value
                                                            }))
                                                }, void 0, false, {
                                                    fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                    lineNumber: 167,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                lineNumber: 166,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                        lineNumber: 128,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                lineNumber: 126,
                                columnNumber: 13
                            }, this),
                            steps[step].key === "story" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$StepTitle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        n: 3,
                                        title: "Your Story"
                                    }, void 0, false, {
                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                        lineNumber: 183,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$primitives$2f$Field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        label: "What’s the main goal you’d like us to help you with? (type or record)",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            rows: 6,
                                            className: "w-full rounded-2xl bg-white border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400",
                                            placeholder: "Share anything important in your own words…",
                                            value: storyText,
                                            onChange: (e)=>setStoryText(e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                            lineNumber: 185,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                        lineNumber: 184,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$VoiceRecorder$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        onAttach: setStoryAudio
                                    }, void 0, false, {
                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                        lineNumber: 193,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                lineNumber: 182,
                                columnNumber: 13
                            }, this),
                            steps[step].key === "symptoms" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$StepTitle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        n: 4,
                                        title: "Quick Check-In"
                                    }, void 0, false, {
                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                        lineNumber: 199,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-slate-700",
                                        children: "A few quick items to help your clinician focus (PHQ‑2 + GAD‑2)."
                                    }, void 0, false, {
                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                        lineNumber: 200,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$primitives$2f$Likert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                id: "phq1",
                                                label: "Little interest or pleasure in doing things",
                                                value: symptoms.phq1,
                                                onChange: (v)=>setSymptoms((s)=>({
                                                            ...s,
                                                            phq1: v
                                                        }))
                                            }, void 0, false, {
                                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                lineNumber: 204,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$primitives$2f$Likert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                id: "phq2",
                                                label: "Feeling down, depressed, or hopeless",
                                                value: symptoms.phq2,
                                                onChange: (v)=>setSymptoms((s)=>({
                                                            ...s,
                                                            phq2: v
                                                        }))
                                            }, void 0, false, {
                                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                lineNumber: 210,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$primitives$2f$Likert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                id: "gad1",
                                                label: "Feeling nervous, anxious, or on edge",
                                                value: symptoms.gad1,
                                                onChange: (v)=>setSymptoms((s)=>({
                                                            ...s,
                                                            gad1: v
                                                        }))
                                            }, void 0, false, {
                                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                lineNumber: 216,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$primitives$2f$Likert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                id: "gad2",
                                                label: "Not being able to stop or control worrying",
                                                value: symptoms.gad2,
                                                onChange: (v)=>setSymptoms((s)=>({
                                                            ...s,
                                                            gad2: v
                                                        }))
                                            }, void 0, false, {
                                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                lineNumber: 222,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                        lineNumber: 203,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                lineNumber: 198,
                                columnNumber: 13
                            }, this),
                            steps[step].key === "lifestyle" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$StepTitle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        n: 5,
                                        title: "Sleep & Lifestyle"
                                    }, void 0, false, {
                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                        lineNumber: 234,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$primitives$2f$ToggleRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                label: "I fall asleep faster if I sleep earlier",
                                                checked: sleepEarly,
                                                onChange: setSleepEarly
                                            }, void 0, false, {
                                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                lineNumber: 236,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$primitives$2f$ToggleRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                label: "I sleep better going to bed late and waking late",
                                                checked: sleepLate,
                                                onChange: setSleepLate
                                            }, void 0, false, {
                                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                lineNumber: 241,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$primitives$2f$ToggleRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                label: "I use nicotine products",
                                                checked: usesNicotine,
                                                onChange: setUsesNicotine
                                            }, void 0, false, {
                                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                lineNumber: 246,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$primitives$2f$ToggleRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                label: "I use cannabis",
                                                checked: usesCannabis,
                                                onChange: setUsesCannabis
                                            }, void 0, false, {
                                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                lineNumber: 251,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                        lineNumber: 235,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                lineNumber: 233,
                                columnNumber: 13
                            }, this),
                            steps[step].key === "review" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$StepTitle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        n: 6,
                                        title: "Review & Finish"
                                    }, void 0, false, {
                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                        lineNumber: 262,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-2xl border border-slate-300 p-4 bg-slate-50 text-slate-800",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-1 md:grid-cols-2 gap-4 text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$primitives$2f$ReviewItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        label: "Name",
                                                        value: profile.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                        lineNumber: 265,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$primitives$2f$ReviewItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        label: "Age",
                                                        value: profile.age
                                                    }, void 0, false, {
                                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                        lineNumber: 266,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$primitives$2f$ReviewItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        label: "Pronouns",
                                                        value: profile.pronouns
                                                    }, void 0, false, {
                                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                        lineNumber: 267,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$primitives$2f$ReviewItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        label: "Email",
                                                        value: profile.email
                                                    }, void 0, false, {
                                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                        lineNumber: 268,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                lineNumber: 264,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-slate-600 mb-1",
                                                        children: "Your Story"
                                                    }, void 0, false, {
                                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                        lineNumber: 271,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "whitespace-pre-wrap text-slate-900 min-h-6",
                                                        children: storyText || "—"
                                                    }, void 0, false, {
                                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                        lineNumber: 272,
                                                        columnNumber: 19
                                                    }, this),
                                                    storyAudio && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-2",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("audio", {
                                                            controls: true,
                                                            src: storyAudio,
                                                            className: "w-full"
                                                        }, void 0, false, {
                                                            fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                            lineNumber: 277,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                        lineNumber: 276,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                lineNumber: 270,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$primitives$2f$ReviewItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        label: "PHQ1",
                                                        value: symptoms.phq1
                                                    }, void 0, false, {
                                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                        lineNumber: 282,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$primitives$2f$ReviewItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        label: "PHQ2",
                                                        value: symptoms.phq2
                                                    }, void 0, false, {
                                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                        lineNumber: 283,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$primitives$2f$ReviewItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        label: "GAD1",
                                                        value: symptoms.gad1
                                                    }, void 0, false, {
                                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                        lineNumber: 284,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$primitives$2f$ReviewItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        label: "GAD2",
                                                        value: symptoms.gad2
                                                    }, void 0, false, {
                                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                        lineNumber: 285,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$primitives$2f$ReviewItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        label: "Sleep earlier helps",
                                                        value: sleepEarly ? "Yes" : "No"
                                                    }, void 0, false, {
                                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                        lineNumber: 286,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$primitives$2f$ReviewItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        label: "Sleep late helps",
                                                        value: sleepLate ? "Yes" : "No"
                                                    }, void 0, false, {
                                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                        lineNumber: 290,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$primitives$2f$ReviewItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        label: "Nicotine use",
                                                        value: usesNicotine ? "Yes" : "No"
                                                    }, void 0, false, {
                                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                        lineNumber: 294,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$primitives$2f$ReviewItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        label: "Cannabis use",
                                                        value: usesCannabis ? "Yes" : "No"
                                                    }, void 0, false, {
                                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                        lineNumber: 298,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                lineNumber: 281,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                        lineNumber: 263,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col md:flex-row md:items-center justify-between gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-slate-600 text-sm",
                                                children: "This is a mockup. Clicking Finish shows a friendly confirmation—no data is stored."
                                            }, void 0, false, {
                                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                lineNumber: 305,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>alert("Thanks! This is just a front‑end mockup—no data was saved."),
                                                className: "inline-flex items-center gap-2 rounded-xl px-4 py-2 font-semibold text-white",
                                                style: {
                                                    background: __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].accent
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                        className: "h-5 w-5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                        lineNumber: 318,
                                                        columnNumber: 19
                                                    }, this),
                                                    " Finish"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                lineNumber: 309,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                        lineNumber: 304,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                lineNumber: 261,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-8 flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: goBack,
                                        disabled: step === 0,
                                        className: "inline-flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 font-medium border border-gray-300 text-gray-700 disabled:opacity-40",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                                className: "h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                lineNumber: 330,
                                                columnNumber: 15
                                            }, this),
                                            " Back"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                        lineNumber: 325,
                                        columnNumber: 13
                                    }, this),
                                    step < 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: goNext,
                                        className: "inline-flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 font-semibold text-white",
                                        style: {
                                            background: __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].primary
                                        },
                                        children: [
                                            "Start ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                className: "h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                lineNumber: 338,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                        lineNumber: 333,
                                        columnNumber: 15
                                    }, this),
                                    step > 0 && step < steps.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: goNext,
                                        disabled: !canNext,
                                        className: "inline-flex items-center gap-2 rounded-xl px-4 py-2 font-semibold text-white disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed",
                                        style: {
                                            background: __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].primary
                                        },
                                        children: [
                                            "Next ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                className: "h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                lineNumber: 349,
                                                columnNumber: 22
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                        lineNumber: 343,
                                        columnNumber: 15
                                    }, this),
                                    step === steps.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>window.scrollTo({
                                                top: 0,
                                                behavior: "smooth"
                                            }),
                                        className: "inline-flex items-center gap-2 rounded-xl px-4 py-2 font-semibold text-white",
                                        style: {
                                            background: __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].primary
                                        },
                                        children: "Back to Top"
                                    }, void 0, false, {
                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                        lineNumber: 353,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                lineNumber: 324,
                                columnNumber: 11
                            }, this)
                        ]
                    }, steps[step].key, true, {
                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 flex items-center justify-center text-xs text-slate-500",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "UI mockup • green nature palette • serif headings • voice notes • step guide"
                        }, void 0, false, {
                            fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                            lineNumber: 365,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                        lineNumber: 364,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                lineNumber: 100,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
_s(Page, "lvPWaY0b05+MMwWCIYV6+mM5qWo=");
_c = Page;
var _c;
__turbopack_context__.k.register(_c, "Page");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=intake-assessment-v2_src_app_fa6db44b._.js.map