<template>
  <div>
    <input type="file" id="file" v-on:change="file = $event.target.files[0]" >
    <button @click="imageUploader('jwbhoC91S8rVa9kxzFSr')">Upload File</button>
    hello
  </div>



</template>

<script>
import firebase from '../api/firebase';
import app from '../api/firebase';
import { getFunctions, httpsCallable } from "firebase/functions";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
const db = getFirestore(app);

import 'firebase/storage';
import 'firebase/functions';
import {getStorage, ref, uploadBytesResumable, uploadBytes, getDownloadURL} from 'firebase/storage';
export default {


  data() {
    return {
      file: this.file,
      filePath: "images/",
    };
  },
  methods: {
     uploadFile() {
      const functions = getFunctions(app);
      const uploadFile = httpsCallable(functions, 'uploadFile');
      uploadFile({"image":this.file}).then((result)=>{

      })
    },

    previewImage(event, img){
       this.picture=null;
       this.imageData= event.target.files[0];
    },
    onUpload(){
       this.picture=null;
       const storageRef= firebase.storage().ref('${this.imageData.name}').put(this.imageData);
       storageRef.on('state_changed', ()=>{
         storageRef.snapshot.ref.getDownloadURL().then((url)=>{
           this.picture=url;
         })
       });
    },

    uploadPic(){
       const storage = getStorage();
       const houseRef = ref(storage, 'oop3.PNG');
       const imageHouseRef = ref(storage, 'Houses/oop3.PNG');


       uploadBytes(imageHouseRef, this.file).then((snapshot)=>{
         console.log('file uploaded');
       })
    },
    imageUploader(id){
      const storage = getStorage();
      const metadata = {
        contentType: 'image/jpeg'
      };
      const fileInput = document.getElementById('file');
      const fileName = fileInput.files[0].name;
      console.log(fileName)
      this.filePath += fileName;
      const storageRef = ref(storage, this.filePath);
      const uploadTask = uploadBytesResumable(storageRef, this.file, metadata);

      uploadTask.on('state_changed',
          (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
        console.log('upload is '+ progress + '% done');
        switch (snapshot.state){
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;

        }
      },
          (error)=> {
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
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              const functions = getFunctions(app);
              const postURL = httpsCallable(functions, 'postURL' );
              postURL({ imageURL : downloadURL }).then((result) => {
              });
            });
          }
      )
    },
    retrieveImage(){
      const storage = getStorage();
      const storageRef = ref(storage, this.filePath);

      getDownloadURL(storageRef)
          .then((url)=>{

          })
          .catch((error)=>{
            switch (error.code){
              case 'storage/object-not-found':
                break;
              case ' storage/unauthorized':
                break;
              case ' storage/canceled':
                break;
            }
          })
    }

  }
};
</script>
