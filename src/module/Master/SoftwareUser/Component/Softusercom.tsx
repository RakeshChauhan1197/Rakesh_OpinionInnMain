import React, { useEffect, useState } from "react";
import { Checkbox, FormControlLabel, Button, useMediaQuery, Grid, MenuItem } from "@mui/material";
import Card from "@mui/material/Card";
import { Formik, Form } from "formik";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import FormField from "module/Master/Country/Component/Formfield/Formfield"; // Using FormField component
import { ISoftwareuser } from "../slice/Softwareuser.type";
import { fetchSoftwareuser } from "../slice/Softwareuser.slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "app/store";

interface SoftusercomProps {
  softwareuser: ISoftwareuser | null;
  onClose: () => void;
  onSave: (softwareuser: ISoftwareuser) => Promise<void>;
}

const Softusercom: React.FC<SoftusercomProps> = ({ softwareuser, onClose, onSave }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const [userRole, setuserRole] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  useEffect(() => {
    dispatch(fetchSoftwareuser())
      .unwrap()
      .then((data) => {
        setuserRole(data);
      })
      .catch((err) => console.error(err));
  }, [dispatch]);

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value as string); // Update selected value state
  };

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
          <MDTypography variant="h5">
            {softwareuser ? "Edit Software User" : "Add Software User"}
          </MDTypography>
        </MDBox>

        <MDBox mt={1.625}>
          <Formik
            initialValues={{
              firstName: softwareuser?.firstName || "",
              lastName: softwareuser?.lastName || "",
              email: softwareuser?.email || "",
              password: softwareuser?.password || "",
              userRole: softwareuser?.userRole || "",
              gender: softwareuser?.gender || "",
              country: softwareuser?.country || "",
            }}
            validate={(values) => {
              const errors: any = {};
              if (!values.firstName) errors.firstName = "First name is required";
              if (!values.email) errors.email = "Email is required";
              if (!values.password) errors.password = "Password is required";
              if (!values.userRole) errors.userRole = "User role is required";
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              const newSoftwareuser: ISoftwareuser = {
                uid: softwareuser ? softwareuser.uid : 0,
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password,
                userRole: values.userRole,
                gender: values.gender,
                isAuth: softwareuser ? softwareuser.isAuth : false,
                country: values.country,
              };
              await onSave(newSoftwareuser);
              setSubmitting(false);
              onClose();
            }}
          >
            {({ values, handleChange, isSubmitting, errors, touched }) => (
              <Form>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <FormField
                      type="text"
                      label="First Name"
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <FormField
                      type="text"
                      label="Last Name"
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <FormField
                      type="text"
                      label="Email Id"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <FormField
                      type="password"
                      label="Password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      required
                    />
                  </Grid>

                  {/* Dynamic Dropdown for User Role */}
                  <Grid item xs={12} sm={12}>
                    <FormField
                      select
                      label="User Role"
                      name="userRole"
                      value={selectedValue}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        handleRoleChange(e); // Update selected value
                        handleChange(e); // Formik form change
                      }}
                      required
                      fullWidth
                    >
                      <MenuItem value="">--SELECT--</MenuItem>
                      {userRole.map((role) => (
                        <MenuItem key={role.id} value={role.role}>
                          {role.role}
                        </MenuItem>
                      ))}
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

export default Softusercom;
