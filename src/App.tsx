import { useState, useEffect, useMemo, JSXElementConstructor, Key, ReactElement } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import theme from "assets/theme";
import themeDark from "assets/theme-dark";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import routes from "routes";
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";
import Basic from "layouts/authentication/sign-in/basic";
import AdminHome from "module/AdminHome";
import Analytics from "layouts/dashboards/analytics";
import Country from "module/Master/Country/Country";
import Client from "module/Master/Client/Client";
import Vendor from "module/Master/Vendor/Vendor";
import Softwareuser from "module/Master/SoftwareUser/Softwareuser";
import PortalUser from "module/Master/PortalUser/Portaluser";
import Presceenernew from "module/Master/PreSceenerNew/PresceenerNew";
import Emailtemplate from "module/Master/EmailTemplate/Emailtemplate";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  useMemo(() => {
    const pluginRtl: any = rtlPlugin;
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [pluginRtl],
    });

    setRtlCache(cacheRtl);
  }, []);

  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes: any[]): any =>
    allRoutes.map(
      (route: {
        collapse: any;
        route: string;
        component: ReactElement<any, string | JSXElementConstructor<any>>;
        key: Key;
      }) => {
        if (route.collapse) {
          return getRoutes(route.collapse);
        }

        if (route.route) {
          return <Route path={route.route} element={route.component} key={route.key} />;
        }

        return null;
      }
    );

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  console.log("controller=>", routes);

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      <Routes>
        <Route path="*" element={<Basic />} />
        <Route path="admin" element={<AdminHome />}>
          <Route path="" element={<Analytics />} />
          <Route path="Country" element={<Country />} />
          <Route path="Client" element={<Client />} />
          <Route path="Vendor" element={<Vendor />} />
          <Route path="SoftwareUser" element={<Softwareuser />} />
          <Route path="Portaluser" element={<PortalUser />} />
          <Route path="EmailTemplate" element={<Emailtemplate />} />
          <Route path="PreScreenerNew" element={<Presceenernew />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
