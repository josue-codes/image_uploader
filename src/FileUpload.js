import React, { useState, useRef } from 'react';



const FileUpload = ({ language }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const fileRef = useRef(null);

  const filesSelectedHandler = event => {
    setSelectedFiles(Array.from(event.target.files));
  };

  const uploadFile = (formData) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/images");

      xhr.onload = () => {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response);
        } else {
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        }
      };

      xhr.onerror =  () => {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      };

      xhr.send(formData);
    });
  };

  const filesUploadHandler = () => {
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append('images', file, file.name);
    });
    formData.append('name', inputValue);

    uploadFile(formData)
        .then(response => console.log(response))
        .catch(error => console.log('Error: ', error))
  };



  return (
    <div>
      <div>
        <input
            type="text"
            placeholder={language.placeholderText}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
        />
      </div>
      <label
          htmlFor="files"
          onClick={() => fileRef.current.click()}
          className="button1"
      >{language.selectPicsButtonText}</label>
      <button onClick={filesUploadHandler}>{language.sendPicsButtonText}</button>
      <input
          type="file"
          name="files"
          ref={fileRef}
          onChange={filesSelectedHandler}
          multiple
          style={{
            opacity: 0,
            position:'absolute',
            top: 0,
            left: 0
          }}
      />
    </div>
  );
};

export default FileUpload;