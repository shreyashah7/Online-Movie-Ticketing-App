/* Add a new movie */
var shortid = require ('shortid');
var path = require("path");

'use strict';

// Import helpers
let resFormat = require("../../helpers/res_format");

function uploadFileRouterFn(req, res, next){
    console.log('Upload File hit');
    let imageFile = req.files.file;
    let serverFileName = req.body.filename + '_' + shortid.generate() + '.jpg';
    imageFile.mv(path.join(__dirname , '..', '..',  'public', req.body.filefolder, serverFileName)), function(err) {
      if (err) {
        return res.status(500).send(err);
        }
      };
      res.status(200).json({file: `/public/${req.body.filefolder}`+`/` + `${serverFileName}` });
    }

   
module.exports = { uploadFileRouterFn };
