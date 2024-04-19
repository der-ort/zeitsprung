import React, { FC } from 'react';
import * as FeatherIcon from 'react-feather';
import AddAssetsDropZone from './AddAssetsDropZone';


interface AddAssetsFormProps {
}

const AddAssetsForm: FC<AddAssetsFormProps> = ({setUploadMode, currentTrip, currentDay , setCurrentDay}) => {
  return (
    <>
      <AddAssetsDropZone setUploadMode={setUploadMode} currentTrip={currentTrip} setCurrentDay={setCurrentDay} currentDay={currentDay}/>
    </>
  );
};

export default AddAssetsForm;