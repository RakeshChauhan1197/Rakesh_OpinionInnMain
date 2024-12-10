import React from "react";
import { Checkbox, FormControlLabel, useMediaQuery, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import { Formik, Form, Field } from "formik";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import FormField from "module/Master/Country/Component/Formfield/Formfield";
import { IVendorparent } from "../slice/Vendorparent.type";
import { useDispatch } from "react-redux";
import { AppDispatch } from "app/store";

interface VendorparentcomProps {
  vendorparent: IVendorparent | null;
  onClose: () => void;
  onSave: (vendorparent: IVendorparent) => Promise<void>;
}

const Vendorparentcom: React.FC<VendorparentcomProps> = ({ vendorparent, onClose, onSave }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isSmallScreen = useMediaQuery("(max-width:600px)");

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
        </MDBox>

        <MDBox mt={1.625}>
          <Formik
            initialValues={{
              tid: vendorparent?.tid || 0,
              vendor_Name: vendorparent?.vendor_Name || "",
              isAct: vendorparent?.isAct === 1,
            }}
            validate={(values) => {
              const errors: any = {};
              if (!values.vendor_Name) errors.vendor_Name = "Parent Vendor Name is required";
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              const newVendorparent: IVendorparent = {
                tid: vendorparent ? vendorparent.tid : 0,
                vendor_Name: values.vendor_Name,
                isAct: vendorparent ? vendorparent.isAct : 1,
              };
              await onSave(newVendorparent);
              setSubmitting(false);
              onClose();
            }}
          >
            {({ values, handleChange, isSubmitting }) => (
              <Form>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Field type="hidden" name="tid" value={values.tid} />
                  </Grid>
                  <Grid item xs={12}>
                    <FormField
                      type="text"
                      label="Parent Vendor Name"
                      name="vendor_Name"
                      value={values.vendor_Name}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Field
                          as={Checkbox}
                          name="isAct"
                          checked={values.isAct}
                          onChange={handleChange}
                        />
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

export default Vendorparentcom;
