const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const authorRoutes = require("./routes/authorRoutes");
const { checkUser } = require("./middleware/authMiddleware");
const cookieParser = require("cookie-parser");

const User = require("./models/User");
const Post = require("./models/Post");

// const { requireAuth, checkUser } = require("./middleware/authMiddleware");

const cors = require("cors");

const app = express();
// Enable CORS for all routes
const corsOptions = {
  origin: "http://localhost:3000", // Replace with your frontend URL
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Add any other methods you use
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// database connection
const dbURI = "mongodb+srv://gk1:test1234@cluster0.mxtmn.mongodb.net/";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => {
    app.listen(3001);
    console.log("server started");
  })
  .catch((err) => console.log(err));

const stripe = require("stripe")(
  "sk_test_51Nf5G5SEwkmLhDCHmcMD4gsfg9FxPyCCmOhieI9tLGM8cTkFQlYhBFd0uiJAPXzRQ18LO00vS6L2tsYXNHykU95l00L6wyYmlO"
);

// app.post("*", checkUser);

app.post("/payment", cors(), async (req, res) => {
  let { amount, id, authorId } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Payment",
      payment_method: id,
      confirm: true,
    });
    console.log("dflsfjsdfdsfds", authorId);
    const existingUser = await User.findById(authorId);

    // Update properties if they are provided in the payload
    existingUser.maxViews += amount / 1000;

    // Save the updated post
    const updatedPost = await existingUser.save();

    console.log("Payment", payment);
    res.json({
      message: "Payment was successful",
      success: true,
    });
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment Failed",
      success: false,
    });
  }
});

// const storeItems = new Map([
//   [1, { priceInCents: 300, name: "Premium" }],
//   [2, { priceInCents: 500, name: "Super Premium" }],
//   [3, { priceInCents: 1000, name: "Super Super Premium" }],
// ]);

// app.post("/create-checkout-session", async (req, res) => {
//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",
//       line_items: req.body.items.map((item) => {
//         const storeItem = storeItems.get(item.id);
//         return {
//           price_data: {
//             currency: "usd",
//             product_data: {
//               name: storeItem.name,
//             },
//             unit_amount: storeItem.priceInCents,
//           },
//           quantity: item.quantity,
//         };
//       }),
//       success_url: `http://localhost:3000/premiumUser`,
//       cancel_url: `http://localhost:3000/subscriptionPlans`,
//     });
//     res.json({ url: session.url });
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// });

// routes
app.use(authRoutes);
app.use(postRoutes);
app.use(authorRoutes);

// var data;
// var getdocument = async () => {
//   const result = await Company.find({});
//   data = result;
// };
// getdocument();

// app.get("*", checkUser);
// app.get("/", requireAuth, (req, res) => res.render("home"));
// //app.get('/smoothies', (req, res) => res.render('smoothies'));
// app.get("/topic/:name", async (req, res) => {
//   const a = req.params.name;
//   var topic = await Topic.find({ topic: a });
//   console.log(topic);
//   var id = topic[0]._id;
//   console.log(id);
//   console.log("alia bhatt");
//   const question = Question.find({ topic: id })
//     .then((result) => {
//       res.render("question", { b: result });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/experiences", (req, res) => {
//   res.locals.data = data;
//   console.log(data);
//   res.render("company");
// });

// app.get("/experiences/:name", async (req, res) => {
//   const a = req.params.name;
//   var company = await Company.find({ name: a });
//   console.log(company);
//   var id = company[0]._id;
//   console.log(id);
//   console.log("alia bhatt");
//   const experience = await Experience.find({ company: id })
//     .then((result) => {
//       console.log(result);
//       res.render("experience", { b: result });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
