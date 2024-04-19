import React, { FC } from 'react';
import * as FeatherIcon from 'react-feather';
import AddAssetsDropZone from './AddAssetsDropZone';


interface AddAssetsFormProps {
}

const AddAssetsForm: FC<AddAssetsFormProps> = () => {
  return (
    <>
      <AddAssetsDropZone />
    </>
  );
};

export default AddAssetsForm;