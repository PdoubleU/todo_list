import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Root from "./presentation/pages/Root";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Root />
    </QueryClientProvider>
  );
}

export default App;
