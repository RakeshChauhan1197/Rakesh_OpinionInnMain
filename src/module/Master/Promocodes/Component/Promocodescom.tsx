import React from "react";
import { Checkbox, FormControlLabel, Button, useMediaQuery, Grid, MenuItem } from "@mui/material";
import Card from "@mui/material/Card";
import { Formik, Form } from "formik";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import FormField from "module/Master/Country/Component/Formfield/Formfield";

// Define initial state for client fields
const initialErrors = {
  firstName: false,
  lastName: false,
  city: false,
  town: false,
  state: false,
  zip: false,
  promocode: false,
  clientName: false,
  officeAddress: false,
  country: false,
  officePhone: false,
  personalPhone: false,
  payeeName: false,
  payPalEmailId: false,
};

function Promocodescom({ onClose }: { onClose: () => void }) {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  return (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      style={{ overflowY: "auto" }}
    >
      <Card sx={{ maxWidth: 1000, padding: 6, width: isSmallScreen ? "100%" : "50rem" }}>
        <MDBox lineHeight={0}>
          <MDTypography variant="h5">Manage Promocodes</MDTypography>
          <MDTypography variant="button" color="text">
            Promocodes information
          </MDTypography>
        </MDBox>

        <MDBox mt={1.625}>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              city: "",
              town: "",
              state: "",
              zip: "",
              promocode: "",
              clientName: "",
              officeAddress: "",
              country: "",
              officePhone: "",
              personalPhone: "",
              payeeName: "",
              payPalEmailId: "",
            }}
            validate={(values) => {
              const errors: any = {};
              if (!values.clientName) errors.clientName = "Client name is Required";
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
                  <Grid item xs={12} sm={6}>
                    <FormField
                      type="text"
                      label="First Name"
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormField
                      type="text"
                      label="Last Name"
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormField
                      type="text"
                      label="City"
                      name="city"
                      value={values.city}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormField
                      type="text"
                      label="Town"
                      name="town"
                      value={values.town}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormField
                      type="text"
                      label="State"
                      name="state"
                      value={values.state}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormField
                      type="text"
                      label="Zip/Postal Code"
                      name="zip"
                      value={values.zip}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormField
                      type="text"
                      label="Promocode"
                      name="promocode"
                      value={values.promocode}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormField
                      type="text"
                      label="Client Name"
                      name="clientName"
                      value={values.clientName}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormField
                      type="text"
                      label="Office Address"
                      name="officeAddress"
                      value={values.officeAddress}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
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

                  <Grid item xs={12}>
                    <hr />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <MDBox lineHeight={0}>
                      <MDTypography variant="h5">Contact Details </MDTypography>
                    </MDBox>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormField
                      type="text"
                      label="Office Phone"
                      name="officePhone"
                      value={values.officePhone}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormField
                      type="text"
                      label="Personal Phone"
                      name="personalPhone"
                      value={values.personalPhone}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <hr />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <MDBox lineHeight={0}>
                      <MDTypography variant="h5">Account Information </MDTypography>
                    </MDBox>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormField
                      type="text"
                      label="Your Payee Name"
                      name="payeeName"
                      value={values.payeeName}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormField
                      type="text"
                      label="PayPal Email Id"
                      name="payPalEmailId"
                      value={values.payPalEmailId}
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

export default Promocodescom;
