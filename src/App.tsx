import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { QueryClientProvider, QueryClient } from "react-query";
import { LoginContextProvider } from "./contexts/LoginContext";
import Protected from "./components/Protected";

import DashboardLayout from "./components/DashboardLayout";
import { ChakraProvider } from "@chakra-ui/react";

import SettingPage from "./pages/SettingPage";

import TablePage from "./pages/TablePage";
import { theme } from "./theme";
import ForgotPasswordPage from "./pages/ForgotPassworPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import Dashboard from "./pages/Dashboard";
import MainPage from "./pages/MainPage";

const queryClient = new QueryClient();
function App() {
  return (
    <LoginContextProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/resetforgotpassword"
              element={<ForgotPasswordPage />}
            />
            <Route
              path="/resetpassword/:code"
              element={<ResetPasswordPage />}
            />
            <Route element={<Protected />}>
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/settings" element={<SettingPage />} />
                <Route path="/tablepage/:tableId" element={<TablePage />} />
              </Route>
            </Route>
          </Routes>
        </ChakraProvider>
      </QueryClientProvider>
    </LoginContextProvider>
  );
}

export default App;
