"use client";

import { Eye, EyeOff, PlusCircle, X } from "lucide-react";
// import { ProjectOptions } from "next/dist/build/swc";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

interface Variable {
	variable_name: string;
	variable_id: string;
	variable_type: string;
	description: string;
	unit: string;
	read_only: boolean;
	update_interval: number;
	visual_type: string;
	default_value: number;
	update_type: string;
	enabled: boolean;
}

interface VariableGroup {
	group_name: string;
	group_id: string;
	group_description: string;
	enabled: boolean;
	variables: Variable[];
}

interface ProjectData {
	project_name: string;
	project_description: string;
	project_id: string;
	project_secret: string;
	protocol: string;
	protocol_config: {
		ssid: string;
		password: string;
		hostname: string;
		port: number;
	};
	variable_groups: VariableGroup[];
	logging: {
		enabled: boolean;
		level: string;
	};
	retry_policy: {
		enabled: boolean;
		max_retries: number;
		retry_interval: number;
	};
}

export default function Component(): JSX.Element {
	const [projectData, setProjectData] = useState<ProjectData>({
		project_name: "",
		project_description: "",
		project_id: "",
		project_secret: "",
		protocol: "wifi",
		protocol_config: {
			ssid: "",
			password: "",
			hostname: "",
			port: 8000,
		},
		variable_groups: [],
		logging: {
			enabled: true,
			level: "info",
		},
		retry_policy: {
			enabled: true,
			max_retries: 3,
			retry_interval: 1000,
		},
	});

	const [newGroup, setNewGroup] = useState<VariableGroup>({
		group_name: "",
		group_id: "",
		group_description: "",
		enabled: true,
		variables: [],
	});

	const [newVariable, setNewVariable] = useState<Variable>({
		variable_name: "",
		variable_id: "",
		variable_type: "float",
		description: "",
		unit: "",
		read_only: false,
		update_interval: 1000,
		visual_type: "gauge",
		default_value: 0,
		update_type: "periodic",
		enabled: true,
	});

	const [showPassword, setShowPassword] = useState(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
		const { name, value } = e.target;
		setProjectData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleProtocolConfigChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setProjectData((prevData) => ({
			...prevData,
			protocol_config: {
				...prevData.protocol_config,
				[name]: name === "port" ? parseInt(value) : value,
			},
		}));
	};

	const handleSwitchChange = (checked: boolean, name: "logging" | "retry_policy"): void => {
		setProjectData((prevData) => ({
			...prevData,
			[name]: {
				...prevData[name],
				enabled: checked,
			},
		}));
	};

	const handleSelectChange = (value: string, name: "logging" | "retry_policy"): void => {
		setProjectData((prevData) => ({
			...prevData,
			[name]: {
				...prevData[name],
				level: value,
			},
		}));
	};

	const handleSubmit = (e: React.FormEvent): void => {
		e.preventDefault();
		console.log("Project data submitted:", projectData);
		// Here you would typically send the data to your backend
	};

	const handleAddGroup = (): void => {
		if (newGroup.group_name && newGroup.group_id) {
			setProjectData((prevData) => ({
				...prevData,
				variable_groups: [...prevData.variable_groups, { ...newGroup, variables: [] }],
			}));
			setNewGroup({
				group_name: "",
				group_id: "",
				group_description: "",
				enabled: true,
				variables: [],
			});
		}
	};

	const handleAddVariable = (groupId: string): void => {
		if (newVariable.variable_name && newVariable.variable_id) {
			setProjectData((prevData) => ({
				...prevData,
				variable_groups: prevData.variable_groups.map((group) =>
					group.group_id === groupId ? { ...group, variables: [...group.variables, newVariable] } : group
				),
			}));
			setNewVariable({
				variable_name: "",
				variable_id: "",
				variable_type: "float",
				description: "",
				unit: "",
				read_only: false,
				update_interval: 1000,
				visual_type: "gauge",
				default_value: 0,
				update_type: "periodic",
				enabled: true,
			});
		}
	};

	const handleRemoveGroup = (groupId: string): void => {
		setProjectData((prevData) => ({
			...prevData,
			variable_groups: prevData.variable_groups.filter((group) => group.group_id !== groupId),
		}));
	};

	const handleRemoveVariable = (groupId: string, variableId: string): void => {
		setProjectData((prevData) => ({
			...prevData,
			variable_groups: prevData.variable_groups.map((group) =>
				group.group_id === groupId
					? { ...group, variables: group.variables.filter((v) => v.variable_id !== variableId) }
					: group
			),
		}));
	};

	return (
		<div className="container mx-auto py-10">
			<div className="mb-6 flex items-center justify-between">
				<h1 className="text-3xl font-bold">Create New Project</h1>
			</div>
			<form onSubmit={handleSubmit} className="space-y-8">
				<Tabs defaultValue="details" className="w-full">
					<TabsList className="grid w-full grid-cols-5">
						<TabsTrigger value="details">Details</TabsTrigger>
						<TabsTrigger value="protocol">Protocol</TabsTrigger>
						<TabsTrigger value="variables">Variables</TabsTrigger>
						<TabsTrigger value="logging">Logging</TabsTrigger>
						<TabsTrigger value="retry">Retry Policy</TabsTrigger>
					</TabsList>
					<TabsContent value="details">
						<Card>
							<CardHeader>
								<CardTitle>Project Details</CardTitle>
								<CardDescription>Enter your project information</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="project_name">Project Name</Label>
									<Input
										id="project_name"
										name="project_name"
										value={projectData.project_name}
										onChange={handleInputChange}
										placeholder="Enter project name"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="project_description">Project Description</Label>
									<Textarea
										id="project_description"
										name="project_description"
										value={projectData.project_description}
										onChange={handleInputChange}
										placeholder="Enter project description"
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="project_id">Project ID</Label>
									<Input
										id="project_id"
										name="project_id"
										value={projectData.project_id}
										onChange={handleInputChange}
										placeholder="Enter project id"
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="project_secret">Project Secret</Label>
									<div className="relative">
										<Input
											id="project_secret"
											name="project_secret"
											type={showPassword ? "text" : "password"}
											value={projectData.project_secret}
											onChange={handleInputChange}
											placeholder="Enter project secret"
										/>
										<Button
											type="button"
											variant="ghost"
											size="icon"
											className="absolute right-2 top-1/2 -translate-y-1/2"
											onClick={() => setShowPassword(!showPassword)}>
											{showPassword ? (
												<EyeOff className="h-4 w-4" />
											) : (
												<Eye className="h-4 w-4" />
											)}
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					</TabsContent>
					<TabsContent value="protocol">
						<Card>
							<CardHeader>
								<CardTitle>Protocol Configuration</CardTitle>
								<CardDescription>Configure WiFi settings for your project</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="ssid">SSID</Label>
									<Input
										id="ssid"
										name="ssid"
										value={projectData.protocol_config.ssid}
										onChange={handleProtocolConfigChange}
										placeholder="Enter WiFi SSID"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="password">Password</Label>
									<div className="relative">
										<Input
											id="password"
											name="password"
											type={showPassword ? "text" : "password"}
											value={projectData.protocol_config.password}
											onChange={handleProtocolConfigChange}
											placeholder="Enter WiFi password"
										/>
										<Button
											type="button"
											variant="ghost"
											size="icon"
											className="absolute right-2 top-1/2 -translate-y-1/2"
											onClick={() => setShowPassword(!showPassword)}>
											{showPassword ? (
												<EyeOff className="h-4 w-4" />
											) : (
												<Eye className="h-4 w-4" />
											)}
										</Button>
									</div>
								</div>
								<div className="space-y-2">
									<Label htmlFor="hostname">Hostname</Label>
									<Input
										id="hostname"
										name="hostname"
										value={projectData.protocol_config.hostname}
										onChange={handleProtocolConfigChange}
										placeholder="Enter hostname"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="port">Port</Label>
									<Input
										id="port"
										name="port"
										type="number"
										value={projectData.protocol_config.port}
										onChange={handleProtocolConfigChange}
										placeholder="Enter port number"
									/>
								</div>
							</CardContent>
						</Card>
					</TabsContent>
					<TabsContent value="variables">
						<Card>
							<CardHeader>
								<CardTitle>Variable Groups</CardTitle>
								<CardDescription>Create and manage variable groups and their variables</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<Dialog>
									<DialogTrigger asChild>
										<Button className="mb-4">
											<PlusCircle className="mr-2 h-4 w-4" />
											Add Variable Group
										</Button>
									</DialogTrigger>
									<DialogContent className="sm:max-w-[425px]">
										<DialogHeader>
											<DialogTitle>Add Variable Group</DialogTitle>
											<DialogDescription>
												Create a new variable group for your project.
											</DialogDescription>
										</DialogHeader>
										<div className="grid gap-4 py-4">
											<div className="grid grid-cols-4 items-center gap-4">
												<Label htmlFor="group_name" className="text-right">
													Name
												</Label>
												<Input
													id="group_name"
													value={newGroup.group_name}
													onChange={(e) =>
														setNewGroup({ ...newGroup, group_name: e.target.value })
													}
													className="col-span-3"
												/>
											</div>
											<div className="grid grid-cols-4 items-center gap-4">
												<Label htmlFor="group_id" className="text-right">
													ID
												</Label>
												<Input
													id="group_id"
													value={newGroup.group_id}
													onChange={(e) =>
														setNewGroup({ ...newGroup, group_id: e.target.value })
													}
													className="col-span-3"
												/>
											</div>
											<div className="grid grid-cols-4 items-center gap-4">
												<Label htmlFor="group_description" className="text-right">
													Description
												</Label>
												<Textarea
													id="group_description"
													value={newGroup.group_description}
													onChange={(e) =>
														setNewGroup({ ...newGroup, group_description: e.target.value })
													}
													className="col-span-3"
												/>
											</div>
										</div>
										<DialogFooter>
											<Button type="button" onClick={handleAddGroup}>
												Add Group
											</Button>
										</DialogFooter>
									</DialogContent>
								</Dialog>
								{projectData.variable_groups.map((group, groupIndex) => (
									<Card key={group.group_id} className="mb-4">
										<CardHeader>
											<div className="flex items-center justify-between">
												<CardTitle>{group.group_name}</CardTitle>
												<Button
													variant="ghost"
													size="icon"
													onClick={() => handleRemoveGroup(group.group_id)}>
													<X className="h-4 w-4" />
												</Button>
											</div>
											<CardDescription>{group.group_description}</CardDescription>
										</CardHeader>
										<CardContent>
											<div className="mb-4 flex items-center space-x-2">
												<Switch
													id={`group-enabled-${groupIndex}`}
													checked={group.enabled}
													onCheckedChange={(checked) =>
														setProjectData((prevData) => ({
															...prevData,
															variable_groups: prevData.variable_groups.map((g, i) =>
																i === groupIndex ? { ...g, enabled: checked } : g
															),
														}))
													}
												/>
												<Label htmlFor={`group-enabled-${groupIndex}`}>Enabled</Label>
											</div>
											<Dialog>
												<DialogTrigger asChild>
													<Button className="mb-4">
														<PlusCircle className="mr-2 h-4 w-4" />
														Add Variable
													</Button>
												</DialogTrigger>
												<DialogContent className="sm:max-w-[425px]">
													<DialogHeader>
														<DialogTitle>Add Variable</DialogTitle>
														<DialogDescription>
															Add a new variable to this group.
														</DialogDescription>
													</DialogHeader>
													<div className="grid gap-4 py-4">
														<div className="grid grid-cols-4 items-center gap-4">
															<Label htmlFor="variable_name" className="text-right">
																Name
															</Label>
															<Input
																id="variable_name"
																value={newVariable.variable_name}
																onChange={(e) =>
																	setNewVariable({
																		...newVariable,
																		variable_name: e.target.value,
																	})
																}
																className="col-span-3"
															/>
														</div>
														<div className="grid grid-cols-4 items-center gap-4">
															<Label htmlFor="variable_id" className="text-right">
																ID
															</Label>
															<Input
																id="variable_id"
																value={newVariable.variable_id}
																onChange={(e) =>
																	setNewVariable({
																		...newVariable,
																		variable_id: e.target.value,
																	})
																}
																className="col-span-3"
															/>
														</div>
														<div className="grid grid-cols-4 items-center gap-4">
															<Label htmlFor="variable_type" className="text-right">
																Type
															</Label>
															<Select
																value={newVariable.variable_type}
																onValueChange={(value) =>
																	setNewVariable({
																		...newVariable,
																		variable_type: value,
																	})
																}>
																<SelectTrigger className="col-span-3">
																	<SelectValue placeholder="Select variable type" />
																</SelectTrigger>
																<SelectContent>
																	<SelectItem value="float">Float</SelectItem>
																	<SelectItem value="integer">Integer</SelectItem>
																	<SelectItem value="string">String</SelectItem>
																	<SelectItem value="boolean">Boolean</SelectItem>
																</SelectContent>
															</Select>
														</div>
														<div className="grid grid-cols-4 items-center gap-4">
															<Label htmlFor="description" className="text-right">
																Description
															</Label>
															<Input
																id="description"
																value={newVariable.description}
																onChange={(e) =>
																	setNewVariable({
																		...newVariable,
																		description: e.target.value,
																	})
																}
																className="col-span-3"
															/>
														</div>
													</div>
													<DialogFooter>
														<Button
															type="button"
															onClick={() => handleAddVariable(group.group_id)}>
															Add Variable
														</Button>
													</DialogFooter>
												</DialogContent>
											</Dialog>
											{group.variables.map((variable) => (
												<div key={variable.variable_id} className="mb-2 rounded border p-2">
													<div className="flex items-center justify-between">
														<h4 className="font-medium">{variable.variable_name}</h4>
														<Button
															variant="ghost"
															size="icon"
															onClick={() =>
																handleRemoveVariable(
																	group.group_id,
																	variable.variable_id
																)
															}>
															<X className="h-4 w-4" />
														</Button>
													</div>
													<p className="text-sm text-muted-foreground">
														{variable.description}
													</p>
													<p className="text-sm">
														Type: {variable.variable_type}, Unit: {variable.unit}
													</p>
												</div>
											))}
										</CardContent>
									</Card>
								))}
							</CardContent>
						</Card>
					</TabsContent>
					<TabsContent value="logging">
						<Card>
							<CardHeader>
								<CardTitle>Logging</CardTitle>
								<CardDescription>Configure logging settings</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center space-x-2">
									<Switch
										id="logging-enabled"
										checked={projectData.logging.enabled}
										onCheckedChange={(checked) => handleSwitchChange(checked, "logging")}
									/>
									<Label htmlFor="logging-enabled">Enable Logging</Label>
								</div>
								<div className="space-y-2">
									<Label htmlFor="logging-level">Logging Level</Label>
									<Select
										value={projectData.logging.level}
										onValueChange={(value) => handleSelectChange(value, "logging")}>
										<SelectTrigger>
											<SelectValue placeholder="Select logging level" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="info">Info</SelectItem>
											<SelectItem value="warn">Warn</SelectItem>
											<SelectItem value="error">Error</SelectItem>
											<SelectItem value="debug">Debug</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</CardContent>
						</Card>
					</TabsContent>
					<TabsContent value="retry">
						<Card>
							<CardHeader>
								<CardTitle>Retry Policy</CardTitle>
								<CardDescription>Configure retry settings</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center space-x-2">
									<Switch
										id="retry-enabled"
										checked={projectData.retry_policy.enabled}
										onCheckedChange={(checked) => handleSwitchChange(checked, "retry_policy")}
									/>
									<Label htmlFor="retry-enabled">Enable Retry Policy</Label>
								</div>
								<div className="space-y-2">
									<Label htmlFor="max_retries">Max Retries</Label>
									<Input
										id="max_retries"
										name="max_retries"
										type="number"
										value={projectData.retry_policy.max_retries}
										onChange={(e) =>
											setProjectData((prevData) => ({
												...prevData,
												retry_policy: {
													...prevData.retry_policy,
													max_retries: parseInt(e.target.value),
												},
											}))
										}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="retry_interval">Retry Interval (ms)</Label>
									<Input
										id="retry_interval"
										name="retry_interval"
										type="number"
										value={projectData.retry_policy.retry_interval}
										onChange={(e) =>
											setProjectData((prevData) => ({
												...prevData,
												retry_policy: {
													...prevData.retry_policy,
													retry_interval: parseInt(e.target.value),
												},
											}))
										}
									/>
								</div>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
				<div className="flex justify-end">
					<Button type="submit">Create Project</Button>
				</div>
			</form>
		</div>
	);
}
