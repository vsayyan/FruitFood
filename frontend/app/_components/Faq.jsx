import styles from './Faq.module.css'

export default function Faq({ small, heading, data = [] }) {
    const title = heading?.[0] || {}
    const smallTitle = small?.[0] || {}

    return (
        <section id="faq" className={styles.faq}>
            <div className={styles.left_side}>
                <span>{smallTitle.text || 'FAQ'}</span>
                <h2>{title.heading}</h2>
                <p>{title.text}</p>
            </div>

            <div className={styles.right_side}>
                {data.map((item) => (
                    <details key={item.id}>
                        <summary>
                            <span className={styles.question_text}>{item.question}</span>
                            <span className={styles.icon} aria-hidden="true"></span>
                        </summary>

                        <p>{item.answer}</p>
                    </details>
                ))}
            </div>
        </section>
    )
}