import React, { useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { storage, db } from '../../configs/firebase'
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';


const Create = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const date = new Date();

  const handleSubmit = (e) => {
    e.preventDefault();

    const storageRef = ref(storage, 'images/' + image.name);
    const uploadTask = uploadBytesResumable(storageRef, image);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
          // ...
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log('File available at', downloadURL);
          await addDoc(collection(db, "products"), {
            name,
            category,
            price,
            downloadURL,
            userID: currentUser.uid,
            createdAt: date.toDateString()
          })
          navigate('/')
        });
      }
    );

  }
  return (
    <>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="name">Name</label>
          <br />
          <input
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="name"
            name="Name"
          />
          <br />
          <label htmlFor="category">Category</label>
          <br />
          <input
            className="input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            type="text"
            id="category"
            name="category"
          />
          <br />
          <label htmlFor="price">Price</label>
          <br />
          <input className="input"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            id="price"
            name="Price" />
          <br />
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
          <br />
          <input onChange={(e) => setImage(e.target.files[0])} type="file" />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
        </div>
      </card>
    </>
  );
};

export default Create;
