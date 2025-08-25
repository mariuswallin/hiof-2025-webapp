import { defineLinks } from "rwsdk/router";

const BASE_AUTH_URL = "/auth";
const BASE_PROFILE_URL = "/profile";
const BASE_EXHIBITION_URL = "/utstillinger";

export const authRoutes = {
	login: `${BASE_AUTH_URL}/login`,
	logout: `${BASE_AUTH_URL}/logout`,
	register: `${BASE_AUTH_URL}/register`,
	forgotPassword: `${BASE_AUTH_URL}/forgot-password`,
	resetPassword: `${BASE_AUTH_URL}/reset-password`,
	verifyEmail: `${BASE_AUTH_URL}/verify-email`,
	verifyEmailSuccess: `${BASE_AUTH_URL}/verify-email/success`,
	verifyEmailFailure: `${BASE_AUTH_URL}/verify-email/failure`,
	verifyEmailResend: `${BASE_AUTH_URL}/verify-email/resend`,
	verifyEmailResendSuccess: `${BASE_AUTH_URL}/verify-email/resend/success`,
};

export const profileRoutes = {
	view: `${BASE_PROFILE_URL}`,
	edit: `${BASE_PROFILE_URL}/edit`,
	changePassword: `${BASE_PROFILE_URL}/change-password`,
	deleteAccount: `${BASE_PROFILE_URL}/delete-account`,
};

export const exhibitionRoutes = {
	view: `${BASE_EXHIBITION_URL}`,
	edit: `${BASE_EXHIBITION_URL}/:id/edit`,
	delete: `${BASE_EXHIBITION_URL}/:id/delete`,
};

const getRouteValues = (routes: Record<string, string>) => {
	return Object.values(routes);
};
export const authLinks = getRouteValues(authRoutes);
export const profileLinks = getRouteValues(profileRoutes);
export const exhibitionLinks = getRouteValues(exhibitionRoutes);

export const link = defineLinks([
	"/",
	...authLinks,
	...profileLinks,
	...exhibitionLinks,
]);
