(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/intake-assessment-v2/src/app/components/theme.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ease",
    ()=>ease,
    "intPsychTheme",
    ()=>intPsychTheme,
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
const intPsychTheme = {
    primary: "#113e60",
    accent: "#0072ce",
    secondary: "#ffa440",
    bgSoft: "#fffaf0ff",
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
"[project]/intake-assessment-v2/src/assets/IP_Logo.png (static in ecmascript)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/IP_Logo.37518677.png");}),
"[project]/intake-assessment-v2/src/assets/IP_Logo.png.mjs { IMAGE => \"[project]/intake-assessment-v2/src/assets/IP_Logo.png (static in ecmascript)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$assets$2f$IP_Logo$2e$png__$28$static__in__ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/assets/IP_Logo.png (static in ecmascript)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$assets$2f$IP_Logo$2e$png__$28$static__in__ecmascript$29$__["default"],
    width: 1081,
    height: 1081,
    blurWidth: 8,
    blurHeight: 8,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAtUlEQVR42oWPuQ6CQBRFJyYWJu77BokW8P+foxUSQZaBeTNsIzA8wVhYaXFzb3fOJYhIfoVgo3ooYYGpp6cQaHc/OtoPqlMQC6WaHsEs3GMRrWWRD2+Od87lc1BWdd+PYO2G8Y7UzDI5wCyk0aoL53wCANOuL5ZjEsUsI02SEWNsLoQYpzxeChZu2j25Wq7RIXYdAlXVx1oOlHBOpcxGLWLzRnxJapgFBwHx1vaoRiH5SP65+QICQruB9qrs0gAAAABJRU5ErkJggg=="
};
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
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/app/components/theme.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$assets$2f$IP_Logo$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$assets$2f$IP_Logo$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/intake-assessment-v2/src/assets/IP_Logo.png.mjs { IMAGE => "[project]/intake-assessment-v2/src/assets/IP_Logo.png (static in ecmascript)" } [app-client] (structured image object with data url, ecmascript)');
"use client";
;
;
;
;
;
;
const ProgressHeader = (param)=>{
    let { step, total, praise, onStepClick, stepTitles, canNext, progress } = param;
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$assets$2f$IP_Logo$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$assets$2f$IP_Logo$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"],
                                    alt: "Integrative Psych logo",
                                    width: 48,
                                    height: 48,
                                    className: "h-10 w-10 object-contain"
                                }, void 0, false, {
                                    fileName: "[project]/intake-assessment-v2/src/app/components/ProgressHeader.tsx",
                                    lineNumber: 36,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-bold text-2xl font-serif",
                                    style: {
                                        color: __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["intPsychTheme"].primary
                                    },
                                    children: "Integrative Psych Intake Assessment"
                                }, void 0, false, {
                                    fileName: "[project]/intake-assessment-v2/src/app/components/ProgressHeader.tsx",
                                    lineNumber: 44,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/intake-assessment-v2/src/app/components/ProgressHeader.tsx",
                            lineNumber: 35,
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
                                    lineNumber: 59,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                " ",
                                praise
                            ]
                        }, void 0, true, {
                            fileName: "[project]/intake-assessment-v2/src/app/components/ProgressHeader.tsx",
                            lineNumber: 53,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/intake-assessment-v2/src/app/components/ProgressHeader.tsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-3 flex items-center gap-3 overflow-x-auto text-sm",
                    children: stepTitles.map((title, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-1 ".concat(i === step ? "font-semibold" : "text-gray-500", " ").concat(i <= step ? "cursor-pointer" : "cursor-not-allowed"),
                            style: i === step ? {
                                color: __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["intPsychTheme"].primary
                            } : undefined,
                            onClick: ()=>{
                                const isBackOrCurrent = i <= step;
                                // const isForwardAllowed = i > step && canNext;
                                if (isBackOrCurrent) {
                                    onStepClick(i);
                                }
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-2 w-2 rounded-full bg-gray-300",
                                    style: i === step ? {
                                        background: __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["intPsychTheme"].primary
                                    } : undefined
                                }, void 0, false, {
                                    fileName: "[project]/intake-assessment-v2/src/app/components/ProgressHeader.tsx",
                                    lineNumber: 80,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                " ",
                                title
                            ]
                        }, title, true, {
                            fileName: "[project]/intake-assessment-v2/src/app/components/ProgressHeader.tsx",
                            lineNumber: 66,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)))
                }, void 0, false, {
                    fileName: "[project]/intake-assessment-v2/src/app/components/ProgressHeader.tsx",
                    lineNumber: 64,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-200",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "h-2",
                        style: {
                            background: "linear-gradient(90deg, ".concat(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["intPsychTheme"].primary, ", ").concat(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["intPsychTheme"].accent, ")")
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
                        lineNumber: 92,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/intake-assessment-v2/src/app/components/ProgressHeader.tsx",
                    lineNumber: 91,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/intake-assessment-v2/src/app/components/ProgressHeader.tsx",
            lineNumber: 33,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/intake-assessment-v2/src/app/components/ProgressHeader.tsx",
        lineNumber: 32,
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
                    background: __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["intPsychTheme"].secondary,
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
function useRecorder(audioState) {
    _s();
    const mediaRecorderRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const chunksRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const [recording, setRecording] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [permissionError, setPermissionError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [audioURL, setAudioURL] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(audioState !== null && audioState !== void 0 ? audioState : null);
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
_s(useRecorder, "BV+GExWwKy7Q1R43XoUbTLH2vd0=");
function VoiceRecorder(param) {
    let { onAttach, label = "Record a quick answer (optional)", audioState } = param;
    _s1();
    const { start, stop, reset, recording, permissionError, audioURL, elapsed } = useRecorder(audioState);
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
                                lineNumber: 178,
                                columnNumber: 11
                            }, this),
                            permissionError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-amber-700 mt-1",
                                children: permissionError
                            }, void 0, false, {
                                fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                                lineNumber: 180,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                        lineNumber: 177,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: !recording ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleStart,
                            className: "inline-flex items-center gap-2 hover:bg-red-600 cursor-pointer bg-red-500 text-white rounded-full px-3 py-2 text-sm font-semibold shadow-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                                    lineNumber: 189,
                                    columnNumber: 15
                                }, this),
                                " Record"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                            lineNumber: 185,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleStop,
                            className: "inline-flex items-center gap-2 hover:bg-red-600 cursor-pointer rounded-full px-3 py-2 text-sm font-semibold bg-red-500 text-white shadow-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__["Square"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                                    lineNumber: 196,
                                    columnNumber: 15
                                }, this),
                                " Stop"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                            lineNumber: 192,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                        lineNumber: 183,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                lineNumber: 176,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 flex items-center justify-between text-xs text-slate-600",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: recording ? "Recording…" : audioURL ? "Recorded clip" : "No recording yet"
                    }, void 0, false, {
                        fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                        lineNumber: 202,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono",
                        children: mmss(elapsed)
                    }, void 0, false, {
                        fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                        lineNumber: 209,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                lineNumber: 201,
                columnNumber: 7
            }, this),
            recording && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2 h-12 w-full overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                    ref: canvasRef,
                    className: "h-full w-full"
                }, void 0, false, {
                    fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                    lineNumber: 213,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                lineNumber: 212,
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
                        lineNumber: 218,
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
                                lineNumber: 227,
                                columnNumber: 15
                            }, this),
                            " Play"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                        lineNumber: 220,
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
                                lineNumber: 237,
                                columnNumber: 15
                            }, this),
                            " Pause"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                        lineNumber: 230,
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
                                lineNumber: 249,
                                columnNumber: 13
                            }, this),
                            " Remove"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                        lineNumber: 240,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
                lineNumber: 217,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/intake-assessment-v2/src/app/components/VoiceRecorder.tsx",
        lineNumber: 175,
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
                    required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-rose-600",
                        children: "* "
                    }, void 0, false, {
                        fileName: "[project]/intake-assessment-v2/src/app/components/primitives/Field.tsx",
                        lineNumber: 12,
                        columnNumber: 20
                    }, ("TURBOPACK compile-time value", void 0)),
                    label
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
"[project]/intake-assessment-v2/src/app/components/decor/GardenFlower.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GardenFlower",
    ()=>GardenFlower
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function GardenFlower(param) {
    let { size = 28, color = "#f43f5e", tilt = 0 } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size * 1.9,
        viewBox: "0 0 32 60",
        xmlns: "http://www.w3.org/2000/svg",
        "aria-hidden": true,
        style: {
            display: "block",
            transform: "rotate(".concat(tilt, "deg)")
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M16 22v34",
                stroke: "#16a34a",
                strokeWidth: "2.5",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/intake-assessment-v2/src/app/components/decor/GardenFlower.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M16 34c-6-3-10 1-11 6 4-1 7 1 11 4",
                fill: "#22c55e",
                fillOpacity: "0.85"
            }, void 0, false, {
                fileName: "[project]/intake-assessment-v2/src/app/components/decor/GardenFlower.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M16 40c6-3 10 1 11 6-4-1-7 1-11 4",
                fill: "#84cc16",
                fillOpacity: "0.8"
            }, void 0, false, {
                fileName: "[project]/intake-assessment-v2/src/app/components/decor/GardenFlower.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "16",
                cy: "14",
                r: "7",
                fill: color
            }, void 0, false, {
                fileName: "[project]/intake-assessment-v2/src/app/components/decor/GardenFlower.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "16",
                cy: "14",
                r: "3",
                fill: "#fff"
            }, void 0, false, {
                fileName: "[project]/intake-assessment-v2/src/app/components/decor/GardenFlower.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/intake-assessment-v2/src/app/components/decor/GardenFlower.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
_c = GardenFlower;
var _c;
__turbopack_context__.k.register(_c, "GardenFlower");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/intake-assessment-v2/src/app/components/decor/GrassBlade.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GrassBlade",
    ()=>GrassBlade
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function GrassBlade(param) {
    let { h = 32, bend = 6 } = param;
    const top = 56 - h;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: 12,
        height: 56,
        viewBox: "0 ".concat(top, " 12 ").concat(h),
        xmlns: "http://www.w3.org/2000/svg",
        "aria-hidden": true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M6 ".concat(top + h, " C ").concat(6 - bend, " ").concat(top + h - h / 2, ", ").concat(6 + bend, " ").concat(top + h - h / 2, ", 6 ").concat(top),
            stroke: "#16a34a",
            strokeWidth: "2",
            fill: "none",
            strokeLinecap: "round"
        }, void 0, false, {
            fileName: "[project]/intake-assessment-v2/src/app/components/decor/GrassBlade.tsx",
            lineNumber: 11,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/intake-assessment-v2/src/app/components/decor/GrassBlade.tsx",
        lineNumber: 4,
        columnNumber: 5
    }, this);
}
_c = GrassBlade;
var _c;
__turbopack_context__.k.register(_c, "GrassBlade");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/app/components/decor/Garden.tsx
__turbopack_context__.s([
    "FlowersRibbon",
    ()=>FlowersRibbon,
    "GardenFrame",
    ()=>GardenFrame
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$decor$2f$GardenFlower$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/app/components/decor/GardenFlower.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$decor$2f$GrassBlade$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/app/components/decor/GrassBlade.tsx [app-client] (ecmascript)");
;
;
;
;
function FlowerCluster(param) {
    let { colors = [
        "#f43f5e",
        "#e11d48",
        "#fb7185"
    ], flip = false } = param;
    const sizes = [
        22,
        26,
        30,
        24
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-end gap-2 ".concat(flip ? "scale-x-[-1]" : ""),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$decor$2f$GrassBlade$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GrassBlade"], {
                h: 42,
                bend: 8
            }, void 0, false, {
                fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$decor$2f$GardenFlower$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GardenFlower"], {
                size: sizes[0],
                color: colors[0],
                tilt: -3
            }, void 0, false, {
                fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$decor$2f$GrassBlade$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GrassBlade"], {
                h: 28,
                bend: 4
            }, void 0, false, {
                fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$decor$2f$GardenFlower$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GardenFlower"], {
                size: sizes[2],
                color: colors[2],
                tilt: 2
            }, void 0, false, {
                fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$decor$2f$GrassBlade$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GrassBlade"], {
                h: 36,
                bend: 10
            }, void 0, false, {
                fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$decor$2f$GardenFlower$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GardenFlower"], {
                size: sizes[1],
                color: colors[1],
                tilt: -1
            }, void 0, false, {
                fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_c = FlowerCluster;
/* ------------------ Layout helpers ------------------ */ function MeadowRow(param) {
    let { count = 8, flip = false, scale = 1, colors = [
        "#f43f5e",
        "#e11d48",
        "#fb7185"
    ] } = param;
    // Evenly distribute clusters across a responsive row
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pointer-events-none w-full grid",
        style: {
            gridTemplateColumns: "repeat(".concat(count, ", minmax(0, 1fr))"),
            transform: "scale(".concat(scale, ")")
        },
        "aria-hidden": true,
        children: Array.from({
            length: count
        }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "garden-sway ".concat(i % 2 ? "sway-fast" : "sway-slow", " flex items-end justify-center ").concat(flip && i % 2 ? "scale-x-[-1]" : ""),
                style: {
                    animationDelay: "".concat(i % 6 * 0.3, "s")
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FlowerCluster, {
                    colors: colors,
                    flip: flip && i % 2 === 0
                }, void 0, false, {
                    fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
                    lineNumber: 60,
                    columnNumber: 11
                }, this)
            }, i, false, {
                fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
                lineNumber: 53,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
_c1 = MeadowRow;
function VinesTop() {
    // Minimal top-corner accents to frame upper area
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pointer-events-none absolute inset-x-0 top-0 z-0",
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute left-0 top-0 p-2 garden-drift",
                style: {
                    animationDuration: "18s"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$decor$2f$GardenFlower$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GardenFlower"], {
                    size: 22,
                    color: "#86efac",
                    tilt: -8
                }, void 0, false, {
                    fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
                    lineNumber: 72,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute left-[9%] top-2 hidden sm:block p-2 garden-drift",
                style: {
                    animationDuration: "22s",
                    animationDelay: "-6s"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$decor$2f$GardenFlower$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GardenFlower"], {
                    size: 20,
                    color: "#a7f3d0",
                    tilt: -4
                }, void 0, false, {
                    fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
                    lineNumber: 78,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute right-0 top-0 p-2 garden-drift",
                style: {
                    animationDuration: "19s"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$decor$2f$GardenFlower$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GardenFlower"], {
                    size: 22,
                    color: "#86efac",
                    tilt: 7
                }, void 0, false, {
                    fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
                    lineNumber: 81,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
                lineNumber: 80,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute right-[10%] top-3 hidden sm:block p-2 garden-drift",
                style: {
                    animationDuration: "23s",
                    animationDelay: "-8s"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$decor$2f$GardenFlower$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GardenFlower"], {
                    size: 20,
                    color: "#a7f3d0",
                    tilt: 5
                }, void 0, false, {
                    fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
                    lineNumber: 87,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
        lineNumber: 70,
        columnNumber: 5
    }, this);
}
_c2 = VinesTop;
function GardenFrame() {
    // Multi-layered decorative garden with broad coverage and varied sway speeds.
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "aria-hidden": true,
        className: "jsx-6d3f2b661aef9f1d" + " " + "pointer-events-none absolute inset-0 z-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    height: "45%",
                    background: "linear-gradient(to top, rgba(22,163,74,0.14), rgba(22,163,74,0.04), rgba(22,163,74,0))"
                },
                className: "jsx-6d3f2b661aef9f1d" + " " + "absolute inset-x-0 bottom-0"
            }, void 0, false, {
                fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
                lineNumber: 100,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-6d3f2b661aef9f1d" + " " + "absolute inset-x-0 bottom-0 h-[58%] opacity-40",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-6d3f2b661aef9f1d" + " " + "mx-auto max-w-7xl px-2 space-y-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MeadowRow, {
                            count: 7,
                            scale: 1.05,
                            colors: [
                                "#86efac",
                                "#bbf7d0",
                                "#a7f3d0"
                            ]
                        }, void 0, false, {
                            fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
                            lineNumber: 112,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MeadowRow, {
                            count: 6,
                            flip: true,
                            scale: 1.1,
                            colors: [
                                "#bbf7d0",
                                "#a7f3d0",
                                "#86efac"
                            ]
                        }, void 0, false, {
                            fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
                            lineNumber: 113,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
                    lineNumber: 111,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-6d3f2b661aef9f1d" + " " + "absolute inset-x-0 bottom-0 h-[46%] opacity-60",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-6d3f2b661aef9f1d" + " " + "mx-auto max-w-6xl px-3 space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MeadowRow, {
                            count: 9,
                            scale: 1.0,
                            colors: [
                                "#fda4af",
                                "#fb7185",
                                "#fca5a5"
                            ]
                        }, void 0, false, {
                            fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
                            lineNumber: 120,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MeadowRow, {
                            count: 8,
                            flip: true,
                            scale: 1.0,
                            colors: [
                                "#fb7185",
                                "#f43f5e",
                                "#e11d48"
                            ]
                        }, void 0, false, {
                            fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
                            lineNumber: 121,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
                    lineNumber: 119,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-6d3f2b661aef9f1d" + " " + "absolute inset-x-0 bottom-0 h-[34%] opacity-85",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-6d3f2b661aef9f1d" + " " + "mx-auto max-w-5xl px-4 space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MeadowRow, {
                            count: 11,
                            scale: 0.98,
                            colors: [
                                "#f43f5e",
                                "#e11d48",
                                "#fb7185"
                            ]
                        }, void 0, false, {
                            fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
                            lineNumber: 128,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-6d3f2b661aef9f1d" + " " + "flex items-end justify-between px-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-6d3f2b661aef9f1d" + " " + "garden-sway sway-med",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FlowerCluster, {}, void 0, false, {
                                        fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
                                        lineNumber: 131,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
                                    lineNumber: 130,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-6d3f2b661aef9f1d" + " " + "garden-sway sway-med",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FlowerCluster, {
                                        flip: true
                                    }, void 0, false, {
                                        fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
                                        lineNumber: 134,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
                                    lineNumber: 133,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
                            lineNumber: 129,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
                    lineNumber: 127,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
                lineNumber: 126,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-6d3f2b661aef9f1d" + " " + "garden-sway sway-med absolute left-2 bottom-1 hidden md:block",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FlowerCluster, {}, void 0, false, {
                    fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
                    lineNumber: 142,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
                lineNumber: 141,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-6d3f2b661aef9f1d" + " " + "garden-sway sway-med absolute right-2 bottom-1 hidden md:block",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FlowerCluster, {
                    flip: true
                }, void 0, false, {
                    fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
                    lineNumber: 145,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
                lineNumber: 144,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(VinesTop, {}, void 0, false, {
                fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
                lineNumber: 149,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "6d3f2b661aef9f1d",
                children: ".garden-sway.jsx-6d3f2b661aef9f1d{animation:5.6s ease-in-out infinite garden-sway}.sway-slow.jsx-6d3f2b661aef9f1d{animation-duration:6.6s}.sway-med.jsx-6d3f2b661aef9f1d{animation-duration:5.2s}.sway-fast.jsx-6d3f2b661aef9f1d{animation-duration:4.2s}@keyframes garden-sway{0%,to{transform:translateY(0)rotate(-1.2deg)}50%{transform:translateY(-3px)rotate(1.2deg)}}.garden-drift.jsx-6d3f2b661aef9f1d{animation:20s linear infinite garden-drift}@keyframes garden-drift{0%{transform:translate(0)}50%{transform:translate(6px)}to{transform:translate(0)}}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
        lineNumber: 98,
        columnNumber: 5
    }, this);
}
_c3 = GardenFrame;
/* ------------------ Optional bottom ribbon ------------------ */ function FlowerSVG(param) {
    let { size = 22, color = "#16a34a" } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 2.5c1.3 0 2.5.9 3 2.2.5-1.3 1.7-2.2 3-2.2 1.9 0 3.5 1.6 3.5 3.5 0 1.5-1 2.8-2.4 3.3 1.4.5 2.4 1.8 2.4 3.3 0 1.9-1.6 3.5-3.5 3.5-1.3 0-2.5-.9-3-2.2-.5 1.3-1.7 2.2-3 2.2-1.3 0-2.5-.9-3-2.2-.5 1.3-1.7 2.2-3 2.2-1.9 0-3.5-1.6-3.5-3.5 0-1.5 1-2.8 2.4-3.3C3 8.8 2 7.5 2 6c0-1.9 1.6-3.5 3.5-3.5 1.3 0 2.5.9 3 2.2.5-1.3 1.7-2.2 3-2.2Z",
                fill: color,
                fillOpacity: "0.85"
            }, void 0, false, {
                fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
                lineNumber: 206,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "12",
                cy: "12",
                r: "2.5",
                fill: "#ffffff",
                fillOpacity: "0.9"
            }, void 0, false, {
                fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
                lineNumber: 211,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
        lineNumber: 198,
        columnNumber: 5
    }, this);
}
_c4 = FlowerSVG;
function FlowersRibbon() {
    const palette = [
        "#16a34a",
        "#22c55e",
        "#84cc16",
        "#65a30d"
    ];
    const sizes = [
        16,
        18,
        20,
        22,
        24
    ];
    const row = new Array(24).fill(0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            height: 56
        },
        "aria-hidden": true,
        className: "jsx-34d9f1657e29f8d7" + " " + "pointer-events-none fixed inset-x-0 bottom-0 z-10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: "linear-gradient(to top, rgba(22,163,74,0.08), rgba(22,163,74,0))"
                },
                className: "jsx-34d9f1657e29f8d7" + " " + "absolute inset-0"
            }, void 0, false, {
                fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
                lineNumber: 225,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-34d9f1657e29f8d7" + " " + "relative h-full overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            animationDuration: "28s"
                        },
                        className: "jsx-34d9f1657e29f8d7" + " " + "flowers-track will-change-transform",
                        children: row.map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-34d9f1657e29f8d7" + " " + "flowers-item",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FlowerSVG, {
                                    size: sizes[i % sizes.length],
                                    color: palette[i % palette.length]
                                }, void 0, false, {
                                    fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
                                    lineNumber: 235,
                                    columnNumber: 15
                                }, this)
                            }, "a" + i, false, {
                                fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
                                lineNumber: 234,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
                        lineNumber: 232,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            animationDuration: "28s",
                            animationDelay: "-14s"
                        },
                        className: "jsx-34d9f1657e29f8d7" + " " + "flowers-track will-change-transform",
                        children: row.map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-34d9f1657e29f8d7" + " " + "flowers-item",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FlowerSVG, {
                                    size: sizes[(i + 2) % sizes.length],
                                    color: palette[(i + 1) % palette.length]
                                }, void 0, false, {
                                    fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
                                    lineNumber: 245,
                                    columnNumber: 15
                                }, this)
                            }, "b" + i, false, {
                                fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
                                lineNumber: 244,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
                        lineNumber: 239,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
                lineNumber: 231,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "34d9f1657e29f8d7",
                children: ".flowers-track.jsx-34d9f1657e29f8d7{gap:18px;width:200%;padding-left:8px;animation-name:flowers-marquee;animation-timing-function:linear;animation-iteration-count:infinite;display:flex;position:absolute;top:8px;left:0}.flowers-item.jsx-34d9f1657e29f8d7{animation:3.8s ease-in-out infinite flowers-bob;transform:translateY(0)}.flowers-item.jsx-34d9f1657e29f8d7:nth-child(3n){animation-duration:4.4s}.flowers-item.jsx-34d9f1657e29f8d7:nth-child(4n){animation-duration:3.2s}@keyframes flowers-marquee{0%{transform:translate(0%)}to{transform:translate(-50%)}}@keyframes flowers-bob{0%,to{transform:translateY(0)rotate(0)}50%{transform:translateY(-3px)rotate(2deg)}}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx",
        lineNumber: 223,
        columnNumber: 5
    }, this);
}
_c5 = FlowersRibbon;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "FlowerCluster");
__turbopack_context__.k.register(_c1, "MeadowRow");
__turbopack_context__.k.register(_c2, "VinesTop");
__turbopack_context__.k.register(_c3, "GardenFrame");
__turbopack_context__.k.register(_c4, "FlowerSVG");
__turbopack_context__.k.register(_c5, "FlowersRibbon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/intake-assessment-v2/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/app/page.tsx
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
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$decor$2f$Garden$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/app/components/decor/Garden.tsx [app-client] (ecmascript)");
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
;
const steps = [
    {
        key: "welcome",
        title: "Welcome",
        type: "intro"
    },
    {
        key: "hipaa",
        title: "HIPAA Statement",
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
    const [progress, setProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [profile, setProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: "",
        age: "",
        pronouns: "",
        email: "",
        contactNumber: "",
        dob: ""
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
    const [weather, setWeather] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("sunny");
    const [wind, setWind] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Page.useEffect": ()=>{
            if (step * 100 / steps.length > progress) {
                setProgress({
                    "Page.useEffect": (p)=>p + 100 / steps.length
                }["Page.useEffect"]);
            }
        }
    }["Page.useEffect"], [
        step
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Page.useEffect": ()=>{
        // console.log("Audio state:", storyAudio);
        }
    }["Page.useEffect"], [
        storyAudio
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Page.useEffect": ()=>{
            document.body.classList.remove("weather-sunny", "weather-rainy", "weather-snowy");
            document.body.classList.add("weather-".concat(weather));
        }
    }["Page.useEffect"], [
        weather
    ]);
    const canNext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Page.useMemo[canNext]": ()=>{
            if (steps[step].key === "profile") return Boolean(profile.name && profile.age && profile.email.includes("@") && profile.dob && profile.contactNumber);
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
        className: "relative min-h-screen w-full",
        style: {
            background: __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["intPsychTheme"].bgSoft,
            color: __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].text
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$ConfettiBurst$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                show: burst
            }, void 0, false, {
                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                lineNumber: 124,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$decor$2f$Garden$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GardenFrame"], {
                weather: weather,
                wind: wind
            }, void 0, false, {
                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                lineNumber: 125,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$ProgressHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                step: step,
                total: steps.length,
                praise: praise,
                onStepClick: setStep,
                stepTitles: progressTitles,
                canNext: canNext,
                progress: progress
            }, void 0, false, {
                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                lineNumber: 127,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 mx-auto max-w-4xl px-4 py-8",
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
                                        n: step + 1,
                                        title: "Welcome"
                                    }, void 0, false, {
                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                        lineNumber: 148,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-700 font-sans",
                                        children: [
                                            "This detailed survey will give your clinician much of the necessary context that could otherwise take a full session to gather. This will help them ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                children: "jumpstart your treatment"
                                            }, void 0, false, {
                                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                lineNumber: 152,
                                                columnNumber: 45
                                            }, this),
                                            " and spend session time talking about the right things."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                        lineNumber: 149,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            "There will be multiple choice, and free response style questions which you can choose to type or respond to with a voice note. The more ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                children: "detail"
                                            }, void 0, false, {
                                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                lineNumber: 158,
                                                columnNumber: 26
                                            }, this),
                                            " you include, the better we can understand how to help."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                        lineNumber: 155,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: "Let's start!"
                                    }, void 0, false, {
                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                        lineNumber: 161,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                lineNumber: 147,
                                columnNumber: 13
                            }, this),
                            steps[step].key === "hipaa" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$StepTitle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        n: step + 1,
                                        title: steps[step].title
                                    }, void 0, false, {
                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                        lineNumber: 167,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-700 font-sans",
                                        children: "Before we start,"
                                    }, void 0, false, {
                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                        lineNumber: 168,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            "We want to let you know that your responses will be kept",
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                children: "private"
                                            }, void 0, false, {
                                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                lineNumber: 171,
                                                columnNumber: 17
                                            }, this),
                                            " and ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                children: "secure"
                                            }, void 0, false, {
                                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                lineNumber: 171,
                                                columnNumber: 36
                                            }, this),
                                            " compliant under the Health Insurance Portability and Accountability Act ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                children: "(HIPPA)"
                                            }, void 0, false, {
                                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                lineNumber: 172,
                                                columnNumber: 62
                                            }, this),
                                            "."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                        lineNumber: 169,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            "You may access a longer version of this statement",
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "https://www.integrative-psych.org/legal/hipaa",
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                style: {
                                                    color: __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["intPsychTheme"].accent,
                                                    textDecoration: "underline",
                                                    transition: "color 0.2s"
                                                },
                                                onMouseEnter: (e)=>e.currentTarget.style.color = __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["intPsychTheme"].primary,
                                                onMouseLeave: (e)=>e.currentTarget.style.color = __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["intPsychTheme"].accent,
                                                children: "here"
                                            }, void 0, false, {
                                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                lineNumber: 176,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                        lineNumber: 174,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                lineNumber: 166,
                                columnNumber: 13
                            }, this),
                            steps[step].key === "profile" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$StepTitle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        n: step + 1,
                                        title: steps[step].title
                                    }, void 0, false, {
                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                        lineNumber: 200,
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
                                                    lineNumber: 203,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                lineNumber: 202,
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
                                                    lineNumber: 213,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                lineNumber: 212,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$primitives$2f$Field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                label: "Email",
                                                required: true,
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
                                                    lineNumber: 226,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                lineNumber: 225,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$primitives$2f$Field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                label: "Contact Number",
                                                required: true,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "tel",
                                                    className: "w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900",
                                                    placeholder: "123-456-7890",
                                                    value: profile.contactNumber,
                                                    onChange: (e)=>setProfile((p)=>({
                                                                ...p,
                                                                contactNumber: e.target.value
                                                            }))
                                                }, void 0, false, {
                                                    fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                    lineNumber: 237,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                lineNumber: 236,
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
                                                            lineNumber: 258,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            children: "She/Her"
                                                        }, void 0, false, {
                                                            fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                            lineNumber: 259,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            children: "He/Him"
                                                        }, void 0, false, {
                                                            fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                            lineNumber: 260,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            children: "They/Them"
                                                        }, void 0, false, {
                                                            fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                            lineNumber: 261,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            children: "Prefer to self-describe"
                                                        }, void 0, false, {
                                                            fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                            lineNumber: 262,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                    lineNumber: 251,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                lineNumber: 250,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$primitives$2f$Field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                label: "Date of Birth",
                                                required: true,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "date",
                                                    className: "w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900",
                                                    value: profile.dob,
                                                    onChange: (e)=>setProfile((p)=>({
                                                                ...p,
                                                                dob: e.target.value
                                                            }))
                                                }, void 0, false, {
                                                    fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                    lineNumber: 266,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                lineNumber: 265,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                        lineNumber: 201,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                lineNumber: 199,
                                columnNumber: 13
                            }, this),
                            steps[step].key === "story" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$StepTitle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        n: step + 1,
                                        title: "Your Story"
                                    }, void 0, false, {
                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                        lineNumber: 281,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$primitives$2f$Field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        label: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                    children: "Tell us the story"
                                                }, void 0, false, {
                                                    fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                    lineNumber: 285,
                                                    columnNumber: 21
                                                }, void 0),
                                                " of how you got here, why are you asking for help today?",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-slate-600 text-sm mt-1",
                                                    children: [
                                                        "Please describe the following:",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                            className: "list-disc pl-5 mt-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                    children: "(A) Onset and precipitating events"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                                    lineNumber: 290,
                                                                    columnNumber: 25
                                                                }, void 0),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                    children: "(B) Periods when symptoms were better or worse"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                                    lineNumber: 291,
                                                                    columnNumber: 25
                                                                }, void 0),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                    children: "(C) How symptoms have changed over time"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                                    lineNumber: 292,
                                                                    columnNumber: 25
                                                                }, void 0)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                            lineNumber: 289,
                                                            columnNumber: 23
                                                        }, void 0)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                    lineNumber: 287,
                                                    columnNumber: 21
                                                }, void 0)
                                            ]
                                        }, void 0, true),
                                        required: true,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            rows: 6,
                                            className: "w-full rounded-2xl bg-white border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400",
                                            placeholder: "Share here in your own words…",
                                            value: storyText,
                                            onChange: (e)=>setStoryText(e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                            lineNumber: 299,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                        lineNumber: 282,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$VoiceRecorder$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        audioState: storyAudio,
                                        onAttach: setStoryAudio
                                    }, void 0, false, {
                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                        lineNumber: 307,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                lineNumber: 280,
                                columnNumber: 13
                            }, this),
                            steps[step].key === "symptoms" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$StepTitle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        n: step + 1,
                                        title: "Quick Check-In"
                                    }, void 0, false, {
                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                        lineNumber: 313,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-slate-700",
                                        children: "A few quick items to help your clinician focus (PHQ-2 + GAD-2)."
                                    }, void 0, false, {
                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                        lineNumber: 314,
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
                                                lineNumber: 318,
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
                                                lineNumber: 324,
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
                                                lineNumber: 330,
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
                                                lineNumber: 336,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                        lineNumber: 317,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                lineNumber: 312,
                                columnNumber: 13
                            }, this),
                            steps[step].key === "lifestyle" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$StepTitle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        n: step + 1,
                                        title: "Sleep & Lifestyle"
                                    }, void 0, false, {
                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                        lineNumber: 348,
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
                                                lineNumber: 350,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$primitives$2f$ToggleRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                label: "I sleep better going to bed late and waking late",
                                                checked: sleepLate,
                                                onChange: setSleepLate
                                            }, void 0, false, {
                                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                lineNumber: 355,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$primitives$2f$ToggleRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                label: "I use nicotine products",
                                                checked: usesNicotine,
                                                onChange: setUsesNicotine
                                            }, void 0, false, {
                                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                lineNumber: 360,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$primitives$2f$ToggleRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                label: "I use cannabis",
                                                checked: usesCannabis,
                                                onChange: setUsesCannabis
                                            }, void 0, false, {
                                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                lineNumber: 365,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                        lineNumber: 349,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                lineNumber: 347,
                                columnNumber: 13
                            }, this),
                            steps[step].key === "review" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$StepTitle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        n: step + 1,
                                        title: "Review & Finish"
                                    }, void 0, false, {
                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                        lineNumber: 376,
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
                                                        lineNumber: 379,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$primitives$2f$ReviewItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        label: "Age",
                                                        value: profile.age
                                                    }, void 0, false, {
                                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                        lineNumber: 380,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$primitives$2f$ReviewItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        label: "Pronouns",
                                                        value: profile.pronouns
                                                    }, void 0, false, {
                                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                        lineNumber: 381,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$primitives$2f$ReviewItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        label: "Email",
                                                        value: profile.email
                                                    }, void 0, false, {
                                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                        lineNumber: 382,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                lineNumber: 378,
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
                                                        lineNumber: 385,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "whitespace-pre-wrap text-slate-900 min-h-6",
                                                        children: storyText || "—"
                                                    }, void 0, false, {
                                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                        lineNumber: 386,
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
                                                            lineNumber: 391,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                        lineNumber: 390,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                lineNumber: 384,
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
                                                        lineNumber: 396,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$primitives$2f$ReviewItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        label: "PHQ2",
                                                        value: symptoms.phq2
                                                    }, void 0, false, {
                                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                        lineNumber: 397,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$primitives$2f$ReviewItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        label: "GAD1",
                                                        value: symptoms.gad1
                                                    }, void 0, false, {
                                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                        lineNumber: 398,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$primitives$2f$ReviewItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        label: "GAD2",
                                                        value: symptoms.gad2
                                                    }, void 0, false, {
                                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                        lineNumber: 399,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$primitives$2f$ReviewItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        label: "Sleep earlier helps",
                                                        value: sleepEarly ? "Yes" : "No"
                                                    }, void 0, false, {
                                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                        lineNumber: 400,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$primitives$2f$ReviewItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        label: "Sleep late helps",
                                                        value: sleepLate ? "Yes" : "No"
                                                    }, void 0, false, {
                                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                        lineNumber: 404,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$primitives$2f$ReviewItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        label: "Nicotine use",
                                                        value: usesNicotine ? "Yes" : "No"
                                                    }, void 0, false, {
                                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                        lineNumber: 408,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$primitives$2f$ReviewItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        label: "Cannabis use",
                                                        value: usesCannabis ? "Yes" : "No"
                                                    }, void 0, false, {
                                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                        lineNumber: 412,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                lineNumber: 395,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                        lineNumber: 377,
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
                                                lineNumber: 419,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>alert("Thanks! This is just a front-end mockup—no data was saved."),
                                                className: "inline-flex items-center gap-2 rounded-xl px-4 py-2 font-semibold text-white",
                                                style: {
                                                    background: __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["intPsychTheme"].secondary
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                        className: "h-5 w-5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                        lineNumber: 432,
                                                        columnNumber: 19
                                                    }, this),
                                                    " Finish"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                lineNumber: 423,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                        lineNumber: 418,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                lineNumber: 375,
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
                                                lineNumber: 444,
                                                columnNumber: 15
                                            }, this),
                                            " Back"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                        lineNumber: 439,
                                        columnNumber: 13
                                    }, this),
                                    step < 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: goNext,
                                        className: "inline-flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 font-semibold text-white",
                                        style: {
                                            background: __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["intPsychTheme"].secondary
                                        },
                                        children: [
                                            "Start ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                className: "h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                lineNumber: 453,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                        lineNumber: 448,
                                        columnNumber: 15
                                    }, this),
                                    step > 0 && step < steps.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: goNext,
                                        disabled: !canNext,
                                        className: "inline-flex items-center gap-2 rounded-xl px-4 py-2 font-semibold text-white disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed",
                                        style: {
                                            background: __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["intPsychTheme"].secondary
                                        },
                                        children: [
                                            "Next ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                className: "h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                                lineNumber: 464,
                                                columnNumber: 22
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                        lineNumber: 458,
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
                                        lineNumber: 469,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                                lineNumber: 438,
                                columnNumber: 11
                            }, this)
                        ]
                    }, steps[step].key, true, {
                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                        lineNumber: 138,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 flex items-center justify-center text-xs text-slate-500",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "UI mockup • green nature palette • serif headings • voice notes • step guide"
                        }, void 0, false, {
                            fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                            lineNumber: 481,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                        lineNumber: 480,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
                lineNumber: 137,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/intake-assessment-v2/src/app/page.tsx",
        lineNumber: 119,
        columnNumber: 5
    }, this);
}
_s(Page, "DAT+AX79ESMevpPft7l64/y7+nU=");
_c = Page;
var _c;
__turbopack_context__.k.register(_c, "Page");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=intake-assessment-v2_src_2572a6e8._.js.map