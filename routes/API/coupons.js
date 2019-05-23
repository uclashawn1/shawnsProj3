const express = require("express");
const router = express.Router();
const request = require("request");
const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");

const Coupon = require("../../models/Coupon");
// const Profile = require("../../models/Profile");
// const User = require("../../models/User");

router.get("/", async (req, res) => {
  try {
    const coupons = await {
      uri: `https://api.discountapi.com/v2/deals?=${req.params.api_key}`,
      method: "GET",
      headers: { "user-agent": "node.js" }
    };

    request(coupons, (error, response, body) => {
      if (error) console.error(error);

      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: "No Coupons found" });
      }

      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/coupons
// @desc     Create a coupon in database
// @access   Private
router.post(
  "/",
  // [
  //   auth,
  //   [
  //     check("text", "Text is required")
  //       .not()
  //       .isEmpty()
  //   ]
  // ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.not().isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      coupons = await Coupons.findById(req.coupons.id);

      const newCoupon = new Coupon({
        description: req.body.description,
        title: req.body.title,
        id: req.body.id,
        image: req.body.image,
        name: req.body.name,
        user: req.body.id
      });

      const coupon = await newCoupon.save();

      res.json(coupon);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/coupons
// @desc     Get all coupons from api call
// @access   Private
// router.get("/", auth, async (req, res) => {
//   try {
//     const coupons = await Coupon.find().sort({ date: -1 });
//     res.json(coupons);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

// @route    GET api/coupons/:category
// @desc     Get coupon by ID from database
// @access   Private
router.get("api/coupons/:category", auth, async (req, res) => {
  try {
    const coupon = await Coupons.findById(req.params.category);

    if (!coupon) {
      return res.status(404).json({ msg: "Coupons not found" });
    }

    res.json(coupon);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Coupon not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/coupons/:id
// @desc     Delete a coupon
// @access   Private
router.delete("api/coupons/:categroy", async (req, res) => {
  try {
    const coupon = await Coupons.findById(req.params.category);

    if (!coupon) {
      return res.status(404).json({ msg: "Coupons not found" });
    }

    // Check user
    if (coupon.user.toString() !== req.body.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await coupon.remove();

    res.json({ msg: "coupon removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Coupon not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/coupons/shop/:id
// @desc     Shop a coupon
// @access   Private
router.put("/shop/:id", async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);

    // Check if the post has already been liked
    if (
      coupon.shop.filter(shop => shop.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Coupon already shopped" });
    }

    coupon.shop.unshift({ user: req.user.id });

    await coupon.save();

    res.json(coupon.shop);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/posts/unlike/:id
// @desc     Like a post
// @access   Private
router.put("/unshop/:id", auth, async (req, res) => {
  try {
    const coupon = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (
      coupon.shop.filter(shop => shop.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Coupon has not yet been shopped" });
    }

    // Get remove index
    const removeIndex = coupon.shop
      .map(shop => shop.user.toString())
      .indexOf(req.user.id);

    coupon.shop.splice(removeIndex, 1);

    await coupon.save();

    res.json(coupon.shop);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/coupons/wish/:id
// @desc     Wish a coupon
// @access   Private
router.put("/wish/:id", auth, async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);

    // Check if the coupn has already been wished
    if (
      coupon.wish.filter(wish => wish.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Coupon already wished" });
    }

    coupon.wish.unshift({ user: req.user.id });

    await coupon.save();

    res.json(coupon.wish);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/posts/unlike/:id
// @desc     Like a post
// @access   Private
router.put("/unwish/:id", auth, async (req, res) => {
  try {
    const coupon = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (
      coupon.wish.filter(wish => wish.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Coupon has not yet been wished" });
    }

    // Get remove index
    const removeIndex = coupon.wish
      .map(wish => wish.user.toString())
      .indexOf(req.user.id);

    coupon.wish.splice(removeIndex, 1);

    await coupon.save();

    res.json(coupon.wish);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
