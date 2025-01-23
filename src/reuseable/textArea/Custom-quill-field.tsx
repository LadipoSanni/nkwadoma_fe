import React,{useState} from 'react'
import ReactQuill from 'react-quill-new';
import 'react-quill/dist/quill.snow.css';

interface props{

}

function CustomQuillField() {
    const [value, setValue] = useState('');

    
    const toolbarOptions = [['bold', 'italic', 'underline', 'strike'],        
    ['blockquote', 'code-block'],
    // ['link', 'image', 'video', 'formula'],
    ['link','formula'],
    [{ 'header': 1 }, { 'header': 2 }],               
    // [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
    [ { 'list': 'check' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      
    [{ 'indent': '-1'}, { 'indent': '+1' }],          
    [{ 'direction': 'rtl' }],                        
  
    [{ 'size': ['small', false, 'large', 'huge'] }],  
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],          
    [{ 'font': [] }],
    [{ 'align': [] }],
  
    ['clean']];

    const quillModules = {
        toolbar: toolbarOptions,
   }

    const formats = [
        'header',
        'bold', 'italic', 'underline','strike',
        'list', 'bullet',
        'link', 'image',
        'align',
    ]

 

    return (
        <ReactQuill
            theme='snow'
            value={value}
            onChange={setValue}
            modules={quillModules}
            // formats={formats}
            placeholder="Enter your text here..."
        />
    )
  
}

export default CustomQuillField;