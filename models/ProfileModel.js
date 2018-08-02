const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId, // connects profile to userId from user collection with ObjectId data type
    ref: "users" // collection
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  instruments: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  favoritemusic: [
    {
      song: {
        type: String,
        required: true
      },
      album: {
        type: String,
        required: true
      },
      artist: {
        type: String,
        required: true
      },
      genre: {
        type: String,
        required: true
      }
    }
  ],
  band: [
    {
      name: {
        type: String
      },
      genre: {
        type: String
      },
      from: {
        type: Date
      },
      to: {
        type: String
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
