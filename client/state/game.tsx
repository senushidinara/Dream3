import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type GameState = {
  fragments: number;
  shards: number;
  keys: number;
  unlockedIslands: Record<string, boolean>;
  collected: Record<string, true>; // fragment ids collected
};

export type GameActions = {
  collectFragment: (id: string) => void;
  unlockIsland: (id: string) => void;
  awardShard: (count?: number) => void;
  awardKey: (count?: number) => void;
  reset: () => void;
};

const DEFAULT_STATE: GameState = {
  fragments: 0,
  shards: 0,
  keys: 0,
  unlockedIslands: {},
  collected: {},
};

const STORAGE_KEY = "mind-palace-state";

const GameContext = createContext<(GameState & GameActions) | null>(null);

function loadState(): GameState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as GameState;
    return {
      ...DEFAULT_STATE,
      ...parsed,
      unlockedIslands: parsed.unlockedIslands || {},
      collected: parsed.collected || {},
    };
  } catch {
    return DEFAULT_STATE;
  }
}

function saveState(state: GameState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<GameState>(() => loadState());

  useEffect(() => {
    saveState(state);
  }, [state]);

  const actions: GameActions = useMemo(
    () => ({
      collectFragment: (id: string) => {
        setState((prev) => {
          if (prev.collected[id]) return prev;
          return {
            ...prev,
            fragments: prev.fragments + 1,
            collected: { ...prev.collected, [id]: true },
          };
        });
      },
      unlockIsland: (id: string) => {
        setState((prev) => ({
          ...prev,
          unlockedIslands: { ...prev.unlockedIslands, [id]: true },
        }));
      },
      awardShard: (count = 1) => {
        setState((prev) => ({ ...prev, shards: prev.shards + count }));
      },
      awardKey: (count = 1) => {
        setState((prev) => ({ ...prev, keys: prev.keys + count }));
      },
      reset: () => setState(DEFAULT_STATE),
    }),
    [],
  );

  const value = { ...state, ...actions };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
}
