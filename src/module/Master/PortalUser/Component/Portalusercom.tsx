import React, { useEffect, useRef, useState } from "react";
import { Grid, MenuItem, TextField, useMediaQuery } from "@mui/material";
import Card from "@mui/material/Card";
import { Formik, Form } from "formik";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { useDispatch } from "react-redux";
import { blockUsersCSVEmails, uploadCSV } from "../slice/Portaluser.slice"; // Adjust imports as needed
import { AppDispatch } from "app/store"; // Import the AppDispatch type
import FormField from "layouts/pages/account/components/FormField";

function Portalusercom({ onClose }: { onClose: () => void }) {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const dispatch = useDispatch<AppDispatch>(); // Initialize useDispatch
  const [blockingMethod, setBlockingMethod] = useState(""); // State to handle dropdown selection

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
          <MDTypography variant="h5">Manage User</MDTypography>
        </MDBox>

        <MDBox mt={1.625}>
          <Formik
            initialValues={{
              blockingMethod: "",
              emailList: "", // for textarea field
              csvFile: null, // for file input field
            }}
            validate={(values) => {
              const errors: any = {};
              if (!values.blockingMethod) errors.blockingMethod = "Required";
              if (values.blockingMethod === "Comma Separated Email" && !values.emailList) {
                errors.emailList = "Required";
              }
              if (values.blockingMethod === "From CSV File" && !values.csvFile) {
                errors.csvFile = "Required";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              if (values.blockingMethod === "Comma Separated Email") {
                dispatch(blockUsersCSVEmails({ emailID: values.emailList }));
              } else if (values.blockingMethod === "From CSV File" && values.csvFile) {
                console.log("File to upload: ", values.csvFile); // Debugging log
                dispatch(uploadCSV(values.csvFile));
              }
              setSubmitting(false);
              onClose(); // Close the modal after submission
            }}
          >
            {({ values, handleChange, setFieldValue, isSubmitting, errors, touched }) => (
              <Form>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <FormField
                      select
                      label="Blocking Method"
                      name="blockingMethod"
                      value={values.blockingMethod}
                      onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
                        handleChange(e);
                        setBlockingMethod(e.target.value as string);
                      }}
                      fullWidth
                      error={touched.blockingMethod && Boolean(errors.blockingMethod)}
                      helperText={touched.blockingMethod && errors.blockingMethod}
                      InputProps={{
                        sx: {
                          height: 30,
                        },
                      }}
                    >
                      <MenuItem value="Comma Separated Email">Comma Separated Email</MenuItem>
                      <MenuItem value="From CSV File">From CSV File</MenuItem>
                    </FormField>
                  </Grid>

                  {/* Conditional rendering based on dropdown selection */}
                  {blockingMethod === "Comma Separated Email" && (
                    <Grid item xs={12}>
                      <FormField
                        label="Email List"
                        name="emailList"
                        multiline
                        rows={4}
                        value={values.emailList}
                        onChange={handleChange}
                        fullWidth
                        error={touched.emailList && Boolean(errors.emailList)}
                        helperText={touched.emailList && errors.emailList}
                      />
                    </Grid>
                  )}

                  {blockingMethod === "From CSV File" && (
                    <Grid item xs={12}>
                      <input
                        type="file"
                        name="csvFile"
                        accept=".csv"
                        onChange={(event) => {
                          const file = event.currentTarget.files[0];
                          setFieldValue("csvFile", file); // Use Formik's setFieldValue to store the file in the form state
                        }}
                      />
                    </Grid>
                  )}

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

export default Portalusercom;
