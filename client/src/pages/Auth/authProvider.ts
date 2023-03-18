import { AuthBindings } from "@refinedev/core";
import { CredentialResponse } from "interfaces/google";
import { parseJwt } from "utils/parse-jwt";
import axios, { AxiosRequestConfig } from "axios";

export const TOKEN_KEY = "refine-auth";

// axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
//   const token = localStorage.getItem("token");
//   if (request.headers) {
//     request.headers["Authorization"] = `Bearer ${token}`;
//   } else {
//     request.headers = {
//       Authorization: `Bearer ${token}`,
//     };
//   }

//   return request;
// });

export const authProvider: AuthBindings = {
  login: async ({ username, email, password }) => {
    if ((username || email) && password) {
      localStorage.setItem(TOKEN_KEY, username);
      return {
        success: true,
        redirectTo: "/dashboard",
      };
    }

    return {
      success: false,
      error: {
        name: "LoginError",
        message: "Invalid username or password",
      },
    };
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        id: 1,
        name: "John Doe",
        avatar: "https://i.pravatar.cc/300",
      };
    }
    return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};









// const authProvider: AuthBindings = {
//   // login: async ({ credential }: CredentialResponse) => {
//   //     const profileObj = credential ? parseJwt(credential) : null;

//   //     if (profileObj) {
//   //         const response = await fetch(
//   //             "http://localhost:8080/api/v1/users",
//   //             {
//   //                 method: "POST",
//   //                 headers: { "Content-Type": "application/json" },
//   //                 body: JSON.stringify({
//   //                     name: profileObj.name,
//   //                     email: profileObj.email,
//   //                     avatar: profileObj.picture,
//   //                 }),
//   //             },
//   //         );

//   //         const data = await response.json();

//   //         if (response.status === 200) {
//   //             localStorage.setItem(
//   //                 "user",
//   //                 JSON.stringify({
//   //                     ...profileObj,
//   //                     avatar: profileObj.picture,
//   //                     userid: data._id,
//   //                 }),
//   //             );
//   //         } else {
//   //             return Promise.reject();
//   //         }
//   //     }
//   //     localStorage.setItem("token", `${credential}`);

//   //     return Promise.resolve();
//   // },
//   login: async ({ providerName, email }) => {
//       if (providerName === "google") {
//           window.location.href =
//               "https://accounts.google.com/o/oauth2/v2/auth";
//           return {
//               success: true,
//           };
//       }

//       if (providerName === "github") {
//           window.location.href =
//               "https://github.com/login/oauth/authorize";
//           return {
//               success: true,
//           };
//       }

//       if (email) {
//           localStorage.setItem("email", email);
//           return {
//               success: true,
//               redirectTo: "/",
//           };
//       }

//       return {
//           success: false,
//           error: new Error("Email is wrong"),
//       };
//   },
//   register: async ({ email, password }) => {
//       if (email && password) {
//           return {
//               success: true,
//               redirectTo: "/",
//           };
//       }
//       return {
//           success: false,
//           error: new Error("Email or password is wrong"),
//       };
//   },
//   updatePassword: async ({ password }) => {
//       if (password) {
//           //we can update password here
//           return {
//               success: true,
//               redirectTo: "/login",
//           };
//       }
//       return {
//           success: false,
//           error: new Error("password is wrong"),
//       };
//   },
//   forgotPassword: async ({ email }) => {
//       if (email) {
//           //we can send email with forgot password link here
//           return {
//               success: true,
//               redirectTo: "/login",
//           };
//       }
//       return {
//           success: false,
//           error: new Error("Email is wrong"),
//       };
//   },
//   logout: async () => {
//     localStorage.removeItem("email");
//     return {
//         success: true,
//         redirectTo: "/",
//     };
//   },
//   onError: async (error) => {
//       console.error(error);
//       return { error };
//   },
//   check: async () => {
//       return localStorage.getItem("email")
//           ? { authenticated: true }
//           : {
//                 authenticated: false,
//                 redirectTo: "/login",
//                 error: new Error("Not authenticated"),
//             };
//   },
//   getPermissions: async () => ["admin"],
//   getIdentity: async () => ({
//       id: 1,
//       name: "Jane Doe",
//       avatar: "https://unsplash.com/photos/IWLOvomUmWU/download?force=true&w=640",
//   }),

//   // logout: () => {
//   //     const token = localStorage.getItem("token");
//   //     if (token && typeof window !== "undefined") {
//   //         localStorage.removeItem("token");
//   //         localStorage.removeItem("user");
//   //         axios.defaults.headers.common = {};
//   //         window.google?.accounts.id.revoke(token, () => {
//   //             return Promise.resolve();
//   //         });
//   //     }
//   //     return Promise.resolve();
//   // },
//   // checkError: () => Promise.resolve(),
//   // checkAuth: async () => {
//   //     const token = localStorage.getItem("token");
//   //     if (token) {
//   //         return Promise.resolve();
//   //     }
//   //     return Promise.reject();
//   // },
//   // getPermissions: () => Promise.resolve(),
//   // getUserIdentity: async () => {
//   //     const user = localStorage.getItem("user");
//   //     if (user) {
//   //         return Promise.resolve(JSON.parse(user));
//   //     }
//   // },
// };