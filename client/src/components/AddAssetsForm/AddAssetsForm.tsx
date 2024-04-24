import { FC } from 'react';
import AddAssetsDropZone from './AddAssetsDropZone';
import { Asset, Day, Trip } from '../../models/types';


interface AddAssetsFormProps {
  currentDay:Day;
  currentTrip: Trip;
  setUploadMode: (mode: boolean) => void;
  setCurrentDay: (day: Day) => void;
  setCurrentAssets: (assets: Asset) => void;
}

const AddAssetsForm: FC<AddAssetsFormProps> = ({setUploadMode, currentTrip, currentDay , setCurrentDay, setCurrentAssets}) => {
  return (
    <>
      <AddAssetsDropZone  setUploadMode={setUploadMode} 
                          currentTrip={currentTrip} 
                          setCurrentDay={setCurrentDay} 
                          setCurrentAssets={setCurrentAssets} 
                          currentDay={currentDay}
      />
    </>
  );
};

export default AddAssetsForm;