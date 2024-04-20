import { FC } from 'react';
import AddAssetsDropZone from './AddAssetsDropZone';


interface AddAssetsFormProps {
    // ADD PROPS
}

const AddAssetsForm: FC<AddAssetsFormProps> = ({setUploadMode, currentTrip, currentDay , setCurrentDay}) => {
  return (
    <>
      <AddAssetsDropZone setUploadMode={setUploadMode} currentTrip={currentTrip} setCurrentDay={setCurrentDay} currentDay={currentDay}/>
    </>
  );
};

export default AddAssetsForm;