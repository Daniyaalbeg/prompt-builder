// import { Inter } from 'next/font/google'
import { Nav } from "@/components/nav";
import { TailwindIndicator } from "@/components/utils/tailwind-indicator";
import Link from "next/link";

const keywords = [
  "artgerm",
  "rhads",
  "centered",
  "Rossdraws",
  "mucha",
  "james jean",
  "moebius",
  "wlop",
  "alejandro jodorowsky",
  "ruan jia",
  "victo ngai",
  "ross tran",
  "madhouse",
  "zabrocki",
  "alex ross",
  "Sakimichan",
  "beksinski",
  "ghibli",
  "rutkowski",
  "surikov",
  "rococo",
  "Earl Moran",
  "Sung Choi",
  "caravaggio",
  "Phuoc Quan",
  "ufotable",
  "dndbeyond",
  "RHADS",
  "jim burns",
  "feng zhu",
  "bouguereau",
  "wit studio",
  "louis wain",
  "alan lee",
  "Russ Mills",
  "kaoru mori",
  "luis royo",
  "hr giger",
  "Ed Repka",
  "vasnetsov",
  "Karol Bak",
  "Art Frahm",
  "max ernst",
  "john howe",
];

const keywords2 = [
  "artgerm",
  "rhads",
  "centered",
  "Rossdraws",
  "mucha",
  "james jean",
  "moebius",
  "wlop",
  "alejandro jodorowsky",
  "ruan jia",
  "victo ngai",
  "ross tran",
  "madhouse",
  "zabrocki",
  "alex ross",
  "Sakimichan",
  "beksinski",
  "ghibli",
  "rutkowski",
  "surikov",
  "rococo",
  "Earl Moran",
  "Sung Choi",
  "caravaggio",
  "Phuoc Quan",
  "ufotable",
  "dndbeyond",
  "RHADS",
  "jim burns",
  "feng zhu",
  "bouguereau",
  "wit studio",
  "louis wain",
  "alan lee",
  "Russ Mills",
  "kaoru mori",
  "luis royo",
  "hr giger",
  "Ed Repka",
  "vasnetsov",
  "Karol Bak",
  "Art Frahm",
  "max ernst",
  "john howe",
];

export default function Home() {
  return (
    <>
      {/* <Nav /> */}
      <main className="h-full w-full bg-primary-foreground">
        <div className="h-3/4 w-full overflow-hidden bg-primary/95">
          <div className="w-ful flex h-full -skew-x-2 -skew-y-2 transform-gpu flex-col gap-1">
            <div className="flex w-full flex-grow animate-cards-transform-left items-center justify-center gap-1">
              {keywords.map((k) => {
                return <Keyword k={k} key={k} />;
              })}
              d
            </div>
            <div className="flex w-full flex-grow animate-cards-transform-right items-center justify-center gap-1">
              {keywords.map((k) => {
                return <Keyword k={k} key={k} />;
              })}
            </div>
            <div className="flex w-full flex-grow animate-cards-transform-left items-center justify-center gap-1">
              {keywords.map((k) => {
                return <Keyword k={k} key={k} />;
              })}
            </div>
            <div className="flex w-full flex-grow animate-cards-transform-right items-center justify-center gap-1">
              {keywords.map((k) => {
                return <Keyword k={k} key={k} />;
              })}
            </div>
            <div className="flex w-full flex-grow animate-cards-transform-left items-center justify-center gap-1">
              {keywords.map((k) => {
                return <Keyword k={k} key={k} />;
              })}
            </div>
            <div className="flex w-full flex-grow animate-cards-transform-right items-center justify-center gap-1">
              {keywords.map((k) => {
                return <Keyword k={k} key={k} />;
              })}
            </div>
          </div>
        </div>

        <div className="container h-full w-full bg-primary-foreground">
          <h1 className="text-4xl font-semibold tracking-tight">
            Prompt Stuff
          </h1>
          <h2>Helping you create image prompts as quickly</h2>
        </div>
        {/* <Link href="/dashboard" className="text-white">
          Sign in
        </Link> */}
        <TailwindIndicator />
      </main>
    </>
  );
}

const Keyword = ({ k }: { k: string }) => {
  return (
    <div
      className={`group grid h-full max-w-fit transform-gpu items-center justify-center rounded-2xl bg-primary px-8 py-6 blur-sm transition-all duration-700 ease-in-out hover:scale-110 hover:shadow-2xl hover:shadow-blue-800 hover:blur-0`}
    >
      <p className="select-none whitespace-nowrap text-xl font-semibold tracking-tight text-primary-foreground transition-transform duration-700 ease-in-out group-hover:scale-90">
        {k}
      </p>
    </div>
  );
};
