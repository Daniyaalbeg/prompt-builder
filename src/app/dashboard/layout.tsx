import { auth } from "@/auth/lucia";
import { BuilderNav } from "@/components/builder-nav";
import { SavedPrompts } from "@/components/saved-prompts";
import { TailwindIndicator } from "@/components/utils/tailwind-indicator";
import { db } from "@/db/db";
import { aiModel } from "@/db/schema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type DashboardLayoutProp = {
  children: React.ReactNode;
};

const fetchModels = async () => {
  return await db.select().from(aiModel);
};

const DashboardLayout = async ({ children }: DashboardLayoutProp) => {
  const authRequest = auth.handleRequest({ cookies });
  const { user } = await authRequest.validateUser();
  if (!user) redirect("/sign-in");

  const aiModels = await fetchModels();

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex h-full w-full flex-row bg-background">
        <div className="h-full min-w-[16rem] border-r">
          <SavedPrompts user={user} />
        </div>
        <div className="flex h-full flex-1 flex-col">
          <BuilderNav user={user} aiModels={aiModels} />
          {children}
        </div>
      </div>
      <TailwindIndicator />
    </div>
  );
};

export default DashboardLayout;
