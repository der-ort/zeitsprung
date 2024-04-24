import { FC } from 'react';
import Dropzone from 'react-dropzone';
import * as FeatherIcon from 'react-feather';
import { Asset, Day, Trip } from '../../models/types';

interface AddAssetsDropZoneProps {
  currentDay: Day;
  currentTrip: Trip;
  setUploadMode: (mode: boolean) => void;
  setCurrentDay: (day: Day) => void;
  setCurrentAssets: (assets: Asset) => void;
}

// TO DO:
// https://www.smashingmagazine.com/2020/02/html-drag-drop-api-react/
// TOGGLE DROPZONE WHEN DRAGGING FILES OVER THE MAP

const AddAssetsDropZone: FC<AddAssetsDropZoneProps> = ({ setUploadMode, currentTrip, currentDay, setCurrentAssets}) => {
  
  async function handleUpload(assets: File[]) {
  
    // Check if assets array is empty or more than one file is dropped
    if (assets.length === 0) {
      console.error('No files selected.');
      return;
    }

    // SET ALLOWED FILETYPES FOR UPLOAD
    // these are currently supported by exifr but cannot necessarily be displayed by the browser!
    // TO DO: 
    //        - file type filter in the fileselector
    //        - file conversion on the server (imagemagick? / ffmpeg (comes in handy for videos later...))
  
    const allowedFileTypes = [
      'image/jpeg',           // for .jpg
      'image/tiff',           // for .tif
      'image/png',            // for .png
      'image/heic',           // for .heic
      'image/avif',           // for .avif
      'image/x-phase-one-iiq' // for .iiq
  ];

    // UPLOAD EACH FILE ONE AFTER THE OTHER
    // TO DO: MOVE FUNCTIONALITY TO api.services.tsx
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
    
          // MOVE THIS TO THE API HELPERS FILE
          // post formData which includes the file
          const response = await fetch(`http://localhost:3000/assets/trip/${currentTrip.id}/day/${currentDay.id}`, {
            method: 'POST',
            body: formData,
          });
    
          const newAsset = await response.json();
          console.log(newAsset)
          return newAsset;
        });
        
        // actually run the earlier defined function and await all promises
        const results = await Promise.all(uploadPromises);
        
        // set the currentAssets to rerender the map component 
        setCurrentAssets(prevAssets => [...prevAssets, ...results])

        // change the upload state to toggle the DropZone
        setUploadMode(false);

    } catch (err) {
      console.error('Error uploading files: ' + err);
      setUploadMode(false);
    }
  }

  return (
    <>
      {/* react-dropzone package */}
      <div className='dropzone-wrapper'>
        {/* TO DO: add more filetypes like in the handleUpload function */}
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
