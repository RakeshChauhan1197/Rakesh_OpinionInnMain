import { Checkbox, FormControlLabel, Grid, CircularProgress, Card } from "@mui/material";
import { Formik, Field, Form } from "formik";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import FormField from "module/Master/Country/Component/Formfield/Formfield";
import { IVendor } from "../slice/Vendor.type";
import { fetchParentVendors } from "../slice/Vendor.slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "app/store";
import React, { useEffect, useState, useRef } from "react";

interface VendorcomProps {
  vendor: IVendor | null;
  onClose: () => void;
  onSave: (vendor: IVendor) => Promise<void>;
}

const Vendorcom: React.FC<VendorcomProps> = ({ vendor, onClose, onSave }) => {
  const dispatch = useDispatch<AppDispatch>();
  const parameterSectionRef = useRef<HTMLDivElement>(null);
  const { parentData } = useSelector((state: RootState) => state.vendor);
  const [selectedParent, setSelectedParent] = useState(vendor?.Parent || "");

  useEffect(() => {
    dispatch(fetchParentVendors());
  }, [dispatch]);

  useEffect(() => {
    if (parameterSectionRef.current) {
      parameterSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [parameterSectionRef]);

  useEffect(() => {
    if (vendor) {
      setSelectedParent(vendor.Parent);
    }
  }, [vendor]);

  const handleParentChange = (event: React.ChangeEvent<{ value: any }>) => {
    setSelectedParent(event.target.value as string);
  };

  return (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      style={{ overflowY: "auto" }}
    >
      <Card sx={{ maxWidth: 1000, padding: 6 }}>
        <MDBox lineHeight={0}>
          <MDTypography variant="h5">{vendor ? "Edit Vendor" : "Add Vendor"}</MDTypography>
          <MDTypography variant="button" color="text">
            Vendor information
          </MDTypography>
        </MDBox>

        <MDBox mt={1.625}>
          <Formik
            initialValues={{
              Parent: vendor?.Parent || "",
              vendorName: vendor?.vendorName || "",
              completePageURL: vendor?.completePageURL || "",
              disqualifyPageUrl: vendor?.disqualifyPageUrl || "",
              overaQuoteaUrl: vendor?.overaQuoteaUrl || "",
              useraAttribute: vendor?.useraAttribute || "",
              QualityRejectURL: vendor?.QualityRejectURL || "",
              chkHasMultiParameter: vendor?.HasMultiParameter === "true" || false,
              In_Parameter1: vendor?.In_Parameter1 || "",
              In_Parameter2: vendor?.In_Parameter2 || "",
              In_Parameter3: vendor?.In_Parameter3 || "",
              In_Parameter4: vendor?.In_Parameter4 || "",
              Out_Parameter1: vendor?.Out_Parameter1 || "",
              Out_Parameter2: vendor?.Out_Parameter2 || "",
              Out_Parameter3: vendor?.Out_Parameter3 || "",
              Out_Parameter4: vendor?.Out_Parameter4 || "",
              Out_Parameter1Column: vendor?.Out_Parameter1Column || "",
              Out_Parameter2Column: vendor?.Out_Parameter2Column || "",
              Out_Parameter3Column: vendor?.Out_Parameter3Column || "",
              Out_Parameter4Column: vendor?.Out_Parameter4Column || "",
            }}
            validate={(values) => {
              const errors: Record<string, string> = {};
              if (!values.vendorName) errors.vendorName = "Vendor name is required";
              if (values.vendorName.length < 4) {
                errors.vendorName = "Please enter a valid vendor name";
              }
              if (values.chkHasMultiParameter) {
                const requiredFields = [
                  "In_Parameter1",
                  "In_Parameter2",
                  "In_Parameter3",
                  "In_Parameter4",
                  "Out_Parameter1",
                  "Out_Parameter2",
                  "Out_Parameter3",
                  "Out_Parameter4",
                ];
                requiredFields.forEach((field) => {
                  if (!values[field as keyof typeof values]) {
                    errors[field] = `${field.replace(/_/g, " ")} is required`;
                  }
                });
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              const newVendor: IVendor = {
                vid: vendor ? vendor.vid : 0,
                Parent: values.Parent,
                vendorName: values.vendorName,
                completePageURL: values.completePageURL,
                disqualifyPageUrl: values.disqualifyPageUrl,
                overaQuoteaUrl: values.overaQuoteaUrl,
                useraAttribute: values.useraAttribute,
                QualityRejectURL: values.QualityRejectURL,
                HasMultiParameter: values.chkHasMultiParameter ? "true" : "false",
                chkHasMultiParameter: false,
                In_Parameter1: values.In_Parameter1,
                In_Parameter2: values.In_Parameter2,
                In_Parameter3: values.In_Parameter3,
                In_Parameter4: values.In_Parameter4,
                Out_Parameter1: values.Out_Parameter1,
                Out_Parameter2: values.Out_Parameter2,
                Out_Parameter3: values.Out_Parameter3,
                Out_Parameter4: values.Out_Parameter4,
                Out_Parameter1Column: values.Out_Parameter1Column,
                Out_Parameter2Column: values.Out_Parameter2Column,
                Out_Parameter3Column: values.Out_Parameter3Column,
                Out_Parameter4Column: values.Out_Parameter4Column,
                Vendor_ID: vendor ? vendor.Vendor_ID : 0,
              };
              await onSave(newVendor);
              setSubmitting(false);
              onClose();
            }}
          >
            {({ values, handleChange, setFieldValue, isSubmitting, errors, touched }) => (
              <Form>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <FormField
                      select
                      label="Parent"
                      name="Parent"
                      value={values.Parent}
                      onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                        setFieldValue("Parent", event.target.value)
                      }
                      error={touched.Parent && Boolean(errors.Parent)}
                      helperText={touched.Parent && errors.Parent}
                    >
                      <option value="">--SELECT--</option>
                      {parentData.map((dropdownItem) => (
                        <option key={dropdownItem.tid} value={dropdownItem.vendor_Name}>
                          {dropdownItem.vendor_Name}
                        </option>
                      ))}
                    </FormField>
                  </Grid>

                  <Grid item xs={6}>
                    <FormField
                      type="text"
                      label="Vendor Name"
                      name="vendorName"
                      value={values.vendorName}
                      onChange={handleChange}
                      required
                      error={touched.vendorName && Boolean(errors.vendorName)}
                      helperText={touched.vendorName && errors.vendorName}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormField
                      type="text"
                      label="Complete Page URL"
                      name="completePageURL"
                      value={values.completePageURL}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormField
                      type="text"
                      label="Disqualify Page URL"
                      name="disqualifyPageUrl"
                      value={values.disqualifyPageUrl}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormField
                      type="text"
                      label="Over Quote URL"
                      name="overaQuoteaUrl"
                      value={values.overaQuoteaUrl}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormField
                      type="text"
                      label="User Attribute"
                      name="useraAttribute"
                      value={values.useraAttribute}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormField
                      type="text"
                      label="Quality Reject URL"
                      name="QualityRejectURL"
                      value={values.QualityRejectURL}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.chkHasMultiParameter}
                          onChange={handleChange}
                          name="chkHasMultiParameter"
                        />
                      }
                      label="Has Multi Parameter"
                    />
                  </Grid>

                  {values.chkHasMultiParameter && (
                    <Grid item xs={12} ref={parameterSectionRef}>
                      <MDBox mt={1.625}>
                        <MDTypography variant="h5">Parameter Values</MDTypography>
                      </MDBox>
                      <Grid container spacing={3}>
                        {[
                          "In_Parameter1",
                          "In_Parameter2",
                          "In_Parameter3",
                          "In_Parameter4",
                          "Out_Parameter1",
                          "Out_Parameter2",
                          "Out_Parameter3",
                          "Out_Parameter4",
                        ].map((fieldName) => (
                          <Grid item xs={6} key={fieldName}>
                            <FormField
                              type="text"
                              label={fieldName.replace(/_/g, " ")}
                              name={fieldName}
                              value={values[fieldName as keyof typeof values]}
                              onChange={handleChange}
                              error={
                                touched[fieldName as keyof typeof touched] &&
                                Boolean(errors[fieldName as keyof typeof errors])
                              }
                              helperText={
                                touched[fieldName as keyof typeof touched] &&
                                errors[fieldName as keyof typeof errors]
                              }
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  )}
                </Grid>

                <MDBox mt={4} display="flex" justifyContent="space-between">
                  <MDButton variant="gradient" color="info" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? <CircularProgress size={24} /> : "Save"}
                  </MDButton>
                  <MDButton variant="outlined" color="info" onClick={onClose}>
                    Cancel
                  </MDButton>
                </MDBox>
              </Form>
            )}
          </Formik>
        </MDBox>
      </Card>
    </MDBox>
  );
};

export default Vendorcom;
