import { FC, useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { Day, Trip } from '../../models/types';
import BlogEditor from '../BlogEditor/BlogEditor';

interface BlogContainerProps {
  currentDay: Day;
  setCurrentDay: (day: Day) => void; 
  currentTrip: Trip;
  setCurrentTrip: (trip: Trip) => void
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
          ? <BlogEditor className="blog-editor" currentDay={currentDay} 
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