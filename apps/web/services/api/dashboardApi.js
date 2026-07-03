const API_URL = process.env.NEXT_PUBLIC_API_URL;
const DASHBOARD_ENDPOINT = '/dashboard';

const buildDashboardUrl = () => {
  if (!API_URL) {
    return DASHBOARD_ENDPOINT;
  }

  return `${API_URL.replace(/\/$/, '')}${DASHBOARD_ENDPOINT}`;
};

export async function getDashboardData() {
  let response;

  try {
    response = await fetch(buildDashboardUrl(), {
      headers: {
        Accept: 'application/json',
      },
    });
  } catch (error) {
    throw new Error(`Dashboard API unavailable: ${error.message}`);
  }

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(payload?.error?.message ?? 'Dashboard API request failed');
  }

  return payload?.data ?? payload;
}
