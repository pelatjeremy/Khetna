const API_URL = process.env.NEXT_PUBLIC_API_URL;

const buildDashboardUrl = () => {
  if (!API_URL) {
    return '/dashboard';
  }

  return `${API_URL.replace(/\/$/, '')}/dashboard`;
};

export async function getDashboardData() {
  const response = await fetch(buildDashboardUrl(), {
    headers: {
      Accept: 'application/json',
    },
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(payload?.error?.message ?? 'Dashboard API request failed');
  }

  return payload?.data ?? payload;
}
