import { useState } from 'react'

export default function RsvpForm({ styles }) {
  const [submitted, setSubmitted] = useState(false)
  const [attending, setAttending] = useState('')
  const [guests, setGuests] = useState(1)

  function handleSubmit(e) {
    e.preventDefault()
    const form = e.target
    const data = new FormData(form)
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(data).toString(),
    })
      .then(() => setSubmitted(true))
      .catch(() => setSubmitted(true))
  }

  if (submitted) {
    return (
      <div className={styles.rsvpThankYou}>
        <p className={styles.rsvpThankYouTitle}>JazakAllah Khair</p>
        <p className={styles.rsvpThankYouText}>
          We look forward to celebrating with you!
        </p>
      </div>
    )
  }

  return (
    <form
      className={styles.rsvpForm}
      name="rsvp"
      method="POST"
      data-netlify="true"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value="rsvp" />

      <p className={styles.rsvpHeading}>RSVP</p>

      <label className={styles.rsvpLabel}>
        Full Name
        <input
          className={styles.rsvpInput}
          type="text"
          name="name"
          required
          autoComplete="name"
        />
      </label>

      <fieldset className={styles.rsvpFieldset}>
        <legend className={styles.rsvpLegend}>Will you be attending?</legend>
        <div className={styles.rsvpRadioGroup}>
          <label className={`${styles.rsvpRadioLabel} ${attending === 'yes' ? styles.rsvpRadioActive : ''}`}>
            <input
              type="radio"
              name="attending"
              value="yes"
              required
              className={styles.rsvpRadioInput}
              onChange={() => setAttending('yes')}
            />
            Joyfully Accept
          </label>
          <label className={`${styles.rsvpRadioLabel} ${attending === 'no' ? styles.rsvpRadioActive : ''}`}>
            <input
              type="radio"
              name="attending"
              value="no"
              required
              className={styles.rsvpRadioInput}
              onChange={() => setAttending('no')}
            />
            Regretfully Decline
          </label>
        </div>
      </fieldset>

      {attending === 'yes' && (
        <label className={styles.rsvpLabel}>
          Number of Guests
          <input
            className={styles.rsvpInput}
            type="number"
            name="guests"
            min="1"
            max="10"
            value={guests}
            onChange={e => setGuests(e.target.value)}
          />
        </label>
      )}

      <label className={styles.rsvpLabel}>
        Message <span className={styles.rsvpOptional}>(optional)</span>
        <textarea
          className={styles.rsvpTextarea}
          name="message"
          rows="3"
        />
      </label>

      <button type="submit" className={styles.rsvpButton}>
        Send RSVP
      </button>
    </form>
  )
}
