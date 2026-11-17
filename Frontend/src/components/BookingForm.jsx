
// components/BookingForm.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaCalendarAlt,
  FaChild,
  FaCheck,
  FaTimes,
  FaCreditCard
} from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../utils/api";

const SLOTS = ["10:00 AM - 1:00 PM", "2:00 PM - 5:00 PM"];

const isValidPhone = (raw) => {
  if (!raw) return false;
  const cleaned = raw.replace(/[\s\-()]/g, "");
  if (!/^\+?\d{7,15}$/.test(cleaned)) return false;
  const digits = cleaned.replace(/^\+/, "");
  if (/^(\d)\1+$/.test(digits)) return false;
  if (/^0?1234567/.test(digits)) return false;
  return true;
};

const isClosedDay = (yyyyMmDd) => {
  if (!yyyyMmDd) return false;
  const d = new Date(yyyyMmDd);
  const day = d.getDay();
  return day === 1 || day === 2;
};

const todayISO = () => new Date().toISOString().split("T")[0];

export default function BookingForm({ packageName, amount, user, onCancel }) {
  const [form, setForm] = useState({
    fullName: user?.username || "",
    phone: user?.phone || "",
    email: user?.email || "",
    eventDate: "",
    timeSlot: SLOTS[0],
    kidsCount: 1,
    notes: "",
    rulesAccepted: false
  });
  const [submitting, setSubmitting] = useState(false);
  const [checking, setChecking] = useState(false);
  const [availability, setAvailability] = useState(null);

  useEffect(() => {
    const check = async () => {
      if (!form.eventDate) {
        setAvailability(null);
        return;
      }
      setChecking(true);
      try {
        const res = await api.checkAvailability(form.eventDate, form.timeSlot);
        setAvailability(res);
      } catch (err) {
        console.error("Availability check failed:", err);
        setAvailability(null);
      } finally {
        setChecking(false);
      }
    };
    check();
  }, [form.eventDate, form.timeSlot]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.fullName.trim())
      return toast.error("Please enter your full name");
    if (!isValidPhone(form.phone))
      return toast.error("Please enter a valid phone number");
    if (!form.eventDate) return toast.error("Please choose an event date");
    if (isClosedDay(form.eventDate))
      return toast.error("We are closed on Mondays and Tuesdays");
    if (!form.timeSlot) return toast.error("Please pick a time slot");
    if (!form.kidsCount || Number(form.kidsCount) < 1)
      return toast.error("Please enter the number of kids attending");
    if (!form.rulesAccepted)
      return toast.error("Please accept the house rules to continue");
    if (availability && availability.available === false) {
      return toast.error(
        availability.reason === "closed"
          ? "We are closed on that day"
          : "That date and slot is already booked. Please choose another."
      );
    }

    setSubmitting(true);
    try {
      const bookingRes = await api.createBooking({
        packageName,
        amount,
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        eventDate: form.eventDate,
        timeSlot: form.timeSlot,
        kidsCount: Number(form.kidsCount),
        notes: form.notes
      });

      const bookingId = bookingRes.data?._id;

      const pay = await api.initializePayment({
        email: form.email || user?.email,
        amount,
        packageName,
        bookingId
      });

      window.location.href = pay.authorization_url;
    } catch (err) {
      console.error("Booking flow error:", err);
      toast.error(err.message || "Something went wrong");
      setSubmitting(false);
    }
  };

  return (
    <motion.form
      className="booking-form"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={{ duration: 0.4 }}
    >
      <div className="booking-form-header">
        <h4>Complete Your Booking</h4>
        <button type="button" className="booking-form-close" onClick={onCancel}>
          <FaTimes />
        </button>
      </div>

      <div className="booking-form-grid">
        <div className="input-group">
          <FaUser className="input-icon" />
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <FaPhoneAlt className="input-icon" />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            inputMode="tel"
          />
        </div>

        <div className="input-group">
          <FaEnvelope className="input-icon" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <FaCalendarAlt className="input-icon" />
          <input
            type="date"
            name="eventDate"
            min={todayISO()}
            value={form.eventDate}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <FaCalendarAlt className="input-icon" />
          <select
            name="timeSlot"
            value={form.timeSlot}
            onChange={handleChange}
            className="booking-select"
          >
            {SLOTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <FaChild className="input-icon" />
          <input
            type="number"
            name="kidsCount"
            placeholder="Number of kids"
            min={1}
            value={form.kidsCount}
            onChange={handleChange}
          />
        </div>

        <div className="input-group booking-form-full">
          <textarea
            name="notes"
            placeholder="Special requests (optional)"
            value={form.notes}
            onChange={handleChange}
            rows={3}
          />
        </div>
      </div>

      {isClosedDay(form.eventDate) && (
        <p className="booking-msg booking-msg-error">
          We're closed on Mondays and Tuesdays — please pick another day.
        </p>
      )}

      {checking && <p className="booking-msg">Checking availability…</p>}

      {!checking &&
        availability &&
        form.eventDate &&
        !isClosedDay(form.eventDate) && (
          <p
            className={`booking-msg ${
              availability.available ? "booking-msg-ok" : "booking-msg-error"
            }`}
          >
            {availability.available ? (
              <>
                <FaCheck /> That slot is available
              </>
            ) : (
              <>That slot is already booked — choose another</>
            )}
          </p>
        )}

      <label className="booking-rules">
        <input
          type="checkbox"
          name="rulesAccepted"
          checked={form.rulesAccepted}
          onChange={handleChange}
        />
        <span>I have read and accept the house rules (no alcohol, etc.)</span>
      </label>

      <button
        type="submit"
        className="package-btn package-btn-primary"
        disabled={
          submitting ||
          checking ||
          (availability && availability.available === false)
        }
      >
        <FaCreditCard />
        {submitting
          ? "Redirecting to Paystack…"
          : `Pay GH₵${amount.toLocaleString()}`}
      </button>
    </motion.form>
  );
}