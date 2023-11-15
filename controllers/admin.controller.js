const User = require("../model/adminSchema");

exports.addPersonalInfo = async (req, res, next) => {
  try {
    const {
      name,
      profession,
      projects,
      experience,
      clients,
      followers,
      description,
    } = req.body;
    const type = "movie";
    if (
      !name ||
      !profession ||
      !projects ||
      !experience ||
      !clients ||
      !followers ||
      !description
    ) {
      return res.status(404).json({ error: "Fill all fields carefully" });
    }

    User.findOne({ name: name }).then((useExist) => {
      if (useExist) {
        return res.status(403).json({ error: "User Exist" });
      }

      const user = new User({
        name,
        profession,
        projects,
        experience,
        clients,
        followers,
        description,
        pfLinks: [],
        testimonials: [],
        education: [],
        experienceData: [],
      });

      user
        .save()
        .then(() => {
          res.status(201).json({ message: "User Added Successfully" });
        })
        .catch((err) => res.status(500).json({ error: "Failed to add User" }));
    });
  } catch (error) {
    next(error);
  }
};

exports.addTestimonial = async (req, res, next) => {
  try {
    const { name, testimonialName, profession, description } = req.body;
    const type = "movie";
    if (!name || !testimonialName || !profession || !description) {
      return res.status(404).json({ error: "Fill all fields carefully" });
    }

    User.findOne({ name: name }).then((userExist) => {
      if (!userExist) {
        return res.status(403).json({ error: "User does not Exist" });
      }
      const requestedBody = {
        testimonialName: testimonialName,
        profession: profession,
        description: description,
      };

      User.findOneAndUpdate(
        { name: name },
        { $push: { testimonials: requestedBody } }
      )
        .then(() => {
          res
            .status(201)
            .json({ message: `Testimonial Info Added Successfully` });
        })
        .catch((err) =>
          res.status(500).json({ error: `Failed to Add Testimonial  Info` })
        );
    });
  } catch (error) {
    next(error);
  }
};

exports.addContactInfo = async (req, res, next) => {
  try {
    const { name, email, phoneNo } = req.body;
    if (!name || !email || !phoneNo) {
      return res.status(404).json({ error: "Fill all fields carefully" });
    }

    User.findOne({ name: name }).then((userExist) => {
      if (!userExist) {
        return res.status(403).json({ error: "User does not Exist" });
      }

      User.findOneAndUpdate({ name: name }, { email: email, phoneNo: phoneNo })
        .then(() => {
          res
            .status(201)
            .json({ message: "Contact Info Updated Successfully" });
        })
        .catch((err) =>
          res.status(500).json({ error: "Failed to Update Contact Info" })
        );
    });
  } catch (error) {
    next(error);
  }
};
exports.addProfessionalInfo = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(404).json({ error: "Fill all fields carefully" });
    }

    const profession = new Profession({
      title,
      description,
    });

    Profession.findOne({ title: title }).then((professionExist) => {
      if (professionExist) {
        return res.status(403).json({ error: "Profession Exist" });
      }

      profession
        .save()
        .then(() => {
          res
            .status(201)
            .json({ message: "Profession Info Added Successfully" });
        })
        .catch((err) =>
          res.status(500).json({ error: "Failed to add Profession Info" })
        );
    });
  } catch (error) {
    next(error);
  }
};
exports.addEducationInfo = async (req, res, next) => {
  try {
    const { name, title, type, company, description } = req.body;
    if (!name || !title || !description || !type || !company) {
      return res.status(404).json({ error: "Fill all fields carefully" });
    }

    User.findOne({ name: name }).then((userExist) => {
      if (!userExist) {
        return res.status(403).json({ error: "User does not Exist" });
      }
      const requestedBody = {
        title: title,
        company: company,
        description,
        description,
      };
      let department;
      if (type === "education") {
        department = { $push: { education: requestedBody } };
      } else {
        department = { $push: { experienceData: requestedBody } };
      }

      User.findOneAndUpdate({ name: name }, department)
        .then(() => {
          res
            .status(201)
            .json({ message: `${type} Info Updated Successfully` });
        })
        .catch((err) =>
          res.status(500).json({ error: `Failed to Update ${type}  Info` })
        );
    });
  } catch (error) {
    next(error);
  }
};
exports.addPortfolioInfo = async (req, res, next) => {
  try {
    const { name, field, links } = req.body;
    if (!name || !field || !links) {
      return res.status(404).json({ error: "Fill all fields carefully" });
    }

    User.findOne({ name: name }).then((userExist) => {
      if (!userExist) {
        return res.status(403).json({ error: "User does not Exist" });
      }

      User.findOne({
        name: name,
        "pfLinks.field": field,
      }).then((FieldExist) => {
        if (FieldExist) {
          return res.status(403).json({ error: "Field is already Exist" });
        }

        const requestedBody = {
          field: field,
          links: links,
        };

        User.findOneAndUpdate(
          { name: name },
          { $push: { pfLinks: requestedBody } }
        )
          .then(() => {
            res
              .status(201)
              .json({ message: `PortFolio Info Added Successfully` });
          })
          .catch((err) =>
            res.status(500).json({ error: `Failed to Add Portfolio  Info` })
          );
      });
    });
  } catch (error) {
    next(error);
  }
};
exports.updatePersonalInfo = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    if (!name || !link) {
      return res.status(404).json({ error: "Fill all fields carefully" });
    }

    User.findOne({ name: name }).then((useExist) => {
      if (!useExist) {
        return res.status(403).json({ error: "User does not Exist" });
      }

      User.findOneAndUpdate({ name: name }, { profilePicture: link })
        .then(() => {
          res.status(201).json({ message: "User Info Updated Successfully" });
        })
        .catch((err) =>
          res.status(500).json({ error: "Failed to Update User Info" })
        );
    });
  } catch (error) {
    next(error);
  }
};

