import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type Props = {
  icon: React.ReactNode;
  text: string;
};

export const InfoTooltip = ({ icon, text }: Props) => {
  return (
    <TooltipProvider disableHoverableContent>
      <Tooltip defaultOpen={false}>
        <TooltipTrigger asChild>
          <button>{icon}</button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs text-center">{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
