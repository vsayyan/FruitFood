import styles from './BottomInfo.module.css'

export default function BottomInfo({ text }) {
  return (
    <section className={styles.bottomInfo}>
      <p className={styles.text}>{text}</p>
    </section>
  )
}