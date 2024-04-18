import React, { FC } from 'react';
import { DateTime } from "luxon";
import * as FeatherIcon from 'react-feather';

interface AddAssetsButtonProps {

}



// Add a prop that is currentDate, pervDate, nextDate etc...
const AddAssetsButton: FC<AddAssetsButtonProps> = () => {

  function onClickHandler() {
    console.log('add assets clicked');
  }

  return (
    <>
      <div className="add-assets" onClick={onClickHandler}>
        <FeatherIcon.Plus size={48}/>
      </div></>
  );
};

export default AddAssetsButton;