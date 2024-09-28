import React, { useEffect, useRef } from "react";
import { Checkbox, FormControlLabel, Button, useMediaQuery, Grid, MenuItem } from "@mui/material";
import Card from "@mui/material/Card";
import { Formik, Form } from "formik";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import FormField from "module/Master/Country/Component/Formfield/Formfield";

const initialErrors = {
  countryCode: false,
  countryName: false,
  countryOrder: false,
};

function Countrycom({ onClose }: { onClose: () => void }) {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const parameterSectionRef = useRef<HTMLDivElement>(null);

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
          <MDTypography variant="h5">Manage Country</MDTypography>
          <MDTypography variant="button" color="text">
            Country information
          </MDTypography>
        </MDBox>

        <MDBox mt={1.625}>
          <Formik
            initialValues={{
              countryCode: "",
              countryName: "",
              countryOrder: "",
            }}
            validate={(values) => {
              const errors: any = {};
              if (!values.countryCode) errors.countryCode = "Required";
              if (!values.countryName) errors.countryName = "Required";
              if (!values.countryOrder) errors.countryOrder = "Required";
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
                      label="Country Code"
                      name="countryCode"
                      value={values.countryCode}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <FormField
                      type="text"
                      label="Country Name"
                      name="countryName"
                      value={values.countryName}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <FormField
                      type="text"
                      label="Country Order"
                      name="countryOrder"
                      value={values.countryOrder}
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

export default Countrycom;
