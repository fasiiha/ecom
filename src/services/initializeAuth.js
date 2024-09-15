import { logoutUser, setUser } from "../store/slices/userSlice";
import store from "../store/store";

const decodeJWT = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
export const initializeAuth = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = decodeJWT(token);
      if (!decodedToken) {
        store.dispatch(logoutUser());
        return;
      }
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        store.dispatch(logoutUser());
      } else {
        store.dispatch(
          setUser({
            user: {
              id: decodedToken.id,
              email: decodedToken.email,
              first_name: decodedToken.first_name,
            },
            token,
          })
        );
      }
    }
  }
};
