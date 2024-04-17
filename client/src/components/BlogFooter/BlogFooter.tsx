import React, { FC } from 'react';
import { DateTime } from "luxon";

interface BlogFooterProps {

}

// Add a prop that is currentDate, pervDate, nextDate etc...
const BlogFooter: FC<BlogFooterProps> = () => {
  return (
    <>
      <div className="blog-footer">
          <h2>BLOGFOOTER</h2>
      </div></>
  );
};

export default BlogFooter;