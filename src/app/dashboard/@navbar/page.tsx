import { BuilderNav } from "@/components/builder-nav";
import { getAiModels } from "@/server-requests/ai-model";

export default async function Page() {
  const aiModels = await getAiModels();

  return <BuilderNav aiModels={aiModels} />;
}
