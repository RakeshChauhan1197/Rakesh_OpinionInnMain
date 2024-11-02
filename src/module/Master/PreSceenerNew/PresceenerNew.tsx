import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "app/store";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"; // Replace with appropriate icon
import ContentCopyIcon from "@mui/icons-material/ContentCopy"; // Replace with appropriate icon
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Modal from "@mui/material/Modal";
import Presceenernewcom from "./Component/Presceenernewcom";
import { getPresceener } from "./slice/Presceener.slice";
import { selectorGetPresceeners } from "./slice/Presceener.selector";

function Presceenernew(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const presceeners = useSelector(selectorGetPresceeners);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

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
          <IconButton>
            <EditIcon />
          </IconButton>
          <IconButton>
            <DeleteIcon />
          </IconButton>
          <IconButton>
            <HelpOutlineIcon /> {/* Corrected icon */}
          </IconButton>
          <IconButton>
            <ContentCopyIcon /> {/* Corrected icon */}
          </IconButton>
          <IconButton>
            <CheckCircleIcon /> {/* Corrected icon */}
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

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <MDBox mb={0}>
          <Card>
            <MDBox p={3} lineHeight={0}>
              <MDBox display="flex" justifyContent="space-between" alignItems="center">
                <MDTypography variant="h5" fontWeight="medium">
                  Presceener Master
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
                  Add New Presceener
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
            <Presceenernewcom onClose={handleCloseModal} />
          </MDBox>
        </MDBox>
      </Modal>
      <Footer />
    </DashboardLayout>
  );
}

export default Presceenernew;
