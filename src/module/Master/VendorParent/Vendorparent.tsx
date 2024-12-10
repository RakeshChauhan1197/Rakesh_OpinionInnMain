import Card from "@mui/material/Card";
import Button from "@mui/material/Button"; // Import Button from Material UI

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React TS examples components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "app/store";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import { Snackbar } from "@mui/material";
import { Alert } from "@mui/material";
import Vendorparentcom from "module/Master/VendorParent/Component/Vendorparentcom";
import { IVendorparent } from "./slice/Vendorparent.type";
import { selectorGetVendorparent } from "./slice/Vendorparent.selector";
import { selectorLoading } from "./slice/Vendorparent.selector";
import { addVendorparent, getVendorParent } from "./slice/Vendorparent.slice";
import { Add as AddIcon } from "@mui/icons-material";
function Vendorparent(): JSX.Element {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [selectedVendorparent, setSelectedVendorparent] = useState<IVendorparent | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const loadingState = useSelector(selectorLoading);
  const vendorparent = useSelector(selectorGetVendorparent);
  const message = useSelector((state: any) => state.vendorparent.message);

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
    dispatch(getVendorParent());
  }, [dispatch]);

  const EditVendorparent = (vendorparent: IVendorparent) => {
    setSelectedVendorparent(vendorparent);
    handleOpenModal();
  };
  const AddVendorParent = () => {
    setSelectedVendorparent(null); // Set vendorparent to null to clear the form
    handleOpenModal();
  };

  const handleSaveVendorparent = async (vendorparent: IVendorparent) => {
    if (selectedVendorparent) {
      await dispatch(addVendorparent(vendorparent));
    } else {
      await dispatch(addVendorparent(vendorparent));
    }
    await dispatch(getVendorParent());
    setOpenSnackbar(true);
    handleCloseModal();
  };

  useEffect(() => {
    const rowsWithActions = vendorparent.map((row, index) => {
      const isAct = row.isAct === 1 ? "Active" : "InActive";

      return {
        serialNumber: index + 1,
        vendor_Name: row.vendor_Name,
        isAct: row.isAct,
        action: (
          <>
            <IconButton
              onClick={() => EditVendorparent(row)}
              sx={{ padding: 0, color: "#008CBA" }}
              title="Edit Icon"
            >
              <EditIcon />
            </IconButton>
          </>
        ),
      };
    });
    const data = {
      columns: [
        { Header: "S.No", accessor: "serialNumber", width: "20%" },
        { Header: "Client Name", accessor: "vendor_Name", width: "20%" },
        { Header: "status", accessor: "isAct", width: "20%" },
        { Header: "Action", accessor: "action", width: "20%" },
      ],
      rows: rowsWithActions,
    };

    setDataTableData({ table: data });
  }, [vendorparent]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <MDBox mb={0}>
          <Card>
            <MDBox p={3} lineHeight={0}>
              <MDBox display="flex" justifyContent="space-between" alignItems="center">
                <MDTypography variant="h5" fontWeight="medium">
                  Vendor Parent Master
                </MDTypography>
                <Button
                  variant="contained"
                  onClick={AddVendorParent}
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
                  Add Vendor Parent
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
            <Vendorparentcom
              onClose={handleCloseModal}
              onSave={handleSaveVendorparent}
              vendorparent={selectedVendorparent}
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

export default Vendorparent;
