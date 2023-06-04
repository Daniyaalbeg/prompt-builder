"use client";

import { User } from "lucia-auth";
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
import { Moon, Sun } from "lucide-react";
import { Badge } from "./ui/badge";

type BuilderNavProp = {
  user: User;
  aiModels: AiModel[];
};

export const BuilderNav = ({ user, aiModels }: BuilderNavProp) => {
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
        {/* <div className="bg-gradient-to-br from-blue-400 to-green-400 rounded-full h-4 w-4" />
				<p className="text-gray-400 text-sm font-sans">prompt stuff</p> */}
      </div>
      <div className="flex items-center justify-center gap-4">
        <button onClick={signOut}>Sign out {user.username}</button>
        <Toggle onClick={toggleTheme}>
          {" "}
          {resolvedTheme === "dark" ? <Moon /> : <Sun />}{" "}
        </Toggle>
      </div>
    </div>
  );
};
