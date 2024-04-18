import { useQuery } from "@tanstack/react-query";
import type { ResponseData } from "@types";

import { Button, Table, VerticalTabs } from "@components";
import { Box, Container, Grid } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";

const reportsColumns: GridColDef<ResponseData>[] = [
	{ field: "title", headerName: "Title", width: 200 },
	{
		field: "country",
		headerName: "Country",
		width: 150,
		editable: true,
	},
	{
		field: "section",
		headerName: "Section",
		width: 150,
		editable: true,
	},
];

function App() {
	const { data: reports } = useQuery<ResponseData[]>({
		queryKey: ["data"],
		initialData: [],
		queryFn: () =>
			fetch("data/index.json", {
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			}).then((res) => res.json()),
	});

	const tableData = reports.map((entry, idx) => ({ ...entry, id: idx }));

	return (
		<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
			<Box
				sx={{
					width: "100%",
					height: "100%",
					padding: "20px",
					boxSizing: "border-box",
				}}
			>
				<Grid item xs={12} sx={{ mb: 3 }}>
					<Container maxWidth={false}>
						<Button items={["Add", "Add Template"]}>Add</Button>
					</Container>
				</Grid>
				<Grid item xs={12}>
					<VerticalTabs
						panels={[
							{
								element: (
									<Table
										data={tableData}
										columns={reportsColumns}
									/>
								),
								name: "Reports",
							},
							{
								element: "Available templates: 0",
								name: "Templates",
							},
						]}
					/>
				</Grid>
			</Box>
		</Grid>
	);
}

export default App;
