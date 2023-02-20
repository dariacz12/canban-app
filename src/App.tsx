import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { QueryClientProvider, QueryClient } from "react-query";
import { LoginContextProvider } from "./contexts/LoginContext";
import Protected from "./components/Protected";

import DashboardLayout from "./components/DashboardLayout";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";
import SettingPage from "./pages/SettingPage";
import MainPage from "./pages/MainPage";

const queryClient = new QueryClient();
function App() {
  return (
    <LoginContextProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<Protected />}>
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<MainPage />} />
                <Route path="/settings" element={<SettingPage />} />
              </Route>
            </Route>
          </Routes>
        </ChakraProvider>
      </QueryClientProvider>
    </LoginContextProvider>
  );
}

export default App;
