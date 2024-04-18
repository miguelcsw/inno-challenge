import { MenuItem } from "@mui/material";
import MButton from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import {
	Children,
	type MouseEvent,
	type PropsWithChildren,
	useState,
} from "react";

type ButtonProps = {
	items: string[];
};

function Button({ items, children }: ButtonProps & PropsWithChildren) {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return items.length > 0 ? (
		<div>
			<MButton
				variant="contained"
				id="basic-button"
				aria-controls={open ? "basic-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				onClick={handleClick}
			>
				{children}
			</MButton>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}
			>
				{items.map((item) => (
					<MenuItem key={item} onClick={handleClose}>
						{item}
					</MenuItem>
				))}
			</Menu>
		</div>
	) : (
		<MButton variant="contained">{children}</MButton>
	);
}

export { Button };
