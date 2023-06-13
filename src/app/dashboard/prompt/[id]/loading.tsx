import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-full w-full flex-grow items-center justify-center">
      <Loader2 className="animate-spin" />
    </div>
  );
}
