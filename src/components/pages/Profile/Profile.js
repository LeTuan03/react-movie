import React, { useContext } from "react";
import { AuthContex } from "../../../Context/AuthProvider";
import { Avatar, Box, Grid, TextField, Typography } from "@mui/material";

export default function Profile() {
  const { user } = useContext(AuthContex);
  console.log(user);
  return (
    <Box>
      <Grid container sx={{ ml: 3 }}>
        <Grid item xs={3}>
          <Typography component={"h1"} variant="h2" sx={{ pt: 3, pb: 3 }}>
            My Profile
          </Typography>
          <Avatar
            alt="avata"
            src={user.photoURL}
            sx={{ width: 200, height: 200 }}
          />
        </Grid>
        <Grid item xs={9}>
          <Typography component={"p"} variant="p" sx={{ pt: 5, color:"red" }}>
            User name
          </Typography>
          <Typography component={"h1"} variant="h2" sx={{ pb: 3 }}>
            {user.displayName}
          </Typography>
          <Typography component={"p"} variant="p" sx={{ pt: 5, color:"red" }}>
            Email
          </Typography>
          <Typography component={"h1"} variant="h2">
            {user.email}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
