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
// router.route("/updateUser").patch(controller.updatePersonalInfo);
// router.route("/updateProfession").patch(controller.updateProfessionalInfo);
router.route("/updateTestimonial").patch(controller.updateTestimonial);
router.route("/allUsers").get(controller.allUsers);
router.route("/oneUser").get(controller.oneUser);
// router.route("/allTestimonials").get(controller.allTestimonials);
// router.route("/allContacts").get(controller.allContacts);
// router.route("/allEducations").get(controller.allEducations);
// router.route("/allPortfolios").get(controller.allPortfolios);

module.exports = router;
