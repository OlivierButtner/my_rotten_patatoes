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
        const user = await User.findByIdAndUpdate(
          id,
          {
            $push: {
              favoris: { title: movie.movie.title, id: movie.movie.id },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );

        if (!user) {
          return res.status(400).json({ success: false });
        }
        console.log(movie.movie.title);
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false, error: "Invalid method" });
  }
};
