const jwt = require("jsonwebtoken");
const Link = require("../model/Links");

module.exports = {
  getAllUserLinks: async (req, res) => {
    const { auth_token } = req.headers;
    const { _id } = jwt.decode(auth_token);

    /* Checking links */

    try {
      const link = await Link.find({ user: _id });
      res.json(link);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  createUserLink: async (req, res) => {
    const { auth_token } = req.headers;
    const idUser = jwt.decode(auth_token)._id;

    /* Create new link */
    const link = new Link({
      url: req.body.url,
      description: req.body.description,
      user: idUser,
    });

    try {
      const savedLink = await link.save();
      res.send({ link: link._id });
    } catch (err) {
      res.status(400).send(err);
    }
  },
  deleteUserLink: async (req, res) => {
    const { id } = req.body;
    const { auth_token } = req.headers;
    const idUser = jwt.decode(auth_token)._id;
    /* search if the link exist for that user */
    /* Create new link */

    try {
      const link = await Link.deleteOne({ _id: id, user: idUser });
      res.send({ link });
    } catch (err) {
      res.status(400).send(err);
    }
  },
  updateUserLink: async (req, res) => {
    const { auth_token } = req.headers;
    const { url, description, id } = req.body;
    const idUser = jwt.decode(auth_token)._id;

    try {
      const updatedLink = await Link.findOneAndUpdate({ _id: id, user: idUser }, { url, description, modified_on: Date.now }, { useFindAndModify: false });
      res.send({ updatedLink });
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
