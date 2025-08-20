export async function callEngineNext(payload: any) {
  const url = process.env.NEXT_PUBLIC_ENGINE_URL || "http://localhost:8000";
  const res = await fetch(url + "/next", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Engine error");
  return res.json();
}
