import React, { useEffect, useState } from "react";
import Youtube from "react-youtube";
import {
  API_KEY,
  IMG_URL,
  UPCOMING_URL,
  URLTOPRATE,
  get,
  srcVideo,
} from "../../../searchApi";
import { Swiper, SwiperSlide } from "swiper/react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Scrollbar, Autoplay, Navigation, Pagination } from "swiper";

import classes from "./HomePage.module.scss";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const label = { inputProps: { "aria-label": "Checkbox demo" } };
function HomePage() {
  const [slide, setSlide] = useState(7);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [movies, setMovies] = useState([]);
  const [topRate, setTopRate] = useState([]);
  const [upComing, setUpComing] = useState([]);
  const [idMovie, setIdMovie] = useState("");
  const [favorites, setFavorites] = useState([]);
  const getDataVideo = async () => {
    const data = await get();
    setMovies(data.results);
  };
  const getTopRateMovies = async () => {
    const data = await get(URLTOPRATE);
    setTopRate(data.results);
  };
  const getUpComingMovies = async () => {
    const data = await get(UPCOMING_URL);
    setUpComing(data.results);
  };
  useEffect(() => {
    getDataVideo();
    getTopRateMovies();
    getUpComingMovies();
    if (window.innerWidth <= 480) {
      setSlide(1);
    }
  }, []);
  const handleWatch = async (id) => {
    const data = await get(
      srcVideo + id + "?" + API_KEY + "&append_to_response=videos"
    );
    setIdMovie(data.videos.results[0].key);
    handleOpen();
  };
  const handleAddFovoritesVideo = (id) => {
    const preFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const getCommonId = preFavorites.find((fav) => fav === id);
    const getIndividualId = preFavorites.filter((fav) => fav !== id);
    if (getCommonId) {
      setFavorites(getIndividualId);
      localStorage.setItem("favorites", JSON.stringify(getIndividualId));
    } else {
      setFavorites([...preFavorites, id]);
      localStorage.setItem("favorites", JSON.stringify([...preFavorites, id]));
    }
  };
  return (
    <>
      <Swiper
        scrollbar={{
          hide: true,
        }}
        modules={[Autoplay, Scrollbar]}
        className="mySwiper"
      >
        {movies.map((vid, index) => {
          const imgSrc = IMG_URL + vid.poster_path;
          const imgSrcBg = IMG_URL + vid.backdrop_path;
          return (
            <SwiperSlide
              key={index}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                background: `url(${imgSrcBg}) no-repeat center`,
                backgroundSize: "100% 100%",
                height: 700,
              }}
            >
              <Box sx={{ position: "absolute", left: 20 }}>
                {
                  <Typography
                    variant="h3"
                    component={"h1"}
                    sx={{ width: "50%" }}
                  >
                    {vid.original_title}
                  </Typography>
                }
                <Typography
                  variant="p"
                  component={"p"}
                  sx={{ width: "50%", mt: 4, mb: 4 }}
                >
                  {vid.overview}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => {
                    handleWatch(vid.id);
                  }}
                  sx={{
                    mt: 2,
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    "&:hover": {
                      color: "#ccc",
                      background: "#7986cb",
                    },
                  }}
                  className="btn-watch"
                >
                  <p> Watch now</p>
                  <ArrowRightAltIcon sx={{ ml: 1 }} />
                </Button>
                <Checkbox
                  onClick={() => handleAddFovoritesVideo(vid.id)}
                  {...label}
                  icon={<FavoriteBorder sx={{ color: "#1976d2" }} />}
                  checkedIcon={<Favorite sx={{ color: "red" }} />}
                />
              </Box>
              <Typography
                variant="img"
                component={"img"}
                src={imgSrc}
                sx={{ maxHeight: 600 }}
              ></Typography>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <KeyboardBackspaceIcon
              sx={{
                cursor: "pointer",
                position: "absolute",
                top: 30,
                left: 50,
                color: "red",
                fontSize: "5rem",
              }}
              onClick={handleClose}
            />
            <Youtube
              videoId={idMovie}
              className={"youtube amru"}
              containerClassName={"youtube-container amru"}
              opts={{
                width: "100%",
                height: "745px",
                playerVars: {
                  autoplay: 1,
                  controls: 1,
                  allowsFullscreenVideo: 1,
                  cc_load_policy: 0,
                  fs: 0,
                  iv_load_policy: 0,
                  modestbranding: 0,
                  rel: 0,
                  showinfo: 0,
                },
              }}
            />
          </Box>
        </Fade>
      </Modal>
      {/* Popular movie  */}
      <Box sx={{ p: 2, pt: 5 }} className={"popular"}>
        <Typography variant="h5" component={"h1"}>
          Popular Movie
        </Typography>
        <>
          <Swiper
            navigation={true}
            modules={[Navigation, Pagination]}
            slidesPerView={slide}
            spaceBetween={30}
            className="mySwiper"
            style={{ padding: "0 3rem", marginTop: "2rem" }}
          >
            {topRate.map((vid, index) => {
              const imgSrc = IMG_URL + vid.poster_path;
              return (
                <SwiperSlide
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className={classes.slider}
                >
                  <Typography
                    style={{ height: 200 }}
                    variant="img"
                    component={"img"}
                    src={imgSrc}
                    className={classes.poster}
                  ></Typography>
                  <Typography
                    variant="h3"
                    component={"div"}
                    className={classes.desc}
                  >
                    <Typography sx={{ color: "#000", m: 1 }}>
                      {vid.original_title}
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleWatch(vid.id);
                      }}
                      sx={{
                        m: 1,
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        "&:hover": {
                          color: "#ccc",
                          background: "#7986cb",
                        },
                      }}
                      className="btn-watch"
                    >
                      <p> Watch</p>
                    </Button>
                    <Checkbox
                      {...label}
                      icon={<FavoriteBorder sx={{ color: "#1976d2" }} />}
                      checkedIcon={<Favorite sx={{ color: "red" }} />}
                      onClick={() => handleAddFovoritesVideo(vid.id)}
                    />
                    <Typography sx={{ color: "#000", m: 1 }}>
                      Popularity : {vid.popularity}
                    </Typography>
                  </Typography>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </>
      </Box>
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" component={"h1"}>
          Up Comming
        </Typography>
        <>
          <Swiper
            navigation={true}
            modules={[Navigation, Pagination]}
            slidesPerView={slide}
            spaceBetween={30}
            className="mySwiper"
            style={{ padding: "0 3rem", marginTop: "2rem" }}
          >
            {upComing.map((vid, index) => {
              const imgSrc = IMG_URL + vid.poster_path;
              return (
                <SwiperSlide
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className={classes.slider}
                >
                  <Typography
                    style={{ height: 200 }}
                    variant="img"
                    component={"img"}
                    src={imgSrc}
                    className={classes.poster}
                  ></Typography>
                  <Typography
                    variant="h3"
                    component={"div"}
                    className={classes.desc}
                  >
                    <Typography sx={{ color: "#000", m: 1 }}>
                      {vid.original_title}
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleWatch(vid.id);
                      }}
                      sx={{
                        m: 1,
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        "&:hover": {
                          color: "#ccc",
                          background: "#7986cb",
                        },
                      }}
                      className="btn-watch"
                    >
                      <p> Watch</p>
                    </Button>
                    <Checkbox
                      {...label}
                      icon={<FavoriteBorder sx={{ color: "#1976d2" }} />}
                      checkedIcon={<Favorite sx={{ color: "red" }} />}
                      onClick={() => handleAddFovoritesVideo(vid.id, this)}
                    />
                    <Typography sx={{ color: "#000", m: 1 }}>
                      Popularity : {vid.popularity}
                    </Typography>
                  </Typography>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </>
      </Box>
    </>
  );
}

export default HomePage;
