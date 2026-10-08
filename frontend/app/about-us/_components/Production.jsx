import ImageSlider from '@/components/image-slider/ImageSlider'
import styles from './Production.module.css'

export default function Production({ data, labels }) {
  if (!data) return null

  const renderTitle = () => {
    if (!data.title) return null

    if (data.title.includes('`')) {
      return data.title.split('`').map((part, index) => {
        const classes = index === 0 ? styles.titleBold : styles.titleLight
        const content = index === 0 ? part : part.startsWith(' ') ? part : ` ${part}`

        return (
          <span key={index} className={classes}>
            {content}
          </span>
        )
      })
    }

    const colonIndex = data.title.indexOf(':')
    if (colonIndex !== -1) {
      const first = data.title.slice(0, colonIndex + 1)
      const second = data.title.slice(colonIndex + 1)

      return (
        <>
          <span className={styles.titleBold}>{first}</span>
          <span className={styles.titleLight}>{second}</span>
        </>
      )
    }

    return <span className={styles.titleBold}>{data.title}</span>
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.left}>
          {data.subtitle && <p className={styles.subtitle}>{data.subtitle}</p>}

          {data.title && <h2 className={styles.title}>{renderTitle()}</h2>}

          {data.paragraphs &&
            data.paragraphs.map((p, index) => (
              <p key={index} className={styles.paragraph}>
                {p}
              </p>
            ))}
        </div>

        <div className={styles.right}>
          {data.directions &&
            data.directions.map((dir, index) => (
              <div key={index} className={styles.direction}>
                <span className={styles.number}>{dir.number}</span>
                <p className={styles.dirText}>{dir.text}</p>
              </div>
            ))}

          {data.images?.length > 0 && (
            <div className={styles.imageWrapper}>
              <ImageSlider
                images={data.images.map((src) => ({ src, alt: data.image_alt || data.subtitle }))}
                labels={{
                  previous: labels?.slider_previous_label,
                  next: labels?.slider_next_label,
                  navigation: labels?.slider_navigation_label,
                  slide: labels?.slider_image_label,
                }}
                sizes='(max-width: 900px) 100vw, 533px'
                imageClassName={styles.image}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}