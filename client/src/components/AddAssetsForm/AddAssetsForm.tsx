import { FC } from 'react';
import AddAssetsDropZone from './AddAssetsDropZone';
import { Day, Trip } from '../../models/types';


interface AddAssetsFormProps {
  currentDay:Day;
  currentTrip:Trip;
}

const AddAssetsForm: FC<AddAssetsFormProps> = ({setUploadMode, currentTrip, currentDay , setCurrentDay}) => {
  return (
    <>
      <AddAssetsDropZone setUploadMode={setUploadMode} currentTrip={currentTrip} setCurrentDay={setCurrentDay} currentDay={currentDay}/>
    </>
  );
};

export default AddAssetsForm;