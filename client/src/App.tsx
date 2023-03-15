import React from "react";

import {  
  AuthPage,
  AuthBindings,
  GitHubBanner,
  Refine,
  Authenticated,
  ErrorComponent, } from "@pankod/refine-core";
import {notificationProvider, RefineSnackbarProvider, CssBaseline, GlobalStyles,ReadyPage, ErrorComponent,} from "@pankod/refine-mui";
import {AccountCircleOutlined,ChatBubbleOutline, PeopleAltOutlined, 
  StarOutlineRounded,VillaOutlined, Receipt, Inventory, PeopleAlt, Category, Warehouse} from "@mui/icons-material";

import {Login, Dashboard, Users, MyProfile, UserProfile,
        AllProperties,PropertyDetails,EditProperty,CreateProperty,
        AllProducts,ProductDetails,EditProduct,CreateProduct,
        AllCategories,CategoryDetails,EditCategory,CreateCategory,
        AllCustomers,CustomerDetails,EditCustomer,CreateCustomer,
        AllWarehouses,WarehouseDetails,EditWarehouse, CreateWarehouse,
        AllInvoices,InvoiceDetails,EditInvoice, CreateInvoice,
      } from './pages'

import dataProvider from "@pankod/refine-simple-rest";
import { MuiInferencer } from "@pankod/refine-inferencer/mui";
import routerProvider, {
  NavigateToResource,
  CatchAllNavigate,
  UnsavedChangesNotifier,
} from "@pankod/refine-react-router-v6";
import axios, { AxiosRequestConfig } from "axios";
import { ColorModeContextProvider } from "contexts";
import { Title, Sider, Layout, Header } from "components/layout";
import { CredentialResponse } from "interfaces/google";
import { parseJwt } from "utils/parse-jwt";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (request.headers) {
    request.headers["Authorization"] = `Bearer ${token}`;
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return request;
});

