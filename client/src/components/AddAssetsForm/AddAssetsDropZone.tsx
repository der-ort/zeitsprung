import { FC } from 'react';
import Dropzone from 'react-dropzone';
import * as FeatherIcon from 'react-feather';
import { Day, Trip } from '../../models/types';

interface AddAssetsDropZoneProps {
  currentDay: Day;
  currentTrip: Trip;
  setUploadMode: (mode: boolean) => void;
  setCurrentDay: (day: Day) => void;
}

const AddAssetsDropZone: FC<AddAssetsDropZoneProps> = ({ setUploadMode, currentTrip, currentDay, setCurrentDay }) => {
  
  
  async function handleUpload(assets: File[]) {
  
    // Check if assets array is empty or more than one file is dropped
    if (assets.length === 0) {
      console.error('No files selected.');
      return;
    }

    // SET ALLOWED FILETYPES FOR UPLOAD (supported by exifr)
    const allowedFileTypes = [
      'image/jpeg',           // for .jpg
      'image/tiff',           // for .tif
      'image/png',            // for .png
      'image/heic',           // for .heic
      'image/avif',           // for .avif
      'image/x-phase-one-iiq' // for .iiq
  ];

    // UPLOAD EACH FILE ONE AFTER THE OTHER
    // a constant that includes a function that then can be awaited :)
    try {
      const uploadPromises = assets.map(async (file) => {
        // FILETYPE CHECK
        if (!allowedFileTypes.includes(file.type)) {
          console.error('File type not supported.');
        return;
        }

        // UPLOAD IMAGE
          const formData = new FormData();
          formData.append('file', file);
    
          // post formData which includes the JPG
          const response = await fetch(`http://localhost:3000/assets/trip/${currentTrip.id}/day/${currentDay.id}`, {
            method: 'POST',
            body: formData,
          });
    
          const data = await response.json();
          return data;
        });
        
        // actually run the earlier defined function and await all promises
        const results = await Promise.all(uploadPromises);
        console.log(results);

        // for conditional rendering change the upload mode and reset the currentDay for a refresh
        setUploadMode(false);
        setCurrentDay(currentDay);
    } catch (err) {
      console.error('Error uploading files: ' + err);
      setUploadMode(false);
    }
  }

  return (
    <>
      <div className='dropzone-wrapper'>
        <Dropzone onDrop={handleUpload} accept="image/jpeg">
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className='add-assets-dropzone'>
              <input {...getInputProps()} />
              <div className='dropzone-text'>
                <FeatherIcon.Image size="64" />
                <h2>Drop images here</h2>
                <p>(or click to select files)</p>
              </div>
            </div>
          )}
        </Dropzone>
      </div>
    </>
  );
};

export default AddAssetsDropZone;
