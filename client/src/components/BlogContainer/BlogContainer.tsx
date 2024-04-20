import React, { FC, useState } from 'react';
import DOMPurify from 'dompurify'; // Ensure DOMPurify is imported
import { Day } from '../../models/types';
import BlogEditor from '../BlogEditor/BlogEditor';

interface BlogContainerProps {
  currentDay: Day;
  setCurrentDay: (day: Day) => void; // Ensure setCurrentDay is included in props
}

const BlogContainer: FC<BlogContainerProps> = ({ currentDay, setCurrentDay }) => {
  const [blogEditMode, setBlogEditMode] = useState(false);
  const cleanBlogEntry = DOMPurify.sanitize(currentDay.blogEntry);

  return (
    <>
      <div className="blog-container">
        {blogEditMode
          ? <BlogEditor currentDay={currentDay} setCurrentDay={setCurrentDay} setBlogEditMode={setBlogEditMode} />
          : <p className="blog-entry" onDoubleClick={() => setBlogEditMode(!blogEditMode)} dangerouslySetInnerHTML={{ __html: cleanBlogEntry }}></p>
        }
      </div>
    </>
  );
};

export default BlogContainer;