"use client";
import { useEffect, useState } from "react";
import { use } from "react";

export default function SessionPage({ params }: { params: Promise<{ id: string }> }) {
  const {id : sessionId} = use(params);
  const [item, setItem] = useState<any>(null);
  const [done, setDone] = useState(false);
  const [theta, setTheta] = useState<number | null>(null);
  const [se, setSe] = useState<number | null>(null);

  async function next() {
    const r = await fetch("/api/cat/next-item", {
      method: "POST",
      body: JSON.stringify({ sessionId }),
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
    const itm = await (
      await fetch(`/api/cat/next-item?lookup=${data.nextItemId}`)
    ).json();
    setItem(itm);
  }

  async function answer(val: number) {
    await fetch("/api/sessions", {
      method: "PUT",
      body: JSON.stringify({ sessionId, itemId: item.id, value: val }),
    });
    await next();
  }

  useEffect(() => {
    next();
  }, []);

  if (done)
    return (
      <main className="mx-auto max-w-xl p-6 space-y-4">
        <h1 className="text-xl font-bold">Complete</h1>
        <p>
          Theta: {theta?.toFixed(2)} | SE: {se?.toFixed(2)}
        </p>
        <a className="text-blue-600 underline" href="/">
          Start another
        </a>
      </main>
    );

  if (!item) return <main className="p-6">Loading…</main>;

  return (
    <main className="mx-auto max-w-xl p-6 space-y-6">
      <div className="text-sm text-gray-500">Session: {sessionId}</div>
      <h2 className="text-lg font-semibold">{item.stem}</h2>
      <div className="space-y-2">
        {item.options.labels.map((lbl: string, i: number) => (
          <button
            key={i}
            onClick={() => answer(item.options.values[i])}
            className="w-full border p-3 rounded hover:bg-gray-50 text-left"
          >
            {lbl}
          </button>
        ))}
      </div>
      <div className="text-sm text-gray-600">
        θ {theta?.toFixed(2)} • SE {se?.toFixed(2)}
      </div>
    </main>
  );
}
