import React, { useState } from 'react';
import Content from '../../components/Content/Content';
import Header from '../../components/Header/Header';

function Main() {
  const [content, setContent] = useState('PROVIDER');

  return (
    <>
      <Header content={content} setContent={setContent} />
      <Content content={content} setContent={setContent} />
    </>
  );
}

export default Main;
