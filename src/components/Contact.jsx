import { useState, useRef } from "react";
import { toast } from "sonner";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaPhone, FaPaperPlane } from "react-icons/fa";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import ArcReactor from "./ArcReactor";
import { profile } from "../data/profile";

const channels = [
  { icon: FaEnvelope, label: "Email", value: profile.email, link: `mailto:${profile.email}` },
  { icon: FaPhone, label: "Phone", value: profile.phoneDisplay, link: `tel:${profile.phone}` },
  { icon: FaLinkedin, label: "LinkedIn", value: "Connect on LinkedIn", link: profile.linkedin, external: true },
  { icon: FaGithub, label: "GitHub", value: "Abhishek10192377", link: profile.github, external: true },
  { icon: FaInstagram, label: "Instagram", value: "silentframes_64", link: profile.instagram, external: true },
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const statusLines = {
  idle: { text: "Channel open. Awaiting input.", tone: "text-stark-muted" },
  sending: { text: "Transmitting message...", tone: "text-stark-amber" },
  sent: { text: "Transmission delivered. I will get back to you soon.", tone: "text-stark-cyan" },
  error: { text: "Transmission failed. Please retry or email me directly.", tone: "text-stark-red" },
};

function Contact() {
  const API = "50a8f549-77b8-4eb1-9be3-d0548df8fea2";
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (status !== "idle") setStatus("idle");
  };

  const validate = () => {
    const { name, email, message } = formData;
    const nextErrors = {};

    if (!name.trim()) nextErrors.name = "Please enter your name";
    if (!email.trim()) nextErrors.email = "Please enter your email";
    else if (!EMAIL_PATTERN.test(email.trim())) nextErrors.email = "Please enter a valid email address";
    if (!message.trim()) nextErrors.message = "Please enter your message";

    return nextErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const nextErrors = validate();
    setErrors(nextErrors);

    if (nextErrors.name) {
      toast.info(nextErrors.name);
      nameRef.current.focus();
      return;
    }
    if (nextErrors.email) {
      toast.info(nextErrors.email);
      emailRef.current.focus();
      return;
    }
    if (nextErrors.message) {
      toast.info(nextErrors.message);
      messageRef.current.focus();
      return;
    }
    setLoading(true);
    setStatus("sending");
    try {
      const data = new FormData(e.target);
      data.append("access_key", API);

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      }).then((res) => res.json());

      if (res.success) {
        toast.success(res.message);
        setStatus("sent");
        setFormData({
          name: "",
          email: "",
          message: ''
        })
      } else {
        setStatus("error");
        toast.error("Submission failed, please try again.");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      toast.error("Try again later...");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { id: "name", label: "Name", type: "text", placeholder: "Your Name", ref: nameRef, autoComplete: "name" },
    { id: "email", label: "Email", type: "email", placeholder: "Your Email", ref: emailRef, autoComplete: "email" },
  ];

  return (
    <section id="contact" className="scroll-mt-16 px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="05"
          label="Communication terminal"
          title="Contact Me"
          description="Have a role, a project or a question? Send a message and it lands straight in my inbox."
        />

        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Direct channels */}
          <Reveal>
            <div className="hud-panel h-full p-6 sm:p-7">
              <div className="flex items-center gap-5">
                <ArcReactor className="h-20 w-20 shrink-0" />
                <div>
                  <p className="hud-label text-stark-cyan">Direct channels</p>
                  <div aria-hidden="true" className="mt-3 flex h-5 items-end gap-1">
                    {[0, 1, 2, 3, 4].map((bar) => (
                      <span
                        key={bar}
                        className="signal-bar h-full w-1 rounded-full bg-stark-gold"
                        style={{ animationDelay: `${bar * 0.16}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <ul className="mt-7 space-y-3">
                {channels.map(({ icon: Icon, label, value, link, external }) => (
                  <li key={label}>
                    <a
                      href={link}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group flex items-center gap-4 rounded-lg border border-stark-silver/10 bg-stark-void/50 px-4 py-3 transition duration-300 hover:border-stark-gold/60"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-stark-red/40 bg-stark-red/10 text-stark-amber transition-shadow duration-300 group-hover:shadow-glow-red">
                        <Icon aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-mono text-[0.65rem] uppercase tracking-[0.2em] text-stark-muted">
                          {label}
                        </span>
                        <span className="block break-all text-sm font-semibold text-white sm:text-base">
                          {value}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Terminal form */}
          <Reveal delay={0.12}>
            <div className="hud-panel overflow-hidden">
              <div className="flex items-center gap-2 border-b border-stark-gold/15 bg-stark-void/60 px-5 py-3">
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-stark-red" />
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-stark-gold" />
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-stark-cyan" />
                <span className="ml-3 font-mono text-xs text-stark-muted">
                  message://{profile.brand.toLowerCase()}
                </span>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-5 p-6 sm:p-7">
                <div className="grid gap-5 sm:grid-cols-2">
                  {fields.map((field) => (
                    <div key={field.id}>
                      <label htmlFor={field.id} className="hud-label mb-2 block">
                        <span className="text-stark-red">&gt;</span> {field.label}
                      </label>
                      <input
                        type={field.type}
                        id={field.id}
                        name={field.id}
                        value={formData[field.id]}
                        onChange={handleChange}
                        className="terminal-input"
                        placeholder={field.placeholder}
                        autoComplete={field.autoComplete}
                        aria-invalid={errors[field.id] ? "true" : "false"}
                        aria-describedby={errors[field.id] ? `${field.id}-error` : undefined}
                        ref={field.ref}
                      />
                      {errors[field.id] && (
                        <p id={`${field.id}-error`} className="mt-1.5 font-mono text-xs text-stark-red">
                          {errors[field.id]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <div>
                  <label htmlFor="message" className="hud-label mb-2 block">
                    <span className="text-stark-red">&gt;</span> Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="terminal-input resize-y"
                    placeholder="Your Message..."
                    aria-invalid={errors.message ? "true" : "false"}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    ref={messageRef}
                  ></textarea>
                  {errors.message && (
                    <p id="message-error" className="mt-1.5 font-mono text-xs text-stark-red">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p role="status" aria-live="polite" className={`font-mono text-xs ${statusLines[status].tone}`}>
                    <span aria-hidden="true">$ </span>
                    {statusLines[status].text}
                  </p>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-stark btn-stark-primary shrink-0 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <FaPaperPlane aria-hidden="true" />
                    {loading ? "Submitting" : 'Send Message'}
                  </button>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default Contact;
