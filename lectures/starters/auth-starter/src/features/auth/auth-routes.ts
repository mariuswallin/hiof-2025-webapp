import { route } from "rwsdk/router";
import { authRoutes as baseAuthRoutes } from "@/shared/links";
import { Login } from "./components/login";

export const authRoutes = [route(baseAuthRoutes.login, [Login])];

const logout = async () => {
	const headers = new Headers();
	headers.set("Location", "/");

	return new Response(null, {
		status: 302,
		headers,
	});
};

export const userRoutes = [route("/login", [Login]), route("/logout", logout)];
