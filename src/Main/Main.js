import { useState } from "react";
import Content from "../components/Content/Content";
import Header from "../components/Header/Header";

function Main() {
    const [content, setContent] = useState('Providers')

    return (
        <>
            <Header setContent={setContent}/>
            <Content content={content}/>
        </>
    );
}

export default Main