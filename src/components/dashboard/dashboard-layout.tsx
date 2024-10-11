"use client";

import { motion } from "framer-motion";
import { ArrowLeft, LayoutDashboard, Settings, UserSearch } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

import { cn } from "@/lib/utils";

import { Sidebar, SidebarBody, SidebarLink, SidebarLinkGroup } from "../ui/sidebar";
import { DropdownMenuDemo } from "./action-menu";
import CommandPalette from "./command-palette";

export default function DashboardLayout({ children }: { children: React.ReactNode }): JSX.Element {
	const links = [
		{
			label: "Dashboard",
			href: "#",
			icon: <LayoutDashboard className="h-5 w-5 flex-shrink-0" />,
		},
		{
			label: "Profile",
			href: "#",
			icon: <UserSearch className="h-5 w-5 flex-shrink-0" />,
		},
		{
			label: "Create Project",
			href: "/project",
			icon: <Settings className="h-5 w-5 flex-shrink-0" />,
		},
		{
			label: "Logout",
			href: "#",
			icon: <ArrowLeft className="h-5 w-5 flex-shrink-0" />,
		},
	];
	const linkGroups = [
		{
			label: "Dashboard",
			icon: <LayoutDashboard className="h-5 w-5 flex-shrink-0" />,
			links: [
				{
					label: "Dashboard",
					href: "#",
					icon: <LayoutDashboard className="h-5 w-5 flex-shrink-0" />,
				},
				{
					label: "Profile",
					href: "#",
					icon: <UserSearch className="h-5 w-5 flex-shrink-0" />,
				},
				{
					label: "Create Project",
					href: "#",
					icon: <Settings className="h-5 w-5 flex-shrink-0" />,
				},
				{
					label: "Logout",
					href: "#",
					icon: <ArrowLeft className="h-5 w-5 flex-shrink-0" />,
				},
			],
			groups: [
				{
					label: "Dashboard",
					icon: <LayoutDashboard className="h-5 w-5 flex-shrink-0" />,
					links: [
						{
							label: "Dashboard",
							href: "#",
							icon: <LayoutDashboard className="h-5 w-5 flex-shrink-0" />,
						},
						{
							label: "Profile",
							href: "#",
							icon: <UserSearch className="h-5 w-5 flex-shrink-0" />,
						},
						{
							label: "Settings",
							href: "#",
							icon: <Settings className="h-5 w-5 flex-shrink-0" />,
						},
						{
							label: "Logout",
							href: "#",
							icon: <ArrowLeft className="h-5 w-5 flex-shrink-0" />,
						},
					],
					groups: [],
				},
			],
		},
	];
	const [open, setOpen] = useState(false);
	return (
		<div
			className={cn("relative flex w-full flex-1 flex-col overflow-hidden bg-secondary md:flex-row", "h-screen")}>
			<CommandPalette />
			<Sidebar open={open} setOpen={setOpen}>
				<SidebarBody className="justify-between gap-10">
					<div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden pl-1 scrollbar-hide">
						{open ? <Logo /> : <LogoIcon />}
						<div className="mt-8 flex flex-col gap-2">
							{links.map((link, idx) => (
								<SidebarLink key={idx} link={link} />
							))}
							{linkGroups.map((group, idx) => (
								<SidebarLinkGroup key={idx} group={group} />
							))}
						</div>
					</div>
					<div className="flex w-full items-center justify-between border-t border-secondary-foreground/10 pt-2">
						<DropdownMenuDemo open={open} />
					</div>
				</SidebarBody>
			</Sidebar>
			<div className="flex flex-1">
				<div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-secondary-foreground/10 bg-background p-2 md:p-10">
					{children}
				</div>
			</div>
		</div>
	);
}

export const Logo = (): JSX.Element => {
	return (
		<Link href="#" className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black">
			<div className="h-5 w-6 flex-shrink-0 rounded-bl-sm rounded-br-lg rounded-tl-lg rounded-tr-sm bg-black dark:bg-white" />
			<motion.span
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className="whitespace-pre font-medium text-black dark:text-white">
				Acet Labs
			</motion.span>
		</Link>
	);
};

export const LogoIcon = (): JSX.Element => {
	return (
		<Link href="#" className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black">
			<div className="h-5 w-6 flex-shrink-0 rounded-bl-sm rounded-br-lg rounded-tl-lg rounded-tr-sm bg-black dark:bg-white" />
		</Link>
	);
};
