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
        professionsData: [],
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
    const { name, title, description } = req.body;
    if (!name || !title || !description) {
      return res.status(404).json({ error: "Fill all fields carefully" });
    }

    User.findOne({ name: name }).then((userExist) => {
      if (!userExist) {
        return res.status(403).json({ error: "User does not Exist" });
      }

      const requestedBody = {
        title: title,
        description: description,
      };

      User.findOneAndUpdate(
        { name: name },
        { $push: { professionsData: requestedBody } }
      )
        .then(() => {
          res
            .status(201)
            .json({ message: `Profession Info Added Successfully` });
        })
        .catch((err) =>
          res.status(500).json({ error: `Failed to Add Profession  Info` })
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
exports.updateProfession = async (req, res, next) => {
  try {
    const { name, title, link } = req.body;
    if (!name || !title || !link) {
      return res.status(404).json({ error: "Fill all fields carefully" });
    }

    User.findOne({
      name: name,
      "professionsData.title": title,
    }).then((testimonialExist) => {
      if (!testimonialExist) {
        return res.status(403).json({ error: "Testimonial does not Exist" });
      }

      User.findOneAndUpdate(
        { name: name, "professionsData.title": title },
        { $set: { "professionsData.$.link": link } }
      )
        .then(() => {
          res
            .status(201)
            .json({ message: "Profession Info Updated Successfully" });
        })
        .catch((err) =>
          res.status(500).json({ error: "Failed to Update Profession Info" })
        );
    });
  } catch (error) {
    next(error);
  }
};
exports.updateAllPersonalInfo = async (req, res, next) => {
  try {
    const {
      name,
      profession,
      projects,
      experience,
      clients,
      followers,
      description,
      profilePicture,
      email,
      phoneNo,
    } = req.body;
    if (
      !name ||
      !profession ||
      !projects ||
      !experience ||
      !clients ||
      !followers ||
      !description ||
      !profilePicture ||
      !email ||
      !phoneNo
    ) {
      return res.status(404).json({ error: "Fill all fields carefully" });
    }

    User.findOne({ name: name }).then((useExist) => {
      if (!useExist) {
        return res.status(403).json({ error: "User does not Exist" });
      }

      User.findOneAndUpdate(
        { name: name },
        {
          $set: {
            name,
            profession,
            projects,
            experience,
            clients,
            followers,
            description,
            profilePicture,
            email,
            phoneNo,
          },
        }
      )
        .then(() => {
          res
            .status(201)
            .json({ message: "Personal Info Updated Successfully" });
        })
        .catch((err) =>
          res.status(500).json({ error: "Failed to Update Personal Info" })
        );
    });
  } catch (error) {
    next(error);
  }
};
exports.updateAllProfessionalInfo = async (req, res, next) => {
  try {
    const { name, title, description, link } = req.body;
    if (!name || !title || !description || !link) {
      return res.status(404).json({ error: "Fill all fields carefully" });
    }

    User.findOne({ name: name }).then((useExist) => {
      if (!useExist) {
        return res.status(403).json({ error: "User does not Exist" });
      }

      User.findOne({ name: name, "professionsData.title": title }).then(
        (professionExist) => {
          if (!professionExist) {
            return res.status(403).json({ error: `Profession does not Exist` });
          }
          User.findOneAndUpdate(
            { name: name, "professionsData.title": title },
            {
              $set: {
                "professionsData.$.title": title,
                "professionsData.$.description": description,
                "professionsData.$.link": link,
              },
            }
          )
            .then(() => {
              res
                .status(201)
                .json({ message: `Profession Info Updated Successfully` });
            })
            .catch((err) =>
              res
                .status(500)
                .json({ error: `Failed to Update Profession Info` })
            );
        }
      );
    });
  } catch (error) {
    next(error);
  }
};
exports.updateAllTestimonialInfo = async (req, res, next) => {
  try {
    const { name, testimonialName, profession, description, link } = req.body;
    if (!name || !testimonialName || !profession || !description || !link) {
      return res.status(404).json({ error: "Fill all fields carefully" });
    }

    User.findOne({ name: name }).then((useExist) => {
      if (!useExist) {
        return res.status(403).json({ error: "User does not Exist" });
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
          {
            $set: {
              "testimonials.$.testimonialName": testimonialName,
              "testimonials.$.profession": profession,
              "testimonials.$.description": description,
              "testimonials.$.link": link,
            },
          }
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
    });
  } catch (error) {
    next(error);
  }
};
exports.updateAllEducationInfo = async (req, res, next) => {
  try {
    const { name, title, type, company, description } = req.body;
    if (!name || !title || !description || !type || !company) {
      return res.status(404).json({ error: "Fill all fields carefully" });
    }

    User.findOne({ name: name }).then((useExist) => {
      if (!useExist) {
        return res.status(403).json({ error: "User does not Exist" });
      }

      let childCheck;
      if (type === "education") {
        childCheck = {
          name: name,
          "education.title": title,
        };
      } else {
        childCheck = {
          name: name,
          "experienceData.title": title,
        };
      }

      let filter;
      if (type === "education") {
        filter = { name: name, "education.title": title };
      } else {
        filter = { name: name, "experienceData.title": title };
      }
      let requestedBody;
      if (type === "education") {
        requestedBody = {
          "education.$.title": title,
          "education.$.company": company,
          "education.$.description": description,
        };
      } else {
        requestedBody = {
          "experienceData.$.title": title,
          "experienceData.$.company": company,
          "experienceData.$.description": description,
        };
      }

      User.findOne(childCheck).then((testimonialExist) => {
        if (!testimonialExist) {
          return res.status(403).json({ error: `${type} does not Exist` });
        }
        User.findOneAndUpdate(filter, {
          $set: requestedBody,
        })
          .then(() => {
            res
              .status(201)
              .json({ message: `${type} Info Updated Successfully` });
          })
          .catch((err) =>
            res.status(500).json({ error: `Failed to Update ${type} Info` })
          );
      });
    });
  } catch (error) {
    next(error);
  }
};
exports.updateAllPortfolioInfo = async (req, res, next) => {
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
      }).then((PfExist) => {
        if (!PfExist) {
          return res.status(403).json({ error: "PortFolio does not Exist" });
        }
        User.findOneAndUpdate(
          { name: name, "pfLinks.field": field },
          {
            $set: {
              "pfLinks.$.links": links,
            },
          }
        )
          .then(() => {
            res
              .status(201)
              .json({ message: "PortFolio Info Updated Successfully" });
          })
          .catch((err) =>
            res.status(500).json({ error: "Failed to Update PortFolio Info" })
          );
      });
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
