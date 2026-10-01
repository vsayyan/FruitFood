'use client'

import { useState } from 'react'
import emailjs from '@emailjs/browser'
import styles from './ContactForm.module.css'

export default function ContactForm({ labels }) {
  const [status, setStatus] = useState('idle')
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
          time: new Date().toLocaleString()
        },
        {
          publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
        }
      )

      setStatus('sent')

      setForm({
        name: '',
        email: '',
        phone: '',
        message: ''
      })

      setTimeout(() => {
        setStatus('idle')
      }, 3000)
    } catch {
      setStatus('error')

      setTimeout(() => {
        setStatus('idle')
      }, 3000)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>
        {labels.form_title}
      </h2>

      <div className={styles.fields}>
        <label className={styles.field}>
          {labels.name_label}
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>

        <label className={styles.field}>
          {labels.email_label}
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label className={styles.field}>
          {labels.phone_label}
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </label>

        <label className={styles.field}>
          {labels.message_label}
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className={styles.submit}
      >
        <span className={styles.buttonContent}>
          <span className={styles.buttonText}>
            {status === 'sending'
              ? labels.sending_label
              : labels.submit_label}
          </span>

          <img
            src="/images/contact/arrow.svg"
            alt=""
            className={styles.arrow}
          />
        </span>
      </button>

      {status === 'sent' && (
        <p className={styles.success}>
          ✓ {labels.success_message}
        </p>
      )}

      {status === 'error' && (
        <p className={styles.errorMsg}>
          ✕ {labels.error_message}
        </p>
      )}
    </form>
  )
}