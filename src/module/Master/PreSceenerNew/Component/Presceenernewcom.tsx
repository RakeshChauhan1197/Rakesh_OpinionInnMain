import React, { useEffect, useRef } from "react";
import { Checkbox, FormControlLabel, Button, useMediaQuery, Grid, MenuItem } from "@mui/material";
import Card from "@mui/material/Card";
import { Formik, Form } from "formik";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import FormField from "module/Master/Country/Component/Formfield/Formfield";

// Define initial state for client fields
const initialErrors = {
  presceenerName: false,
  description: false,
  country: false,
  note: false,
};

function Presceenernewcom({ onClose }: { onClose: () => void }) {
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  return (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      style={{ overflowY: "auto" }}
    >
      <Card sx={{ maxWidth: 1000, padding: 6, width: isSmallScreen ? "100%" : "70rem" }}>
        <MDBox lineHeight={0}>
          <MDTypography variant="h5">Presceener Management</MDTypography>
          <MDTypography variant="button" color="text">
            Presceener information
          </MDTypography>
        </MDBox>

        <MDBox mt={1.625}>
          <Formik
            initialValues={{
              presceenerName: "",
              description: "",
              country: "",
              note: "",
            }}
            validate={(values) => {
              const errors: any = {};
              if (!values.presceenerName) errors.presceenerName = "Presceener Name is Required";
              if (!values.description) errors.description = "Description is Required";
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              console.log("Form Submitted: ", values);
              setSubmitting(false);
            }}
          >
            {({ values, handleChange, isSubmitting }) => (
              <Form>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <FormField
                      type="text"
                      label="Presceener Name "
                      name="presceenerName"
                      value={values.presceenerName}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <FormField
                      type="text"
                      label="Description"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <FormField
                      select
                      label="Country"
                      name="country"
                      value={values.country}
                      onChange={handleChange}
                    >
                      <MenuItem value="Option1">Option 1</MenuItem>
                      <MenuItem value="Option2">Option 2</MenuItem>
                      <MenuItem value="Option3">Option 3</MenuItem>
                    </FormField>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <FormField
                      type="text"
                      label="Note"
                      name="note"
                      value={values.note}
                      onChange={handleChange}
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
                        sx={{ marginLeft: 2 }} // Add margin for spacing
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

export default Presceenernewcom;
