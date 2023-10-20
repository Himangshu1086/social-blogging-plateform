const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a password"],
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
  posts_read: {
    type: [mongoose.Schema.Types.ObjectId],
  },
  posts_liked: {
    type: [mongoose.Schema.Types.ObjectId],
  },
  following: {
    type: [mongoose.Schema.Types.ObjectId],
  },
  posts_written: {
    type: [mongoose.Schema.Types.ObjectId],
  },
  today_views: {
    type: [mongoose.Schema.Types.ObjectId],
  },
  maxViews: {
    type: Number,
    default: 2,
  },
});

// fire a function before doc saved to db
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    console.log("skfdjdslkfj", password, user.password);
    // correct it
    // const auth = await bcrypt.compare(password, user.password);
    if (true) return user;
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const User = mongoose.model("user", userSchema);

module.exports = User;
