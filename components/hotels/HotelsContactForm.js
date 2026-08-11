import { useState } from "react";

import styles from "../../styles/Hotels.module.css";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function HotelsContactForm({ formId, initialEmail = "" }) {
  const [email, setEmail] = useState(initialEmail);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());

    if (values.website) return;
    if (!formId) {
      setStatus("error");
      setMessage("The form is temporarily unavailable. Please email helpdesk@uwib.com.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        body: JSON.stringify({
          id: formId,
          Name: values.name,
          Email: values.email,
          "Property name": values.property,
          Location: values.location,
          "Number of rooms": values.rooms,
          "Renewal month": values.renewal,
          Message: values.message,
          Source: "California boutique hotels page",
        }),
      });

      if (!response.ok) throw new Error("Submission failed");
      form.reset();
      setEmail("");
      setStatus("success");
      setMessage("Thank you. A member of our hospitality team will be in touch soon.");
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong. Please try again or email helpdesk@uwib.com.");
    }
  };

  return (
    <form className={styles.contactForm} onSubmit={handleSubmit}>
      <div className={styles.contactFormHeader}>
        <h3>Request a coverage review</h3>
        <span>Usually answered<br />within one business day</span>
      </div>
      <input
        className={styles.honeypot}
        name="website"
        type="text"
        tabIndex="-1"
        autoComplete="off"
        aria-hidden="true"
      />
      <div className={styles.formGrid}>
        <label>
          <span>Your name</span>
          <input name="name" type="text" placeholder="First and last name" autoComplete="name" required />
        </label>
        <label>
          <span>Work email</span>
          <input
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@hotel.com"
            autoComplete="email"
            required
          />
        </label>
        <label>
          <span>Property name</span>
          <input name="property" type="text" placeholder="Hotel or management group" autoComplete="organization" required />
        </label>
        <label>
          <span>Location</span>
          <input name="location" type="text" placeholder="City, California" autoComplete="address-level2" required />
        </label>
        <label>
          <span>Number of rooms</span>
          <select name="rooms" defaultValue="" required>
            <option value="" disabled>Select range</option>
            <option>1–25</option>
            <option>26–50</option>
            <option>51–100</option>
            <option>101–200</option>
            <option>201+</option>
          </select>
        </label>
        <label>
          <span>Renewal month</span>
          <select name="renewal" defaultValue="" required>
            <option value="" disabled>Select month</option>
            {MONTHS.map((month) => <option key={month}>{month}</option>)}
          </select>
        </label>
      </div>
      <label className={styles.messageField}>
        <span>What would you like to review?</span>
        <textarea
          name="message"
          rows="3"
          placeholder="Current concerns, changes to the property, or questions for us"
          required
        />
      </label>
      <div className={styles.formFooter}>
        <button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send request →"}
        </button>
        <p>By submitting, you agree that UWIB may contact you about this request. No obligation.</p>
      </div>
      <div className={status === "error" ? styles.formError : styles.formSuccess} role="status" aria-live="polite">
        {message}
      </div>
    </form>
  );
}
