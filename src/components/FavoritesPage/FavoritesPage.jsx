import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Button, Tooltip } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { API_KEY, IMG_URL, get, srcVideo } from "../../searchApi";
import convertMinutesToHours from "../common/convertSecondsToTime";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const label = { inputProps: { "aria-label": "Checkbox demo" } };
export default function FavoritesPage() {
  const classes = useStyles();
  const [favorites, setFavorites] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    const preFavMovie = JSON.parse(localStorage.getItem("favorites"));
    if (preFavMovie) {
      setFavorites(preFavMovie);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [favorites]);
  const fetchMovies = async () => {
    const movies = await Promise.all(favorites.map(handleWatch));
    setList((pre) => [...pre, ...movies]);
  };

  const handleWatch = async (id) => {
    const data = await get(
      srcVideo + id + "?" + API_KEY + "&append_to_response=videos"
    );
    return data;
  };

  const handRemoveFromList = (id) => {
    const data = favorites.filter((item) => item !== id);
    localStorage.setItem("favorites", JSON.stringify(data));
    setList(data);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={1} sx={{ p: 3 }}>
        {list.map((vid, index) => {
          console.log(vid);
          const imgSrc = IMG_URL + vid.poster_path;
          const time = convertMinutesToHours(vid.runtime);
          return (
            <Grid
              item
              xs={3}
              sx={{ height: 300, marginBottom: 5, cursor: "pointer" }}
              key={index}
            >
              <Item>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <img
                      style={{
                        width: "100%",
                        maxHeight: "150px",
                        objectFit: "contain",
                      }}
                      src={imgSrc}
                      alt="anh  mo ta"
                    />
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                    >
                      {vid.original_title}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      {time}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Checkbox
                      {...label}
                      checked
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite />}
                    />
                    1000
                    <Tooltip title="Đã thêm vào danh sách ưa thích" arrow>
                      <Checkbox
                        {...label}
                        checked
                        onClick={() => handRemoveFromList(vid.id)}
                        icon={<BookmarkBorderIcon />}
                        checkedIcon={<BookmarkIcon />}
                      />
                    </Tooltip>
                  </CardActions>
                </Card>
              </Item>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
