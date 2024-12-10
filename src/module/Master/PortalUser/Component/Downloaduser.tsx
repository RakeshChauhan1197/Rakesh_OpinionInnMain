import React from "react";
import { Grid, useMediaQuery } from "@mui/material";
import Card from "@mui/material/Card";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import FormField from "layouts/pages/account/components/FormField";
import { AppDispatch } from "app/store";
import { downloadUser } from "../slice/Portaluser.slice";
import * as XLSX from "xlsx";
import { useDispatch } from "react-redux";
import { IDownload } from "../slice/Portaluser.type";

export const useAppDispatch = () => useDispatch<AppDispatch>();

function DownloadUser({ onClose }: { onClose: () => void }) {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const dispatch = useAppDispatch();

  const validationSchema = Yup.object().shape({
    startDate: Yup.date().required("Start Date is required"),
    endDate: Yup.date().required("End Date is required"),
  });

  const exportToCSV = (data: any[]) => {
    if (!data || data.length === 0) {
      alert("No data available to export.");
      return;
    }
    const jsonData = Array.isArray(data) ? data : [data];

    const worksheet = XLSX.utils.json_to_sheet(jsonData, {
      header: Object.keys(jsonData[0]),
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "downloaded_users.csv", { bookType: "csv" });

    alert("CSV file has been downloaded successfully.");
  };

  return (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      style={{ overflowY: "auto" }}
    >
      <Card sx={{ maxWidth: 1000, padding: 6, width: isSmallScreen ? "100%" : "30rem" }}>
        <MDBox lineHeight={0}>
          <MDTypography variant="h5">Download User</MDTypography>
        </MDBox>

        <MDBox mt={1.625}>
          <Formik
            initialValues={{
              startDate: "",
              endDate: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const response = await dispatch(
                  downloadUser({ startDate: values.startDate, endDate: values.endDate })
                ).unwrap();

                if (response && response.length > 0) {
                  exportToCSV(response);
                } else {
                  alert("No data found for the specified date range.");
                }
              } catch (error) {
                console.error("Error downloading user data:", error);
              } finally {
                setSubmitting(false);
                onClose();
              }
            }}
          >
            {({ values, handleChange, isSubmitting, errors, touched }) => (
              <Form>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <FormField
                      label="Start Date"
                      type="string"
                      name="startDate"
                      placeholder="YYYY-MM-DD"
                      value={values.startDate}
                      onChange={handleChange}
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      error={touched.startDate && Boolean(errors.startDate)}
                      helperText={touched.startDate && errors.startDate}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormField
                      label="End Date"
                      type="string"
                      name="endDate"
                      placeholder="YYYY-MM-DD"
                      value={values.endDate}
                      onChange={handleChange}
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      error={touched.endDate && Boolean(errors.endDate)}
                      helperText={touched.endDate && errors.endDate}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MDBox display="flex" justifyContent="center" sx={{ marginTop: 2 }}>
                      <MDButton variant="gradient" color="light" onClick={onClose}>
                        Cancel
                      </MDButton>
                      <MDButton
                        disabled={isSubmitting}
                        type="submit"
                        variant="gradient"
                        color="dark"
                        sx={{ marginLeft: 2 }}
                      >
                        Submit
                      </MDButton>
                    </MDBox>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </MDBox>
      </Card>
    </MDBox>
  );
}

export default DownloadUser;
