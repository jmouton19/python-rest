import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import { sampleData } from "./generateSampleData";

console.log(sampleData);

function Contracts() {
	return (
		<List sx={{ width: "100%", bgcolor: "background.paper" }}>
			{sampleData.map((dataItem) => (
				<React.Fragment key={dataItem.contract_id}>
					<ListItem alignItems="flex-start">
						<ListItemAvatar>
							<Avatar alt={dataItem.company_name} />
						</ListItemAvatar>
						<ListItemText
							primary={dataItem.company_name}
							secondary={
								<React.Fragment>
									<Typography
										component="span"
										variant="body2"
										color="text.primary"
									>
										{`Duration: ${dataItem.length} Months`}
									</Typography>
									<br />
									<Typography
										component="span"
										variant="body2"
										color="text.primary"
									>
										{`Value: $${dataItem.value}`}
									</Typography>
									<br />
									{dataItem.description}
								</React.Fragment>
							}
						/>
					</ListItem>
					<Divider variant="inset" component="li" />
				</React.Fragment>
			))}
		</List>
	);
}

export default Contracts;
