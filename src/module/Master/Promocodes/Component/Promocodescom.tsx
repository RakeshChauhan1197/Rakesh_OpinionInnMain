import React, { useEffect, useState } from "react";
import { Checkbox, FormControlLabel, Button, useMediaQuery, Grid, MenuItem } from "@mui/material";
import Card from "@mui/material/Card";
import { Formik, Form } from "formik";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import FormField from "module/Master/Country/Component/Formfield/Formfield";
import { ICountry } from "../slice/Promocodes.type";
import { Ipromocodes } from "../slice/Promocodes.type";
import { useDispatch } from "react-redux";
import { AppDispatch } from "app/store";
import { getCountry } from "../slice/Promocodes.slice";
import { string } from "yup";

interface PromocodescomProps {
  promocodes: Ipromocodes | null;
  onClose: () => void;
  onSave: (promocodes: Ipromocodes) => Promise<void>;
}

const Promocodescom: React.FC<PromocodescomProps> = ({ promocodes, onClose, onSave }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [countries, setCountries] = useState<ICountry[]>([]); // Updated to use ICountry[]

  useEffect(() => {
    // Dispatch getCountry action to fetch country data
    dispatch(getCountry()).then((action: any) => {
      if (getCountry.fulfilled.match(action)) {
        setCountries(action.payload); // Set fetched countries to local state
      }
    });
  }, [dispatch]);

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
              firstName: promocodes?.firstName || " ",
              lastName: promocodes?.lastName || " ",
              city: promocodes?.city || "",
              town: promocodes?.town || "",
              state: promocodes?.state || "",
              zip: promocodes?.zipCode.toString() || "", // Convert to string
              promocode: promocodes?.promoName || "",
              clientName: promocodes?.clientName || "",
              officeAddress: promocodes?.officeAdd || "",
              country: promocodes?.country || "",
              officePhone: promocodes?.officePhone.toString() || "", // Convert to string
              personalPhone: promocodes?.personalPhone.toString() || "", // Convert to string
              payeeName: promocodes?.payeeName || "",
              payPalEmailId: promocodes?.payPalEmailId || "",
            }}
            validate={(values) => {
              const errors: any = {};
              if (!values.clientName) errors.clientName = "Client name is required";
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              const newPromocodes: Ipromocodes = {
                pid: promocodes ? promocodes.pid : 0,
                firstName: values.firstName,
                lastName: values.lastName,
                city: values.city,
                country: values.country,
                town: values.town,
                promoName: values.promocode,
                state: values.state,
                zipCode: Number(values.zip), // Parse as number
                clientName: values.clientName,
                officeAdd: values.officeAddress,
                officePhone: Number(values.officePhone), // Parse as number
                personalPhone: Number(values.personalPhone), // Parse as number
                payeeName: values.payeeName,
                payPalEmailId: values.payPalEmailId,
                isAuth: promocodes ? promocodes.isAuth : 1,
              };
              await onSave(newPromocodes);
              setSubmitting(false);
              onClose();
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
                  <Grid item xs={12}>
                    <FormField
                      select
                      label="Country"
                      name="country"
                      value={values.country}
                      onChange={handleChange}
                    >
                      {countries.map((country) => (
                        <MenuItem key={country.tID} value={country.countryCode}>
                          {country.countryName}
                        </MenuItem>
                      ))}
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
};

export default Promocodescom;
