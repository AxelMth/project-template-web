import { Router, Request, Response } from 'express';
import { resolve as pathResolve } from 'path';
import { FileArray } from 'express-fileupload';
import { deleteFile } from '../modules/file';
import { getDownloadPath } from '../modules/path';
import cloudinary from '../modules/cloudinary';
import { replaceAccentsAndSpecialCharacters } from '../modules/utils';
import logger from '../modules/logger';

const router = Router();
interface FileRequest extends Request {
  files: FileArray;
}
router.post('/', (req: FileRequest, res) => {
  if (!req.files) {
    res.status(400).send({});
  }
  const file = req.files.files;
  file.name = replaceAccentsAndSpecialCharacters(file.name);
  const path = `${getDownloadPath()}/${replaceAccentsAndSpecialCharacters(
    file.name,
  )}`;
  file.mv(
    path,
    async (err): Promise<Response<void>> => {
      if (err) {
        logger.error(err);
        return res.status(500).send(err);
      }
      return new Promise((resolve, reject) =>
        cloudinary.v2.uploader.upload(
          path,
          {
            resource_type: 'raw',
          },
          (error, result) => {
            if (error) {
              logger.error(error);
              return reject(res.status(500).send(error));
            }
            deleteFile(pathResolve(path));
            return resolve(
              res.send({
                url: result.url,
                originalFileName: result.original_filename
                  ? result.original_filename
                  : replaceAccentsAndSpecialCharacters(file.name),
              }),
            );
          },
        ),
      );
    },
  );
});
export default router;
