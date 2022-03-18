import dbConnect from "../../../utils/dbConnect";
import Movie from "../../../models/Movie";

dbConnect();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {

    const {
        query: {id}, method
    } = req;

    switch (method) {
        case 'GET':
            try {
                const movie = await Movie.findById(id);

                if (!movie) {
                    return res.status(400).json({success: false});
                }

                res.status(200).json({success: true, data: movie});
            } catch (error) {
                res.status(400).json({success: false});
            }
            break;
        case 'PUT':
            try {
                const movie = await Movie.findByIdAndUpdate(id, req.body, {
                    new: true, runValidators: true
                });

                if (!movie) {
                    return res.status(400).json({success: false});
                }

                res.status(200).json({success: true, data: movie});
            } catch (error) {
                res.status(400).json({success: false});
            }
            break;
        case 'DELETE':
            try {
                const deletedMovie = await Movie.deleteOne({API_id: id});

                if (!deletedMovie) {
                    return res.status(400).json({success: false})
                }

                res.status(200).json({success: true, data: {}});
            } catch (error) {
                res.status(400).json({success: false})
            }
            break;
        default:
            res.status(400).json({success: false})
            break;
    }
}
