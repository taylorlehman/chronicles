/**
 * Deterministic seeded PRNG (Mulberry32) for pure headless simulation.
 * Operates on `state.rngState` so every GameState snapshot is 100% reproducible.
 */

export function normalizeSeed(seed: number): number {
  const s = (seed | 0) >>> 0;
  return s === 0 ? 0x6d2b79f5 : s;
}

/** Advance Mulberry32 state and return a float in [0, 1) plus the next state. */
export function nextRandom(rngState: number): { value: number; nextState: number } {
  const nextState = (rngState + 0x6d2b79f5) >>> 0;
  let t = Math.imul(nextState ^ (nextState >>> 15), 1 | nextState);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  const value = ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  return { value, nextState };
}

/** Return an integer in [min, max] inclusive. */
export function nextInt(
  rngState: number,
  min: number,
  max: number,
): { value: number; nextState: number } {
  if (max <= min) return { value: min, nextState: rngState };
  const { value, nextState } = nextRandom(rngState);
  return {
    value: min + Math.floor(value * (max - min + 1)),
    nextState,
  };
}

/** Deterministic Fisher-Yates shuffle returning a new array and next RNG state. */
export function shuffleArray<T>(
  items: readonly T[],
  rngState: number,
): { result: T[]; nextState: number } {
  const result = items.slice();
  let state = rngState;
  for (let i = result.length - 1; i > 0; i--) {
    const r = nextInt(state, 0, i);
    state = r.nextState;
    const j = r.value;
    const tmp = result[i];
    result[i] = result[j];
    result[j] = tmp;
  }
  return { result, nextState: state };
}
