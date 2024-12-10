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
import { Formik, Form, Field, FieldArray } from "formik";
import { Close as CloseIcon } from "@mui/icons-material";
import { Add as AddIcon } from "@mui/icons-material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import FormField from "module/Master/Country/Component/Formfield/Formfield";
import { useDispatch } from "react-redux";
import { AppDispatch } from "app/store";
import { IPolls } from "../slice/Polls.type";
import { ICountry } from "../slice/Polls.type";
import { getCountry } from "module/Master/PreSceenerNew/slice/Presceener.slice";

interface PollscomProps {
  polls: IPolls | null;
  onClose: () => void;
  onSave: (polls: IPolls) => Promise<void>;
}

const Pollscom: React.FC<PollscomProps> = ({ polls, onClose, onSave }) => {
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
      <Card sx={{ maxWidth: 1000, padding: 6, width: isSmallScreen ? "100%" : "40rem" }}>
        <MDBox lineHeight={0} textAlign="center" mb={2}>
          <MDTypography variant="h5">Manage Polls</MDTypography>
          <MDTypography variant="button" color="text">
            Polls Information
          </MDTypography>
        </MDBox>

        <Formik
          initialValues={{
            country: polls?.country || "",
            question: polls?.question || "",
            startDate: polls?.startDate
              ? new Date(polls.startDate).toISOString().split("T")[0]
              : "",
            lastDate: polls?.endDate ? new Date(polls.endDate).toISOString().split("T")[0] : "",
            isActive: polls?.isActive === 1,
            status: polls?.status || "",
            pollAnswer: polls?.pollAnswer
              ? polls.pollAnswer.split(", ").map((ans) => {
                  const [id, answer] = ans.split("::");
                  return { id, answer };
                })
              : [{ id: "", answer: "" }],
          }}
          validate={(values) => {
            const errors: any = {};
            if (!values.country) errors.country = "Country is required";
            if (!values.startDate) errors.startDate = "Start date is required";
            if (!values.lastDate) errors.lastDate = "Last date is required";
            if (!values.question) errors.question = "Question is required";
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            const formattedPollAnswer = values.pollAnswer
              .filter((ans) => ans.answer.trim() !== "") // Only include answers with non-empty values
              .map((ans) => `${ans.id || "0"}::${ans.answer}`)
              .join(", ");
            const newPolls: IPolls = {
              pollId: polls ? polls.pollId : 0,
              tid: polls ? polls.tid : 0,
              country: values.country,
              question: values.question,
              startDate: values.startDate,
              endDate: values.lastDate,
              isActive: values.isActive ? 1 : 0,
              status: values.status,
              pollAnswer: formattedPollAnswer,
            };
            await onSave(newPolls);
            setSubmitting(false);
            onClose();
          }}
        >
          {({ values, handleChange, isSubmitting, resetForm }) => (
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <MDTypography variant="h6">Poll Settings</MDTypography>
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
                  <FormField
                    type="date"
                    label="Poll Start Date"
                    name="startDate"
                    value={values.startDate}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <FormField
                    type="date"
                    label="Poll Last Date"
                    name="lastDate"
                    value={values.lastDate}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={values.isActive} onChange={handleChange} name="isActive" />
                    }
                    label="Active"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MDTypography variant="h6">Poll Questions</MDTypography>
                  <FormField
                    type="text"
                    label="Your Question"
                    name="question"
                    value={values.question}
                    onChange={handleChange}
                  />
                  <FieldArray name="pollAnswer">
                    {({ remove, push }) => (
                      <div>
                        {values.pollAnswer.map((answer, index) => (
                          <Grid container alignItems="center" spacing={1} key={index}>
                            <Field type="hidden" name={`pollAnswer.${index}.id`} />
                            <Grid item xs={10}>
                              <FormField
                                type="text"
                                label={`Your Answer ${index + 1}`}
                                name={`pollAnswer.${index}.answer`}
                                value={answer.answer}
                                onChange={handleChange}
                              />
                            </Grid>
                            <Grid item xs={2}>
                              {values.pollAnswer.length > 1 && (
                                <IconButton onClick={() => remove(index)}>
                                  <CloseIcon />
                                </IconButton>
                              )}
                            </Grid>
                          </Grid>
                        ))}
                        <Button
                          variant="contained"
                          sx={{
                            color: "dark",
                            backgroundColor: "White",
                            "&:hover": { backgroundColor: "dark", color: "#fff" },
                          }}
                          onClick={() => push({ id: "", answer: "" })}
                        >
                          <AddIcon /> Add Answer
                        </Button>
                      </div>
                    )}
                  </FieldArray>
                </Grid>
                <Grid item xs={12}>
                  <MDBox display="flex" justifyContent="center" sx={{ marginTop: 2 }}>
                    <MDButton
                      variant="gradient"
                      color="dark"
                      sx={{ marginLeft: 2 }}
                      onClick={() => resetForm()}
                    >
                      Reset Polls
                    </MDButton>
                  </MDBox>
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
      </Card>
    </MDBox>
  );
};

export default Pollscom;
