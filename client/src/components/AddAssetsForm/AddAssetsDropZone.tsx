import React, { FC } from 'react';
import Dropzone from 'react-dropzone';
import * as FeatherIcon from 'react-feather';


interface AddAssetsDropZoneProps {
}



const AddAssetsDropZone: FC<AddAssetsDropZoneProps> = ({setUploadMode, currentTrip, currentDay}) => {

  async function handleUpload(assets) {
  
  try {
    const formData = new FormData();
    
    assets.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });

    const response = await fetch(`http://localhost:3000/assets/trip/${currentTrip.id}/day/${currentDay.id}`, {
      method: 'POST',
      body: formData,
    });
    const data = response.json();
    console.log(data)
    
    return data;
  
  } catch(err) {
    console.error('error uploading files: ' + err)
  };
    setUploadMode(false);
  };

  return (
    <>
      <div className='dropzone-wrapper' >
      <Dropzone onDrop={handleUpload}>
        {({getRootProps, getInputProps}) => (
          <div {...getRootProps()} className='add-assets-dropzone'>
            <input {...getInputProps()} />
            <div className='dropzone-text'>
              <FeatherIcon.Image size="64" />
              <h2>drop images here</h2>
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