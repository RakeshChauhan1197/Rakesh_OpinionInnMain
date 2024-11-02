import React, { useEffect, useRef } from "react";
import { Checkbox, FormControlLabel, Grid, MenuItem } from "@mui/material";
import Card from "@mui/material/Card";
import { Formik, Form } from "formik";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import FormField from "layouts/pages/account/components/FormField";
import { IClient } from "../slice/Client.type";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "app/store"; // Ensure AppDispatch is properly imported
import { addClient, updateClient } from "../slice/Client.slice";

interface ClientcomProps {
  client: IClient | null;
  onClose: () => void;
}

const Clientcom: React.FC<ClientcomProps> = ({ client, onClose }) => {
  const dispatch: AppDispatch = useDispatch(); // Explicitly type the dispatch
  const parameterSectionRef = useRef<HTMLDivElement>(null);

  const generateGUID = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  return (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      style={{ overflowY: "auto" }}
    >
      <Card sx={{ maxWidth: 1000, padding: 6, width: "50rem" }}>
        <MDBox lineHeight={0}>
          <MDTypography variant="h5">Manage Client</MDTypography>
        </MDBox>
        <MDBox mt={1.625}>
          <Formik
            initialValues={{
              cid: client?.cid || 0,
              clientName: client?.clientName || "",
              clientAddress: client?.clientAddress || "",
              clientBillingAddress: client?.clientBillingAddress || "",
              contactPersonName: client?.contactPersonName || "",
              contactPersonEmail: client?.contactPersonEmail || "",
              contactPersonPhone: client?.contactPersonPhone || "",
              contactPersonAddress: client?.contactPersonAddress || "",
              clientFinanceContact: client?.clientFinanceContact || "",
              remarks: client?.remarks || "",
              enableHashing: client?.enableHashing || false,
              hashKey: client?.hashKey || "",
              allowIncentivePerHit: client?.allowIncentivePerHit || false,
              hasMultiParameter: client?.hasMultiParameter || false,
              out_Parameter1: client?.out_Parameter1 || "",
              out_Parameter2: client?.out_Parameter2 || "",
              out_Parameter3: client?.out_Parameter3 || "",
              out_Parameter4: client?.out_Parameter4 || "",
              out_Parameter1Column: client?.out_Parameter1Column || "",
              out_Parameter2Column: client?.out_Parameter2Column || "",
              out_Parameter3Column: client?.out_Parameter3Column || "",
              out_Parameter4Column: client?.out_Parameter4Column || "",
            }}
            validate={(values) => {
              const errors: any = {};
              if (!values.clientName) errors.clientName = "Client name is Required";
              if (!values.clientAddress) errors.clientAddress = "Client address is Required";
              if (!values.clientBillingAddress)
                errors.clientBillingAddress = "Billing address is Required";
              if (!values.contactPersonName)
                errors.contactPersonName = "Contact Person name is Required";
              if (!values.contactPersonEmail)
                errors.contactPersonEmail = "Contact Person email is Required";
              if (!values.contactPersonPhone)
                errors.contactPersonPhone = "Contact person phone is Required";
              if (values.enableHashing && !values.hashKey) errors.hashKey = "Required";
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              const updatedValues = {
                ...values,
                cid: typeof values.cid === "string" ? parseInt(values.cid) : values.cid,
                allowIncentivePerHit: values.allowIncentivePerHit,
              };

              if (client) {
                dispatch(updateClient(updatedValues));
              } else {
                dispatch(addClient(updatedValues));
              }

              setSubmitting(false);
              onClose();
            }}
          >
            {({ values, handleChange, setFieldValue, isSubmitting }) => {
              useEffect(() => {
                if (values.enableHashing && !values.hashKey) {
                  setFieldValue("hashKey", generateGUID());
                } else if (!values.enableHashing) {
                  setFieldValue("hashKey", "");
                }
              }, [values.enableHashing, setFieldValue]);

              return (
                <Form>
                  <Grid container spacing={3}>
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
                        label="Client Address"
                        name="clientAddress"
                        value={values.clientAddress}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormField
                        type="text"
                        label="Billing Address"
                        name="clientBillingAddress"
                        value={values.clientBillingAddress}
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormField
                        type="text"
                        label="Contact Person Name"
                        name="contactPersonName"
                        value={values.contactPersonName}
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormField
                        type="text"
                        label="Contact Person Address"
                        name="contactPersonAddress"
                        value={values.contactPersonAddress}
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormField
                        type="email"
                        label="Contact Person Email"
                        name="contactPersonEmail"
                        value={values.contactPersonEmail}
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormField
                        type="tel"
                        label="Contact Person Phone"
                        name="contactPersonPhone"
                        value={values.contactPersonPhone}
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormField
                        type="tel"
                        label="Client Finance Contact"
                        name="clientFinanceContact"
                        value={values.clientFinanceContact}
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="enableHashing"
                            checked={values.enableHashing}
                            onChange={handleChange}
                          />
                        }
                        label="Enable Hashing"
                      />
                    </Grid>

                    {values.enableHashing && (
                      <Grid item xs={12} sm={6}>
                        <FormField
                          type="text"
                          label="Hash Key"
                          name="hashKey"
                          value={values.hashKey}
                          onChange={handleChange}
                          disabled
                        />
                      </Grid>
                    )}

                    <Grid item xs={12} sm={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="hasMultiParameter"
                            checked={values.hasMultiParameter}
                            onChange={handleChange}
                          />
                        }
                        label="Multi Parameter"
                      />
                    </Grid>

                    {values.hasMultiParameter && (
                      <>
                        <Grid item xs={12}>
                          <hr />
                        </Grid>

                        <Grid item xs={12} sm={12} ref={parameterSectionRef}>
                          <MDBox lineHeight={0}>
                            <MDTypography variant="h5">Parameters</MDTypography>
                          </MDBox>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <FormField
                            type="text"
                            label="Parameter 1"
                            name="Out_Parameter1"
                            value={values.out_Parameter1}
                            onChange={handleChange}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <FormField
                            select
                            label="Value 1"
                            name="Out_Parameter1Column"
                            value={values.out_Parameter1Column}
                            onChange={handleChange}
                          >
                            <MenuItem value="">--SELECT--</MenuItem>
                            <MenuItem value="AGE">AGE</MenuItem>
                            <MenuItem value="CITY">CITY</MenuItem>
                            <MenuItem value="DMA">DMA</MenuItem>
                            <MenuItem value="EDUCATION">EDUCATION</MenuItem>
                            <MenuItem value="EMPSTATUS">EMPSTATUS</MenuItem>
                            <MenuItem value="ETHINICITY">ETHINICITY</MenuItem>
                            <MenuItem value="GENDER">GENDER</MenuItem>
                            <MenuItem value="HHI">HHI</MenuItem>
                            <MenuItem value="KIDS">KIDS</MenuItem>
                            <MenuItem value="MARITAL">MARITAL</MenuItem>
                            <MenuItem value="STATE">STATE</MenuItem>
                            <MenuItem value="ZIPS">ZIPS</MenuItem>
                          </FormField>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <FormField
                            type="text"
                            label="Parameter 2"
                            name="Out_Parameter2"
                            value={values.out_Parameter2}
                            onChange={handleChange}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <FormField
                            select
                            label="Value 2"
                            name="Out_Parameter2Column"
                            value={values.out_Parameter2Column}
                            onChange={handleChange}
                          >
                            <MenuItem value="">--SELECT--</MenuItem>
                            <MenuItem value="AGE">AGE</MenuItem>
                            <MenuItem value="CITY">CITY</MenuItem>
                            <MenuItem value="DMA">DMA</MenuItem>
                            <MenuItem value="EDUCATION">EDUCATION</MenuItem>
                            <MenuItem value="EMPSTATUS">EMPSTATUS</MenuItem>
                            <MenuItem value="ETHINICITY">ETHINICITY</MenuItem>
                            <MenuItem value="GENDER">GENDER</MenuItem>
                            <MenuItem value="HHI">HHI</MenuItem>
                            <MenuItem value="KIDS">KIDS</MenuItem>
                            <MenuItem value="MARITAL">MARITAL</MenuItem>
                            <MenuItem value="STATE">STATE</MenuItem>
                            <MenuItem value="ZIPS">ZIPS</MenuItem>
                          </FormField>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <FormField
                            type="text"
                            label="Parameter 3"
                            name="Out_Parameter3"
                            value={values.out_Parameter3}
                            onChange={handleChange}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <FormField
                            select
                            label="Value 3"
                            name="Out_Parameter3Column"
                            value={values.out_Parameter3Column}
                            onChange={handleChange}
                          >
                            <MenuItem value="">--SELECT--</MenuItem>
                            <MenuItem value="AGE">AGE</MenuItem>
                            <MenuItem value="CITY">CITY</MenuItem>
                            <MenuItem value="DMA">DMA</MenuItem>
                            <MenuItem value="EDUCATION">EDUCATION</MenuItem>
                            <MenuItem value="EMPSTATUS">EMPSTATUS</MenuItem>
                            <MenuItem value="ETHINICITY">ETHINICITY</MenuItem>
                            <MenuItem value="GENDER">GENDER</MenuItem>
                            <MenuItem value="HHI">HHI</MenuItem>
                            <MenuItem value="KIDS">KIDS</MenuItem>
                            <MenuItem value="MARITAL">MARITAL</MenuItem>
                            <MenuItem value="STATE">STATE</MenuItem>
                            <MenuItem value="ZIPS">ZIPS</MenuItem>
                          </FormField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormField
                            type="text"
                            label="Parameter 4"
                            name="Out_Parameter4"
                            value={values.out_Parameter4}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormField
                            select
                            label="Value 4"
                            name="Out_Parameter4Column"
                            value={values.out_Parameter4Column}
                            onChange={handleChange}
                          >
                            <MenuItem value="">--SELECT--</MenuItem>
                            <MenuItem value="AGE">AGE</MenuItem>
                            <MenuItem value="CITY">CITY</MenuItem>
                            <MenuItem value="DMA">DMA</MenuItem>
                            <MenuItem value="EDUCATION">EDUCATION</MenuItem>
                            <MenuItem value="EMPSTATUS">EMPSTATUS</MenuItem>
                            <MenuItem value="ETHINICITY">ETHINICITY</MenuItem>
                            <MenuItem value="GENDER">GENDER</MenuItem>
                            <MenuItem value="HHI">HHI</MenuItem>
                            <MenuItem value="KIDS">KIDS</MenuItem>
                            <MenuItem value="MARITAL">MARITAL</MenuItem>
                            <MenuItem value="STATE">STATE</MenuItem>
                            <MenuItem value="ZIPS">ZIPS</MenuItem>
                          </FormField>
                        </Grid>
                      </>
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
                          {values.cid ? "Update" : "Submit"}
                        </MDButton>
                      </MDBox>
                    </Grid>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        </MDBox>
      </Card>
    </MDBox>
  );
};

export default Clientcom;
