import React, { useEffect, useState } from 'react'
import UserService from '../services/user.service';

const MainPage = () => {
  const [content, setContent] = useState("");

  useEffect(()=>{
    UserService.getPublicContent().then((resp)=>{
      setContent(resp.data)
    },
    (error)=>{
      const _content =
      (error.response && error.response.data) ||
      error.message ||
      error.toString();

    setContent(_content);
    })
  },[]);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
}

export default MainPage