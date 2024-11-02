import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "app/store";
import { Card, Button, Modal, IconButton, Snackbar, Alert } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { IClient } from "./slice/Client.type";
import { fetchClients, deleteClient, updateClient, addClient } from "./slice/Client.slice";
import { selectorLoading, selectorGetClient } from "./slice/Client.selector";
import Clientcom from "./Component/Clientcom";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

const Client = (): JSX.Element => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<IClient | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const loadingState = useSelector(selectorLoading);
  const clientState = useSelector(selectorGetClient);
  const clients = clientState || [];
  const [dataTableData, setDataTableData] = useState<any>();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const message = useSelector((state: any) => state.client.message);

  const handleOpenModal = (clientData?: IClient) => {
    setSelectedClient(clientData || null);
    setOpenModal(true);
  };

  const handleSaveClient = async (client: IClient) => {
    try {
      if (selectedClient) {
        await dispatch(updateClient(client));
      } else {
        await dispatch(addClient(client));
      }
      await dispatch(fetchClients());
      setOpenSnackbar(true);
      handleCloseModal();
    } catch (error) {
      console.error("Error saving client:", error);
    }
  };

  const handleCloseModal = () => {
    setSelectedClient(null);
    setOpenSnackbar(true);
    setOpenModal(false);
  };
  const handleDeleteClient = async (id: number) => {
    await dispatch(deleteClient(id));
    setOpenSnackbar(true);
    setTimeout(() => {
      dispatch(fetchClients());
    }, 1000);
  };

  useEffect(() => {
    dispatch(fetchClients())
      .then((response) => {
        console.log("Clients fetched: ", response);
      })
      .catch((error) => {
        console.error("Failed to fetch clients: ", error);
      });
  }, [dispatch]);

  useEffect(() => {
    const rowWithActions = clients.map((row, index) => ({
      serialNo: index + 1,
      clientName: row.clientName,
      contactPersonName: row.contactPersonName,
      contactPersonEmail: row.contactPersonEmail,
      contactPersonPhone: row.contactPersonPhone,
      clientFinanceContact: row.clientFinanceContact,
      action: (
        <>
          <IconButton onClick={() => handleOpenModal(row)} sx={{ padding: 0, color: "#008CBA" }}>
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => alert(`View client ${row.clientName}`)}
            sx={{ padding: 0, ml: 1, color: "#999393" }}
          >
            <VisibilityIcon />
          </IconButton>
          <IconButton
            onClick={() => handleDeleteClient(row.cid)}
            sx={{ padding: 0, ml: 1, color: "#f10a0aad" }}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    }));

    const data = {
      columns: [
        { Header: "S.No", accessor: "serialNo", width: "5%" },
        { Header: "Client Name", accessor: "clientName", width: "15%" },
        { Header: "Person Name", accessor: "contactPersonName", width: "10%" },
        { Header: "Email", accessor: "contactPersonEmail", width: "20%" },
        { Header: "Phone Number", accessor: "contactPersonPhone", width: "15%" },
        { Header: "Finance Contact", accessor: "clientFinanceContact", width: "20%" },
        { Header: "Action", accessor: "action", width: "15%" },
      ],
      rows: rowWithActions,
    };
    setDataTableData(data);
  }, [clients, loadingState]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <MDBox mb={0}>
          <Card>
            <MDBox p={3} lineHeight={0}>
              <MDBox display="flex" justifyContent="space-between" alignItems="center">
                <MDTypography variant="h5" fontWeight="medium">
                  Client Master
                </MDTypography>
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
                  Add Client
                </Button>
              </MDBox>
              <MDTypography variant="button" color="text"></MDTypography>
            </MDBox>

            {dataTableData && <DataTable table={dataTableData} canSearch noEndBorder />}
          </Card>
        </MDBox>
      </MDBox>

      <Modal open={openModal} onClose={handleCloseModal}>
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
          <Clientcom onClose={handleCloseModal} client={selectedClient} />
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
};

export default Client;
