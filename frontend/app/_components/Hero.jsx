import Image from 'next/image'
import Link from 'next/link'
import Slider from './Slider'
import styles from './Hero.module.css'

const MARQUEE_COPIES = 4

export default function Hero({ data }) {
  const slides = data.slider ?? []

  const renderTitle = () => {
    if (!data.marked || !data.title.includes(data.marked)) {
      return data.title
    }

    const [before, after] = data.title.split(data.marked)

    return (
      <>
        {before}
        <span className={styles.marked}>{data.marked}</span>
        {after}
      </>
    )
  }

  const items = data.advantages ?? []
  const advantages = Array.from({ length: MARQUEE_COPIES }, () => items).flat()

  return (
    <section className={styles.heroBlock}>
      <div className={`${styles.hero} container`}>
        <h1 className={styles.title}>{renderTitle()}</h1>

        {slides.length > 0 && (
          <div className={styles.imageWrapper}>
            <Slider data={data} />
          </div>
        )}

        <p className={styles.description}>{data.description}</p>

        <div className={styles.actions}>
          <Link
            href={data.url_catalog}
            className={`${styles.button} ${styles.primaryButton}`}
          >
            {data.catalog_btn}
            <span className={styles.arrow} aria-hidden="true">→</span>
          </Link>

          <Link
            href={data.url_history}
            className={`${styles.button} ${styles.secondaryButton}`}
          >
            {data.history_btn}
          </Link>
        </div>
      </div>

      {items.length > 0 && (
        <div className={styles.marquee}>
          <div className={styles.marqueeTrack}>
            {advantages.map((item, index) => (
              <div
                className={styles.advantage}
                key={`${item}-${index}`}
                aria-hidden={index >= items.length || undefined}
              >
                <span>{item}</span>

                <Image
                  src="/images/homepage/star.svg"
                  alt=""
                  width={9}
                  height={9}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
