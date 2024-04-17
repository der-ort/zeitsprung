import React, { FC } from 'react';
import { DateTime } from "luxon";

interface BlogContainerProps {

}

// Add a prop that is currentDate, pervDate, nextDate etc...
const BlogContainer: FC<BlogContainerProps> = () => {
  return (
    <>
      <div className="blog-container">
        <p className="blog-entry">BLOG CONTAINER</p> 
      </div>   
      </>
  );
};

export default BlogContainer;