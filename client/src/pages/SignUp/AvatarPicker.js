import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import { Avatar } from "@mui/material";
import { Input } from "@mui/material";

const convertToBase64 = (f) => {
	// source https://medium.com/nerd-for-tech/how-to-store-an-image-to-a-database-with-react-using-base-64-9d53147f6c4f
	return new Promise((resolve, reject) => {
		const fileReader = new FileReader();
		fileReader.readAsDataURL(f);
		fileReader.onload = () => {
			resolve(fileReader.result);
		};
		fileReader.onerror = (error) => {
			reject(error);
		};
	});
};

function AvatarPicker() {
	const [filePath, setFilePath] = useState(null);
	const [fileBase64, setFileBase64] = useState(null);

	console.log({ filePath, fileBase64 });

	return (
		<Stack direction="row" spacing={2}>
			<Avatar src={filePath} />

			<Input
				type="file"
				inputProps={{ accept: "image/*" }}
				onLoad={() => console.log("Loading")}
				onChange={(event) => {
					setFilePath(URL.createObjectURL(event.target.files[0]));
					convertToBase64(event.target.files[0]).then((res) =>
						setFileBase64(res)
					);
				}}
			/>
		</Stack>
	);
}

export default AvatarPicker;
