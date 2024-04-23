import { FC, useState } from 'react';
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
import * as FeatherIcon from 'react-feather';
import DOMPurify from 'dompurify';
import { updateDay } from '../../api.service';

interface BlogEditorProps {
  blogEntry:string;
}

const BlogEditor: FC<BlogEditorProps> = ({setBlogEditMode, 
                                          setCurrentDay, 
                                          currentDay}) => {

    const [quillText, setQuillText] = useState(currentDay.blogEntry);

    function onSaveHandler() {
        const updatedDay = {...currentDay, blogEntry: DOMPurify.sanitize(quillText)}
        setCurrentDay(updatedDay);
        updateDay(updatedDay); // in the database -> put request
        setBlogEditMode(false);
    }

  return (
    <>
        <div className='blog-editor-icons'>
        <FeatherIcon.Save size={32} onClick={onSaveHandler} />
        <br />
        <FeatherIcon.XCircle size={32} onClick={() => { setBlogEditMode(false) }} />
        </div>
        <ReactQuill className='blog-editor' 
                    theme='snow' 
                    value={quillText} 
                    onChange={setQuillText} 
        />
    </>
  );
};

export default BlogEditor;