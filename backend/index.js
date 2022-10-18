import express from "express";
import db from "./config/database.js";
import employeesRoutes from "./routes/index.js";
import cors from "cors";
import multer from "multer";
import router from "./routes/index.js";

const app = express();
try {
    await db.authenticate();
    console.log('Database connected...');
} catch (error) {
    console.error('Connection error:', error);
}
 
app.use(cors());
app.use(express.json());
app.use('/employees', employeesRoutes);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname)
    }
});

const upload = multer({storage}).single('file');

app.post('/upload',(req,res)=>{
    
    upload(req,res,(err)=>{
        if(err){
            return res.status(500).json(err);
        }
        return res.status(200).send(req.file);
    })
});

app.get('/getPdf', function(req, res){
    res.download('./uploads/'+req.query.filename);
  });

app.listen(5000, () => console.log('Server running at port 5000'));