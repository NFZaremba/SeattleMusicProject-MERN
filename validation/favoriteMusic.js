const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validatemusicInput(data) {
  let errors = {};

  data.song = !isEmpty(data.song) ? data.song : "";
  data.album = !isEmpty(data.album) ? data.album : "";
  data.artist = !isEmpty(data.artist) ? data.artist : "";
  data.genre = !isEmpty(data.genre) ? data.genre : "";

  if (Validator.isEmpty(data.song)) {
    errors.song = "Song field is required";
  }

  if (Validator.isEmpty(data.album)) {
    errors.album = "Album field is required";
  }

  if (Validator.isEmpty(data.artist)) {
    errors.artist = "Artist field is required";
  }

  if (Validator.isEmpty(data.genre)) {
    errors.genre = "Genre field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
