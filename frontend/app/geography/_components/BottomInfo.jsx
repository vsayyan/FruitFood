import styles from './BottomInfo.module.css'

export default function BottomInfo({ text }) {
  return (
    <section className={styles.bottomInfo}>
      <div className='container'>
        <div className={styles.box}>
          <p className={styles.text}>{text}</p>
        </div>
      </div>
    </section>
  )
}
