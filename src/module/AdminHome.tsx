import { setMiniSidenav, setOpenConfigurator, useMaterialUIController } from "context";
import Sidenav from "examples/Sidenav";
import { useEffect, useState } from "react";
import brandWhite from "assets/images/image_2024_09_24T07_01_48_307Z.png";
import brandDark from "assets/images/image_2024_09_24T07_01_48_307Z.png";
import routes from "routes";
import { Navigate, Outlet } from "react-router-dom";
import Configurator from "examples/Configurator";
import MDBox from "components/MDBox";
import { Icon } from "@mui/material";

const AdminHome = () => {
  const [isAuth, setIsAuth] = useState<boolean>(true);
  // const navigate = useNavigate();
  const authToken = sessionStorage.getItem("token");
  const [controller, dispatch] = useMaterialUIController();
  const [onMouseEnter, setOnMouseEnter] = useState(false);

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
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  useEffect(() => {
    console.log("authToken=>");

    if (!authToken) {
      setIsAuth(false);
      //  navigate("/");
    }
  }, [authToken]);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };
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

  return isAuth ? (
    <div>
      <div className="app">
        <Sidenav
          color={sidenavColor}
          brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
          brandName=""
          routes={routes}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        />

        {/* <Configurator /> */}
        {configsButton}

        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  ) : (
    <Navigate to={"/"}></Navigate>
  );
};

export default AdminHome;
