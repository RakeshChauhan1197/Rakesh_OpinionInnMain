import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import MDBox from "components/MDBox";
import Snackbar from "@mui/material/Snackbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "app/store";
import { addSoftwareuser, getSoftwareuser, updateSoftwareuser } from "./slice/Softwareuser.slice";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@mui/material/Modal";
import Softusercom from "module/Master/SoftwareUser/Component/Softusercom";
import { ISoftwareuser } from "./slice/Softwareuser.type";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { lockunlockPuser } from "./slice/Softwareuser.slice";
import {
  selectError,
  selectLoading,
  selectMessage,
  selectSoftwareUsers,
} from "./slice/Softwareuser.selector";

function Softwareuser(): JSX.Element {
  const [openModal, setOpenModal] = useState(false);
  const [selectedSoftwareuser, setSelectedSoftwareuser] = useState<ISoftwareuser | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const softwareUsers = useSelector(selectSoftwareUsers);
  const message = useSelector(selectMessage);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getSoftwareuser());
  }, [dispatch]);

  const columns = [
    { Header: "Serial No", accessor: "serialNumber", width: "20%" },
    { Header: "First Name", accessor: "firstName", width: "25%" },
    { Header: "Last Name", accessor: "lastName", width: "25%" },
    { Header: "Email ID", accessor: "email", width: "25%" },
    { Header: "Role", accessor: "userRole", width: "15%" },
    { Header: "Status", accessor: "status", width: "15%" },
    { Header: "Action", accessor: "action", width: "15%" },
  ];

  const [dataTableData, setDataTableData] = useState<{
    table: {
      columns: { Header: string; accessor: string; width: string }[];
      rows: any[];
    };
  }>({
    table: {
      columns: columns,
      rows: [],
    },
  });

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (message) {
      setSnackbarMessage(message);
      setOpenSnackbar(true);
    }
  }, [message]);

  useEffect(() => {
    if (error) {
      setSnackbarMessage(error);
      setOpenSnackbar(true);
    }
  }, [error]);

  const handleOpenModal = (softwareuser?: ISoftwareuser) => {
    setSelectedSoftwareuser(softwareuser || null);
    setOpenModal(true);
  };

  const handleLockUnlock = (puser: number) => {
    dispatch(lockunlockPuser(puser));
  };

  const handleCloseModal = () => {
    setSelectedSoftwareuser(null);
    setOpenModal(false);
  };

  const handleSaveSoftwareuser = async (softwareuser: ISoftwareuser) => {
    try {
      if (selectedSoftwareuser) {
        await dispatch(updateSoftwareuser(softwareuser));
      } else {
        await dispatch(addSoftwareuser(softwareuser));
      }
      await dispatch(getSoftwareuser());
      setOpenSnackbar(true);
      handleCloseModal();
    } catch (error) {
      console.error("Failed to save software user:", error);
    }
  };

  useEffect(() => {
    const rowsWithActions = softwareUsers.map((row: ISoftwareuser, index: number) => ({
      serialNumber: index + 1,
      firstName: row.firstName,
      lastName: row.lastName,
      email: row.email,
      status: " ",
      userRole: row.userRole,
      action: (
        <>
          <IconButton onClick={() => handleLockUnlock(row.uid)} title="Lock Unlock">
            <LockOpenIcon />
          </IconButton>
          <IconButton
            onClick={() => handleOpenModal(row)}
            sx={{ padding: 0, color: "#008CBA" }}
            title="Edit"
          >
            <EditIcon />
          </IconButton>
        </>
      ),
    }));

    setDataTableData((prevState) => ({
      ...prevState,
      table: {
        ...prevState.table,
        rows: rowsWithActions,
      },
    }));
  }, [softwareUsers]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <MDBox mb={0}>
          <Card>
            <MDBox p={3} lineHeight={1}>
              <MDBox display="flex" justifyContent="flex-end" alignItems="center">
                <Button
                  variant="contained"
                  onClick={() => handleOpenModal()}
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
                  Add Software User
                </Button>
              </MDBox>
              <DataTable table={dataTableData.table} canSearch isSorted={false} noEndBorder />
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
              width: "100vw",
              maxHeight: "100vh",
              overflowY: "auto",
              backgroundColor: "white",
              padding: 4,
              borderRadius: 2,
              boxShadow: 24,
            }}
          >
            <Softusercom
              onSave={handleSaveSoftwareuser}
              onClose={handleCloseModal}
              softwareuser={selectedSoftwareuser}
            />
          </MDBox>
        </MDBox>
      </Modal>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
      <Footer />
    </DashboardLayout>
  );
}

export default Softwareuser;
