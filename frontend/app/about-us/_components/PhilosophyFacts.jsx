import styles from './PhilosophyFacts.module.css'

export default function PhilosophyFacts({ data }) {
  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <div className={styles.content}>
          <p className={styles.label}>Մեր փիլիսոփայությունը</p>

          <h2 className={styles.title}>
            Մեր աշխատանքի
            <br />
            հիմքում՝ <span>բնությունն ու</span>
            <br />
            ամենակարևոր արժեքները
          </h2>

          <p className={styles.text}>
            Մենք առաջնորդվում ենք բնական և որակյալ արտադրանքի ստեղծման
            սկզբունքներով՝ պահպանելով մեր արժեքներն ու պատասխանատվությունը։
          </p>
        </div>

        <ul className={styles.list}>
          {data?.map((fact) => (
            <li className={styles.item} key={fact.id}>
              <span className={styles.value}>
                {fact.value}
                {fact.suffix}
              </span>

              <span className={styles.description}>
                {fact.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}