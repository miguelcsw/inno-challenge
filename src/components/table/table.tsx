import type { ResponseData } from "@types";

import { DataGrid, type GridColDef } from "@mui/x-data-grid";

type TableData = {
	data: ({ id: number } & ResponseData)[];
	columns: GridColDef<ResponseData>[];
};

function Table({ data, columns }: TableData) {
	return (
		<DataGrid
			rows={data}
			columns={columns}
			initialState={{
				pagination: {
					paginationModel: {
						pageSize: 5,
					},
				},
			}}
			pageSizeOptions={[5]}
			checkboxSelection
			disableRowSelectionOnClick
		/>
	);
}

export { Table };
