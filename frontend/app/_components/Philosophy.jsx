import Image from 'next/image'
import styles from './Philosophy.module.css'

export default function Philosophy({ headings, text }) {
    const heading = headings?.[0] || {}
    const content = text?.[0] || {}

    return (
        <section className={styles.philosophy}>
            <div className={styles.left_side}>
                <Image
                    src="/images/img.png"
                    alt={heading.heading_1 || 'Our Philosophy'}
                    width={579}
                    height={510}
                    className={styles.image}
                    priority
                />
            </div>

            <div className={styles.right_side}>
                <h4>{heading.heading_1}</h4>
                <h2>
                    {heading.heading_2_before}
                    <span>{heading.heading_2_highlight}</span>
                    {heading.heading_2_after}
                </h2>
                <p>{content.text}</p>
                <a href="/#faq">
                    {content.btn}
                </a>
            </div>
        </section>
    )
}