import { FC } from 'react';
import * as FeatherIcon from 'react-feather';

interface BlogFooterProps {
    // ADD PROPS
}

// REFACTOR: IT IS ACTUALLY THE "ADD DAY BUTTON" NOW

const BlogFooter: FC<BlogFooterProps> = () => {
  return (
    <>
      <div className="blog-footer">
      <FeatherIcon.Plus size={48}/><h2>NEW DAY</h2>
      </div></>
  );
};

export default BlogFooter;