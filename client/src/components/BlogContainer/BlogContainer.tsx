import { FC } from 'react';

interface BlogContainerProps {
  // ADD PROPS
}

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