import { TailwindIndicator } from "@/components/utils/tailwind-indicator"

type BuilderLayout = {
	children: React.ReactNode
}

const BuilderLayout = ({ children }: BuilderLayout) => {
	return (
		<div className="flex min-h-full flex-col">
			{children}
			<TailwindIndicator />
		</div>
	)
}

export default BuilderLayout