"use client";

import { CalendarIcon, EnvelopeClosedIcon, FaceIcon, GearIcon, PersonIcon, RocketIcon } from "@radix-ui/react-icons";
import { useState } from "react";

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from "@/components/ui/command";
import { useKeyPress } from "@/hooks/useKeyPress";

export default function CommandPalette(): JSX.Element | null {
	const [shortcutPressed, setShortcutPressed] = useState(false);

	useKeyPress({
		keyPressItems: [
			{
				keys: ["Meta", "KeyK"],
				event: (): void => setShortcutPressed((prev) => !prev),
			},
			{
				keys: ["Control", "KeyK"],
				event: (): void => setShortcutPressed((prev) => !prev),
			},
			{
				keys: ["Escape"],
				event: (): void => setShortcutPressed(false),
			},
		],
	});

	if (!shortcutPressed) return null;

	return (
		<div
			className="absolute bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-opacity-10 backdrop-blur-sm backdrop-filter"
			onClick={() => setShortcutPressed(false)}>
			<Command className="h-fit rounded-lg border shadow-md md:max-w-[450px]">
				<CommandInput placeholder="Type a command or search..." />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Suggestions">
						<CommandItem>
							<CalendarIcon className="mr-2 h-4 w-4" />
							<span>Calendar</span>
						</CommandItem>
						<CommandItem>
							<FaceIcon className="mr-2 h-4 w-4" />
							<span>Search Emoji</span>
						</CommandItem>
						<CommandItem disabled>
							<RocketIcon className="mr-2 h-4 w-4" />
							<span>Launch</span>
						</CommandItem>
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading="Settings">
						<CommandItem>
							<PersonIcon className="mr-2 h-4 w-4" />
							<span>Profile</span>
							<CommandShortcut>⌘P</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<EnvelopeClosedIcon className="mr-2 h-4 w-4" />
							<span>Mail</span>
							<CommandShortcut>⌘B</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<GearIcon className="mr-2 h-4 w-4" />
							<span>Settings</span>
							<CommandShortcut>⌘S</CommandShortcut>
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</Command>
		</div>
	);
}
