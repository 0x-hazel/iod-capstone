import { SessionProvider } from './hooks/session.jsx';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";

const queryClient = new QueryClient();

const TestHarness = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider>
                <BrowserRouter>
                    {children}
                </BrowserRouter>
            </SessionProvider>
        </QueryClientProvider>
    );
}

export default TestHarness;