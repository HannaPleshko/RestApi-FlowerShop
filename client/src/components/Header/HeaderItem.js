import Button from '@mui/material/Button';
import style from './Header.module.scss';

function HeaderItem({ title, setContent }) {
  const showContent = event => setContent(event.target.textContent);

  return (
    <div>
      <Button className={style['btn']} onClick={showContent}>
        {title}
      </Button>
    </div>
  );
}

export default HeaderItem;
