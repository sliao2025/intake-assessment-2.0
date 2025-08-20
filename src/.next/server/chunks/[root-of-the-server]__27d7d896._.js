module.exports = [
"[project]/intake-assessment-v2/src/.next-internal/server/app/api/cat/next-item/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/intake-assessment-v2/src/app/seed/assessments.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ASSESSMENTS",
    ()=>ASSESSMENTS
]);
var Scale = /*#__PURE__*/ function(Scale) {
    Scale["PHQ9"] = "PHQ9";
    Scale["GAD7"] = "GAD7";
    return Scale;
}(Scale || {});
const likert = {
    labels: [
        'Not at all',
        'Several days',
        'More than half the days',
        'Nearly every day'
    ],
    values: [
        0,
        1,
        2,
        3
    ]
};
const PHQ9_ITEMS = Array.from({
    length: 9
}).map((_, i)=>({
        id: `phq9_${i + 1}`,
        scaleId: "PHQ9",
        stem: `PHQ‑9 item ${i + 1}`,
        options: likert,
        params: {
            a: 1 + i % 3 * 0.3,
            b: -1 + i * 0.25
        }
    }));
const GAD7_ITEMS = Array.from({
    length: 7
}).map((_, i)=>({
        id: `gad7_${i + 1}`,
        scaleId: "GAD7",
        stem: `GAD‑7 item ${i + 1}`,
        options: likert,
        params: {
            a: 1 + i % 2 * 0.4,
            b: -0.5 + i * 0.2
        }
    }));
const ASSESSMENTS = {
    'phq-9': {
        slug: 'phq-9',
        title: 'PHQ‑9',
        items: PHQ9_ITEMS
    },
    'gad-7': {
        slug: 'gad-7',
        title: 'GAD‑7',
        items: GAD7_ITEMS
    }
};
}),
"[project]/intake-assessment-v2/src/app/lib/store/memory.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Assessments",
    ()=>Assessments,
    "Sessions",
    ()=>Sessions
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$seed$2f$assessments$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/app/seed/assessments.ts [app-route] (ecmascript)");
;
;
const sessions = new Map();
const Sessions = {
    async create (userId, assessmentSlug, scaleCode) {
        const id = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["randomUUID"])();
        const assessment = __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$seed$2f$assessments$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ASSESSMENTS"][assessmentSlug];
        if (!assessment) throw new Error("Unknown assessment");
        sessions.set(id, {
            id,
            userId,
            assessmentSlug,
            scaleCode,
            state: "IN_PROGRESS",
            responses: [],
            theta: 0,
            seTheta: 1,
            startedAt: Date.now()
        });
        return {
            id
        };
    },
    async get (id) {
        return sessions.get(id) ?? null;
    },
    async update (id, patch) {
        sessions.set(id, {
            ...sessions.get(id),
            ...patch
        });
    }
};
const Assessments = {
    async bySlug (slug) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$seed$2f$assessments$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ASSESSMENTS"][slug] ?? null;
    }
};
}),
"[project]/intake-assessment-v2/src/app/lib/engine.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "callEngineNext",
    ()=>callEngineNext
]);
async function callEngineNext(payload) {
    const url = process.env.NEXT_PUBLIC_ENGINE_URL || "http://localhost:8000";
    const res = await fetch(url + "/next", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error("Engine error");
    return res.json();
}
}),
"[project]/intake-assessment-v2/src/app/api/cat/next-item/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$lib$2f$store$2f$memory$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/app/lib/store/memory.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$lib$2f$engine$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/intake-assessment-v2/src/app/lib/engine.ts [app-route] (ecmascript)");
;
;
async function GET(req) {
    const url = new URL(req.url);
    const id = url.searchParams.get("lookup");
    for (const a of Object.values(await __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$lib$2f$store$2f$memory$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Assessments"])){}
    // naive item lookup from fixtures
    const all = Object.values((await __turbopack_context__.A("[project]/intake-assessment-v2/src/app/seed/assessments.ts [app-route] (ecmascript, async loader)")).ASSESSMENTS).flatMap((a)=>a.items);
    const item = all.find((i)=>i.id === id);
    return Response.json(item || null);
}
async function POST(req) {
    const { sessionId } = await req.json();
    const s = await __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$lib$2f$store$2f$memory$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Sessions"].get(sessionId);
    if (!s) return new Response("Not found", {
        status: 404
    });
    const assessment = (await __turbopack_context__.A("[project]/intake-assessment-v2/src/app/seed/assessments.ts [app-route] (ecmascript, async loader)")).ASSESSMENTS[s.assessmentSlug];
    const payload = {
        scaleCode: s.scaleCode,
        theta: s.theta,
        responses: s.responses,
        items: assessment.items.map((it)=>({
                id: it.id,
                scaleId: it.scaleId,
                params: it.params
            }))
    };
    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$lib$2f$engine$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["callEngineNext"])(payload);
    await __TURBOPACK__imported__module__$5b$project$5d2f$intake$2d$assessment$2d$v2$2f$src$2f$app$2f$lib$2f$store$2f$memory$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Sessions"].update(sessionId, {
        theta: data.theta ?? s.theta,
        seTheta: data.se ?? s.seTheta,
        state: data.stop ? "COMPLETED" : "IN_PROGRESS"
    });
    return Response.json(data);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__27d7d896._.js.map