import { ChakraProvider } from "@chakra-ui/react";
import { createContext, useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { getCurrentUser } from "./api/auth";
import { SignIn } from "./components/pages/auth/SignIn";
import { SignUp } from "./components/pages/auth/SignUp";

import { Home } from "./components/pages/post/Home";
import { HeaderLayout } from "./components/templates/HeaderLayout";
import theme from "./theme/theme";
import { User } from "./types/user";
import { ConfirmOrder } from "./components/pages/order/ConfirmOrder";
import { UserHasTeam } from "./components/pages/order/UserHasTeam";
import { CreateOrder } from "./components/pages/order/CreateOrder";
import { UserHasConfirm } from "./components/pages/order/UserHasConfirm";

export const AuthContext = createContext({});

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User>();

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();

      if (res?.data.isLogin === true) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.data);
        console.log(res.data.data);
      } else {
        console.log("no current user");
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, [setCurrentUser]);

  const Private = ({ children }: any) => {
    if (!loading) {
      if (isSignedIn) {
        return children;
      } else {
        return <Redirect to="/signin" />;
      }
    } else {
      return <></>;
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <AuthContext.Provider
        value={{
          loading,
          setLoading,
          isSignedIn,
          setIsSignedIn,
          currentUser,
          setCurrentUser,
        }}
      >
        <BrowserRouter>
          <Switch>
            <HeaderLayout>
              <Route exact path="/signup">
                <SignUp />
              </Route>
              <Route exact path="/signin">
                <SignIn />
              </Route>
              <Private>
                {/* ルーティングの設定はここ */}
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/orders/order_confirm">
                  <UserHasConfirm />
                </Route>
                <Route exact path="/orders/show_order/:event_name/:users_id">
                  <ConfirmOrder />
                </Route>
                <Route exact path="/orders/:team_id/have_team_all">
                  <UserHasTeam />
                </Route>
                <Route exact path="/orders/create/:id">
                  <CreateOrder />
                </Route>
              </Private>
            </HeaderLayout>
          </Switch>
        </BrowserRouter>
      </AuthContext.Provider>
    </ChakraProvider>
  );
}

export default App;