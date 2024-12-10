import React, { useEffect, useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  Button,
  useMediaQuery,
  Grid,
  MenuItem,
  IconButton,
} from "@mui/material";
import Card from "@mui/material/Card";
import { Formik, Form } from "formik";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import FormField from "module/Master/Country/Component/Formfield/Formfield";
import { IPresceener, ICountry } from "../slice/Presceener.type";
import { useDispatch } from "react-redux";
import { AppDispatch } from "app/store";
import { getCountry } from "../slice/Presceener.slice";
import { Close as CloseIcon } from "@mui/icons-material";

interface PresceenerComProps {
  presceener: IPresceener | null;
  onClose: () => void;
  onSave: (presceener: IPresceener) => Promise<void>;
}

const PresceenerNewCom: React.FC<PresceenerComProps> = ({ presceener, onClose, onSave }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [countries, setCountries] = useState<ICountry[]>([]);

  useEffect(() => {
    dispatch(getCountry()).then((action: any) => {
      if (getCountry.fulfilled.match(action)) {
        setCountries(action.payload);
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
      <Card
        sx={{
          maxWidth: 1000,
          padding: 6,
          width: isSmallScreen ? "100%" : "30rem",
          position: "relative",
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            color: "#000",
          }}
        >
          <CloseIcon />
        </IconButton>
        <MDBox lineHeight={0}>
          <MDTypography variant="h5">Presceener Management</MDTypography>
          <MDTypography variant="button" color="text">
            Presceener Information
          </MDTypography>
        </MDBox>

        <MDBox mt={1.625}>
          <Formik
            initialValues={{
              presceenerName: presceener?.psName || "",
              description: presceener?.psDesc || "",
              country: presceener?.psCountry || "",
              note: presceener?.note || "",
              date: presceener?.psDate || "",
            }}
            validate={(values) => {
              const errors: { [key: string]: string } = {};
              if (!values.presceenerName) errors.presceenerName = "Presceener Name is required";
              if (!values.description) errors.description = "Description is required";
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              const newPresceener: IPresceener = {
                psid: presceener ? presceener.psid : 0,
                psName: values.presceenerName,
                psDesc: values.description,
                note: values.note,
                psCountry: values.country,
                psDate: values.date,
              };
              await onSave(newPresceener);
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
                      label="Presceener Name"
                      name="presceenerName"
                      value={values.presceenerName}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormField
                      type="text"
                      label="Description"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      required
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
                    {values.note ? (
                      <div
                        dangerouslySetInnerHTML={{ __html: values.note }}
                        style={{
                          textAlign: "center",
                        }}
                      />
                    ) : (
                      <FormField
                        type="text"
                        label="Note"
                        name="note"
                        value={values.note}
                        onChange={handleChange}
                      />
                    )}
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

export default PresceenerNewCom;
