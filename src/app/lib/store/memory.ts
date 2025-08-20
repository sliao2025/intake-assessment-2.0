import { randomUUID } from "crypto";
import { ASSESSMENTS } from "../../seed/assessments";

const sessions = new Map<string, any>();

export const Sessions = {
  async create(userId: string, assessmentSlug: string, scaleCode?: string) {
    const id = randomUUID();
    const assessment = ASSESSMENTS[assessmentSlug];
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
      startedAt: Date.now(),
    });
    return { id };
  },
  async get(id: string) {
    return sessions.get(id) ?? null;
  },
  async update(id: string, patch: Partial<any>) {
    sessions.set(id, { ...sessions.get(id), ...patch });
  },
};

export const Assessments = {
  async bySlug(slug: string) {
    return ASSESSMENTS[slug] ?? null;
  },
};
