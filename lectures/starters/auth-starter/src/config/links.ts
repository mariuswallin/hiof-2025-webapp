import { defineLinks } from "rwsdk/router";
import { API_URL } from ".";

const BASE_AUTH_URL = "/auth";
const BASE_EXHIBITION_URL = "/surveys";

// TODO: Obsolete?

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

export const surveyRoutes = {
  view: `${BASE_EXHIBITION_URL}`,
  create: `${BASE_EXHIBITION_URL}/new`,
  edit: `${BASE_EXHIBITION_URL}/:id/edit`,
  delete: `${BASE_EXHIBITION_URL}/:id/delete`,
};

const getRouteValues = (routes: Record<string, string>) => {
  return Object.values(routes).map((route) => `${API_URL}/${route}`);
};

export const authLinks = getRouteValues(authRoutes);
export const surveyLinks = getRouteValues(surveyRoutes);

export const link = defineLinks(["/", ...authLinks, ...surveyLinks]);
