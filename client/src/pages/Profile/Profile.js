import React from "react";
import { useUserCredentials } from "../../AuthProvider";

function Profile() {
	const user = useUserCredentials();
	return <div>{JSON.stringify(user)}</div>;
}

export default Profile;
