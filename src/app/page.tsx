import { portfolioConfig } from "@/data/config";
import { DesktopShell } from "@/components/DesktopShell";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Yunus Ege Küçük",
  jobTitle: "Software Engineer",
  url: "https://yegekucuk.github.io",
  sameAs: [
    "https://github.com/yegekucuk",
    "https://www.linkedin.com/in/yegekucuk/",
    "https://x.com/yegekucuk",
  ],
  alumniOf: [
    {
      "@type": "EducationalOrganization",
      name: "Marmara University",
    },
    {
      "@type": "EducationalOrganization",
      name: "Universitatea de Vest din Timisoara",
    },
  ],
  knowsAbout: [
    "Machine Learning",
    "Web Development",
    "Software Development",
    "Python",
    "TypeScript",
    "JavaScript",
    "PostgreSQL",
    "Docker",
    "Next.js",
  ],
};

export default function Page() {
  const {
    personalInfo,
    skills,
    workExperience,
    education,
    projects,
    socials,
    contact,
  } = portfolioConfig;

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Server-rendered SEO content — visually hidden, fully crawlable */}
      <div className="sr-only" aria-hidden="false">
        <h1>{personalInfo.greeting} — {personalInfo.name}</h1>
        <p>{personalInfo.tagline}</p>

        <article>
          <h2>About</h2>
          <p>{personalInfo.about}</p>
        </article>

        <article>
          <h2>Skills</h2>
          <ul>
            {skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </article>

        <article>
          <h2>Work Experience</h2>
          {workExperience.map((exp) => (
            <section key={exp.company}>
              <h3>{exp.company}</h3>
              <p>{exp.role} — {exp.period}</p>
              {exp.description && <p>{exp.description}</p>}
            </section>
          ))}
        </article>

        <article>
          <h2>Education</h2>
          {education.map((edu) => (
            <section key={edu.institution}>
              <h3>{edu.institution}</h3>
              <p>{edu.degree} — {edu.period}</p>
            </section>
          ))}
        </article>

        <article>
          <h2>Projects</h2>
          {projects.map((project) => (
            <section key={project.title}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <p>Technologies: {project.technologies.join(", ")}</p>
              {project.links?.map((link) => (
                <a key={link.url} href={link.url}>
                  {link.label}
                </a>
              ))}
            </section>
          ))}
        </article>

        <article>
          <h2>Contact</h2>
          <p>
            {contact.message}
            <a href={contact.socialLink.url}>{contact.socialLink.text}</a>
            {contact.disclaimer}
          </p>
          <nav>
            <h3>Social Links</h3>
            <ul>
              {socials.map((social) => (
                <li key={social.name}>
                  <a href={social.url}>{social.name}</a>
                </li>
              ))}
            </ul>
          </nav>
        </article>
      </div>

      {/* Interactive Desktop UI — client component overlay */}
      <DesktopShell config={portfolioConfig} />
    </>
  );
}
