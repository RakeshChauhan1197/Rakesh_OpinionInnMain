import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "app/store";

// Material UI components
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import ShowIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";

// Custom components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";

// Redux actions and selectors
import { getEndpage, addEndpage, deleteEndpage, getShowURL, getText } from "./slice/Endpage.slice";
import { selectorGetEndpage } from "./slice/Endpage.selector";
import { IEndpage } from "./slice/Endpage.type";

// Example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Endpagescom from "./Component/Endpagescom";

function Endpages(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const endpages = useSelector(selectorGetEndpage);
  const [openModal, setOpenModal] = useState(false);
  const [selectedEndpage, setSelectedEndpage] = useState<IEndpage | null>(null);
  const [dataTableData, setDataTableData] = useState({
    table: {
      columns: [],
      rows: [],
    },
  });
  const handleAddButton = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const response = await dispatch(getText()).unwrap();
      setSelectedEndpage(response);
    } catch (error) {
      console.error("Failed to fetch text:", error);
    } finally {
      setOpenModal(true);
    }
  };

  const handleOpenModal = (endpage?: IEndpage) => {
    setSelectedEndpage(endpage || null);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedEndpage(null);
    setOpenModal(false);
  };

  // Handle save endpage action
  const handleSaveEndpage = async (endpage: IEndpage) => {
    if (selectedEndpage) {
      await dispatch(addEndpage(endpage)); // Save or update the endpage
    } else {
      await dispatch(addEndpage(endpage)); // Adding new endpage
    }
    dispatch(getEndpage()); // Fetch updated endpages list
    handleCloseModal(); // Close modal after saving
  };

  // Handle delete endpage action
  const handleDeleteEndpage = async (id: number) => {
    await dispatch(deleteEndpage(id));
    dispatch(getEndpage()); // Fetch updated endpages list
  };

  // Handle show URL action
  const handleShowURL = async (id: number) => {
    await dispatch(getShowURL(id));
    dispatch(getEndpage()); // Fetch updated endpages list
  };

  // Setup data for DataTable
  useEffect(() => {
    const rowsWithActions = endpages.map((row, index) => ({
      serialNumber: index + 1,
      endPage_Name: row.endPage_Name,
      success_EndPage_Code: row.success_EndPage_Code,
      reject_EndPage_Code: row.reject_EndPage_Code,
      overQuota_EndPage_Code: row.overQuota_EndPage_Code,
      createdOn: row.createdOn,
      ufName: row.ufName,
      action: (
        <>
          <IconButton
            onClick={() => handleShowURL(row.cid)}
            sx={{ padding: 0, color: "#008CBA" }}
            title="Show URL"
          >
            <ShowIcon />
          </IconButton>
          <IconButton
            onClick={() => handleDeleteEndpage(row.cid)}
            sx={{ padding: 0, ml: 1, color: "#f10a0aad" }}
            title="Delete"
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    }));

    setDataTableData({
      table: {
        columns: [
          { Header: "S.No", accessor: "serialNumber" },
          { Header: "Name", accessor: "endPage_Name" },
          { Header: "Success Code", accessor: "success_EndPage_Code" },
          { Header: "Reject Code", accessor: "reject_EndPage_Code" },
          { Header: "Overquota Code", accessor: "overQuota_EndPage_Code" },
          { Header: "Created On", accessor: "createdOn" },
          { Header: "Created By", accessor: "ufName" },
          { Header: "Action", accessor: "action" },
        ],
        rows: rowsWithActions,
      },
    });
  }, [endpages]);

  // Fetch endpages when the component mounts
  useEffect(() => {
    dispatch(getEndpage());
  }, [dispatch]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <MDBox mb={0}>
          <Card>
            <MDBox p={3} lineHeight={0}>
              {/* Flex container to align heading and button */}
              <MDBox display="flex" justifyContent="space-between" alignItems="center">
                <MDTypography variant="h5" fontWeight="medium">
                  Endpages
                </MDTypography>
                <Button
                  variant="contained"
                  onClick={handleAddButton}
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
                  Add Endpage
                </Button>
              </MDBox>
            </MDBox>
            <DataTable table={dataTableData.table} canSearch isSorted={false} noEndBorder />
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
            <Endpagescom
              onClose={handleCloseModal}
              onSave={handleSaveEndpage}
              endpage={selectedEndpage}
            />
          </MDBox>
        </MDBox>
      </Modal>
      <Footer />
    </DashboardLayout>
  );
}

export default Endpages;
