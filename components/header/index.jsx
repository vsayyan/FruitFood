import Logo from './Logo'
import Navbar from './Navbar'
import Langs from './Langs'
import styles from './Header.module.css'

export default async function Header({ data }) {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.row}>
          <Logo data={data.logo} />
          <div className={styles.right_side}>
            <Navbar data={data.navbar} categories={data.categories} lang={data.lang}/> 
            {/* categories ները պետք է վերցնել layout.jsx-ից որպես props
            "const categories = await getCategories(lang)" */}
            <Langs data={data.langs} lang={data.lang} />                              
          </div>
        </div>
      </div>
    </header>
  )
}
