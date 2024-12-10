import React, { useState } from "react";
import {
  Grid,
  TextField,
  useMediaQuery,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  MenuItem,
  IconButton,
} from "@mui/material";
import Card from "@mui/material/Card";
import { Formik, Form } from "formik";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import FormField from "module/Master/Country/Component/Formfield/Formfield";
import { Close as CloseIcon } from "@mui/icons-material";

function Questioncom({ onClose }: { onClose: () => void }) {
  const isSmallScreen = useMediaQuery("(max-width:600px)");

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
        {/* Close Icon */}
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
          <MDTypography variant="h5">Download User</MDTypography>
        </MDBox>

        <MDBox mt={1.625}>
          <Formik
            initialValues={{
              questionText: "",
              optionType: "",
              addOption: "",
              rightAnswer: "",
              lastOptionExclusive: false,
              questionDataType: "",
              validationDataType: "",
              fixedCharacterLength: "",
              minCharacterLength: "",
              maxCharacterLength: "",
            }}
            onSubmit={(values, { setSubmitting }) => {
              console.log("Form Submitted with values:", values);
              setSubmitting(false);
              onClose();
            }}
          >
            {({ values, handleChange, isSubmitting, errors, touched, setFieldValue }) => (
              <Form>
                <Grid container spacing={3}>
                  {/* Question Text Field */}
                  <Grid item xs={12}>
                    <FormField
                      label="Question Text"
                      type="text"
                      name="questionText"
                      value={values.questionText}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>

                  {/* Option Type Field with Radio Buttons */}
                  <Grid item xs={12}>
                    <MDTypography variant="5" fontWeight="bold" gutterBottom>
                      Option Type
                    </MDTypography>
                    <RadioGroup
                      name="optionType"
                      value={values.optionType}
                      onChange={handleChange}
                      row
                    >
                      <FormControlLabel
                        value="radioButton"
                        control={<Radio />}
                        label="Radio Button"
                      />
                      <FormControlLabel value="checkBox" control={<Radio />} label="Check Box" />
                      <FormControlLabel value="textBox" control={<Radio />} label="Text Box" />
                    </RadioGroup>
                    {touched.optionType && Boolean(errors.optionType) && (
                      <MDTypography color="error" variant="caption">
                        {errors.optionType}
                      </MDTypography>
                    )}
                  </Grid>

                  {/* Conditional Fields for Radio Button and Check Box */}
                  {(values.optionType === "radioButton" || values.optionType === "checkBox") && (
                    <>
                      <Grid item xs={12}>
                        <FormField
                          label="Add Option"
                          type="text"
                          name="addOption"
                          value={values.addOption}
                          onChange={handleChange}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormField
                          label="Right Answer"
                          type="text"
                          name="rightAnswer"
                          value={values.rightAnswer}
                          onChange={handleChange}
                          fullWidth
                        />
                      </Grid>
                    </>
                  )}

                  {/* Exclusive Check Box Field for Check Box Option Type */}
                  {values.optionType === "checkBox" && (
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="lastOptionExclusive"
                            checked={values.lastOptionExclusive}
                            onChange={(e) => setFieldValue("lastOptionExclusive", e.target.checked)}
                          />
                        }
                        label="Last Option is Exclusive"
                      />
                    </Grid>
                  )}

                  {/* Conditional Fields for Text Box */}
                  {values.optionType === "textBox" && (
                    <>
                      <Grid item xs={12}>
                        <FormField
                          label="Question Data Type"
                          name="questionDataType"
                          select
                          value={values.questionDataType}
                          onChange={handleChange}
                          fullWidth
                        >
                          <MenuItem value="string">Alphabetical</MenuItem>
                          <MenuItem value="number">Alpha Numeric</MenuItem>
                          <MenuItem value="numeric">Numeric</MenuItem>
                        </FormField>
                      </Grid>
                      <Grid item xs={12}>
                        <FormField
                          label="Validation Data Type"
                          name="validationDataType"
                          select
                          value={values.validationDataType}
                          onChange={handleChange}
                          fullWidth
                        >
                          <MenuItem value="fixedCharacter">Fixed Character</MenuItem>
                          <MenuItem value="rangeCharacter">Range Character</MenuItem>
                        </FormField>
                      </Grid>

                      {/* Conditional Fields for Validation Data Type */}
                      {values.validationDataType === "fixedCharacter" && (
                        <Grid item xs={12}>
                          <FormField
                            label="Character Length"
                            type="number"
                            name="fixedCharacterLength"
                            value={values.fixedCharacterLength}
                            onChange={handleChange}
                            fullWidth
                          />
                        </Grid>
                      )}
                      {values.validationDataType === "rangeCharacter" && (
                        <>
                          <Grid item xs={6}>
                            <FormField
                              label="Min Character Length"
                              type="number"
                              name="minCharacterLength"
                              value={values.minCharacterLength}
                              onChange={handleChange}
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <FormField
                              label="Max Character Length"
                              type="number"
                              name="maxCharacterLength"
                              value={values.maxCharacterLength}
                              onChange={handleChange}
                              fullWidth
                            />
                          </Grid>
                        </>
                      )}
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
}

export default Questioncom;
