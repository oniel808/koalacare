import React from 'react'
import { render } from 'react-dom'
UploadImageDB = new FilesCollection({
	collectionName: 'Images',
	allowClientCode: false, 
})
UploadCVDB = new FilesCollection({
	collectionName: 'CV',
	allowClientCode: false, 
})
export function UploadImage(e,db){
  upload = UploadImageDB.insert({
   file: e,
   streams: 'dynamic',
   chunkSize: 'dynamic',
  }, false)
  upload.on('progress',function(n){
  	console.log(n)
  })
  upload.on('end', function (error, x) {
   if (error) {
     alert('Error during upload: ' + error)
   } else {
     alert('File "' + x.name + '" successfully uploaded')
   }
  })
  upload.start()
  return upload
}
export function UploadCV(e,db){
  upload = UploadCVDB.insert({
   file: e,
   streams: 'dynamic',
   chunkSize: 'dynamic',
  }, false)
  upload.on('progress',function(n){
  	console.log(n)
  })
  upload.on('end', function (error, x) {
   if (error) {
     alert('Error during upload: ' + error)
   } else {
     alert('File "' + x.name + '" successfully uploaded')
   }
  })
  upload.start()
  return upload
}