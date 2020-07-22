const express = require('express');
const router = express.Router();
const upload = require('../utils/uploadImage');

router.post('/upload', upload.single('imageData'), async (req, res)=>{
   console.log(req.body);
   let filePath= req.file.path || "";
   let body= req.body || "";
   res.status(200).json({success:true, result: {filePath, body}})
})