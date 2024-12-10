import React, { useEffect, useRef } from "react";
import { useMediaQuery, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import { Formik, Form } from "formik";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import FormField from "module/Master/Country/Component/Formfield/Formfield";
import { IEndpage } from "../slice/Endpage.type";
interface EndpageFormProps {
  endpage: IEndpage | null;
  onClose: () => void;
  onSave: (endpage: IEndpage) => Promise<void>;
}

const Endpagescom: React.FC<EndpageFormProps> = ({ endpage, onClose, onSave }) => {
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
      <Card sx={{ maxWidth: 1000, padding: 6, width: isSmallScreen ? "100%" : "50rem" }}>
        <MDBox lineHeight={0}>
          <MDTypography variant="h5">Manage End Pages</MDTypography>
        </MDBox>

        <MDBox mt={1.625}>
          <Formik
            initialValues={{
              name: endpage ? endpage.endPage_Name : "",
              successCode: endpage ? endpage.success_EndPage_Code : "",
              rejectCode: endpage ? endpage.reject_EndPage_Code : "",
              overquotaCode: endpage ? endpage.overQuota_EndPage_Code : "",
              qry: endpage ? endpage.qry : "",
              createdOn: endpage ? endpage.createdOn : "",
              createdBy: endpage ? endpage.createdBy : "",
              ufName: endpage ? endpage.ufName : "",
            }}
            validate={(values) => {
              const errors: Record<string, string> = {};
              if (!values.name) errors.name = "Name is required";
              if (!values.successCode) errors.successCode = "Success Code is required";
              if (!values.rejectCode) errors.rejectCode = "Reject Code is required";
              if (!values.overquotaCode) errors.overquotaCode = "Overquota Code is required";
              if (!values.qry) errors.qry = "Qry is required";
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              const newEndpage: IEndpage = {
                cid: endpage ? endpage.cid : 0,
                endPage_Name: values.name,
                success_EndPage_Code: values.successCode,
                reject_EndPage_Code: values.rejectCode,
                overQuota_EndPage_Code: values.overquotaCode,
                qry: values.qry,
                createdOn: values.createdOn,
                createdBy: values.createdBy,
                ufName: values.ufName,
              };

              await onSave(newEndpage);
              setSubmitting(false);
              onClose();
            }}
          >
            {({ values, handleChange, isSubmitting }) => (
              <Form>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <FormField
                      type="text"
                      label="Name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormField
                      type="text"
                      label="Success Code"
                      name="successCode"
                      value={values.successCode}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormField
                      type="text"
                      label="Reject Code"
                      name="rejectCode"
                      value={values.rejectCode}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormField
                      type="text"
                      label="Overquota Code"
                      name="overquotaCode"
                      value={values.overquotaCode}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormField
                      type="text"
                      label="Qry"
                      name="qry"
                      value={values.qry}
                      onChange={handleChange}
                      required
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

export default Endpagescom;
