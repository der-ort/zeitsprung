import React, { FC } from 'react';
import * as FeatherIcon from 'react-feather';


interface MoodFaceProps {
  mood: number;
}

const moodIcons = {
    0: <FeatherIcon.Smile size={32}/>,
    1: <FeatherIcon.Meh size={32} />,
    2: <FeatherIcon.Frown size={32}/>
}

// Add a prop that is currentDate / waypoint
const MoodFace: FC<MoodFaceProps> = ({mood}) => {
  return (
    <>
        {moodIcons[mood]}
    </>
  );
};

export default MoodFace;