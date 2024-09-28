import React, { useEffect, useRef } from "react";
import { Button, Grid, useMediaQuery, Card } from "@mui/material";
import { Formik, Form } from "formik";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import FormField from "module/Master/Country/Component/Formfield/Formfield";
import { ICountry } from "./slice/Country.type";

interface CountryFormProps {
  country: ICountry | null;
  onClose: () => void;
  onSave: (country: ICountry) => Promise<void>;
}

const CountryForm: React.FC<CountryFormProps> = ({ country, onClose, onSave }) => {
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
      minHeight="65vh"
      style={{ overflowY: "auto" }}
    >
      <Card sx={{ maxWidth: 700, padding: 3, width: isSmallScreen ? "100%" : "30rem" }}>
        <MDBox lineHeight={0}>
          <MDTypography variant="h5">{country ? "Edit Country" : "Add Country"}</MDTypography>
        </MDBox>

        <MDBox mt={1}>
          <Formik
            initialValues={{
              countryCode: country ? country.countryCode : "",
              countryName: country ? country.countryName : "",
              dOrd: country ? country.dOrd : 0,
            }}
            validate={(values) => {
              const errors: any = {};
              if (!values.countryCode) errors.countryCode = "Required";
              if (!values.countryName) errors.countryName = "Required";
              if (values.dOrd === undefined || values.dOrd < 1) {
                errors.dOrd = "Required and must be a positive number";
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              const newCountry: ICountry = {
                tID: country ? country.tID : 0,
                countryCode: values.countryCode,
                countryName: values.countryName,
                dOrd: values.dOrd,
              };

              await onSave(newCountry);
              setSubmitting(false);
              onClose();
            }}
          >
            {({ values, handleChange, isSubmitting }) => (
              <Form>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <FormField
                      type="text"
                      label="Country Code"
                      name="countryCode"
                      value={values.countryCode}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormField
                      type="text"
                      label="Country Name"
                      name="countryName"
                      value={values.countryName}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormField
                      type="number"
                      label="Display Order"
                      name="dOrd"
                      value={values.dOrd}
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
                        color="primary"
                        sx={{ ml: 2 }}
                      >
                        {isSubmitting ? "Saving..." : "Save"}
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

export default CountryForm;
