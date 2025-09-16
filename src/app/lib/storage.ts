export async function storeData(payload: any) {
  const url = process.env.NEXT_PUBLIC_PATIENT_URL || "http://localhost:8001";
  const res = await fetch(url + "/store", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Storing error");
  return res.json();
}
