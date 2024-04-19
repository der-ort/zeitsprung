import React, { FC } from 'react';
import { DateTime } from "luxon";
import * as FeatherIcon from 'react-feather';

interface AddAssetsButtonProps {

}



// Add a prop that is currentDate, pervDate, nextDate etc...
const AddAssetsButton: FC<AddAssetsButtonProps> = ({setUploadMode, uploadMode}) => {
  return (
    <>
      <div className="add-assets" onClick={() => setUploadMode(!uploadMode)}>
        {uploadMode ? <FeatherIcon.X size={48} /> : <FeatherIcon.Plus size={48} />}
      </div></>
  );
};

export default AddAssetsButton;