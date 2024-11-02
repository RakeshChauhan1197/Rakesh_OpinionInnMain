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
  parentVendorName: false,
  active: false,
};

function Vendorparentcom({ onClose }: { onClose: () => void }) {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const parameterSectionRef = useRef<HTMLDivElement>(null); // Ref to scroll to parameters section

  // Scroll to parameters section when multiParameter is enabled
  useEffect(() => {
    if (parameterSectionRef.current) {
      parameterSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [parameterSectionRef]);

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
          <MDTypography variant="h5">Parent Vendor Management</MDTypography>
          <MDTypography variant="button" color="text">
            Parent Vendor information
          </MDTypography>
        </MDBox>

        <MDBox mt={1.625}>
          <Formik
            initialValues={{
              parentVendorName: "",
              active: false,
            }}
            validate={(values) => {
              const errors: any = {};
              if (!values.parentVendorName)
                errors.parentVendorName = "Parent Vendor Name is Required";
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
                      label="Parent Vendor Name "
                      name="parentVendorName"
                      value={values.parentVendorName}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <FormControlLabel
                      control={
                        <Checkbox name="active" checked={values.active} onChange={handleChange} />
                      }
                      label="Active"
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

export default Vendorparentcom;
