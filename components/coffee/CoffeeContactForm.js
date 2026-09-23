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

const BUSINESS_TYPES = ["Green coffee importer", "Roaster", "Wholesaler", "Café or coffee bar", "Other"];

export default function CoffeeContactForm({ formId, initialEmail = "" }) {
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
      setMessage("The form is temporarily unavailable. Please email josh@uwib.com.");
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
          "Business name": values.business,
          Location: values.location,
          "Type of business": values.businessType,
          "Renewal month": values.renewal,
          Message: values.message,
          Source: "Coffee & Contracts page",
        }),
      });

      if (!response.ok) throw new Error("Submission failed");
      form.reset();
      setEmail("");
      setStatus("success");
      setMessage("Thank you. Josh will be in touch soon.");
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong. Please try again or email josh@uwib.com.");
    }
  };

  return (
    <form className={styles.contactForm} onSubmit={handleSubmit}>
      <div className={styles.contactFormHeader}>
        <h3>Get a quick quote</h3>
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
            placeholder="you@yourcoffee.com"
            autoComplete="email"
            required
          />
        </label>
        <label>
          <span>Business name</span>
          <input name="business" type="text" placeholder="Roastery, café or company" autoComplete="organization" required />
        </label>
        <label>
          <span>Location</span>
          <input name="location" type="text" placeholder="City, State" autoComplete="address-level2" required />
        </label>
        <label>
          <span>Type of business</span>
          <select name="businessType" defaultValue="" required>
            <option value="" disabled>Select type</option>
            {BUSINESS_TYPES.map((type) => <option key={type}>{type}</option>)}
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
          placeholder="New locations, equipment, contracts, or questions for Josh"
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
