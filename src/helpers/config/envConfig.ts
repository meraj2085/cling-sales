export const getBaseUrl = (): string => {
  return (
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://cling-sales-backend.vercel.app/api/v1"
  );
};
