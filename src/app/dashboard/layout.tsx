import { TailwindIndicator } from "@/components/utils/tailwind-indicator";
import { getUser } from "@/server-requests/user";
import { Metadata } from "next";

type DashboardLayoutProp = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  navbar: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Prompt Stuff",
  description: "Organise and create your AI prompts",
};

const DashboardLayout = async ({
  children,
  sidebar,
  navbar,
}: DashboardLayoutProp) => {
  const user = await getUser();

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex h-full w-full flex-row bg-background">
        {sidebar}
        <div className="flex h-full flex-1 flex-col">
          {navbar}
          {children}
        </div>
      </div>
      <TailwindIndicator />
    </div>
  );
};

export default DashboardLayout;
