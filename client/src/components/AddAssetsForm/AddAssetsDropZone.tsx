import React, { FC } from 'react';
import Dropzone from 'react-dropzone';
import * as FeatherIcon from 'react-feather';


interface AddAssetsDropZoneProps {
}

const AddAssetsDropZone: FC<AddAssetsDropZoneProps> = () => {
  return (
    <>
      <div className='dropzone-wrapper' >
      <Dropzone>
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