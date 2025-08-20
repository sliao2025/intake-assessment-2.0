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
    let { step, total, praise, onStepClick, stepTitles } = param;
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
                                        lineNumber: 34,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/intake-assessment-v2/src/app/components/ProgressHeader.tsx",
                                    lineNumber: 30,
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
                                    lineNumber: 36,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/intake-assessment-v2/src/app/components/ProgressHeader.tsx",
                            lineNumber: 29,
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
                                    lineNumber: 51,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                " ",
                                praise
                            ]
                        }, void 0, true, {
                            fileName: "[project]/intake-assessment-v2/src/app/components/ProgressHeader.tsx",
                            lineNumber: 45,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/intake-assessment-v2/src/app/components/ProgressHeader.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-3 flex items-center gap-3 overflow-x-auto text-sm",
                    children: stepTitles.map((title, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-1 cursor-pointer ".concat(i === step ? "font-semibold text-green-700" : "text-gray-500"),
                            onClick: ()=>onStepClick(i),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-2 w-2 rounded-full ".concat(i <= step ? "bg-green-600" : "bg-gray-300")
                                }, void 0, false, {
                                    fileName: "[project]/intake-assessment-v2/src/app/components/ProgressHeader.tsx",
                                    lineNumber: 65,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                " ",
                                title
                            ]
                        }, title, true, {
                            fileName: "[project]/intake-assessment-v2/src/app/components/ProgressHeader.tsx",
                            lineNumber: 58,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)))
                }, void 0, false, {
                    fileName: "[project]/intake-assessment-v2/src/app/components/ProgressHeader.tsx",
                    lineNumber: 56,
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
                        lineNumber: 76,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/intake-assessment-v2/src/app/components/ProgressHeader.tsx",
                    lineNumber: 75,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/intake-assessment-v2/src/app/components/ProgressHeader.tsx",
            lineNumber: 27,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/intake-assessment-v2/src/app/components/ProgressHeader.tsx",
        lineNumber: 26,
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
"[project]/intake-assessment-v2/src/app/components/Navigation.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
"use client";
;
;
const Navigation = (param)=>{
    let { step, total, onBack, onNext, onFinish, nextDisabled } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-6 flex justify-between",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                disabled: step === 0,
                onClick: onBack,
                className: "px-3 py-2 border rounded flex gap-2 items-center disabled:opacity-40",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                        className: "h-4 w-4"
                    }, void 0, false, {
                        fileName: "[project]/intake-assessment-v2/src/app/components/Navigation.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    " Back"
                ]
            }, void 0, true, {
                fileName: "[project]/intake-assessment-v2/src/app/components/Navigation.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            step < total - 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onNext,
                disabled: nextDisabled,
                className: "px-4 py-2 bg-green-600 text-white rounded flex gap-2 items-center disabled:opacity-40",
                children: [
                    "Next ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                        className: "h-4 w-4"
                    }, void 0, false, {
                        fileName: "[project]/intake-assessment-v2/src/app/components/Navigation.tsx",
                        lineNumber: 39,
                        columnNumber: 16
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/intake-assessment-v2/src/app/components/Navigation.tsx",
                lineNumber: 34,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onFinish,
                className: "px-4 py-2 bg-lime-600 text-white rounded flex gap-2 items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                        className: "h-5 w-5"
                    }, void 0, false, {
                        fileName: "[project]/intake-assessment-v2/src/app/components/Navigation.tsx",
                        lineNumber: 46,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    " Finish"
                ]
            }, void 0, true, {
                fileName: "[project]/intake-assessment-v2/src/app/components/Navigation.tsx",
                lineNumber: 42,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/intake-assessment-v2/src/app/components/Navigation.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Navigation;
const __TURBOPACK__default__export__ = Navigation;
var _c;
__turbopack_context__.k.register(_c, "Navigation");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/intake-assessment-v2/src/app/components/steps/WelcomeStep.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
"use client";
;
;
const WelcomeStep = (param)=>{
    let { onStart } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white p-6 rounded-xl shadow",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "font-serif text-xl mb-2",
                children: "Welcome"
            }, void 0, false, {
                fileName: "[project]/intake-assessment-v2/src/app/components/steps/WelcomeStep.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-gray-700",
                children: "This intake will take 5–7 minutes. You can type or record answers on open‑ended questions."
            }, void 0, false, {
                fileName: "[project]/intake-assessment-v2/src/app/components/steps/WelcomeStep.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "list-disc text-gray-600 pl-5 mt-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: "You can skip any question. Voice notes are optional."
                    }, void 0, false, {
                        fileName: "[project]/intake-assessment-v2/src/app/components/steps/WelcomeStep.tsx",
                        lineNumber: 17,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: "Encouraging nudges appear as you progress."
                    }, void 0, false, {
                        fileName: "[project]/intake-assessment-v2/src/app/components/steps/WelcomeStep.tsx",
                        lineNumber: 18,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/intake-assessment-v2/src/app/components/steps/WelcomeStep.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-end mt-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onStart,
                    className: "bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 font-semibold",
                    children: [
                        "Start ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                            className: "h-4 w-4"
                        }, void 0, false, {
                            fileName: "[project]/intake-assessment-v2/src/app/components/steps/WelcomeStep.tsx",
                            lineNumber: 25,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/intake-assessment-v2/src/app/components/steps/WelcomeStep.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/intake-assessment-v2/src/app/components/steps/WelcomeStep.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/intake-assessment-v2/src/app/components/steps/WelcomeStep.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = WelcomeStep;
const __TURBOPACK__default__export__ = WelcomeStep;
var _c;
__turbopack_context__.k.register(_c, "WelcomeStep");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/node_modules/lucide-react/dist/esm/icons/mic.js [app-client] (ecmascript) <export default as Mic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/node_modules/lucide-react/dist/esm/icons/square.js [app-client] (ecmascript) <export default as Square>");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/node_modules/lucide-react/dist/esm/icons/pause.js [app-client] (ecmascript) <export default as Pause>");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/app/components/theme.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
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
const VoiceRecorder = (param)=>{
    let { onAttach, label = "Record a quick answer (optional)" } = param;
    _s1();
    const { start, stop, reset, recording, permissionError, audioURL, elapsed } = useRecorder();
    const [playing, setPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const audioRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VoiceRecorder.useEffect": ()=>{
            onAttach === null || onAttach === void 0 ? void 0 : onAttach(audioURL || null);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-2xl border border-slate-300 p-3 md:p-4 bg-slate-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-700 font-medium",
                                children: label
                            }, void 0, false, {
                                fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                                lineNumber: 90,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            permissionError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-amber-700 mt-1",
                                children: [
                                    permissionError,
                                    " – You can still type your response below."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                                lineNumber: 92,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                        lineNumber: 89,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: !recording ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: start,
                            className: "inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold shadow-sm border border-lime-400",
                            style: {
                                background: __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].accent,
                                color: "white"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                                    lineNumber: 104,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                " Record"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                            lineNumber: 99,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: stop,
                            className: "inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold bg-red-600 text-white shadow-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__["Square"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                                    lineNumber: 111,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                " Stop"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                            lineNumber: 107,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 flex items-center justify-between text-xs text-slate-600",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: recording ? "Recording…" : audioURL ? "Recorded clip" : "No recording yet"
                    }, void 0, false, {
                        fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono",
                        children: mmss(elapsed)
                    }, void 0, false, {
                        fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                        lineNumber: 125,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            audioURL && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("audio", {
                        ref: audioRef,
                        src: audioURL
                    }, void 0, false, {
                        fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                        lineNumber: 130,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
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
                                lineNumber: 139,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            " Play"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                        lineNumber: 132,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                lineNumber: 149,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            " Pause"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                        lineNumber: 142,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            var _audioRef_current;
                            (_audioRef_current = audioRef.current) === null || _audioRef_current === void 0 ? void 0 : _audioRef_current.pause();
                            setPlaying(false);
                            reset();
                            onAttach === null || onAttach === void 0 ? void 0 : onAttach(null);
                        },
                        className: "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold border border-slate-300 text-slate-800",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                                lineNumber: 161,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            " Remove"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                        lineNumber: 152,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                lineNumber: 129,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
        lineNumber: 87,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s1(VoiceRecorder, "/KWxLPyozcramd/kS67pvU2gMuo=", false, function() {
    return [
        useRecorder
    ];
});
_c = VoiceRecorder;
const __TURBOPACK__default__export__ = VoiceRecorder;
var _c;
__turbopack_context__.k.register(_c, "VoiceRecorder");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/intake-assessment-v2/src/app/components/steps/StoryStep.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$VoiceRecorder$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx [app-client] (ecmascript)");
"use client";
;
;
const StoryStep = (param)=>{
    let { storyText, setStoryText, setStoryAudio } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white p-6 rounded-xl shadow space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "font-serif text-xl",
                children: "Your Story"
            }, void 0, false, {
                fileName: "[project]/intake-assessment-v2/src/app/components/steps/StoryStep.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-1 text-sm text-slate-700",
                        children: "What’s the main goal you’d like us to help you with? (type or record)"
                    }, void 0, false, {
                        fileName: "[project]/intake-assessment-v2/src/app/components/steps/StoryStep.tsx",
                        lineNumber: 21,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        rows: 6,
                        className: "w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900",
                        placeholder: "Share anything important in your own words…",
                        value: storyText,
                        onChange: (e)=>setStoryText(e.target.value)
                    }, void 0, false, {
                        fileName: "[project]/intake-assessment-v2/src/app/components/steps/StoryStep.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/intake-assessment-v2/src/app/components/steps/StoryStep.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$VoiceRecorder$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                onAttach: setStoryAudio
            }, void 0, false, {
                fileName: "[project]/intake-assessment-v2/src/app/components/steps/StoryStep.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/intake-assessment-v2/src/app/components/steps/StoryStep.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = StoryStep;
const __TURBOPACK__default__export__ = StoryStep;
var _c;
__turbopack_context__.k.register(_c, "StoryStep");
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
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$ProgressHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/app/components/ProgressHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$Navigation$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/app/components/Navigation.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$steps$2f$WelcomeStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/app/components/steps/WelcomeStep.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$steps$2f$StoryStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/app/components/steps/StoryStep.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
// async function start() {
//   setLoading(true);
//   const res = await fetch("/api/sessions", {
//     method: "POST",
//     body: JSON.stringify({ assessmentSlug: assessment, userId: "demo" }),
//   });
//   const data = await res.json();
//   window.location.href = `/sessions/${data.sessionId}`;
// }
const stepsConfig = [
    {
        key: "welcome",
        title: "Welcome"
    },
    {
        key: "story",
        title: "Your Story"
    },
    {
        key: "review",
        title: "Review"
    }
];
function Page() {
    _s();
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const total = stepsConfig.length;
    const [storyText, setStoryText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [storyAudio, setStoryAudio] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const canNext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Page.useMemo[canNext]": ()=>{
            const k = stepsConfig[step].key;
            if (k === "story") return storyText.trim().length > 0 || Boolean(storyAudio);
            return true;
        }
    }["Page.useMemo[canNext]"], [
        step,
        storyText,
        storyAudio
    ]);
    const onFinish = ()=>{
        alert("Finished (mockup) — no data saved.");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$ProgressHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                step: step,
                total: total
            }, void 0, false, {
                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "max-w-2xl mx-auto p-4",
                children: [
                    stepsConfig[step].key === "welcome" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$steps$2f$WelcomeStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        onStart: ()=>setStep(1)
                    }, void 0, false, {
                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                        lineNumber: 51,
                        columnNumber: 11
                    }, this),
                    stepsConfig[step].key === "story" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$steps$2f$StoryStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        storyText: storyText,
                        setStoryText: setStoryText,
                        setStoryAudio: setStoryAudio
                    }, void 0, false, {
                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                        lineNumber: 55,
                        columnNumber: 11
                    }, this),
                    stepsConfig[step].key === "review" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white p-6 rounded-xl shadow space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-serif text-xl",
                                children: "Review"
                            }, void 0, false, {
                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                lineNumber: 64,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-slate-600 text-sm",
                                        children: "Your Story"
                                    }, void 0, false, {
                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                        lineNumber: 66,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-slate-900 whitespace-pre-wrap",
                                        children: storyText || "—"
                                    }, void 0, false, {
                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                        lineNumber: 67,
                                        columnNumber: 15
                                    }, this),
                                    storyAudio && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("audio", {
                                            controls: true,
                                            src: storyAudio,
                                            className: "w-full"
                                        }, void 0, false, {
                                            fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                            lineNumber: 72,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                        lineNumber: 71,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                lineNumber: 65,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                        lineNumber: 63,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$Navigation$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        step: step,
                        total: total,
                        onBack: ()=>setStep((s)=>Math.max(0, s - 1)),
                        onNext: ()=>setStep((s)=>Math.min(total - 1, s + 1)),
                        onFinish: onFinish,
                        nextDisabled: !canNext
                    }, void 0, false, {
                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                        lineNumber: 79,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
        lineNumber: 46,
        columnNumber: 5
    }, this);
}
_s(Page, "ot68PpGcB/pu381z53YolJpzSF4=");
_c = Page;
var _c;
__turbopack_context__.k.register(_c, "Page");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=intake-assessment-v2_src_app_ebc4c2a6._.js.map