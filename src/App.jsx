import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router";

import NotFound from "./pages/OtherPage/NotFound";

import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import { MainContext, MainProvider } from "./context/MainContext";
import Home from "./pages/Dashboard/Home";
import ForgotPassword from "./pages/AuthPages/ForgotPassword";
import PlantPage from "./pages/Plant/PlantPage";
import PesticidePage from "./pages/Pesticide/PesticidePage";

import PartnerPage from "./pages/Partner/PartnerPage";

import AddPlantPage from "./pages/Plant/AddPlantPage";

import "./App.css";
import ChatBotPage from "./pages/ChatBot/ChatBotPage";
import CalendarPage from "./pages/CalendarPage/CalendarPage";
import AddPesticidePage from "./pages/Pesticide/AddPesticidePage";
import GardenPage from "./pages/Gardent/GardenPage";
import AddGardenPage from "./pages/Gardent/AddGardenPage";
import AddPartnerPage from "./pages/Partner/AddPartnerPage";
import AddBillPage from "./pages/Bill/AddBillPage";
import BillPage from "./pages/Bill/BillPage";
import PurchaseBillPage from "./pages/PurchaseBill/PurchaseBillPage";
import AddPurchaseBillPage from "./pages/PurchaseBill/AddPurchaseBillPage";
import { useContext } from "react";
import moment from "moment/moment";
import PlantCategoryPage from "./pages/Category/PlantCategoryPage";
import PesticideCategoryPage from "./pages/Category/PesticideCategoryPage";
import UserProfiles from "./pages/UserProfiles";

export default function App() {
  const PrivateRoute = () => {
    const context = useContext(MainContext);
    const { user } = context;

    const isAuthValid = () => {
      return user !== null && moment(user.exp) > moment();
    };

    return isAuthValid ? <Outlet /> : <Navigate to="/signin" replace />;
  };
  const PublicRoute = () => {
    const { user } = useContext(MainContext);

    return user ? <Navigate to="/" replace /> : <Outlet />;
  };
  return (
    <>
      <MainProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Dashboard Layout */}
            {/* <Route element={<PrivateRoute />}> */}
            <Route element={<AppLayout />}>
              <Route index path="/" element={<Home />} />
              <Route index path="/profile" element={<UserProfiles />} />
              <Route
                index
                path="/plant-categories"
                element={<PlantCategoryPage />}
              />
              <Route
                index
                path="/pesticide-categories"
                element={<PesticideCategoryPage />}
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
              <Route index path="/gardens" element={<GardenPage />} />
              <Route index path="/gardens/add" element={<AddGardenPage />} />
              <Route
                index
                path="/gardens/edit/:id"
                element={<AddGardenPage />}
              />
              <Route index path="/partners" element={<PartnerPage />} />
              <Route index path="/partners/add" element={<AddPartnerPage />} />
              <Route
                index
                path="/partners/edit/:id"
                element={<AddPartnerPage />}
              />
              {/* Hóa đơn bán */}
              <Route
                index
                path="/purchase-invoices"
                element={<PurchaseBillPage />}
              />
              <Route
                index
                path="/purchase-invoices/add"
                element={<AddPurchaseBillPage />}
              />
              <Route
                index
                path="/purchase-invoices/edit/:id"
                element={<AddPurchaseBillPage />}
              />
              {/* Hóa đơn mua */}
              <Route index path="/sales-invoices" element={<BillPage />} />
              <Route
                index
                path="/sales-invoices/add"
                element={<AddBillPage />}
              />
              <Route
                index
                path="/sales-invoices/edit/:id"
                element={<AddBillPage />}
              />
              <Route index path="/chat-bot" element={<ChatBotPage />} />
              <Route index path="/calendars" element={<CalendarPage />} />

              {/* Others Page */}
              <Route path="/blank" element={<Blank />} />
            </Route>
            {/* </Route> */}

            {/* No Layout */}
            {/* <Route element={<PublicRoute />}> */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            {/* </Route> */}

            {/* Fallback Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        {/* </AuthProvider> */}
      </MainProvider>
    </>
  );
}
