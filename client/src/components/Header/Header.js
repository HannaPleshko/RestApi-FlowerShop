import HeaderItem from './HeaderItem';
import style from './Header.module.scss';

function Header({ setContent }) {
  const nav = ['PROVIDER', 'PRODUCT', 'SALE', 'CUSTOMER'];

  return (
    <div className={style['block-nav']}>
      <div className={style['img']}></div>

      {nav.map((el, index) => (
        <HeaderItem key={index} setContent={setContent} title={el} />
      ))}
    </div>
  );
}

export default Header;
