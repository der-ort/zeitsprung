import { FC } from 'react';
import * as FeatherIcon from 'react-feather';
import { createDay } from '../../api.service';
import { DateTime } from "luxon";


interface AddNewDayButtonProps {
    // ADD PROPS
}

const AddNewDayButton: FC<AddNewDayButtonProps> = ({setCurrentDay, currentTrip, currentTripDays, setCurrentTripDays}) => {

  const handleClick = async () => {
    // get the last day of trip: -> could be a function on its own...
    const lastDay = DateTime.fromMillis(Number(currentTripDays[currentTripDays.length - 1].date));
    const newDate = lastDay.plus({days:1}).toMillis();

    try {
      const newDay = await createDay(currentTrip, newDate);
      console.log('created new day ' , newDay)
      
      // update state to rerender and show new day
      setCurrentTripDays(prevDays => [...prevDays, newDay]);
      
      // set the current day to the recently created one to show and edit it
      setCurrentDay(newDay);

    } catch(err) {
      console.error('Could not create new Day: ' + err);
    }
  }

  return (
    <>
      <div className="blog-footer" onClick={handleClick}>
        <FeatherIcon.Plus size={48}/>
          <h2>
            NEW DAY
          </h2>
      </div>
    </>
  );
};

export default AddNewDayButton;