const express = require("express");
const router = express.Router();

const controller = require("../controllers/admin.controller");

router.route("/addUser").post(controller.addPersonalInfo);
router.route("/addTestimonial").patch(controller.addTestimonial);
router.route("/addContact").patch(controller.addContactInfo);
router.route("/addProfession").post(controller.addProfessionalInfo);
router.route("/addEducation").patch(controller.addEducationInfo);
router.route("/addPortfolio").patch(controller.addPortfolioInfo);
router.route("/updateUser").patch(controller.updatePersonalInfo);
router.route("/updateProfession").patch(controller.updateProfession);
router
  .route("/updateAllProfessionalInfo")
  .patch(controller.updateAllProfessionalInfo);
router.route("/updateAllPersonalInfo").patch(controller.updateAllPersonalInfo);
router
  .route("/updateAllTestimonialInfo")
  .patch(controller.updateAllTestimonialInfo);
router
  .route("/updateAllEducationInfo")
  .patch(controller.updateAllEducationInfo);
router
  .route("/updateAllPortfolioInfo")
  .patch(controller.updateAllPortfolioInfo);
router.route("/updateTestimonial").patch(controller.updateTestimonial);
router.route("/allUsers").get(controller.allUsers);
router.route("/oneUser").get(controller.oneUser);

module.exports = router;
