import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "app/store";
import { Itestimonials } from "./slice/Testimonials.type";
import { Button, Card, IconButton, Snackbar, Alert } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import { selectorLoading, selectorGetTestimonials } from "./slice/Testimonials.selector";
import { getTestimonials, approveandrejectTestimonials } from "./slice/Testimonials.slice";

function Testimonials(): JSX.Element {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const loadingState = useSelector(selectorLoading);
  const testimonials = useSelector(selectorGetTestimonials);
  const message = useSelector((state: any) => state.testimonials.message);

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
    dispatch(getTestimonials());
  }, [dispatch]);

  useEffect(() => {
    const rowsWithActions = testimonials.map((row, index) => ({
      serialNumber: index + 1,
      userName: row.userName,
      cdate: row.cdate,
      testiText: row.testiText,
      status: row.status,
      action: (
        <IconButton
          onClick={() => {
            dispatch(approveandrejectTestimonials(row.tid));
            setOpenSnackbar(true);
          }}
        >
          <LockOpenIcon />
        </IconButton>
      ),
    }));

    const data = {
      columns: [
        { Header: "S.No", accessor: "serialNumber", width: "20%" },
        { Header: "Posted By", accessor: "userName", width: "20%" },
        { Header: "Posting Date", accessor: "cdate", width: "20%" },
        { Header: "Testimonial", accessor: "testiText", width: "25%" },
        { Header: "Status", accessor: "status", width: "20%" },
        { Header: "Action", accessor: "action", width: "20%" },
      ],
      rows: rowsWithActions,
    };

    setDataTableData({ table: data });
  }, [testimonials, dispatch]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={3} pb={3}>
        <MDBox mb={0}>
          <Card>
            <MDBox p={3} lineHeight={0}>
              <MDBox display="flex" justifyContent="space-between" alignItems="center">
                <MDTypography variant="h6" gutterBottom>
                  Testimonials Master
                </MDTypography>
              </MDBox>
            </MDBox>

            <DataTable table={dataTableData.table} canSearch isSorted={false} noEndBorder />
            <MDBox display="flex" justifyContent="flex-end" p={2}></MDBox>
          </Card>
        </MDBox>
      </MDBox>

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
    </DashboardLayout>
  );
}

export default Testimonials;
