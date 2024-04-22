import { FC } from 'react';
import * as FeatherIcon from 'react-feather';
import { createDay } from '../../api.service';
import { DateTime } from "luxon";


interface AddNewDayButtonProps {
    // ADD PROPS
}

// REFACTOR: IT IS ACTUALLY THE "ADD DAY BUTTON" NOW

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AddNewDayButton: FC<AddNewDayButtonProps> = ({setCurrentDay, currentTrip, currentTripDays, setCurrentTripDays}) => {

  const handleClick = async () => {
    // get the last day of trip: -> could be a function on its own...

    const lastDay = DateTime.fromMillis(Number(currentTripDays[currentTripDays.length - 1].date));
    
    const newDate = lastDay.plus({days:1}).toMillis();

    try {
      const newDay = await createDay(currentTrip, newDate);
      console.log('created new day ' + newDay)
      setCurrentTripDays(prevDays => [...prevDays, newDay]);
      setCurrentDay(newDay);

    } catch(err) {
      console.error('Could not create new Day: ' + err);
    }
  }

  return (
    <>
      <div className="blog-footer" onClick={handleClick}>
      <FeatherIcon.Plus size={48}/><h2>NEW DAY</h2>
      </div></>
  );
};

export default AddNewDayButton;