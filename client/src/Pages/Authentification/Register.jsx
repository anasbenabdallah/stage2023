import React, { useEffect, useState } from "react";
import RegisterLink from "@mui/material/Link";
import { Link, useNavigate } from "react-router-dom";
import AuthWrapper from "./components/AuthWrapper";
import AlertContainer from "../../Components/alerts";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

// material-ui
import {
  Button,
  Divider,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";

// project import


//import redux
import { useDispatch } from "react-redux";
import { register } from "../../redux/actions/AuthAction";
import LinkCopyright from "@mui/material/Link";

function Copyright(props) {
  return (
    <Typography
      variant="body1"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <LinkCopyright color="inherit">Sagem</LinkCopyright>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

 
  const [companyName, setCompanyName] = useState("");

  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [isActionCompleted, setIsActionCompleted] = useState(false);
  const [role, setRole] = React.useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    let data; // declare data using let

   
    if (role === "company") {
      data = await dispatch(register({ companyName, email, password, role }));
    }
    console.log(data);
    setIsActionCompleted(true);

    if (data) navigate("/login");
  };

  return (
    <AuthWrapper>
      <Stack spacing={5} sx={{ width: "70%" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack spacing={1} display={"flex"} alignItems={"center"}>
              <Typography component="h1" variant="h1" color="primary">
                Sagem
              </Typography>
            </Stack>
          </Grid>
          {isActionCompleted && <AlertContainer />}
          <Grid item xs={12} md={12}>
            <InputLabel id="demo-simple-select-label">
              Select an Option
            </InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={role}
              label="Select an Option"
              fullWidth
              onChange={(event) => setRole(event.target.value)}
            >
              <MenuItem value="company">UserAtSagemcom</MenuItem>
            </Select>
          </Grid>

          {role === "company" && (
            <>
              <Grid item xs={12} md={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="Username-signup">
                    Username
                  </InputLabel>
                  <OutlinedInput
                    id="companyname-login"
                    type="companyname"
                    name="companyname"
                    placeholder="Anas"
                    fullWidth
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-login">Email Address</InputLabel>
                  <OutlinedInput
                    id="email-login"
                    type="email"
                    name="email"
                    placeholder="Enter a valid business email"
                    fullWidth
                    onChange={(e) => SetEmail(e.target.value)}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-login">Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    id="-password-login"
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    onChange={(e) => SetPassword(e.target.value)}
                  />
                </Stack>
              </Grid>
            </>
          )}

          <Grid item xs={12} sx={{ mt: -1 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            ></Stack>
          </Grid>
          <Grid item xs={12}>
            <Button
              disableElevation
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="primary"
              disabled={!role}
              onClick={(e) => submitHandler(e)}
            >
              Sign up
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              columnGap={"0.2rem"}
            >
              <Typography variant="h6">Already have an account?</Typography>
              <RegisterLink
                underline="hover"
                variant="h6"
                color={"primary"}
                component={Link}
                to="/login"
              >
                login
              </RegisterLink>
            </Stack>
          </Grid>
        </Grid>
        <Copyright />
      </Stack>
    </AuthWrapper>
  );
};

export default Register;
