export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  location: string;
  year: number;
  category: "cuisine" | "escalier" | "dressing" | "bibliotheque" | "sdb" | "bureau";
  beforeImage: string;
  afterImage: string;
  challenges: string[];
  solutions: string[];
  materials: string[];
  timeline: string;
  budget: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: 1 | 2 | 3 | 4 | 5;
  image?: string;
  projectSlug: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  icon: string;
  image: string;
  features: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
  phone: string;
  email: string;
  expertise: string[];
}

export interface Value {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  service: string;
}

export interface AnalyticsEvent {
  type: "page_view" | "cta_click" | "form_submit";
  page: string;
  timestamp: string;
  userAgent?: string;
  referrer?: string;
}
