import Link from 'next/link';
import styles from './CooperationCta.module.css';

export default function CooperationCta({ data }) {
  if (!data) return null;

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{data.title}</h2>
      <p className={styles.description}>{data.description}</p>
      <Link href={data.buttonLink} className={styles.button}>
        {data.buttonText}
      </Link>
    </section>
  );
}