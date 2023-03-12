import Button from '@mui/material/Button';

function HeaderItem({ title, setContent }) {

    const showContent = (event) => {
        setContent(event.target.textContent)
    }

    return (
        <div>
            <Button onClick={showContent} variant="outlined">{title}</Button>
        </div>
    )
}

export default HeaderItem