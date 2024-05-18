import React, { useContext } from "react";
import Header from "./Components/Header";
import Register from "./Components/Register";
import Login from "./Components/Login";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Error from "./Components/Error";
import Context, { LoginContext } from "./Components/ContextProvider/Context";
import RegisterUser from "./pages/register/RegisterUser";
import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";
import Edit from "./pages/edit/Edit";

import "./assets/css/bootstrap.min.css";
import "./assets/css/animate.css";
import "./assets/css/dataTables.bootstrap4.min.css";
import "./assets/plugins/fontawesome/css/fontawesome.min.css";
import "./assets/plugins/fontawesome/css/all.min.css";
import "./assets/css/style.css";
import Sidebar from "./Components/sidebar/Sidebar";
import { Hidden } from "@mui/material";
import SpaceCover from "./SpaceCover";

import CustomerList from "./pages/home/CustomerList";
import Sales from "./pages/sales/Sales";
import AddSales from "./pages/sales/AddSales";
import SalesReportChart from "./Components/charts/SalesReportChart.jsx";
import InvoiceReportChart from "./Components/charts/InvoiceReportChart.jsx";
import CustomerReportChart from "./Components/charts/CustomerReportChart.jsx";
import InventoryReportChart from "./Components/charts/InventoryReportChart.jsx";
import ProtectedRoute from "./contextApi/ProtactRoute.js";
import { useLocation } from "react-router-dom";
import BPUpdate from "./pages/register/BPUpdate.jsx";
import SingleUnApprovedCustomer from "./pages/home/ReVerificationCustomer.jsx";
import ComplaintList from "./pages/feedback/ComplaintList.jsx";
import SuggestionList from "./pages/feedback/SuggestionList.jsx";
import ReVerificationCustomer from "./pages/home/ReVerificationCustomer.jsx";
import ReVerificationCustomerList from "./pages/home/ReVerificationCustomerList.js";
import Product from "./Components/products/Product.jsx";
import AttributeList from "./Components/products/AttributeList.jsx";
import ProductDetail from "./Components/products/ProductDetail.jsx";
import Banner from "./Components/products/Banner.jsx";
import ContactList from "./pages/feedback/ContactList.jsx";
import Brand from './Components/products/Brand.jsx'
import CMSlist from "./Components/CMS/CMSlist.jsx";
import FlashNewsList from "./Components/FlashNews/FlashNewsList.jsx";

const App = () => {
  const location = useLocation()
  
  return (
    <>
    <Routes>
    <Route path="/" element={<Login />} />
    </Routes>
      {/* <Context> */}
        <Header />
        <Sidebar />
        <div className="page-wrapper">
          <div className="content">
            <Routes>
              {/* <Route path='/register' element={<Register />} />
              <Route path='/dash' element={<Dashboard />} />
              <Route path='/' element={<SpaceCover />} /> */}
              {/* <Route path="*" element={<Error />} /> */}

              <Route path="/register" element={<ProtectedRoute />}>
                <Route index element={<Register />} />
              </Route>

              <Route path="/dash" element={<ProtectedRoute />}>
                <Route index element={<Dashboard />} />
              </Route>

              {/* Admin Controller routes starts here */}
              {/* <Route path='/register-user' element={<RegisterUser />} />
              <Route path='/edit-user/:id' element={<Edit />} />
              <Route path='/user-profile/:id' element={<Profile />} />
              <Route path='/customer-list' element={<CustomerList />} />
              <Route path='/sales' element={<Sales />} />
              <Route path='/addsale' element={<AddSales />} />
              <Route path='/inventory' element={<InventoryReportChart/>} />
              <Route path='/sales-report' element={<SalesReportChart/>} />
              <Route path='/invoice-report' element={<InvoiceReportChart/>} />
              <Route path='/customer-report' element={<CustomerReportChart/>} /> */}

              <Route path="/home-page" element={<ProtectedRoute />}>
                <Route index element={<Home />} />
              </Route>

              <Route path='/user-profile/:id' element={<ProtectedRoute/>} >
              <Route index element={<Profile />} />
              </Route>

              <Route path="/register-user" element={<ProtectedRoute />}>
                <Route index element={<RegisterUser />} />
              </Route>

              <Route path="/edit-user/:id" element={<ProtectedRoute />}>
                <Route index element={<BPUpdate />} />
              </Route>

              <Route path="/user-profile/:id" element={<ProtectedRoute />}>
                <Route index element={<Profile />} />
              </Route>

              <Route path="/customer-list" element={<ProtectedRoute />}>
                <Route index element={<CustomerList />} />
              </Route>

              <Route path="/customer-ulist" element={<ProtectedRoute />}>
                <Route index element={<CustomerList />} />
              </Route>

              <Route path="/customer-vlist" element={<ProtectedRoute />}>
                <Route index element={<ReVerificationCustomerList />} />
              </Route>

              <Route path="/customer-ulist/:id" element={<ProtectedRoute />}>
                <Route index element={<SingleUnApprovedCustomer />} />
              </Route>

              <Route path="/customer-vlist/:id" element={<ProtectedRoute />}>
                <Route index element={<ReVerificationCustomer />} />
              </Route>

              <Route path="/complaint" element={<ProtectedRoute />}>
                <Route index element={<ComplaintList />} />
              </Route>

              <Route path="/suggestion" element={<ProtectedRoute />}>
                <Route index element={<SuggestionList />} />
              </Route>

              <Route path="/contact-list" element={<ProtectedRoute />}>
                <Route index element={<ContactList />} />
              </Route>

              

              <Route path="/product-list" element={<ProtectedRoute />}>
                <Route index element={<Product />} />
              </Route>

              <Route path="/add-brand" element={<ProtectedRoute />}>
                <Route index element={<Brand />} />
              </Route>

              <Route path="/add-banner" element={<ProtectedRoute />}>
                <Route index element={<Banner />} />
              </Route>

              <Route path="/add-CMS" element={<ProtectedRoute />}>
                <Route index element={<CMSlist />} />
              </Route>

              <Route path="/add-fleshNews" element={<ProtectedRoute />}>
                <Route index element={<FlashNewsList />} />
              </Route>

              <Route path="/product/:id" element={<ProtectedRoute />}>
                <Route index element={<ProductDetail />} />
              </Route>

              <Route path="/attribute-mamagement" element={<ProtectedRoute />}>
                <Route index element={<AttributeList />} />
              </Route>

              {/* <Route path="/sales" element={<ProtectedRoute />}>
                <Route index element={<Sales />} />
              </Route>

              <Route path="/addsale" element={<ProtectedRoute />}>
                <Route index element={<CustomerList />} />
              </Route>

              <Route path="/addsalenext/:id" element={<ProtectedRoute />}>
                <Route index element={<AddSales />} />
              </Route>

              <Route path="/inventory" element={<ProtectedRoute />}>
                <Route index element={<InventoryReportChart />} />
              </Route>

              <Route path="/sales-report" element={<ProtectedRoute />}>
                <Route index element={<SalesReportChart />} />
              </Route>

              <Route path="/invoice-report" element={<ProtectedRoute />}>
                <Route index element={<InvoiceReportChart />} />
              </Route>

              <Route path="/customer-report" element={<ProtectedRoute />}>
                <Route index element={<CustomerReportChart />} />
              </Route> */}
            </Routes>
          </div>
        </div>
      {/* </Context> */}
    </>
  );
};

export default App;
