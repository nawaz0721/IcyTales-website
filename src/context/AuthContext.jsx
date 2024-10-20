import { Spinner } from "@nextui-org/react";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../utils/firebase";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState({
    isLogin: false,
    userInfo: {},
  });

  const [loading, setLoading] = useState(true);

  function onAuthChanged(user) {
    if (user) {
      setUser({
        isLogin: true,
        userInfo: {
          email: user?.email,
          photoURL: user?.photoURL,
          name: user?.displayName,
        },
      });
    } else {
      setUser({
        isLogin: false,
        userInfo: {},
      });
    }
    setLoading(false);
  }

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, onAuthChanged);
    return subscriber;
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {loading ? (
        <div className="w-full h-96 flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
