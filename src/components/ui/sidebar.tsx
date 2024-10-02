"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Link, { LinkProps } from "next/link";
import React, { createContext, useContext, useState } from "react";

import { cn } from "@/lib/utils";
import { slideIn } from "@/lib/variants";

interface Links {
	label: string;
	href: string;
	icon: React.JSX.Element | React.ReactNode;
}

interface LinkGroup {
	label: string;
	icon: React.JSX.Element | React.ReactNode;
	links: Links[];
	groups: LinkGroup[];
}

interface SidebarContextProps {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const useSidebar = (): SidebarContextProps => {
	const context = useContext(SidebarContext);
	if (!context) {
		throw new Error("useSidebar must be used within a SidebarProvider");
	}
	return context;
};

export const SidebarProvider = ({
	children,
	open: openProp,
	setOpen: setOpenProp,
	animate = true,
}: {
	children: React.ReactNode;
	open?: boolean;
	setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
	animate?: boolean;
}): JSX.Element => {
	const [openState, setOpenState] = useState(false);

	const open = openProp !== undefined ? openProp : openState;
	const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

	return <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>{children}</SidebarContext.Provider>;
};

export const Sidebar = ({
	children,
	open,
	setOpen,
	animate,
}: {
	children: React.ReactNode;
	open?: boolean;
	setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
	animate?: boolean;
}): JSX.Element => {
	return (
		<SidebarProvider open={open} setOpen={setOpen} animate={animate}>
			{children}
		</SidebarProvider>
	);
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>): JSX.Element => {
	return (
		<>
			<DesktopSidebar {...props} />
			<MobileSidebar {...(props as React.ComponentProps<"div">)} />
		</>
	);
};

export const DesktopSidebar = ({
	className,
	children,
	...props
}: React.ComponentProps<typeof motion.div>): JSX.Element => {
	const { open, setOpen, animate } = useSidebar();
	return (
		<>
			<motion.div
				className={cn(
					"hidden h-full w-[300px] flex-shrink-0 bg-secondary px-4 py-4 md:flex md:flex-col",
					className
				)}
				animate={{
					width: animate ? (open ? "300px" : "60px") : "300px",
				}}
				onMouseEnter={() => setOpen(true)}
				onMouseLeave={() => setOpen(false)}
				{...props}>
				{children}
			</motion.div>
		</>
	);
};

export const MobileSidebar = ({ className, children, ...props }: React.ComponentProps<"div">): JSX.Element => {
	const { open, setOpen } = useSidebar();
	return (
		<>
			<div
				className={cn(
					"flex h-10 w-full flex-row items-center justify-between bg-secondary px-4 py-4 md:hidden"
				)}
				{...props}>
				<div className="z-20 flex w-full justify-end">
					<Menu onClick={() => setOpen(!open)} />
				</div>
				<AnimatePresence>
					{open && (
						<motion.div
							initial={{ x: "-100%", opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							exit={{ x: "-100%", opacity: 0 }}
							transition={{
								duration: 0.3,
								ease: "easeInOut",
							}}
							className={cn(
								"fixed inset-0 z-[100] flex h-full w-full flex-col justify-between bg-secondary p-10",
								className
							)}>
							<div className="absolute right-10 top-10 z-50" onClick={() => setOpen(!open)}>
								<X />
							</div>
							{children}
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</>
	);
};

export const SidebarLink = ({
	link,
	className,
	...props
}: {
	link: Links;
	className?: string;
	props?: LinkProps;
}): JSX.Element => {
	const { open, animate } = useSidebar();
	return (
		<Link
			href={link.href}
			className={cn("group/sidebar flex items-center justify-start gap-2 py-2", className)}
			{...props}>
			{link.icon}

			<motion.span
				animate={{
					display: animate ? (open ? "inline-block" : "none") : "inline-block",
					opacity: animate ? (open ? 1 : 0) : 1,
				}}
				className="!m-0 inline-block whitespace-pre !p-0 text-sm transition duration-150 group-hover/sidebar:translate-x-1">
				{link.label}
			</motion.span>
		</Link>
	);
};

export const SidebarLinkGroup = ({
	group,
	className,
	...props
}: {
	group: LinkGroup;
	className?: string;
	props?: LinkProps;
}): JSX.Element => {
	const { open, animate } = useSidebar();
	const [collapsed, setCollapsed] = useState(false);

	React.useEffect(() => {
		if (!open && !collapsed) {
			setCollapsed(true);
		}
	}, [open]);

	return (
		<div className={cn("flex flex-col", className)} {...props}>
			{open ? (
				<div
					className="group/sidebar flex cursor-pointer items-center justify-between gap-2 py-2"
					onClick={() => setCollapsed(!collapsed)}>
					<span className="flex items-center gap-2 text-sm">
						{group.icon}
						<motion.span
							animate={{
								display: animate ? (open ? "inline-block" : "none") : "inline-block",
								opacity: animate ? (open ? 1 : 0) : 1,
							}}
							className="!m-0 inline-block whitespace-pre !p-0 text-sm transition duration-150 group-hover/sidebar:translate-x-1">
							{group.label}
						</motion.span>
					</span>
					<motion.div
						initial={false}
						animate={{ rotate: collapsed ? 0 : 180 }}
						transition={{ duration: 0.3 }}
						className="transform-gpu">
						<ChevronDown className="h-4 w-4 text-muted-foreground" />
					</motion.div>
				</div>
			) : (
				<div className="group/sidebar flex cursor-pointer items-center gap-2 py-2">
					{group.icon}
					<motion.span
						animate={{
							display: animate ? (open ? "inline-block" : "none") : "inline-block",
							opacity: animate ? (open ? 1 : 0) : 1,
						}}
						className="!m-0 inline-block whitespace-pre !p-0 text-sm transition duration-150 group-hover/sidebar:translate-x-1">
						{group.label}
					</motion.span>
				</div>
			)}
			<motion.div
				className="flex flex-col overflow-hidden"
				initial={false}
				animate={{ height: collapsed || !open ? 0 : "auto" }}
				transition={{ delay: (group.links.length + group.groups.length - 2) * 0.1 * 0.3, duration: 0.3 }}>
				{group.links.map((link, idx) => (
					<motion.div
						key={idx}
						initial="hidden"
						whileInView="animate"
						custom={collapsed}
						variants={slideIn("left", "tween", 0.1 * idx, 0.3)}>
						<SidebarLink key={idx} link={link} className="pl-6" />
					</motion.div>
				))}
				{group.groups.map((group, idx) => (
					<motion.div
						key={idx}
						initial="hidden"
						whileInView="animate"
						custom={collapsed}
						variants={slideIn("left", "tween", 0.1 * idx + (group.links.length + 1) * 0.1, 0.3)}>
						<SidebarLinkGroup key={idx} group={group} className="pl-6" />
					</motion.div>
				))}
			</motion.div>
		</div>
	);
};
