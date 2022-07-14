
import React, { useState } from 'react';
import styles from './Cadastro.css';
//const { app } = require ("electron");

//app.commandLine.appendSwitch ("disable-http-cache");

export default function Logo(props:any): JSX.Element { 

    //const [imageValue, setImageValue] = useState();
    //const [image, setImage] = useState(Object);
    //const [imageUrl, setImageUrl] = useState(Object);

    const changeImage = (e: any) => {

        props.setImageValue(e.target.value);
        props.setImage(e.target.files[0]);
        props.setImageUrl(URL.createObjectURL(e.target.files[0]));
    };

    return(
        <div>
          <button className={styles.btn}>Logo
            <input 
              type="file" 
              value={props.imageValue} 
              onChange={changeImage} 
            />
            <img 
              className="img-fluid" 
              style={{width: "10rem", height: "10rem"}}
              src={props.imageUrl} 
              alt=""
            />
          </button>
        </div>
    )
}