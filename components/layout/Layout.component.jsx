import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import TopAppBar from "./TopAppBar";
import {
  MdDashboard,
  MdDoneAll,
  MdDoubleArrow,
  MdOutlineAnalytics,
  MdOutlineSupportAgent,
} from "react-icons/md";
import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import { List } from "@mui/material";
import { ListItemForLayout } from "./ListItemForLayout.component";

import { UserContext } from "../../services/userContext";

const colors = {
  colorActive: "#ffffff",
  // colorInActive: "#002A56",
  // bgColorActive: "#002A56",
  colorInActive: "#ffa31a",
  bgColorActive: "#ffa31a",
  bgColorInActive: "#f8f9fd",
  buttonColorInactive: "#002A5685",
  // backColor: "#dae8ff",
  backColor: "#F3F3F3",
  lightBgColor: "#f8f9fd",
  checkBox: "#0053B3",
  iconInActive: "#000000",
  linkInActive: "#0053B3",
  primaryLight: "#ffa31a",
  titleColor: "#0053B3",
};

export const Layout = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  const router = useRouter();
  const [drawerWidth, setDrawerWidth] = useState("20%");
  const [open, setOpen] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  const handleRouteChange = () => {
    setPageLoading(true);
  };

  const handleRouteChangeComplete = () => {
    setPageLoading(false);
  };

  router?.events?.on("routeChangeStart", handleRouteChange);
  router?.events?.on("routeChangeComplete", handleRouteChangeComplete);

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => {
    const transitionDuration = 30000;
    return {
      flexShrink: 0,
      boxSizing: "border-box",
      backgroundColor: colors.lightBgColor,
      overflowX: "hidden",
      transition: theme.transitions.create(["width"], {
        easing: theme.transitions.easing.easeInOut,
        duration: open ? transitionDuration : transitionDuration / 2,
      }),
      width: open ? drawerWidth : "2.75rem",
      "& .MuiDrawer-paper": {
        overflowX: "hidden",
        backgroundColor: colors.lightBgColor,
        width: open ? drawerWidth : "2.75rem",
        transition: theme.transitions.create(["right"], {
          easing: theme.transitions.easing.easeInOut,
          duration: open ? transitionDuration : transitionDuration / 2,
        }),
      },
    };
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDrawer = () => {
    setOpen(!open);
  };

  if (loading || pageLoading)
    return (
      <div className="loadingScreen">
        <div className="loader"></div>
      </div>
    );

  if (!!user && router.pathname === "/login") {
    router.push("/");
  }
  if ((!user && !loading) || router.pathname === "/login")
    return <div> {children}</div>;
  if (user) {
    return (
      <div id="main">
        {user ? (
          <>
            <div className="rightContainer" style={{ marginTop: "4rem" }}>
              <TopAppBar />

              {children}
            </div>
          </>
        ) : (
          ""
        )}

        <div style={{}}></div>
      </div>
    );
  }
};
