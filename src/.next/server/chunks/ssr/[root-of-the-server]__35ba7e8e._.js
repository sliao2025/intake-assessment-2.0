module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/intake-assessment-v2/src/app/sessions/[id]/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SessionPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
;
function SessionPage({ params }) {
    const { id: sessionId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["use"])(params);
    const [item, setItem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [done, setDone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [theta, setTheta] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [se, setSe] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    async function next() {
        const r = await fetch("/api/cat/next-item", {
            method: "POST",
            body: JSON.stringify({
                sessionId
            })
        });
        const data = await r.json();
        setTheta(data.theta ?? null);
        setSe(data.se ?? null);
        if (data.stop || !data.nextItemId) {
            setDone(true);
            setItem(null);
            return;
        }
        // fetch item details from server (echoed back in payload for demo)
        const itm = await (await fetch(`/api/cat/next-item?lookup=${data.nextItemId}`)).json();
        setItem(itm);
    }
    async function answer(val) {
        await fetch("/api/sessions", {
            method: "PUT",
            body: JSON.stringify({
                sessionId,
                itemId: item.id,
                value: val
            })
        });
        await next();
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        next();
    }, []);
    if (done) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "mx-auto max-w-xl p-6 space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-xl font-bold",
                children: "Complete"
            }, void 0, false, {
                fileName: "[project]/intake-assessment-v2/src/app/sessions/[id]/page.tsx",
                lineNumber: 47,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: [
                    "Theta: ",
                    theta?.toFixed(2),
                    " | SE: ",
                    se?.toFixed(2)
                ]
            }, void 0, true, {
                fileName: "[project]/intake-assessment-v2/src/app/sessions/[id]/page.tsx",
                lineNumber: 48,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                className: "text-blue-600 underline",
                href: "/",
                children: "Start another"
            }, void 0, false, {
                fileName: "[project]/intake-assessment-v2/src/app/sessions/[id]/page.tsx",
                lineNumber: 51,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/intake-assessment-v2/src/app/sessions/[id]/page.tsx",
        lineNumber: 46,
        columnNumber: 7
    }, this);
    if (!item) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "p-6",
        children: "Loading…"
    }, void 0, false, {
        fileName: "[project]/intake-assessment-v2/src/app/sessions/[id]/page.tsx",
        lineNumber: 57,
        columnNumber: 21
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "mx-auto max-w-xl p-6 space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm text-gray-500",
                children: [
                    "Session: ",
                    sessionId
                ]
            }, void 0, true, {
                fileName: "[project]/intake-assessment-v2/src/app/sessions/[id]/page.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-lg font-semibold",
                children: item.stem
            }, void 0, false, {
                fileName: "[project]/intake-assessment-v2/src/app/sessions/[id]/page.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: item.options.labels.map((lbl, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>answer(item.options.values[i]),
                        className: "w-full border p-3 rounded hover:bg-gray-50 text-left",
                        children: lbl
                    }, i, false, {
                        fileName: "[project]/intake-assessment-v2/src/app/sessions/[id]/page.tsx",
                        lineNumber: 65,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/intake-assessment-v2/src/app/sessions/[id]/page.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm text-gray-600",
                children: [
                    "θ ",
                    theta?.toFixed(2),
                    " • SE ",
                    se?.toFixed(2)
                ]
            }, void 0, true, {
                fileName: "[project]/intake-assessment-v2/src/app/sessions/[id]/page.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/intake-assessment-v2/src/app/sessions/[id]/page.tsx",
        lineNumber: 60,
        columnNumber: 5
    }, this);
}
}),
"[project]/intake-assessment-v2/src/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/intake-assessment-v2/src/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/intake-assessment-v2/src/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/intake-assessment-v2/src/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/intake-assessment-v2/src/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__35ba7e8e._.js.map