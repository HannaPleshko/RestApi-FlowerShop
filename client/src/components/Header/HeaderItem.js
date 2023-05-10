import Button from '@mui/material/Button';
import { styled } from '@mui/system';

const Btn = styled(Button)`
  color: #1667b8;
  width: 100px;
  
    &:hover {
        position:relative;
        top: 1px;
    }

`;

function HeaderItem({ title, setContent }) {

    const showContent = (event) => {
        setContent(event.target.textContent)
    }

    return (
        <div>
            <Btn onClick={showContent}>{title}</Btn>
        </div>
    )
}

export default HeaderItem