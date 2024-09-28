import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "app/store";
import { getCountry, addCountry, updateCountry, deleteCountry } from "./slice/Country.slice";
import { selectorLoading, selectorGetCountry } from "./slice/Country.selector";
import { ICountry } from "./slice/Country.type";
import { Button, Card, IconButton, Modal, Snackbar, Alert } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import CountryForm from "./CountryForm";

function Country(): JSX.Element {
  const [openModal, setOpenModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const loadingState = useSelector(selectorLoading);
  const countries = useSelector(selectorGetCountry);
  const message = useSelector((state: any) => state.country.message);

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

  const handleOpenModal = (country?: ICountry) => {
    setSelectedCountry(country || null);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedCountry(null);
    setOpenModal(false);
  };

  const handleSaveCountry = async (country: ICountry) => {
    if (selectedCountry) {
      await dispatch(updateCountry(country));
    } else {
      await dispatch(addCountry(country));
    }
    setOpenSnackbar(true);
    handleCloseModal();
  };

  const handleDeleteCountry = async (id: number) => {
    await dispatch(deleteCountry(id));
    setOpenSnackbar(true);
  };

  useEffect(() => {
    dispatch(getCountry());
  }, [dispatch]);

  useEffect(() => {
    const rowsWithActions = countries.map((row, index) => ({
      serialNumber: index + 1,
      countryCode: row.countryCode,
      countryName: row.countryName,
      dOrd: row.dOrd,
      tID: row.tID,
      action: (
        <>
          <IconButton onClick={() => handleOpenModal(row)} sx={{ padding: 0, color: "#008CBA" }}>
            <EditIcon />
          </IconButton>

          <IconButton
            onClick={() => alert(`View country ${row.countryName}`)}
            sx={{ padding: 0, ml: 1, color: "#999393" }}
          >
            <VisibilityIcon />
          </IconButton>

          <IconButton
            onClick={() => handleDeleteCountry(row.tID)}
            sx={{ padding: 0, ml: 1, color: "#f10a0aad" }}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    }));

    const data = {
      columns: [
        { Header: "S.No", accessor: "serialNumber", width: "20%" },
        { Header: "Country Code", accessor: "countryCode", width: "20%" },
        { Header: "Country Name", accessor: "countryName", width: "25%" },
        { Header: "Display Order", accessor: "dOrd", width: "20%" },
        { Header: "Action", accessor: "action", width: "20%" },
      ],
      rows: rowsWithActions,
    };

    setDataTableData({ table: data });
    console.log("Data", data);
  }, [countries]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={3} pb={3}>
        <MDBox mb={0}>
          <Card>
            <MDBox p={3} lineHeight={0}>
              <MDBox display="flex" justifyContent="space-between" alignItems="center">
                <MDTypography variant="h6" gutterBottom>
                  Country Master
                </MDTypography>
                <Button
                  variant="contained"
                  onClick={() => handleOpenModal()}
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
                  Add Country
                </Button>
              </MDBox>
            </MDBox>

            <DataTable table={dataTableData.table} canSearch isSorted={false} noEndBorder />

            {/* Pagination alignment */}
            <MDBox display="flex" justifyContent="flex-end" p={2}>
              {/* Assuming the pagination component is rendered inside DataTable */}
              {/* If not, you can manually handle pagination here */}
            </MDBox>
          </Card>
        </MDBox>
      </MDBox>

      <Modal open={openModal} onClose={handleCloseModal}>
        <CountryForm
          onSave={handleSaveCountry}
          onClose={handleCloseModal}
          country={selectedCountry}
        />
      </Modal>

      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </DashboardLayout>
  );
}

export default Country;
