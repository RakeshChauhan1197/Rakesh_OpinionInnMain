import React, { useState, useEffect, useRef } from "react";
import {
  Checkbox,
  FormControlLabel,
  Button,
  useMediaQuery,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  FormControl,
  TextField,
  FormLabel,
} from "@mui/material";
import Card from "@mui/material/Card";
import { Formik, Form } from "formik";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import FormField from "module/Master/Country/Component/Formfield/Formfield";
import { IAffiliate } from "../slice/Affiliate.type";
import { IAffiliateuser } from "../slice/Affiliate.type";
import { getAffiliateuser, getHttpmethod, getSignuptype } from "../slice/Affiliate.slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "app/store";

// Define initial state for client fields
interface AffiliateFormProps {
  affiliate: IAffiliate | null;
  onClose: () => void;
  onSave: (affiliate: IAffiliate) => Promise<void>;
}

const Affiliatecom: React.FC<AffiliateFormProps> = ({ affiliate, onClose, onSave }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const parameterSectionRef = useRef<HTMLDivElement>(null); // Ref to scroll to parameters section
  const [users, setUsers] = useState<IAffiliateuser[]>([]);
  const [httpmethod, setHttpmethod] = useState<{ httpmethod: string }[]>([]);
  const [signuptype, setSignuptype] = useState<{ signupType: string }[]>([]);

  useEffect(() => {
    dispatch(getAffiliateuser()).then((action: any) => {
      if (getAffiliateuser.fulfilled.match(action)) {
        const transformedUsers = action.payload.map((user: IAffiliate) => ({
          uid: user.tid, // Map tid from IAffiliate to uid in IAffiliateuser
          name: user.name, // Map fields as necessary
        }));
        setUsers(transformedUsers);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSignuptype()).then((action) => {
      if (getSignuptype.fulfilled.match(action)) {
        const payload = action.payload;
        const newcleanData = payload.map((signup) => ({
          signupType: signup,
        }));
        setSignuptype(newcleanData);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(getHttpmethod()).then((action: any) => {
      if (getHttpmethod.fulfilled.match(action)) {
        const newhttpData = action.payload.map((http) => ({
          httpmethod: http,
        }));
        setHttpmethod(newhttpData);
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
      <Card sx={{ maxWidth: 1000, padding: 6, width: isSmallScreen ? "100%" : "50rem" }}>
        <MDBox lineHeight={0}>
          <MDTypography variant="h5">Manage Affiliate</MDTypography>
          <MDTypography variant="button" color="text">
            Affiliate information
          </MDTypography>
        </MDBox>

        <MDBox mt={1.625}>
          <Formik
            initialValues={{
              name: affiliate?.name || "",
              contactPersoName: affiliate?.contactPersonName || "",
              contactPersoEmail: affiliate?.contactPersonEmail || "",
              contactPersonPhone: affiliate?.contactPersonPhone || "",
              queryAttribute: affiliate?.qryAttribute || "",
              queryAttribute2: affiliate?.qryAttribute2 || "",
              signUpType: affiliate?.signupType || "",
              httpMethod: affiliate?.httpMethod || "",
              successNotificationURL: affiliate?.successNotificationUrl || "",
              isTSL: affiliate?.isTSL === 1,
              landingPageURL: affiliate?.landingPageUrl || "",
              duplicateCheckParamater: affiliate?.duplicateCheckParameter || "",
              affiliateUser: affiliate?.affiliateUser || "",
              affiliateType: affiliate?.affiliateType || "",
              incentiveValue: affiliate?.incentiveValue,
              incentiveType: affiliate?.incentiveType || "fixed",
            }}
            validate={(values) => {
              const errors: any = {};
              if (!values.name) errors.name = "Name is Required";
              if (!values.contactPersoName)
                errors.contactPersoName = "Contact Perso Name is Required";
              if (!values.contactPersoEmail)
                errors.contactPersoEmail = "Contact Person Email is Required";
              if (!values.contactPersonPhone)
                errors.contactPersonPhone = "Contact Person Phone is Required";
              if (!values.queryAttribute) errors.queryAttribute = "Query Attribute is Required";
              if (!values.successNotificationURL)
                errors.successNotificationURL = "Success Notification URL is Required";
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              const newAffiliate: IAffiliate = {
                tid: affiliate ? affiliate.tid : 0,
                name: values.name,
                contactPersonName: values.contactPersoName,
                contactPersonEmail: values.contactPersoEmail,
                contactPersonPhone: values.contactPersonPhone,
                qryAttribute: values.queryAttribute,
                qryAttribute2: values.queryAttribute2,
                signupType: values.signUpType,
                httpMethod: values.httpMethod,
                successNotificationUrl: values.successNotificationURL,
                isTSL: affiliate ? affiliate.isTSL : 1,
                landingPageUrl: values.landingPageURL,
                duplicateCheckParameter: values.duplicateCheckParamater,
                affiliateUser: values.affiliateUser,
                affiliateType: values.affiliateType,
                incentiveValue: values.incentiveValue,
                incentiveType: values.incentiveType, // Use the value from the form
              };

              await onSave(newAffiliate);
              setSubmitting(false);
              onClose();
            }}
          >
            {({ values, handleChange, isSubmitting }) => (
              <Form>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <FormField
                      type="text"
                      label="Name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormField
                      type="text"
                      label="Contact Person Name"
                      name="contactPersoName"
                      value={values.contactPersoName}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormField
                      type="text"
                      label="Contact Person Phone"
                      name="contactPersonPhone"
                      value={values.contactPersonPhone}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormField
                      type="text"
                      label="Contact Person Email"
                      name="contactPersoEmail"
                      value={values.contactPersoEmail}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormField
                      type="text"
                      label="Query Attribute"
                      name="queryAttribute"
                      value={values.queryAttribute}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormField
                      type="text"
                      label="Query Attribute 2"
                      name="queryAttribute2"
                      value={values.queryAttribute2}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormField
                      select
                      label="SignUp Type"
                      name="signUpType"
                      value={values.signUpType}
                      onChange={handleChange}
                    >
                      {signuptype.map((signup) => (
                        <MenuItem key={signup.signupType} value={signup.signupType}>
                          {signup.signupType}
                        </MenuItem>
                      ))}
                    </FormField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormField
                      select
                      label="Http Method"
                      name="httpMethod"
                      value={values.httpMethod}
                      onChange={handleChange}
                    >
                      {httpmethod.map((http) => (
                        <MenuItem key={http.httpmethod} value={http.httpmethod}>
                          {http.httpmethod}
                        </MenuItem>
                      ))}
                    </FormField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormField
                      type="text"
                      label="Success Notification URL"
                      name="successNotificationURL"
                      value={values.successNotificationURL}
                      onChange={handleChange}
                      required
                    />
                  </Grid>

                  {/* Add radio button for True/False */}
                  <Grid item xs={12} sm={6}>
                    <MDBox display="flex" alignItems="center">
                      <FormLabel component="legend" sx={{ marginRight: 2, fontSize: 15 }}>
                        Is TSL:{" "}
                      </FormLabel>
                      <RadioGroup
                        aria-label="Is TSL"
                        name="isTSL"
                        value={values.isTSL}
                        onChange={handleChange}
                        row
                      >
                        <FormControlLabel value="true" control={<Radio />} label="True" />
                        <FormControlLabel value="false" control={<Radio />} label="False" />
                      </RadioGroup>
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <FormField
                      type="text"
                      label="Landing Page URL"
                      name="landingPageURL"
                      value={values.landingPageURL}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormField
                      type="text"
                      label="Duplicate Check Paramater"
                      name="duplicateCheckParamater"
                      value={values.duplicateCheckParamater}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormField
                      select
                      label="Affiliate User"
                      name="affiliateUser"
                      value={values.affiliateUser}
                      onChange={handleChange}
                    >
                      {users.map((User) => (
                        <MenuItem key={User.uid} value={User.uid}>
                          {User.name}
                        </MenuItem>
                      ))}
                    </FormField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MDBox display="flex" alignItems="center">
                      <FormLabel component="legend" sx={{ marginRight: 2, fontSize: 15 }}>
                        Incentive:{" "}
                      </FormLabel>
                      <RadioGroup
                        aria-label="incentive"
                        name="incentive"
                        value={values.incentiveType}
                        onChange={handleChange}
                        row
                      >
                        <FormControlLabel value="fixed" control={<Radio />} label="Fixed" />
                        <FormControlLabel value="variable" control={<Radio />} label="Variable" />
                      </RadioGroup>
                    </MDBox>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    {values.incentiveType === "fixed" && (
                      <TextField
                        fullWidth
                        label="Fixed Value"
                        name="fixedValue"
                        value={values.incentiveValue}
                        onChange={handleChange}
                        variant="outlined"
                      />
                    )}
                    {values.incentiveType === "variable" && (
                      <TextField
                        fullWidth
                        label="Variable Value"
                        name="variableValue"
                        value={values.incentiveValue}
                        onChange={handleChange}
                        variant="outlined"
                        multiline
                        rows={4}
                      />
                    )}
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormField
                      select
                      label="Affiliate Type"
                      name="affiliateType"
                      value={values.affiliateType}
                      onChange={handleChange}
                    >
                      <MenuItem value="New">New</MenuItem>
                      <MenuItem value="Old">Old</MenuItem>
                    </FormField>
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

export default Affiliatecom;
