"use client";

import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { AiModel } from "@/db/schema";
import { useTheme } from "next-themes";
import { Toggle } from "./ui/toggle";
import { DoorOpen, Moon, Sun } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

type BuilderNavProp = {
  aiModels: AiModel[];
};

export const BuilderNav = ({ aiModels }: BuilderNavProp) => {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  const signOut = async () => {
    await fetch("/api/sign-out", { method: "post" });
    router.push("/sign-in");
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <div className="container flex h-12 w-full items-center justify-between border-b">
      <div className="flex items-center justify-center gap-3">
        <Select defaultValue={aiModels[0].id}>
          <SelectTrigger>
            <SelectValue placeholder="Select a model" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Models</SelectLabel>
              {aiModels.map((model) => {
                return (
                  <SelectItem
                    key={model.id}
                    value={model.id}
                    disabled={!model.isAvailable}
                  >
                    {model.name}{" "}
                    {!model.isAvailable ? (
                      <Badge variant="secondary" className="ml-2">
                        coming soon
                      </Badge>
                    ) : null}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center justify-center gap-4">
        <ToggleDarkMode
          resolvedTheme={resolvedTheme}
          toggleTheme={toggleTheme}
        />
        <Button variant="ghost" onClick={signOut}>
          <DoorOpen />
        </Button>
      </div>
    </div>
  );
};

const ToggleDarkMode = ({
  toggleTheme,
  resolvedTheme,
}: {
  toggleTheme: () => void;
  resolvedTheme: string | undefined;
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Toggle onClick={toggleTheme}>
      {resolvedTheme === "dark" ? <Moon /> : <Sun />}
    </Toggle>
  );
};
