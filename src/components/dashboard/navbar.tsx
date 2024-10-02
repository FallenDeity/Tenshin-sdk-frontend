"use client";

import { motion } from "framer-motion";
import { ArrowLeft, LayoutDashboard, Settings, UserSearch } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import { cn } from "@/lib/utils";

import { Sidebar, SidebarBody, SidebarLink, SidebarLinkGroup } from "../ui/sidebar";
import DarkModeToggleV2 from "../ui/theme-toggle";

export function SidebarDemo(): JSX.Element {
	const links = [
		{
			label: "Dashboard",
			href: "#",
			icon: <LayoutDashboard className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />,
		},
		{
			label: "Profile",
			href: "#",
			icon: <UserSearch className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />,
		},
		{
			label: "Settings",
			href: "#",
			icon: <Settings className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />,
		},
		{
			label: "Logout",
			href: "#",
			icon: <ArrowLeft className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />,
		},
	];
	const linkGroups = [
		{
			label: "Dashboard",
			icon: <LayoutDashboard className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />,
			links: [
				{
					label: "Dashboard",
					href: "#",
					icon: <LayoutDashboard className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />,
				},
				{
					label: "Profile",
					href: "#",
					icon: <UserSearch className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />,
				},
				{
					label: "Settings",
					href: "#",
					icon: <Settings className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />,
				},
				{
					label: "Logout",
					href: "#",
					icon: <ArrowLeft className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />,
				},
			],
			groups: [
				{
					label: "Dashboard",
					icon: <LayoutDashboard className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />,
					links: [
						{
							label: "Dashboard",
							href: "#",
							icon: (
								<LayoutDashboard className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
							),
						},
						{
							label: "Profile",
							href: "#",
							icon: (
								<UserSearch className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
							),
						},
						{
							label: "Settings",
							href: "#",
							icon: <Settings className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />,
						},
						{
							label: "Logout",
							href: "#",
							icon: (
								<ArrowLeft className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
							),
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
			className={cn(
				"flex w-full flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800 md:flex-row",
				"h-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
			)}>
			<Sidebar open={open} setOpen={setOpen}>
				<SidebarBody className="justify-between gap-10">
					<div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
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
					<div className="flex w-full items-center justify-between border-t border-neutral-200 pt-2 dark:border-neutral-700">
						<SidebarLink
							link={{
								label: "Manu Arora",
								href: "#",
								icon: (
									<Image
										src="https://assets.aceternity.com/manu.png"
										className="h-7 w-7 flex-shrink-0 rounded-full"
										width={50}
										height={50}
										alt="Avatar"
									/>
								),
							}}
						/>
						{open && <DarkModeToggleV2 />}
					</div>
				</SidebarBody>
			</Sidebar>
			<Dashboard />
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

// Dummy dashboard component with content
const Dashboard = (): JSX.Element => {
	return (
		<div className="flex flex-1">
			<div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 dark:border-neutral-700 dark:bg-neutral-900 md:p-10">
				<div className="flex gap-2">
					{new Array(4).fill(0).map((_, i) => (
						<div
							key={"first-array" + i}
							className="h-20 w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800"></div>
					))}
				</div>
				<div className="flex flex-1 gap-2">
					{new Array(4).fill(0).map((_, i) => (
						<div
							key={"second-array" + i}
							className="h-full w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800"></div>
					))}
				</div>
			</div>
		</div>
	);
};
