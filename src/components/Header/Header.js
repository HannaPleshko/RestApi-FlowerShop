import HeaderItem from "./HeaderItem"
import style from "./Header.module.css"

function Header({setContent}) {
    const nav = ['Providers', 'Flowers', 'Sales', 'Customers']

    return (
        <div className={style["block-nav"]}>
            {nav.map((el, index) => <HeaderItem key={index} setContent={setContent} title={el} />)}
        </div>
    )
}

export default Header