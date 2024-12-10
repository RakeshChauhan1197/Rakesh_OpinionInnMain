import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import Pollscom from "module/Master/Polls/Component/Pollscom";
import type { AppDispatch } from "app/store";
import { addPolls, getPolls, GetPollByID } from "./slice/Polls.slice";
import { selectorLoading, selectorGetPolls } from "./slice/Polls.selector";
import { IPolls } from "./slice/Polls.type";

function Polls(): JSX.Element {
  const [openModal, setOpenModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [selectedPolls, setSelectedPolls] = useState<IPolls | null>(null);
  const [dataTableData, setDataTableData] = useState({
    table: {
      columns: [],
      rows: [],
    },
  });

  const dispatch = useDispatch<AppDispatch>();
  const loadingState = useSelector(selectorLoading);
  const polls = useSelector(selectorGetPolls);
  const message = useSelector((state: any) => state.polls.message);

  const handleOpenModal = (polls?: IPolls) => {
    setSelectedPolls(polls || null);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedPolls(null);
    setOpenModal(false);
    dispatch(getPolls());
  };

  const handleSaveModel = async (polls: IPolls) => {
    await dispatch(addPolls(polls));
    await dispatch(getPolls());
    setOpenSnackbar(true);
    handleCloseModal();
  };

  const onEditClick = async (tid: number) => {
    try {
      const response = await dispatch(GetPollByID(tid)).unwrap();
      setSelectedPolls(response);
      setOpenModal(true);
    } catch (error) {
      console.error("Failed to fetch poll details:", error);
    }
  };

  useEffect(() => {
    dispatch(getPolls());
  }, [dispatch]);

  useEffect(() => {
    const rowsWithActions = polls.map((row, index) => ({
      serialNumber: index + 1,
      country: row.country,
      question: row.question,
      startDate: row.startDate,
      endDate: row.endDate,
      status: row.status,
      action: (
        <>
          <IconButton onClick={() => onEditClick(row.tid)} sx={{ padding: 0, color: "#008CBA" }}>
            <EditIcon />
          </IconButton>
          <IconButton key={`download-${index}`}>
            <DownloadIcon />
          </IconButton>
          <IconButton key={`search-${index}`}>
            <SearchIcon />
          </IconButton>
        </>
      ),
    }));

    const data = {
      columns: [
        { Header: "S.No", accessor: "serialNumber", width: "20%" },
        { Header: "Country", accessor: "country", width: "20%" },
        { Header: "Question", accessor: "question", width: "20%" },
        { Header: "Start Date", accessor: "startDate", width: "25%" },
        { Header: "End date", accessor: "endDate", width: "25%" },
        { Header: "Status", accessor: "status", width: "20%" },
        { Header: "Action", accessor: "action", width: "20%" },
      ],
      rows: rowsWithActions,
    };

    setDataTableData({ table: data });
  }, [polls]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <MDBox mb={0}>
          <Card>
            <MDBox p={3} lineHeight={0}>
              <MDBox display="flex" justifyContent="space-between" alignItems="center">
                <MDTypography variant="h5" fontWeight="medium">
                  Polls Master
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
                  <AddIcon sx={{ fontSize: "3rem", marginRight: "4px" }} />
                  Add Polls
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
            <Pollscom onClose={handleCloseModal} polls={selectedPolls} onSave={handleSaveModel} />
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

export default Polls;
