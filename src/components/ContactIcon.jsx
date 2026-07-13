import { Github, Linkedin, Mail, Send } from 'lucide-react';

const icons = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  send: Send,
};

export default function ContactIcon({ name, className = '' }) {
  const Icon = icons[name] ?? Mail;
  return <Icon className={className} aria-hidden="true" />;
}
