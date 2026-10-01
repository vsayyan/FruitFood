import Image from 'next/image'
import Link from 'next/link'
import styles from './Hero.module.css'

export default function Hero({ data }) {
  const renderTitle = () => {
    if (!data.marked) {
      return data.title
    }

    const parts = data.title.split(data.marked)

    return (
      <>
        {parts[0]}
        <span className={styles.marked}>{data.marked}</span>
        {parts[1]}
      </>
    )
  }

  const advantages = [...data.advantages, ...data.advantages]

  return (
    <section className={styles.heroBlock}>
      <div className={`${styles.hero} container`}>

        <h1 className={styles.title}>
          {renderTitle()}
        </h1>

        <div className={styles.imageWrapper}>
          <Image
            src={data.image}
            alt={data.title}
            width={517}
            height={480}
            className={styles.heroImage}
            priority
          />
        </div>

        <p className={styles.description}>
          {data.description}
        </p>

        <div className={styles.actions}>
          <Link
            href={data.url_catalog}
            className={`${styles.button} ${styles.primaryButton}`}
          >
            {data.catalog_btn}
            <span aria-hidden="true">→</span>
          </Link>

          <Link
            href={data.url_history}
            className={`${styles.button} ${styles.secondaryButton}`}
          >
            {data.history_btn}
          </Link>
        </div>
      </div>

      <div className={styles.marquee} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          {advantages.map((item, index) => (
            <div
              className={styles.advantage}
              key={`${item}-${index}`}
            >
              <span>{item}</span>

              <Image
                src="/images/homepage/star.svg"
                alt=""
                width={9}
                height={9}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}