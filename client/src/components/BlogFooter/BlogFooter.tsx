import React, { FC } from 'react';
import { DateTime } from "luxon";
import * as FeatherIcon from 'react-feather';

interface BlogFooterProps {

}

// Add a prop that is currentDate, pervDate, nextDate etc...
const BlogFooter: FC<BlogFooterProps> = () => {
  return (
    <>
      <div className="blog-footer">
      <FeatherIcon.Plus size={48}/><h2>NEW DAY</h2>
      </div></>
  );
};

export default BlogFooter;