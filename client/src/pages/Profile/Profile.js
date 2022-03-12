import React, { useEffect, useState } from "react";
import { Stack, Switch, Typography } from "@mui/material";

import CompanyProfile from "./CompanyProfile";
import DeveloperProfile from "./DeveloperProfile";
import EditProfile from "./EditProfile";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import { fetchUserProfile } from "../../utils/apiCalls";
import { useParams } from "react-router-dom";
import { useUser } from "../../AuthProvider";

function Profile() {
	const authUser = useUser();
	const dummy = {username: "*(&^*&%(&*%&^%$&*", userType: authUser.userType == "developer" ? ("company"): ("developer")};
	const [viewUser, setViewUser] = useState(null);
	const [preview, setPreview] = useState(false);
	const params = useParams();

	useEffect(() => {
		// TODO: only fetches developer profiles
		fetchUserProfile(params.userType, params.username).then((data) => {
			setViewUser(null);
			setViewUser(data);
		});
	}, [params]);


	if (!viewUser) {
		// shows user is loading
		return <LoadingPage />;
	}

	return (
		<>
			{authUser.username == viewUser.username ? (
				<>
					<Stack direction="row" mt={1} mr={3} justifyContent="flex-end" alignItems="center">
						<Typography variant="caption" color="gray">
							Preview as {dummy.userType}
						</Typography>
						<Switch onClick={() => setPreview(!preview)}/>
					</Stack>
					<EditProfile />
				</>
			) : null}
		
			{viewUser.userType == "developer" ? (
				<>
					<DeveloperProfile viewUser={viewUser} authUser={(preview ? (dummy) : (authUser))}/>
				</>
			) : (
				<>
					<CompanyProfile viewUser={viewUser} authUser={(preview ? (dummy) : (authUser))}/>
				</>
			)}
			
		</>
	);
}

export default Profile;
