import { FC } from 'react';
import * as FeatherIcon from 'react-feather';

// RETURN THE EMOJI FOR THE CORRESPONDING MOOD
// MOOD IS NUMERICAL IN ORDER TO TRANSLATE IT TO CURVE IN TIMELINE LATER

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