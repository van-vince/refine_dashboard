import React from "react";
import {  Refine, Authenticated, AuthBindings} from "@refinedev/core";

import {
  notificationProvider, 
  RefineSnackbarProvider,   
  AuthPage,
  ErrorComponent
}from "@refinedev/mui";
import { CssBaseline, GlobalStyles, FormControlLabel, Checkbox} from "@mui/material";
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

import dataProvider from "@refinedev/simple-rest";
import { MuiInferencer } from "@refinedev/inferencer/mui";
import routerBindings, {
  NavigateToResource,
  CatchAllNavigate,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { ColorModeContextProvider } from "contexts";
import { Title, Sider, Layout, Header } from "components/layout";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { authProvider } from "./pages/Auth/authProvider";

import { useFormContext } from "react-hook-form";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";


function App() {

  const authProvider: AuthBindings = {
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
                redirectTo: "/dashboard",
            };
        }

        return {
            success: false,
            error: new Error("Invalid email or password"),
        };
    },
    register: async (params) => {
        if (params.email && params.password) {
            localStorage.setItem("email", params.email);
            return {
                success: true,
                redirectTo: "/dashboard",
            };
        }
        return {
            success: false,
            error: new Error("Invalid email or password"),
        };
    },
    updatePassword: async (params) => {
        if (params.newPassword) {
            //we can update password here
            return {
                success: true,
            };
        }
        return {
            success: false,
            error: new Error("Invalid password"),
        };
    },
    forgotPassword: async (params) => {
        if (params.email) {
            //we can send email with reset password link here
            return {
                success: true,
            };
        }
        return {
            success: false,
            error: new Error("Invalid email"),
        };
    },
    logout: async () => {
        localStorage.removeItem("email");
        return {
            success: true,
            redirectTo: "/login",
        };
    },
    onError: async (error) => {
        console.error(error);
        return { error };
    },
    check: async () =>
        localStorage.getItem("email")
            ? {
                  authenticated: true,
                }
              : {
                    authenticated: false,
                    error: new Error("Not authenticated"),
                    logout: true,
                    redirectTo: "/login",
                },
      getPermissions: async () => ["admin"],
      getIdentity: async () => ({
          id: 1,
          name: "Jane Doe",
          avatar: "https://unsplash.com/photos/IWLOvomUmWU/download?force=true&w=640",
      }),
  };

  const RememeberMe = () => {
      const { register } = useFormContext();

      return (
          <FormControlLabel
              sx={{
                  span: {
                      fontSize: "12px",
                      color: "text.secondary",
                  },
              }}
              color="secondary"
              control={
                  <Checkbox
                      size="small"
                      id="rememberMe"
                      {...register("rememberMe")}
                  />
              }
              label="Remember me"
          />
      );
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
          resources={[
            {
              name: "invoices",
              list: "/dashboard/invoices",
              create: "/dashboard/invoices/create",
              edit: "/dashboard/invoices/edit/:id",
              show: "/dashboard/invoices/show/:id",
              meta: {canDelete: true, },
              icon: <Receipt />,
              },
          {
            name: "products",
            list: "/dashboard/products",
            create: "/dashboard/products/create",
            edit: "/dashboard/products/edit/:id",
            show: "/dashboard/products/show/:id",
            meta: {canDelete: true,},
            icon: <Inventory />,
          },
          {
            name: "properties",
            list: "/dashboard/properties",
            create:"/dashboard/properties/create",
            edit: "/dashboard/properties/edit/:id",
            show: "/dashboard/properties/show/:id",
            meta: {canDelete: true,},
            icon: <VillaOutlined />,
          },
           {
            name: "customers",
            list: "/dashboard/customers",
            create:"/dashboard/customers/create",
            edit: "/dashboard/customers/edit/:id",
            show: "/dashboard/customers/show/:id",
            meta: {canDelete: true,},
            icon: <PeopleAlt />,
          },
          {
            name: "categories",
            list: "/dashboard/categories",
            create:"/dashboard/categories/create",
            edit: "/dashboard/categories/edit/:id",
            show: "/dashboard/categories/show/:id",
            meta: { canDelete: true,},
            icon: <Category />,
          },
          {
            name: "warehouses",
            list: "/dashboard/warehouses",
            create:"/dashboard/warehouses/create",
            edit: "/dashboard/warehouses/edit/:id",
            show: "/dashboard/warehouses/show/:id",
            meta: {canDelete: true,},
            icon: <Warehouse />,
          },
          {
            name: "users",
            list: "/dashboard/users",
            create:"/dashboard/users/create",
            edit: "/dashboard/users/edit/:id",
            show: "/dashboard/users/show/:id",
            meta: {canDelete: true,},
            icon: <PeopleAltOutlined />,
          },
          {
              name: "reviews",
              list: '/dashboard',
              icon: <StarOutlineRounded />,
          },
          {
              name: "messages",
              list: '/dashboar',
              icon: <ChatBubbleOutline />,
          },
          {
              name: "my-profile",
              options: { label: "My Profile " },
              list: '/dashboard/MyProfile',
              icon: <AccountCircleOutlined />,

          },
          ]}
          routerProvider={routerBindings}
          authProvider={authProvider}
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
                            <Layout 

                            >
                                <Outlet />
                            </Layout>
                        </Authenticated>
                    }
                    >
                    {/* <Route path="/" element={''} /> */}
                    <Route path="/dashboard" 
                      element={<Dashboard/>} 
                      />

                    <Route path="/dashboard/invoices">
                        <Route index element={<AllInvoices />} />
                        <Route path="create" element={<CreateInvoice />} />
                        <Route path="show/:id" element={<InvoiceDetails />} />
                        <Route path="edit/:id" element={<EditInvoice />} />
                    </Route>
                    <Route path="/dashboard/products">
                        <Route index element={<AllProducts />} />
                        <Route path="create" element={<CreateProduct />} />
                        <Route path="show/:id" element={<ProductDetails />} />
                        <Route path="edit/:id" element={<EditProduct />} />
                    </Route>
                    <Route path="/dashboard/customers">
                        <Route index element={<AllCustomers />} />
                        <Route path="create" element={<CreateCustomer />} />
                        <Route path="show/:id" element={<CustomerDetails />} />
                        <Route path="edit/:id" element={<EditCustomer />} />
                    </Route>
                    <Route path="/dashboard/categories">
                        <Route index element={<AllCategories />} />
                        <Route path="create" element={<CreateCategory />} />
                        <Route path="show/:id" element={<CategoryDetails />} />
                        <Route path="edit/:id" element={<EditCategory />} />
                    </Route>
                    <Route path="/dashboard/warehouses">
                        <Route index element={<AllWarehouses />} />
                        <Route path="create" element={<CreateWarehouse />} />
                        <Route path="show/:id" element={<WarehouseDetails />} />
                        <Route path="edit/:id" element={<EditWarehouse />} />
                    </Route>
                    <Route path="/dashboard/users">
                        <Route index element={<Users />} />
                        {/* <Route path="create" element={<CreateUser />} /> */}
                        <Route path="show/:id" element={<UserProfile />} />
                        {/* <Route path="edit/:id" element={<EditUser />} /> */}
                    </Route>
                    <Route path="/dashboard/my-profile">
                        <Route index element={<MyProfile />} />
                        <Route path="create" element={''} />
                        <Route path="show/:id" element={''} />
                        <Route path="edit/:id" element={''} />
                    </Route>
                    <Route path="/dashboard/properties">
                        <Route index element={<AllProperties />} />
                        <Route path="create" element={<CreateProperty />} />
                        <Route path="show/:id" element={<PropertyDetails />} />
                        <Route path="edit/:id" element={<EditProperty />} />
                    </Route>
                    <Route path="/dashboard/warehouses">
                        <Route index element={<AllWarehouses />} />
                        <Route path="create" element={<CreateWarehouse />} />
                        <Route path="show/:id" element={<WarehouseDetails />} />
                        <Route path="edit/:id" element={<EditWarehouse />} />
                    </Route>

                    </Route>
                <Route
                  element={
                    <Authenticated fallback={<Outlet />}>
                     <CatchAllNavigate to="/dashboard" />
                    </Authenticated>
                  }
                >

              <Route
              path="/login"
              element={
                  <AuthPage
                      type="login"
                      rememberMe={<RememeberMe />}
                      providers={[
                          {
                              name: "google",
                              label: "Sign in with Google",
                              icon: (
                                  <GoogleIcon
                                      style={{
                                          fontSize: 24,
                                      }}
                                  />
                              ),
                          },
                          {
                              name: "github",
                              label: "Sign in with GitHub",
                              icon: (
                                  <GitHubIcon
                                      style={{
                                          fontSize: 24,
                                      }}
                                  />
                              ),
                          },
                      ]}
                  />
              }
              />
              <Route
              path="/register"
              element={
                  <AuthPage
                      type="register"
                      providers={[
                          {
                              name: "google",
                              label: "Sign in with Google",
                              icon: (
                                  <GoogleIcon
                                      style={{
                                          fontSize: 24,
                                      }}
                                  />
                              ),
                          },
                          {
                              name: "github",
                              label: "Sign in with GitHub",
                              icon: (
                                  <GitHubIcon
                                      style={{
                                          fontSize: 24,
                                      }}
                                  />
                              ),
                          },
                      ]}
                  />
              }
              />
              <Route
              path="/forgot-password"
              element={<AuthPage type="forgotPassword" />}
              />
              <Route
              path="/update-password"
              element={<AuthPage type="updatePassword" />}
              />
              </Route> 

                <Route
                  element={
                    <Authenticated>
                      <Layout >
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







