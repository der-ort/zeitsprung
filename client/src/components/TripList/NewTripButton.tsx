import  { FC } from 'react';
import * as FeatherIcon from 'react-feather';

interface NewTripButtonProps {
}

const NewTripButton: FC<NewTripButtonProps> = () => {
  
    function NewTrip() {
        console.log('NewTrip')
    }
  
  return (
    <>
       <div className='triplist-item' onClick={NewTrip}>
          <h2><FeatherIcon.PlusCircle size={32} />  &nbsp; create new trip</h2>
          <p></p>

          {/* SHOW DURATION */}
          


       </div>
    </>
  );
};

export default NewTripButton;