import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import AppLayout from "./components/layout/AppLayout";

import WelcomePage          from "./pages/WelcomePageSimple";
import AuthPage             from "./pages/AuthPage";
import DashboardPage        from "./pages/DashboardPage";
import MyTripsPage          from "./pages/MyTripsPage";
import CreateTripPage       from "./pages/CreateTripPage";
import ItineraryBuilderPage from "./pages/ItineraryBuilderPage";
import ItineraryViewPage    from "./pages/ItineraryViewPage";
import CitySearchPage       from "./pages/CitySearchPage";
import ActivitySearchPage   from "./pages/ActivitySearchPage";
import BudgetPage           from "./pages/BudgetPage";
import PackingChecklistPage from "./pages/PackingChecklistPage";
import SharedItineraryPage  from "./pages/SharedItineraryPage";
import ProfilePage          from "./pages/ProfilePage";
import TripNotesPage        from "./pages/TripNotesPage";
import AdminDashboardPage   from "./pages/AdminDashboardPage";
import AdminProfilePage      from "./pages/AdminProfilePage";
import AdminAIAssistantPage  from "./pages/AdminAIAssistantPage";
import AIBudgetIntelligencePage from "./pages/AIBudgetIntelligencePage";
import CommunityPage        from "./pages/CommunityPage";
import TravelJournalPage    from "./pages/TravelJournalPage";
import SmartPackingAssistantPage from "./pages/SmartPackingAssistantPage";
import SmartExpenseIntelligencePage from "./pages/SmartExpenseIntelligencePage";

function AppRoutes() {
  const location = useLocation();
  
  return (
    <div className="app-routes-container">
      <Routes location={location} key={location.pathname}>
            <Route path="/"                 element={<WelcomePage />} />
            <Route path="/welcome"            element={<WelcomePage />} />
            <Route path="/auth"               element={<AuthPage />} />
            <Route path="/trip/share/:shareId" element={<SharedItineraryPage />} />

            <Route element={<AppLayout />}>
              <Route path="/dashboard"                 element={<DashboardPage />} />
              <Route path="/trips"                     element={<MyTripsPage />} />
              <Route path="/trips/new"                 element={<CreateTripPage />} />
              <Route path="/trips/:tripId/builder"     element={<ItineraryBuilderPage />} />
              <Route path="/trips/:tripId/view"        element={<ItineraryViewPage />} />
              <Route path="/trips/:tripId/budget"      element={<BudgetPage />} />
              <Route path="/trips/:tripId/packing"     element={<PackingChecklistPage />} />
              <Route path="/trips/:tripId/notes"       element={<TripNotesPage />} />
              <Route path="/cities"                    element={<CitySearchPage />} />
              <Route path="/activities"                element={<ActivitySearchPage />} />
              <Route path="/community"                 element={<CommunityPage />} />
              <Route path="/travel-journal"            element={<TravelJournalPage />} />
              <Route path="/smart-packing"             element={<SmartPackingAssistantPage />} />
              <Route path="/expense-intelligence"      element={<SmartExpenseIntelligencePage />} />
              <Route path="/profile"                   element={<ProfilePage />} />
            </Route>
            <Route path="/admin"                     element={<AdminDashboardPage />} />
            <Route path="/admin/profile"             element={<AdminProfilePage />} />
            <Route path="/admin/ai-assistant"        element={<AdminAIAssistantPage />} />
            <Route path="/budget-intelligence"        element={<AIBudgetIntelligencePage />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
      </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <ThemeProvider>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </ThemeProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}
