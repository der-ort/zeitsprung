import React, { FC, useEffect, useState } from 'react';
import DOMPurify from 'dompurify'; // Ensure DOMPurify is imported
import { Day } from '../../models/types';
import BlogEditor from '../BlogEditor/BlogEditor';

interface BlogContainerProps {
  currentDay: Day;
  setCurrentDay: (day: Day) => void; 
}

const BlogContainer: FC<BlogContainerProps> = ({ currentDay, setCurrentDay, currentTrip, setCurrentTrip }) => {
  const [blogEditMode, setBlogEditMode] = useState(false);
  const [cleanBlogEntry, setCleanBlogEntry] = useState('');
  
  useEffect(() => {
    const sanitizedBlog = DOMPurify.sanitize(currentDay.blogEntry);
    setCleanBlogEntry(sanitizedBlog);
  }, [currentDay]);

  return (
    <>
      <div className="blog-container">
        {blogEditMode
          ? <BlogEditor class className="blog-editor" currentDay={currentDay} 
                        setCurrentDay={setCurrentDay} 
                        setBlogEditMode={setBlogEditMode} 
                        currentTrip={currentTrip} 
                        setCurrentTrip={setCurrentTrip}
            />
          : <p className="blog-entry" 
               onDoubleClick={() => setBlogEditMode(!blogEditMode)} 
               dangerouslySetInnerHTML={{ __html: cleanBlogEntry }}>
          </p>
        }
      </div>
    </>
  );
};

export default BlogContainer;