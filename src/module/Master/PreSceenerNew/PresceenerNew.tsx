import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Snackbar from "@mui/material/Snackbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "app/store";
import { Alert } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Modal from "@mui/material/Modal";
import PresceenerNewCom from "./Component/Presceenernewcom";
import { Add as AddIcon } from "@mui/icons-material";
import {
  getPresceener,
  addPresceener,
  updatePresceener,
  deletePresceener,
  getPresceenerByID,
} from "./slice/Presceener.slice";
import {
  selectorGetPresceeners,
  selectorError,
  selectorLoading,
  selectorMessage,
} from "./slice/Presceener.selector";
import { IPresceener } from "./slice/Presceener.type";
import Question from "./Component/Question";

function PresceenerNew(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const presceeners = useSelector(selectorGetPresceeners);
  const [selectedPresceener, setSelectedPresceener] = useState<IPresceener | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openHelpModal, setOpenHelpModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleOpenHelpModal = () => setOpenHelpModal(true); // Open help modal
  const handleCloseHelpModal = () => setOpenHelpModal(false); // Close help modal

  const message = useSelector(selectorMessage);
  const loading = useSelector(selectorLoading);
  const error = useSelector(selectorError);

  useEffect(() => {
    dispatch(getPresceener());
  }, [dispatch]);

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

  useEffect(() => {
    const rowsWithActions = presceeners.map((row, index) => ({
      serialNumber: index + 1,
      PSName: row.psName,
      PSDesc: row.psDesc,
      PSDate: row.psDate,
      PSCountry: row.psCountry,
      action: (
        <>
          <IconButton
            onClick={() => handleEditPresceener(row.psid)}
            sx={{ padding: 0, color: "#008CBA" }}
            title="Edit"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => handleDeletePresceener(row.psid)} // Attach delete handler
            sx={{ padding: 0, ml: 1, color: "#f10a0aad" }}
            title="Delete"
          >
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={handleOpenHelpModal} sx={{ padding: 0 }} title="Question">
            <HelpOutlineIcon />
          </IconButton>
          <IconButton title="Copy" sx={{ padding: 0 }}>
            <ContentCopyIcon />
          </IconButton>
          <IconButton title="Download" sx={{ padding: 0 }}>
            <CheckCircleIcon />
          </IconButton>
        </>
      ),
    }));

    const data = {
      columns: [
        { Header: "S.No", accessor: "serialNumber", width: "20%" },
        { Header: "Name", accessor: "PSName", width: "20%" },
        { Header: "Description", accessor: "PSDesc", width: "25%" },
        { Header: "Country", accessor: "PSCountry", width: "20%" },
        { Header: "Date", accessor: "PSDate", width: "20%" },
        { Header: "Action", accessor: "action", width: "20%" },
      ],
      rows: rowsWithActions,
    };

    setDataTableData({ table: data });
  }, [presceeners]);

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

  const handleEditPresceener = async (psid: number) => {
    try {
      const presceener = await dispatch(getPresceenerByID(psid));
      setSelectedPresceener(presceener.payload);
      handleOpenModal();
    } catch (error) {
      console.error("Error fetching presceener by ID:", error);
    }
  };

  const handleDeletePresceener = async (id: number) => {
    await dispatch(deletePresceener(id));
    setOpenSnackbar(true);
    await dispatch(getPresceener());
  };

  const handleSavePresceener = async (presceener: IPresceener) => {
    if (selectedPresceener) {
      await dispatch(updatePresceener(presceener)).unwrap();
    } else {
      await dispatch(addPresceener(presceener)).unwrap();
    }
    await dispatch(getPresceener());
    setOpenSnackbar(true);
    handleCloseModal();
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <MDBox mb={0}>
          <Card>
            <MDBox p={3} lineHeight={0}>
              <MDBox display="flex" justifyContent="space-between" alignItems="center">
                <MDTypography variant="h5" fontWeight="medium">
                  Prescreener Master
                </MDTypography>
                <Button
                  variant="contained"
                  onClick={() => {
                    setSelectedPresceener(null);
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
                  Add Prescreener
                </Button>
              </MDBox>
              <DataTable table={dataTableData.table} canSearch isSorted={false} noEndBorder />
              <MDBox display="flex" justifyContent="flex-end" p={2}></MDBox>
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
            <PresceenerNewCom
              onSave={handleSavePresceener}
              onClose={handleCloseModal}
              presceener={selectedPresceener}
            />
          </MDBox>
        </MDBox>
      </Modal>
      <Modal open={openHelpModal} onClose={handleCloseHelpModal}>
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
              width: "120%",
              maxHeight: "100vh",
              overflowY: "auto",
              backgroundColor: "white",
              padding: 4,
              borderRadius: 2,
              boxShadow: 24,
            }}
          >
            <Question onClose={handleCloseHelpModal} />
          </MDBox>
        </MDBox>
      </Modal>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      <Footer />
    </DashboardLayout>
  );
}

export default PresceenerNew;
