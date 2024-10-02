import "@/styles/globals.css";

import { ThemeProvider } from "next-themes";
import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
	return (
		<html suppressHydrationWarning lang="en">
			<head />
			<body>
				<ThemeProvider attribute="class">{children}</ThemeProvider>
			</body>
		</html>
	);
}
