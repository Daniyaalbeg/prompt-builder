import { create } from "zustand";

type PromptState = {
  subject: string;
  setSubject: (subject: string) => void;
  style: Set<string>;
  medium: Set<string>;
  artist: Set<string>;
  genre: Set<string>;
  adjectives: Set<string>;
  cameraAngle: Set<string>;
  colour: Set<string>;
  lighting: Set<string>;
  website: Set<string>;
  resolution: Set<string>;
  renderer: Set<string>;
  levelOfDetail: Set<string>;
  emptyStore: () => void;
};

export const usePromptStore = create<PromptState>((set) => ({
  subject: "",
  setSubject: (subject: string) => set({ subject }),
  style: new Set<string>(),
  medium: new Set<string>(),
  artist: new Set<string>(),
  genre: new Set<string>(),
  adjectives: new Set<string>(),
  cameraAngle: new Set<string>(),
  colour: new Set<string>(),
  lighting: new Set<string>(),
  website: new Set<string>(),
  resolution: new Set<string>(),
  renderer: new Set<string>(),
  levelOfDetail: new Set<string>(),
  emptyStore: () =>
    set({
      subject: "",
      style: new Set<string>(),
      medium: new Set<string>(),
      artist: new Set<string>(),
      genre: new Set<string>(),
      adjectives: new Set<string>(),
      cameraAngle: new Set<string>(),
      colour: new Set<string>(),
      lighting: new Set<string>(),
      website: new Set<string>(),
      resolution: new Set<string>(),
      renderer: new Set<string>(),
      levelOfDetail: new Set<string>(),
    }),
}));
