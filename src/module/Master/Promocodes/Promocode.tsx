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
import Promocodescom from "module/Master/Promocodes/Component/Promocodescom";

function Promocodes(): JSX.Element {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

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
                  onClick={handleOpenModal}
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
                  Add Promo code
                </Button>
              </MDBox>
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
            <Promocodescom onClose={handleCloseModal} />
          </MDBox>
        </MDBox>
      </Modal>
      <Footer />
    </DashboardLayout>
  );
}

export default Promocodes;
