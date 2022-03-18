// api/users.js

import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = "myrottentomatoes";

dbConnect();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const { username, password } = req.body;
        const user = await User.findOne({ username }).lean();

        if (!user) {
          return res
            .status(400)
            .json({ success: false, error: "Invalid username/password" });
        }
        console.log(await bcryptjs.compare(password, user.password));
        if (await bcryptjs.compare(password, user.password)) {
          const token = jwt.sign(
            { id: user._id, username: user.username, role: user.role },
            JWT_SECRET
          );
          return res.status(201).json({
            success: true,
            access_token: token,
            user_id: user._id,
            role: user.role,
          });
        }
        res
          .status(400)
          .json({ success: false, error: "Invalid username/password" });
      } catch (error) {
        res
          .status(400)
          .json({ success: false, error: "Invalid username/password" });
      }
      break;
    default:
      res.status(400).json({ success: false, error: "Invalid method" });
  }
};
