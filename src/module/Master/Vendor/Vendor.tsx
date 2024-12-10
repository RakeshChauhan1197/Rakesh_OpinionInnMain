import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "app/store";
import Vendorcom from "module/Master/Vendor/Component/Vendorcom";
import { IVendor } from "./slice/Vendor.type";
import { Add as AddIcon } from "@mui/icons-material";
import {
  fetchVendors,
  deleteVendor,
  updateVendor,
  addVendor,
  fetchParentVendors,
} from "./slice/Vendor.slice";
import {
  selectorLoading,
  selectorGetVendor,
  selectorGetParentVendor,
} from "./slice/Vendor.selector";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Vendor(): JSX.Element {
  const [openModal, setOpenModal] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<IVendor | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const loadingState = useSelector(selectorLoading);
  const vendorState = useSelector(selectorGetVendor);
  const vendors = vendorState || [];

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

  const handleOpenModal = (vendor?: IVendor) => {
    setSelectedVendor(vendor || null);
    dispatch(fetchParentVendors());
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedVendor(null);
    setOpenModal(false);
  };

  const handleSaveVendor = async (vendor: IVendor) => {
    if (selectedVendor) {
      await dispatch(updateVendor(vendor));
      setMessage("Vendor updated successfully!");
    } else {
      await dispatch(addVendor(vendor));
      setMessage("Vendor added successfully!");
    }
    setOpenSnackbar(true);
    handleCloseModal();
    dispatch(fetchVendors());
  };

  const handleDeleteVendor = async (id: number) => {
    await dispatch(deleteVendor(id));
    setMessage("Vendor deleted successfully!");
    setOpenSnackbar(true);
    dispatch(fetchVendors());
  };

  useEffect(() => {
    dispatch(fetchVendors());
  }, [dispatch]);

  useEffect(() => {
    const rowWithActions = vendors.map((row, index) => ({
      serialNo: index + 1,
      vendorName: row.vendorName,
      vid: row.vid,
      useraAttribute: row.useraAttribute,
      action: (
        <>
          <IconButton onClick={() => handleOpenModal(row)} sx={{ padding: 0, color: "#008CBA" }}>
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => handleDeleteVendor(row.vid)}
            sx={{ padding: 0, ml: 1, color: "#f10a0aad" }}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    }));

    const data = {
      columns: [
        { Header: "S.No", accessor: "serialNo", width: "15%" },
        { Header: "Parent Name", accessor: "Parent", width: "15%" },
        { Header: "Vendor Name", accessor: "vendorName", width: "25%" },
        { Header: "Vendor Id", accessor: "vid", width: "25%" },
        { Header: "User Id Attribute", accessor: "useraAttribute", width: "25%" },
        { Header: "Action", accessor: "action", width: "20%" },
      ],
      rows: rowWithActions,
    };
    setDataTableData({ table: data });
  }, [vendors, loadingState]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <MDBox mb={0}>
          <Card>
            <MDBox p={3} lineHeight={0} xs={12} sm={6}>
              <MDBox display="flex" justifyContent="flex-end" alignItems="center">
                <Button
                  variant="contained"
                  onClick={() => handleOpenModal()}
                  sx={{
                    ml: 2,
                    backgroundColor: "#1976d2",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#005bb5",
                      color: "#fff",
                    },
                  }}
                >
                  <AddIcon
                    sx={{
                      fontSize: "3rem", // Double the default size
                      marginRight: "4px", // Adds space between icon and text
                    }}
                  />
                  Add Vendor
                </Button>
              </MDBox>
            </MDBox>
            <DataTable table={dataTableData.table} canSearch isSorted={false} noEndBorder />
            <MDBox display="flex" justifyContent="flex-end" p={2}></MDBox>
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
            <Vendorcom
              onSave={handleSaveVendor}
              onClose={handleCloseModal}
              vendor={selectedVendor}
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

export default Vendor;
