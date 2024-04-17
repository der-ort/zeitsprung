import React, { FC } from 'react';

interface TitleProps {
  title: string;
  subtitle?: string;
}

const TripTitle: FC<TitleProps> = ({ title, subtitle }) => {
  return (
    <>
      <div className="trip-title">
        <h1>{title}</h1>
        {subtitle && <h2>{subtitle}</h2>}
      </div>    
    </>
  );
};

export default TripTitle;