import Card from "@mui/material/Card";
import Button from "@mui/material/Button"; // Import Button from Material UI
import { Add as AddIcon } from "@mui/icons-material";
// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Snackbar } from "@mui/material";
import { Alert } from "@mui/material";
// Material Dashboard 2 PRO React TS examples components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import LockOpenIcon from "@mui/icons-material/LockOpen";
// Data
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "app/store";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import Promocodescom from "module/Master/Promocodes/Component/Promocodescom";
import { Ipromocodes } from "./slice/Promocodes.type";
import { selectorLoading } from "./slice/Promocodes.selector";
import { selectorGetPromocodes } from "./slice/Promocodes.selector";
import {
  addPromocodes,
  deletePromocodes,
  getPromocodes,
  lockunlockPromocodes,
  updatePromocodes,
} from "./slice/Promocodes.slice";

function Promocodes(): JSX.Element {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [selectedPromocodes, setSelectedPromocodes] = useState<Ipromocodes | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const loadingState = useSelector(selectorLoading);
  const promocodes = useSelector(selectorGetPromocodes);
  const message = useSelector((state: any) => state.promocodes.message);

  const [dataTableData, setDataTableData] = useState<{
    table: {
      columns: { Header: string; accessor: string; width: string }[];
      rows: any[];
    };
  }>({
    table: {
      columns: [],
      rows: [],
    },
  });

  const handleLockUnlock = (Promocodes: number) => {
    dispatch(lockunlockPromocodes(Promocodes));
    dispatch(getPromocodes);
  };

  useEffect(() => {
    dispatch(getPromocodes());
  }, [dispatch]);

  const handleEditPromocodes = (promocodes: Ipromocodes) => {
    setSelectedPromocodes(promocodes);
    handleOpenModal();
  };

  const handleDeletePromocodes = async (id: number) => {
    await dispatch(deletePromocodes(id));
    setOpenSnackbar(true);
    setTimeout(() => {
      dispatch(getPromocodes());
    }, 1000);
  };

  const handleSavePromocodes = async (promocodes: Ipromocodes) => {
    try {
      if (selectedPromocodes) {
        await dispatch(updatePromocodes(promocodes)).unwrap();
      } else {
        await dispatch(addPromocodes(promocodes)).unwrap();
      }
      await dispatch(getPromocodes());
      setOpenSnackbar(true);
      handleCloseModal();
    } catch (error) {
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    const rowsWithActions = promocodes.map((row, index) => {
      // Determine the status based on the value of isAuth
      const isAuth = row.isAuth === 1 ? "Active" : "InActive";

      return {
        serialNumber: index + 1,
        promoName: row.promoName,
        clientName: row.clientName,
        isAuth: isAuth,
        action: (
          <>
            <IconButton
              onClick={() => handleEditPromocodes(row)}
              sx={{ padding: 0, color: "#008CBA" }}
              title="Edit Icon"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => handleDeletePromocodes(row.pid)}
              sx={{ padding: 0, ml: 1, color: "#f10a0aad" }}
              title="Delete Icon"
            >
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={() => handleLockUnlock(row.pid)} title="Lock Unlock">
              <LockOpenIcon />
            </IconButton>
          </>
        ),
      };
    });

    const data = {
      columns: [
        { Header: "S.No", accessor: "serialNumber", width: "20%" },
        { Header: "Promo Name", accessor: "promoName", width: "20%" },
        { Header: "Client Name", accessor: "clientName", width: "20%" },
        { Header: "Status", accessor: "isAuth", width: "20%" },
        { Header: "Action", accessor: "action", width: "20%" },
      ],
      rows: rowsWithActions,
    };

    setDataTableData({ table: data });
  }, [promocodes]);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <MDBox mb={0}>
          <Card>
            <MDBox p={3} lineHeight={0}>
              <MDBox display="flex" justifyContent="space-between" alignItems="center">
                <MDTypography variant="h5" fontWeight="medium">
                  Promo Codes Master
                </MDTypography>
                <Button
                  variant="contained"
                  onClick={() => {
                    setSelectedPromocodes(null);
                    handleOpenModal();
                  }}
                  sx={{
                    ml: 2,
                    backgroundColor: "#008CBA",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#fff",
                      color: "#008CBA",
                    },
                  }}
                >
                  <AddIcon
                    sx={{
                      fontSize: "3rem", // Double the default size
                      marginRight: "4px", // Adds space between icon and text
                    }}
                  />
                  Add Promo code
                </Button>
              </MDBox>
              <DataTable table={dataTableData.table} canSearch isSorted={false} noEndBorder />
              <MDTypography variant="button" color="text"></MDTypography>
            </MDBox>
          </Card>
        </MDBox>
      </MDBox>

      <Modal open={openModal} onClose={handleCloseModal}>
        <MDBox
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          width="100vw"
          sx={{ paddingLeft: 10 }}
        >
          <MDBox
            sx={{
              width: "100vw", // Adjust the modal width
              maxHeight: "100vh", // Limit the modal height
              overflowY: "auto", // Enable scrolling inside the modal
              backgroundColor: "white",
              padding: 4,
              borderRadius: 2,
              boxShadow: 24,
            }}
          >
            <Promocodescom
              onSave={handleSavePromocodes}
              onClose={handleCloseModal}
              promocodes={selectedPromocodes}
            />
          </MDBox>
        </MDBox>
      </Modal>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      <Footer />
    </DashboardLayout>
  );
}

export default Promocodes;