function App() {
  const authProvider: AuthBindings = {
    // login: async ({ credential }: CredentialResponse) => {
    //     const profileObj = credential ? parseJwt(credential) : null;

    //     if (profileObj) {
    //         const response = await fetch(
    //             "http://localhost:8080/api/v1/users",
    //             {
    //                 method: "POST",
    //                 headers: { "Content-Type": "application/json" },
    //                 body: JSON.stringify({
    //                     name: profileObj.name,
    //                     email: profileObj.email,
    //                     avatar: profileObj.picture,
    //                 }),
    //             },
    //         );

    //         const data = await response.json();

    //         if (response.status === 200) {
    //             localStorage.setItem(
    //                 "user",
    //                 JSON.stringify({
    //                     ...profileObj,
    //                     avatar: profileObj.picture,
    //                     userid: data._id,
    //                 }),
    //             );
    //         } else {
    //             return Promise.reject();
    //         }
    //     }
    //     localStorage.setItem("token", `${credential}`);

    //     return Promise.resolve();
    // },
    login: async ({ providerName, email }) => {
        if (providerName === "google") {
            window.location.href =
                "https://accounts.google.com/o/oauth2/v2/auth";
            return {
                success: true,
            };
        }

        if (providerName === "github") {
            window.location.href =
                "https://github.com/login/oauth/authorize";
            return {
                success: true,
            };
        }

        if (email) {
            localStorage.setItem("email", email);
            return {
                success: true,
                redirectTo: "/",
            };
        }

        return {
            success: false,
            error: new Error("Email is wrong"),
        };
    },
    register: async ({ email, password }) => {
        if (email && password) {
            return {
                success: true,
                redirectTo: "/",
            };
        }
        return {
            success: false,
            error: new Error("Email or password is wrong"),
        };
    },
    updatePassword: async ({ password }) => {
        if (password) {
            //we can update password here
            return {
                success: true,
                redirectTo: "/login",
            };
        }
        return {
            success: false,
            error: new Error("password is wrong"),
        };
    },
    forgotPassword: async ({ email }) => {
        if (email) {
            //we can send email with forgot password link here
            return {
                success: true,
                redirectTo: "/login",
            };
        }
        return {
            success: false,
            error: new Error("Email is wrong"),
        };
    },

    logout: () => {
        const token = localStorage.getItem("token");

        if (token && typeof window !== "undefined") {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            axios.defaults.headers.common = {};
            window.google?.accounts.id.revoke(token, () => {
                return Promise.resolve();
            });
        }

        return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: async () => {
        const token = localStorage.getItem("token");

        if (token) {
            return Promise.resolve();
        }
        return Promise.reject();
    },

    getPermissions: () => Promise.resolve(),
    getUserIdentity: async () => {
        const user = localStorage.getItem("user");
        if (user) {
            return Promise.resolve(JSON.parse(user));
        }
    },
};

  return (
    <BrowserRouter>
    <ColorModeContextProvider>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <RefineSnackbarProvider>
        <Refine
          dataProvider={dataProvider("http://localhost:8080/api/v1")}
          notificationProvider={notificationProvider}
          ReadyPage={ReadyPage}
          catchAll={<ErrorComponent />}
          resources={[
            {
              name: "invoices",
              list: AllInvoices,
              show: InvoiceDetails,
              create: CreateInvoice,
              edit: EditInvoice,
              icon: <Receipt />,
          },
            {
              name: "products",
              list: AllProducts,
              show: ProductDetails,
              create: CreateProduct,
              edit: EditProduct,
              icon: <Inventory />,
          },
            {
              name: "properties",
              list: AllProperties,
              show: PropertyDetails,
              create: CreateProperty,
              edit: EditProperty,
              icon: <VillaOutlined />,
          },
            {
              name: "customers",
              list: AllCustomers,
              show: CustomerDetails,
              create: CreateCustomer,
              edit: EditCustomer,
              icon: <PeopleAlt />,
          },
            {
              name: "categories",
              list: AllCategories,
              show: CategoryDetails,
              create: CreateCategory,
              edit: EditCategory,
              icon: <Category />,
          },
            {
              name: "warehouses",
              list: AllWarehouses,
              show: WarehouseDetails,
              create: CreateWarehouse,
              edit: EditWarehouse,
              icon: <Warehouse />,
          },
          {
            name: "users",
            list: Users,
            show: UserProfile,
            icon: <PeopleAltOutlined />,
        },
          {
              name: "reviews",
              list: Dashboard,
              icon: <StarOutlineRounded />,
          },
          {
              name: "messages",
              list: Dashboard,
              icon: <ChatBubbleOutline />,
          },
          {
              name: "my-profile",
              options: { label: "My Profile " },
              list: MyProfile,
              icon: <AccountCircleOutlined />,
          },
          ]}
          Title={Title}
          Sider={Sider}
          Layout={Layout}
          Header={Header}
          routerProvider={routerProvider}
          authProvider={authProvider}
          LoginPage={Login}
          DashboardPage={Dashboard}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
        }}

         >
          <Routes>
              <Route
                  element={
                      <Authenticated
                          fallback={<CatchAllNavigate to="/login" />}
                      >
                          <Layout>
                              <Outlet />
                          </Layout>
                      </Authenticated>
                  }
              >
                  <Route
                      index
                      element={<NavigateToResource resource="invoices" />}
                  />

                  <Route path="/invoices">
                      <Route index element={<AllInvoices />} />
                      <Route path="create" element={<CreateInvoice />} />
                      <Route path="show" element={<InvoiceDetails />} />
                      <Route path="edit/:id" element={<EditInvoice />} />
                  </Route>
              </Route>

              <Route
                  element={
                      <Authenticated fallback={<Outlet />}>
                          <NavigateToResource resource="posts" />
                      </Authenticated>
                  }
              >
                  <Route
                      path="/login"
                      element={<AuthPage type="login" />}
                  />
                  <Route
                      path="/register"
                      element={<AuthPage type="register" />}
                  />
                  <Route
                      path="/forgot-password"
                      element={<AuthPage type="forgotPassword" />}
                  />
                  <Route
                      path="/update-password"
                      element={<AuthPage type="updatePassword" />}
                  />
                  <Route path="/example" element={<ExamplePage />} />
              </Route>

              <Route
                  element={
                      <Authenticated>
                          <Layout>
                              <Outlet />
                          </Layout>
                      </Authenticated>
                  }
              >
                  <Route path="*" element={<ErrorComponent />} />
              </Route>
          </Routes>
          <UnsavedChangesNotifier />
        </Refine>
      </RefineSnackbarProvider>
    </ColorModeContextProvider>
    </BrowserRouter>
  );
}

export default App;
