import * as React from "react";
import Button from "@mui/material/Button";
import { Grid, Typography } from "@mui/material";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import FingerprintOutlinedIcon from "@mui/icons-material/FingerprintOutlined";
import { auth } from "../../firebase/config";
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";

export default function Login() {
  const fbProvider = new FacebookAuthProvider();
  const handleFbLogin = () => {
    signInWithPopup(auth, fbProvider);
  };
  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        background:
          "url(https://screenvisionmedia.com/wp-content/uploads/2015/09/movie-bg.jpg)",
      }}
    >
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ marginTop: "15%" }}
      >
        <Typography variant="h5" color="#fff" fontWeight={"bold"}>
          Đăng nhập
        </Typography>
        <Typography variant="h4" color="#ba000d" fontWeight={"bold"}>
          Moonnetfix
        </Typography>
        <Button
          sx={{
            minWidth: 300,
            mt: 2,
            "&:hover": {
              color: "#fffff",
              background: "#3d00ff36",
            },
          }}
          variant="outlined"
          startIcon={<FacebookOutlinedIcon />}
          onClick={handleFbLogin}
        >
          Đăng nhập bằng Facebook
        </Button>
        <Button
          sx={{
            minWidth: 300,
            mt: 2,
            "&:hover": {
              color: "#fffff",
              background: "#3d00ff36",
            },
          }}
          variant="outlined"
          startIcon={<FingerprintOutlinedIcon />}
        >
          Đăng nhập bằng Google
        </Button>
      </Grid>
    </div>
  );
}
