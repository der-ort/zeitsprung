import  { FC } from 'react';
import * as FeatherIcon from 'react-feather';

interface NewTripButtonProps {
  setEditTrip: (status:boolean) => void;
}

const NewTripButton: FC<NewTripButtonProps> = ({setEditTrip}) => {
    
  return (
    <>
       <div className='triplist-item' onClick={() => setEditTrip(true)}>
          <h2><FeatherIcon.PlusCircle size={32} />  &nbsp; create new trip</h2>
          <p></p>
          {/* SHOW DURATION */}
       </div>
    </>
  );
};

export default NewTripButton;