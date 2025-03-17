import { BrowserRouter as Router, Routes, Route } from "react-router";

import NotFound from "./pages/OtherPage/NotFound";

import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import { MainProvider } from "./context/MainContext";
import Home from "./pages/Dashboard/Home";
import ForgotPassword from "./pages/AuthPages/ForgotPassword";
import PlantPage from "./pages/Plant/PlantPage";
import PesticidePage from "./pages/Pesticide/PesticidePage";
import GardentPage from "./pages/Gardent/GardentPage";
import PartnerPage from "./pages/Partner/PartnerPage";
import BillPage from "./pages/Bill/BillPage";
import AddPlantPage from "./pages/Plant/AddPlantPage";
import AddGardentPage from "./pages/Gardent/AddGardentPage";
import CategoryPage from "./pages/Category/CategoryPage";
import "./App.css";
import ChatBotPage from "./pages/ChatBot/ChatBotPage";
import CalendarPage from "./pages/CalendarPage/CalendarPage";
import AddPesticidePage from "./pages/Pesticide/AddPesticidePage";

export default function App() {
  return (
    <>
      <MainProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Dashboard Layout */}
            <Route element={<AppLayout />}>
              <Route index path="/" element={<Home />} />
              <Route
                index
                path="/plant-categories"
                element={<CategoryPage />}
              />
              <Route
                index
                path="/pesticide-categories"
                element={<CategoryPage />}
              />
              <Route index path="/plants" element={<PlantPage />} />
              <Route index path="/plants/add" element={<AddPlantPage />} />
              <Route index path="/plants/edit/:id" element={<AddPlantPage />} />

              <Route index path="/pesticides" element={<PesticidePage />} />
              <Route
                index
                path="/pesticides/add"
                element={<AddPesticidePage />}
              />
              <Route
                index
                path="/pesticides/edit/:id"
                element={<AddPesticidePage />}
              />
              <Route index path="/gardents" element={<GardentPage />} />
              <Route index path="/gardents/add" element={<AddGardentPage />} />
              <Route index path="/partners" element={<PartnerPage />} />
              <Route index path="/bills" element={<BillPage />} />
              <Route index path="/chat-bot" element={<ChatBotPage />} />
              <Route index path="/calendars" element={<CalendarPage />} />

              {/* Others Page */}
              <Route path="/blank" element={<Blank />} />
            </Route>

            {/* No Layout */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Fallback Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </MainProvider>
    </>
  );
}
