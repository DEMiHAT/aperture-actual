// Presentation-only adapter for the copied student dashboard. No auth or storage.
export const useAuth = () => ({ setTeam: (_team: unknown) => {} });
