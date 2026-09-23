import Logo from './Logo'
import RightSide from './RightSide'
import Menubar from './Menubar'
import styles from './Header.module.css'
import { getHeaderData } from './action'

export default async function Header() {
  const data = await getHeaderData()

  return (
    <header className={styles.header}>
      <div className='container'>
        <div className={styles.header_container}>
          <div className={styles.row}>
            <Logo data={data.logo} />
            <RightSide data={data}/>
          </div>
          <Menubar/>
        </div>
      </div>
    </header>
  )
}