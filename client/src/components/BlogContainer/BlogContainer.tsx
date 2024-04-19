import React, { FC } from 'react';
import { DateTime } from "luxon";

interface BlogContainerProps {

}

// Add a prop that is currentDate, pervDate, nextDate etc...
const BlogContainer: FC<BlogContainerProps> = ({currentDay}) => {
  return (
    <>
      <div className="blog-container">
        <h2>discoveries</h2>
          <p className="blog-entry">
            {currentDay.blogEntry}   
          </p> 
        <h2>notes</h2>
 
      </div>   
      </>
  );
};

export default BlogContainer;