import React, { FC } from 'react';
import * as FeatherIcon from 'react-feather';
import AddAssetsDropZone from './AddAssetsDropZone';


interface AddAssetsFormProps {
}

const AddAssetsForm: FC<AddAssetsFormProps> = ({setUploadMode, currentTrip, currentDay}) => {
  return (
    <>
      <AddAssetsDropZone setUploadMode={setUploadMode} currentTrip={currentTrip} currentDay={currentDay}/>
    </>
  );
};

export default AddAssetsForm;