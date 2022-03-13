import { Stack, Tooltip } from "@mui/material";

import React from "react";
import { devicons } from "../../utils/mapLanguageToIcon";

function LanguageList({ languages, sx }) {
	return (
		<Stack direction="row" spacing={2} sx={sx ? sx : {}}>
			{languages.map((language) => (
				<Tooltip title={`${language}`} key={language}>
					<img src={devicons[language]} style={{ width: 35, height: 35 }} />
				</Tooltip>
			))}
		</Stack>
	);
}

export default LanguageList;
