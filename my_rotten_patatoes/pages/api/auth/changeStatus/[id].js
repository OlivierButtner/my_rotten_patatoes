// api/users.js

import dbConnect from "../../../../utils/dbConnect";
import User from "../../../../models/User";

dbConnect();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;
  const movie = req.body;
  switch (method) {
    case "PUT":
      try {
        const user = await User.findById(id);

        if (!user) {
          return res.status(400).json({ success: false });
        }
        if (user.role == "Basic") {
          user.role = "Admin";
        } else if (user.role == "Admin") {
          user.role = "Basic";
        }

        user.save();

        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false, error: "Invalid method" });
  }
};
