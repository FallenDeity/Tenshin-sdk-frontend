import React from "react";

import DashboardLayout from "@/components/dashboard/dashboard-layout";

export default function Layout({ children }: { children: React.ReactNode }): React.JSX.Element {
	return <DashboardLayout>{children}</DashboardLayout>;
}
