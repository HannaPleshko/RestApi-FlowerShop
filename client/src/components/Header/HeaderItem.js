import Button from '@mui/material/Button';
import style from './Header.module.scss';

function HeaderItem({ title, setContent, content }) {
  const showContent = event => setContent(event.target.textContent);

  return (
    <div>
      <Button className={style[title === content ? 'actice-btn' : 'btn']} onClick={showContent}>
        {title}
      </Button>
    </div>
  );
}

export default HeaderItem;
