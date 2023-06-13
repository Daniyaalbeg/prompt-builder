import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { CategoryValue, PromptCategoryValuesMapping } from "@/db/schema";
import { capitalise } from "../utils/capitalise-value";
import { InfoTooltip } from "../info-tooltip";
import { InfoIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Slider } from "../ui/slider";
import { useRouter } from "next/navigation";

type Props = {
  promptId: string;
  selectedCategoryValue: CategoryValue | undefined;
  openCategoryValueModal: (cv: CategoryValue | undefined | boolean) => void;
  selectionDetails: PromptCategoryValuesMapping | undefined;
};

const updateCategoryValue = async (
  id: string,
  categoryValueId: string,
  weight: number,
  variation: string
) => {
  if (typeof weight === "undefined" || typeof variation === "undefined") return;
  await fetch(`/api/prompt/${id}/categoryValue/${categoryValueId}`, {
    method: "POST",
    body: JSON.stringify({ weight, variation }),
  });
};

export const DetailsModal = ({
  promptId,
  selectedCategoryValue,
  openCategoryValueModal,
  selectionDetails,
}: Props) => {
  const router = useRouter();
  const [weight, setWeight] = useState(selectionDetails?.weight || 1);
  const [variation, setVariation] = useState(selectionDetails?.variation || "");
  const { mutate, isLoading } = useMutation({
    mutationFn: ({
      promptId,
      categoryId,
      weight,
      variation,
    }: {
      promptId: string;
      categoryId: string;
      weight: number;
      variation: string;
    }) => updateCategoryValue(promptId, categoryId, weight, variation),
    onSuccess: () => {
      router.refresh();
      openCategoryValueModal(undefined);
    },
  });

  if (!selectedCategoryValue) return null;

  const title = capitalise(
    selectionDetails?.variation || selectedCategoryValue.chunk
  );

  return (
    <Dialog
      defaultOpen={false}
      open={!!selectedCategoryValue}
      onOpenChange={openCategoryValueModal}
    >
      <DialogContent className="sm:max-w-[460px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {selectedCategoryValue.description ||
              "Oops the description seems to be missing"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-8">
          {selectedCategoryValue.chunkVariations.length !== 0 &&
          !!selectedCategoryValue.chunkVariations[0] ? (
            <div className="grid gap-4">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold leading-none tracking-tight text-primary/80">
                  Variations
                </h3>
                <InfoTooltip
                  icon={
                    <InfoIcon size={14} className="text-muted-foreground" />
                  }
                  text={`Choose an alternate version of ${title} to use in your prompt.`}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedCategoryValue.chunkVariations.map((v) => {
                  return (
                    <button
                      key={v}
                      onClick={() => {
                        setVariation(v);
                      }}
                      className={cn(
                        "cursor-pointer rounded-2xl border-transparent bg-primary/60 px-2 py-1 text-sm text-primary-foreground hover:bg-primary",
                        { "bg-primary": variation === v }
                      )}
                    >
                      {capitalise(v)}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
          <div className="grid gap-4">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold leading-none tracking-tight text-primary/80">
                Weight
              </h3>
              <InfoTooltip
                icon={<InfoIcon size={14} className="text-muted-foreground" />}
                text={`How much emphasis do you want on this?\nSlide right for more emphasis`}
              />
            </div>
            <div>
              <Slider
                className="w-100"
                defaultValue={[weight]}
                min={1}
                max={2}
                step={0.5}
                onValueCommit={(v) => {
                  setWeight(v[0]);
                }}
              />
            </div>
          </div>
        </div>
        <DialogFooter className="mt-4">
          <Button
            onClick={() => openCategoryValueModal(undefined)}
            variant="secondary"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              mutate({
                promptId,
                categoryId: selectedCategoryValue.id,
                weight,
                variation,
              });
            }}
            disabled={isLoading}
            type="submit"
            className="w-32"
          >
            {isLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
