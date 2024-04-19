import React, { FC } from 'react';
import Dropzone from 'react-dropzone';
import * as FeatherIcon from 'react-feather';

interface AddAssetsDropZoneProps {
  
}

const AddAssetsDropZone: FC<AddAssetsDropZoneProps> = ({ setUploadMode, currentTrip, currentDay, setCurrentDay }) => {
  async function handleUpload(assets: File[]) {
    // Check if assets array is empty or more than one file is dropped
    if (assets.length === 0 || assets.length > 1) {
      console.error('More than one file selected. Only single file upload working for now');
      return;
    }

    const file = assets[0]; // always take first file, <- CHANGE WHEN ADDING MULTIPLE FILE UPLOAD

    // FILETYPE CHECK
    if (file.type !== 'image/jpeg') {
      console.error('Only JPG files are allowed.'); // for now
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      // post formData which includes the JPG
      const response = await fetch(`http://localhost:3000/assets/trip/${currentTrip.id}/day/${currentDay.id}`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log(data);
      
      // toggle upload mode for conditional rendering
      setUploadMode(false);
      return data;
    
    } catch (err) {
      console.error('Error uploading file: ' + err);
      setUploadMode(false);
    }
    setCurrentDay(currentDay);
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