// exports.updateProfessionalInfo = async (req, res, next) => {
//   try {
//     const { title, link } = req.body;
//     if (!title || !link) {
//       return res.status(404).json({ error: "Fill all fields carefully" });
//     }

//     Profession.findOne({ title: title }).then((professionExist) => {
//       if (!professionExist) {
//         return res.status(403).json({ error: "Profession does not Exist" });
//       }

//       Profession.findOneAndUpdate({ title: title }, { link: link })
//         .then(() => {
//           res
//             .status(201)
//             .json({ message: "Profession Info Updated Successfully" });
//         })
//         .catch((err) =>
//           res.status(500).json({ error: "Failed to Update Profession Info" })
//         );
//     });
//   } catch (error) {
//     next(error);
//   }
// };
exports.updateTestimonial = async (req, res, next) => {
  try {
    const { name, testimonialName, link } = req.body;
    if (!name || !testimonialName || !link) {
      return res.status(404).json({ error: "Fill all fields carefully" });
    }

    User.findOne({
      name: name,
      "testimonials.testimonialName": testimonialName,
    }).then((testimonialExist) => {
      if (!testimonialExist) {
        return res.status(403).json({ error: "Testimonial does not Exist" });
      }

      User.findOneAndUpdate(
        { name: name, "testimonials.testimonialName": testimonialName },
        { $set: { "testimonials.$.link": link } }
      )
        .then(() => {
          res
            .status(201)
            .json({ message: "Testimonial Info Updated Successfully" });
        })
        .catch((err) =>
          res.status(500).json({ error: "Failed to Update Testimonial Info" })
        );
    });
  } catch (error) {
    next(error);
  }
};

exports.allUsers = async (req, res, next) => {
  try {
    const data = await User.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Data Not Found" });
  }
};
exports.oneUser = async (req, res, next) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(404).json({ error: "Fill All Fields Carefully" });
    }
    const data = await User.findOne({ name: name });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Data Not Found" });
  }
};
// exports.allTestimonials = async (req, res, next) => {
//   try {
//     const data = await Testimonial.find();
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ message: "Data Not Found" });
//   }
// };
// exports.allContacts = async (req, res, next) => {
//   try {
//     const data = await Contact.find();
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ message: "Data Not Found" });
//   }
// };
// exports.allEducations = async (req, res, next) => {
//   try {
//     const data = await Education.find();
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ message: "Data Not Found" });
//   }
// };
// exports.allPortfolios = async (req, res, next) => {
//   try {
//     const data = await Portfolio.find();
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ message: "Data Not Found" });
//   }
// };

// exports.onemedia = async (req, res, next) => {
//   try {
//     const data = await Media.findById(req.body.id);
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ message: "Data Not Found" });
//   }
// };

// exports.deletemedia = async (req, res, next) => {
//   try {
//     const id = req.body.id;

//     const data = await Media.findByIdAndDelete(id);
//     res.send(`Document has been deleted..`);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };
