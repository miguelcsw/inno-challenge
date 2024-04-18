import { useQuery } from "@tanstack/react-query";
import type { ResponseData } from "@types";

import { Table, VerticalTabs } from "@components";
import { Box, Container } from "@mui/material";
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
		<Box
			sx={{
				width: "100%",
				height: "100%",
			}}
		>
			<Container maxWidth={false}>
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
			</Container>
		</Box>
	);
}

export default App;
