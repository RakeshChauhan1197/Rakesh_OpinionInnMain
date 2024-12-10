import React, { useEffect, useState, useRef } from "react";
import { useMediaQuery, Grid, IconButton, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import { Formik, Form } from "formik";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import FormField from "module/Master/Country/Component/Formfield/Formfield";
import TextEditor from "../TextEditor";
import { useDispatch } from "react-redux";
import { AppDispatch } from "app/store";
import { ITemplate } from "../slice/Emailtemplate.type";
import { fetchTemplateVariables } from "../slice/Emailtemplate.slice";
import { IVariables } from "../slice/Emailtemplate.type";
import { Close as CloseIcon } from "@mui/icons-material";

interface EmailtemplatecomProps {
  template: ITemplate | null;
  onClose: () => void;
  onSave: (template: ITemplate) => Promise<void>;
}

const Emailtemplatecom: React.FC<EmailtemplatecomProps> = ({ template, onClose, onSave }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const parameterSectionRef = useRef<HTMLDivElement>(null);
  const [variables, setVariables] = useState<IVariables[]>([]);

  useEffect(() => {
    dispatch(fetchTemplateVariables())
      .unwrap()
      .then((data) => {
        if (Array.isArray(data)) {
          setVariables(data.map((item: string) => ({ variables: item.trim() } as IVariables)));
        } else {
          console.error("Expected an array of variables");
        }
      })
      .catch((err) => console.error(err));
  }, [dispatch]);

  useEffect(() => {
    parameterSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

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
          width: isSmallScreen ? "100%" : "70rem",
          position: "relative",
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 16, right: 16, color: "#000" }}
        >
          <CloseIcon />
        </IconButton>
        <MDBox lineHeight={0}>
          <MDTypography variant="h5">Template Management</MDTypography>
        </MDBox>

        <MDBox mt={1.625} sx={{ maxHeight: "70vh", overflowY: "auto" }}>
          <Formik
            initialValues={{
              templateName: template?.template_name || "",
              mainSubject: template?.subject || "",
              msgBody: template?.msgBody || "",
            }}
            onSubmit={async (values, { setSubmitting }) => {
              const newTemplate: ITemplate = {
                tid: template ? template.tid : 0,
                template_name: values.templateName,
                msgBody: values.msgBody,
                subject: values.mainSubject,
              };
              await onSave(newTemplate);
              setSubmitting(false);
            }}
          >
            {({ values, setFieldValue, handleChange, isSubmitting }) => (
              <Form>
                <Grid container spacing={3}>
                  <Grid item xs={9}>
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
                    <Grid item xs={12}>
                      <MDTypography fontSize="15px">Template Message</MDTypography>
                      <TextEditor
                        msgBody={values.msgBody}
                        onmsgBodyChange={(msgBody) => setFieldValue("msgBody", msgBody)}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={3}>
                    <Grid item xs={12}>
                      <MDBox>
                        <MDTypography variant="5" fontSize="15px" fontWeight="bold">
                          Variables: (Copy & Paste to Mail Body)
                        </MDTypography>
                        <TextField
                          value={variables.map((v) => v.variables).join("\n")}
                          multiline
                          rows={18}
                          fullWidth
                          InputProps={{ readOnly: true }}
                        />
                      </MDBox>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <MDBox display="flex" justifyContent="center" sx={{ marginTop: 4 }}>
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

export default Emailtemplatecom;
