import styles from './Map.module.css'

export default function Map({ mapUrl }) {
  return (
    <div className={styles.map}>
      <iframe
        src={mapUrl}
        loading="lazy"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  )
}