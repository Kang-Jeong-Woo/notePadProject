import nc from "next-connect"
import multer from "multer"

// path를 잡아주는 변수
//     multer({
//     storage: multer.diskStorage({
//         destination: './public',
//         filename: (req, file, cb) => cb(null, file.originalname),
//     }),
// });

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/uploads");
    },
    filename: function (req, file, cb) {
        const nowDate = dayjs(Date.now()).format("YYMMDDHHMM");
        cb(null, `${nowDate}_${file.originalname}`);
    },
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
            return callback(new Error("PNG, JPG만 업로드하세요"));
        }
        callback(null, true);
    },
    limits: {
        fileSize: 1024 * 1024,
    },
});
const upload = multer({ storage: storage });

const apiRoute = nc({
    onError(error, req, res) {
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.post(upload.array("file"), function (req, res){
    console.log(req);
    res.json(req.file.map((v)=>v.filename));
});

export default apiRoute;

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};