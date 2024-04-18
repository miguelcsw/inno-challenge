import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { type ReactNode, useState } from "react";

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role={"tabpanel"}
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			{...other}
		>
			{value === index && (
				<>
					{typeof children === "string" ? (
						<Typography>{children}</Typography>
					) : (
						children
					)}
				</>
			)}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `vertical-tab-${index}`,
		"aria-controls": `vertical-tabpanel-${index}`,
	};
}

type VerticalTabsProps = {
	panels: {
		name: string;
		element: ReactNode;
	}[];
};

function VerticalTabs({ panels }: VerticalTabsProps) {
	const [value, setValue] = useState(0);

	const handleChange = (_: unknown, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
			<Grid item>
				<Tabs
					orientation="vertical"
					variant="scrollable"
					value={value}
					onChange={handleChange}
					sx={{ borderRight: 1, borderColor: "divider" }}
				>
					{panels.map((panel, idx) => (
						<Tab
							key={`${panel.name}-${idx}`}
							label={panel.name}
							{...a11yProps(idx)}
						/>
					))}
				</Tabs>
			</Grid>
			<Grid item xs>
				{panels.map((panel, idx) => (
					<TabPanel
						value={value}
						index={idx}
						key={`${panel.name}-${idx}`}
					>
						{panel.element}
					</TabPanel>
				))}
			</Grid>
		</Grid>
	);
}

export { VerticalTabs };
