import client from '../../lib/sanity.js';
const formidable = require('formidable');
import {basename} from 'path';
import {createReadStream} from 'fs';
import {uuid} from '@sanity/uuid';

export const config = {
  api: {
    bodyParser: false
  }
};

export default async (request, response) => {
  const data = await new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();

    form.parse(request, (error, fields, files) => {
      if (error) return reject(error);
      resolve({fields, files});
    });
  });

  const {project, targetfield, isArray, type} = data.fields;

  console.log(type);

  if (isArray) {
    await client.assets
      .upload(type || 'file', createReadStream(data.files.file.path), {
        filename: basename(data.files.file.path)
      })
      .then((asset) => {
        return client
          .patch(project)
          .setIfMissing({[targetfield]: []})
          .append(targetfield, [
            {
              _key: uuid(),
              _type: type || 'file',
              asset: {
                _type: 'reference',
                _ref: asset._id
              }
            }
          ])
          .commit();
      })
      .then((document) => {
        console.log('The file was uploaded!', document);
        response
          .status(200)
          .json({outcome: 'File was uploaded successfully', document});
      })
      .catch((error) => {
        console.error('Upload failed:', error.message);
        response.status(301).json({outcome: 'File failed to upload', error});
      });
  }

  if (!isArray) {
    await client.assets
      .upload(type || 'file', createReadStream(data.files.file.path), {
        filename: basename(data.files.file.path)
      })
      .then((asset) => {
        return client
          .patch(project)
          .set({
            [targetfield]: {
              _type: type || 'file',
              asset: {
                _type: 'reference',
                _ref: asset._id
              }
            }
          })
          .commit();
      })
      .then((document) => {
        console.log('The file was uploaded!', document);
        response
          .status(200)
          .json({outcome: 'File was uploaded successfully', document});
      })
      .catch((error) => {
        console.error('Upload failed:', error.message);
        response.status(301).json({outcome: 'File failed to upload', error});
      });
  }
};
