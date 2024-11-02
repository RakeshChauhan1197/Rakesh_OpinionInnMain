import React, { useEffect, useState } from "react";
import { useMediaQuery, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import { Formik, Form } from "formik";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import FormField from "module/Master/Country/Component/Formfield/Formfield";
import TextEditor from "../TextEditor";
import { fetchVariables } from "../slice/Emailtemplate.slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "app/store";
import { ITemplate, Ivariable } from "../slice/Emailtemplate.type";

interface EmailtemplatecomProps {
  template: ITemplate | null;
  onClose: () => void;
  onSave: (template: ITemplate) => Promise<void>;
}

const Emailtemplatecom: React.FC<EmailtemplatecomProps> = ({ template, onClose, onSave }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [variables, setVariables] = useState<string>("");

  useEffect(() => {
    dispatch(fetchVariables())
      .unwrap()
      .then((data) => {
        const variablesArray = JSON.parse(data.variables);
        const formattedVariables = variablesArray.join("\n");
        setVariables(formattedVariables);
      })
      .catch((err) => console.error(err));
  }, [dispatch]);

  return (
    <MDBox display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Card sx={{ maxWidth: 1000, padding: 6 }}>
        <MDBox lineHeight={0}>
          <MDTypography variant="h5">Template Management</MDTypography>
          <MDTypography variant="button" color="text">
            Email Template Information
          </MDTypography>
        </MDBox>

        <MDBox mt={1.625}>
          <Formik
            initialValues={{
              templateName: template?.template_name || "",
              mainSubject: template?.subject || "",
            }}
            onSubmit={async (values, { setSubmitting }) => {
              await onSave({ ...template, ...values });
              setSubmitting(false);
            }}
          >
            {({ values, handleChange, isSubmitting }) => (
              <Form>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <FormField
                      type="text"
                      label="Template Name"
                      name="templateName"
                      value={values.templateName}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormField
                      type="text"
                      label="Main Subject"
                      name="mainSubject"
                      value={values.mainSubject}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={10}>
                    <TextEditor />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <label htmlFor="variables">Variables</label>
                    <Grid item xs={12}>
                      <div>{variables}</div>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <MDBox display="flex" justifyContent="center" sx={{ marginTop: 2 }}>
                      <MDButton variant="gradient" color="light" onClick={onClose}>
                        Cancel
                      </MDButton>
                      <MDButton
                        type="submit"
                        variant="gradient"
                        color="dark"
                        disabled={isSubmitting}
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

export default Emailtemplatecom;
