import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "app/store";
import {
  getPuser,
  lockunlockPuser,
  passwordLink,
  skipIPValidation,
  downloadUser,
} from "./slice/Portaluser.slice";
import { Button, Card, IconButton, Snackbar, Modal, Alert } from "@mui/material"; // Added Modal
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import ResendPasswordIcon from "@mui/icons-material/Replay";
import ValidationCheckIcon from "@mui/icons-material/CheckCircle";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { IPuser } from "./slice/Portaluser.type";
import Portalusercom from "./Component/Portalusercom";

function PortalUser(): JSX.Element {
  const [openModal, setOpenModal] = useState(false); // Modal open state
  const dispatch = useDispatch<AppDispatch>();
  const pusers = useSelector((state: any) => state.puser.data);
  const message = useSelector((state: any) => state.puser.message);
  const error = useSelector((state: any) => state.puser.error);

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

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    dispatch(getPuser());
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      setSnackbarMessage(message);
      setSnackbarOpen(true);
      setTimeout(() => {
        setSnackbarOpen(false);
      }, 3000); // Close after 3 seconds
    }
  }, [message]);

  useEffect(() => {
    if (error) {
      setSnackbarMessage(error);
      setSnackbarOpen(true);
      setTimeout(() => {
        setSnackbarOpen(false);
      }, 3000); // Close after 3 seconds
    }
  }, [error]);
  const handleLockUnlock = (puser: number) => {
    dispatch(lockunlockPuser(puser));
    dispatch(getPuser);
  };

  const handleSkipIPAddress = (emailID: string, currentSkipIP: number) => {
    const skipIp = currentSkipIP === 0 ? 1 : 0;
    dispatch(skipIPValidation({ emailID, skip_IP_Validation: skipIp }));
    dispatch(getPuser);
  };

  const handleSendPassLink = (puser: number) => {
    dispatch(passwordLink(puser));
    dispatch(getPuser);
  };

  const handleDownloadUsers = () => {
    dispatch(downloadUser());
  };

  useEffect(() => {
    const rowsWithActions = pusers.map((row: IPuser, index: number) => ({
      serialNumber: index + 1,
      firstName: row.firstName,
      lastName: row.lastName,
      emailID: row.emailID,
      userRole: row.userRole,
      country: row.country,
      status: row.status,
      doc: row.doc,
      dob: row.dob,
      gender: row.gender,
      zipCode: row.zipCode,
      city: row.city,
      state: row.state,
      dma: row.dma,
      suurce: row.suurce,
      signUP_IP: row.signUP_IP,
      skip_IP_Validation: row.skip_IP_Validation,
      action: (
        <>
          <IconButton onClick={() => handleLockUnlock(row.userID)} title="Lock Unlock">
            <LockOpenIcon />
          </IconButton>
          <IconButton onClick={() => handleSendPassLink(row.userID)} title="Resend Password Link">
            <ResendPasswordIcon />
          </IconButton>
          <IconButton
            onClick={() => handleSkipIPAddress(row.emailID, row.skip_IP_Validation)}
            title="Skip IP Validation "
          >
            <ValidationCheckIcon />
          </IconButton>
        </>
      ),
    }));

    const data = {
      columns: [
        { Header: "Action", accessor: "action", width: "10%" },
        { Header: "S.No", accessor: "serialNumber", width: "5%" },
        { Header: "First Name", accessor: "firstName", width: "20%" },
        { Header: "Last Name", accessor: "lastName", width: "20%" },
        { Header: "Email ID", accessor: "emailID", width: "15%" },
        { Header: "User Role", accessor: "userRole", width: "10%" },
        { Header: "Country", accessor: "country", width: "10%" },
        { Header: "Status", accessor: "status", width: "5%" },
        { Header: "Created On", accessor: "doc", width: "10%" },
        { Header: "DOB", accessor: "dob", width: "10%" },
        { Header: "Gender", accessor: "gender", width: "5%" },
        { Header: "Zip Code", accessor: "zipCode", width: "10%" },
        { Header: "City", accessor: "city", width: "10%" },
        { Header: "State", accessor: "state", width: "10%" },
        { Header: "DMA", accessor: "dma", width: "10%" },
        { Header: "Source", accessor: "suurce", width: "10%" },
        { Header: "SignUp IP", accessor: "signUP_IP", width: "10%" },
        { Header: "Skip IP Validation", accessor: "skip_IP_Validation", width: "10%" },
      ],
      rows: rowsWithActions,
    };

    setDataTableData({ table: data });
  }, [pusers]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true); // Open modal when Block Bulk User is clicked
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Close modal
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={3} pb={3} className="table-container">
        <MDBox mb={3}>
          <Card>
            <MDBox p={3} lineHeight={1}>
              <MDBox display="flex" justifyContent="flex-end" alignItems="center">
                <Button
                  variant="contained"
                  onClick={handleOpenModal} // Open modal on button click
                  sx={{
                    ml: 2,
                    backgroundColor: "#fff",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#frc",
                      color: "#fff",
                    },
                  }}
                >
                  Block Bulk User
                </Button>
                <Button
                  variant="contained"
                  onClick={handleDownloadUsers}
                  sx={{
                    ml: 2,
                    backgroundColor: "#fff",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#frc",
                      color: "#fff",
                    },
                  }}
                >
                  Download User
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    ml: 2,
                    backgroundColor: "#fff",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#frc",
                      color: "#fff",
                    },
                  }}
                >
                  Export to Excel
                </Button>
              </MDBox>
              <DataTable table={dataTableData.table} canSearch isSorted={false} noEndBorder />
            </MDBox>
          </Card>
        </MDBox>
      </MDBox>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Portalusercom onClose={handleCloseModal} />
      </Modal>
      {/**<Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      /> */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </DashboardLayout>
  );
}

export default PortalUser;
