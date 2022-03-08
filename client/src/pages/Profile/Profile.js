import React, { useEffect, useState } from "react";
import { useUser } from "../../AuthProvider";
import EditProfile from "./EditProfile";
import { useParams } from "react-router-dom";

import { fetchUserProfile } from "../../utils/utils";

import LoadingPage from "../../components/LoadingPage/LoadingPage";
import DeveloperProfile from "./DeveloperProfile";
import CompanyProfile from "./CompanyProfile";

function Profile() {
	const authUser = useUser();
	const [viewUser, setViewUser] = useState(null);

	const params = useParams();

	useEffect(() => {
		// TODO: only fetches developer profiles
		fetchUserProfile(params.userType, params.username).then((data) => {
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
					<EditProfile />
				</>
			) : null}
		
			{viewUser.userType == "developer" ? (
				<>
					<DeveloperProfile auth={authUser.username == viewUser.username} viewUser={viewUser}/>
				</>
			) : (
				<>
					<CompanyProfile auth={authUser.username == viewUser.username} viewUser={viewUser}/>
				</>
			)}
		</>
	);
}

export default Profile;
