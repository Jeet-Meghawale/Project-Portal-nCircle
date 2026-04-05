import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // ✅ STOP refetch on tab switch
      staleTime: 1000 * 60 * 5, // ✅ cache for 5 minutes
    },
  },
});

export const ReactQueryProvider = ({ children }: any) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};