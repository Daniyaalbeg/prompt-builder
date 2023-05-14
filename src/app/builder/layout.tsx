import { BuilderNav } from "@/components/builder-nav"
import { SavedPrompts } from "@/components/saved-prompts"
import { TailwindIndicator } from "@/components/tailwind-indicator"

type BuilderLayout = {
	children: React.ReactNode
}

const BuilderLayout = ({ children }: BuilderLayout) => {
	return (
		<div className="flex min-h-full flex-col">
			<BuilderNav />
			<div className="h-full w-full flex flex-grow flex-row bg-red-300">
			<div className="bg-green-300 min-w-[20rem]">
				<SavedPrompts />
			</div>
			<div className="bg-blue-300 w-full">
				{children}
			</div>
		</div>
			<TailwindIndicator />
		</div>
	)
}

export default BuilderLayout