import React from "react";

export default function Page(): React.JSX.Element {
	return (
		<>
			<div className="flex gap-2">
				{new Array(4).fill(0).map((_, i) => (
					<div key={"first-array" + i} className="h-20 w-full animate-pulse rounded-lg bg-accent"></div>
				))}
			</div>
			<div className="flex flex-1 gap-2">
				{new Array(4).fill(0).map((_, i) => (
					<div key={"second-array" + i} className="h-full w-full animate-pulse rounded-lg bg-accent"></div>
				))}
			</div>
		</>
	);
}
