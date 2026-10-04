import styles from './PhilosophyFacts.module.css'

/*
  About us · Section 2 «Մեր փիլիսոփայությունը» (Figma about 171:5216,
  main_mobile 181:7256)։ Գլխավոր էջի Philosophy-ից (Saten) տարբեր բաժին ա,
  ունի իր collection-ները՝ about_philosophy և about_philosophy_facts։
*/
export default function PhilosophyFacts({ data, facts = [] }) {
  if (!data) return null

  return (
    <section className={styles.section}>
      <div className='container'>
        <div className={styles.card}>
          <div className={styles.content}>
            <p className={styles.label}>{data.label}</p>
            <h2 className={styles.title}>
              {data.title} <span>{data.title_light}</span>
            </h2>
            <p className={styles.text}>{data.text}</p>
          </div>

          {facts.length > 0 && (
            <ul className={styles.list}>
              {facts.map((fact) => (
                <li className={styles.item} key={fact.id}>
                  <span className={styles.value}>
                    {fact.value}
                    {fact.suffix}
                  </span>
                  <span className={styles.description}>{fact.label}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
