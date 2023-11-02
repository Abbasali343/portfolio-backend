const express = require("express");
const router = express.Router();

const controller = require("../controllers/admin.controller");

router.route('/addUser').post(controller.addPersonalInfo);
router.route('/addTestimonial').post(controller.addTestimonial);
router.route('/addContact').post(controller.addContactInfo);
router.route('/addProfession').post(controller.addProfessionalInfo);
router.route('/addEducation').post(controller.addEducationInfo);
router.route('/addPortfolio').post(controller.addPortfolioInfo);
router.route('/updateUser').patch(controller.updatePersonalInfo);
router.route('/updateProfession').patch(controller.updateProfessionalInfo);
router.route('/allUsers').get(controller.allUsers);
router.route('/allTestimonials').get(controller.allTestimonials);
// router.route('/onemedia').get(controller.onemedia);
// router.route('/deletemedia').delete(controller.deletemedia);

module.exports = router;
