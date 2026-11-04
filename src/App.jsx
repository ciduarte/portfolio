import { useEffect, useMemo, useState } from "react";
import { furnitureProjects, interiorProjects, photographyCollections } from "./data";

const base = import.meta.env.BASE_URL.replace(/\/$/, "");
const navItems = [["Home", "/"], ["Design & Dev", "/design-dev"], ["Furniture", "/furniture"], ["Interiors", "/interiors"], ["Photography", "/35mm"]];

const recentPhotography = [
  ["Vietnam '26", [["ZjzF3mtMv4dMPrddvFxzVBjFQo", "9ENLrM6gzcP56u6GaHv4k5kDCU8", "i4oMSXKWesJc6brr8UVsMb60tk", "0IaI8gQ0uNaB9f75imhGpK7Zy5I", "M29ovJNaCArKNQIOH7dzZXbfE", "pmUOaCKOvW2vvSdTL2TU7J3FfsA"]]],
  ["Hong Kong '26", [["KO8DSWx3lTu73ZXzGcKrCiG1vKE", "6BjpZaGejhtmKooO18xCtzwQ", "412ZzoLSlaZJfM6TraUi3iYDhno"], ["OJRPJVj6335gkzBrzW49zBogYQ", "D5fatv8qWbiL9sJDnD41Tj24CdQ"]]],
  ["Marin '25", [["IWhIMnCN4KdSbO49w6HTvH2FEk", "ST45nVM6LMTtnSVlAHdsUdsvE", "bNQyRayos4MzfCWB6clT441SnCE"], ["cEparp13OZmIez3Gihg2NFovt2I", "wJmGClCllUpmCM2Boz1nZLalk0", "nPXnQYqhZ9fFBgFnPZ7Se8RUirA", "5DVyp2dixrRV4UGxLN1VKiosQ", "eymuAPKPZYtYNCzLG6ArAAtmUtU", "s32aBtEAjk1aFnrcXh2NLc4Zgkw"]]],
];

const portraitImages = new Set(["0IaI8gQ0uNaB9f75imhGpK7Zy5I", "412ZzoLSlaZJfM6TraUi3iYDhno", "6BjpZaGejhtmKooO18xCtzwQ", "9ENLrM6gzcP56u6GaHv4k5kDCU8", "IWhIMnCN4KdSbO49w6HTvH2FEk", "KO8DSWx3lTu73ZXzGcKrCiG1vKE", "M29ovJNaCArKNQIOH7dzZXbfE", "ST45nVM6LMTtnSVlAHdsUdsvE", "ZjzF3mtMv4dMPrddvFxzVBjFQo", "bNQyRayos4MzfCWB6clT441SnCE", "i4oMSXKWesJc6brr8UVsMb60tk", "n6sxM178hGu3YTb7H5RdqLp4nCM", "oacUknjowdQdyjyhwI3MRR5PK0", "pmUOaCKOvW2vvSdTL2TU7J3FfsA"]);

function routePath() {
  const path = window.location.pathname;
  if (base && path.startsWith(base)) return path.slice(base.length) || "/";
  return path || "/";
}

function hrefFor(path) { return `${base}/${path.replace(/^\//, "")}`; }
function assetFor(path) { return `${base}${path}`; }
function sectionIdFor(title) { return title.toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }

function Link({ href, children, className = "", ...props }) {
  const onClick = (event) => {
    props.onClick?.(event);
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || href.startsWith("http")) return;
    event.preventDefault();
    history.pushState({}, "", hrefFor(href));
    window.dispatchEvent(new PopStateEvent("popstate"));
    const hash = href.includes("#") ? href.slice(href.indexOf("#") + 1) : "";
    if (hash) requestAnimationFrame(() => requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" })));
    else window.scrollTo({ top: 0, behavior: "instant" });
  };
  return <a href={hrefFor(href)} onClick={onClick} className={className} {...props}>{children}</a>;
}

function Header({ pathname }) {
  const [open, setOpen] = useState(false);
  useEffect(() => { document.body.classList.toggle("menu-open", open); return () => document.body.classList.remove("menu-open"); }, [open]);
  const active = (href) => href === "/" ? pathname === "/" : pathname.startsWith(href);
  return <>
    <header className="site-header"><Link href="/" className="wordmark" aria-label="Carla Inacio Duarte, home">Carla Inacio Duarte</Link><button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close navigation" : "Open navigation"}><span aria-hidden="true">{open ? "×" : "☰"}</span></button></header>
    <nav className="side-nav" aria-label="Primary navigation"><div className="desktop-wordmark-bar"><Link href="/" className="wordmark" aria-label="Carla Inacio Duarte, home">Carla Inacio Duarte</Link></div><div className="nav-links">{navItems.map(([label, href]) => <Link key={href} href={href} className={active(href) ? "active" : ""}>{label}</Link>)}</div></nav>
    <div id="mobile-menu" className={`mobile-menu ${open ? "open" : ""}`} aria-hidden={!open}><nav aria-label="Mobile navigation">{navItems.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}<Link href="/about" onClick={() => setOpen(false)}>About</Link></nav></div>
  </>;
}

function Footer() {
  return <footer><a className="footer-instagram" href="https://www.instagram.com/carlzduarte" target="_blank" rel="noreferrer">Instagram</a><span>·</span><Link href="/about" className="footer-name">Carla Inacio Duarte</Link><span>·</span><a className="footer-linkedin" href="https://www.linkedin.com/in/carla1duarte" target="_blank" rel="noreferrer">LinkedIn</a></footer>;
}

function HomeProjectSection({ title, projects, projectHref, headingAs = "h2" }) {
  const Heading = headingAs;
  return <section className="home-index home-projects reveal"><Heading className="index-label">{title}</Heading><div className="furniture-list">{projects.map((project) => <Link href={projectHref(project)} className="furniture-row" key={project.slug}><img src={assetFor(project.cover)} alt="" /><span>{project.title}</span></Link>)}</div></section>;
}

function Home() {
  return <>
    <section className="intro reveal"><img src={assetFor("/assets/images/LBz71fj98oepR7MFwTg7q5VikU.avif")} alt="Portrait of Carla Inacio Duarte" /><div className="intro-copy"><p>based in Brooklyn, NY</p><p>uncovering how many pies my fingers can fit into</p><p>stay tuned</p><p>—</p></div></section>
    <section className="home-contact reveal"><p>want to work together? email <a href="mailto:cinacioduarte@gmail.com">cinacioduarte@gmail.com</a></p></section>
    <HomeProjectSection title="Recent Interior Projects" projects={interiorProjects} projectHref={(project) => `/interiors/${project.slug}`} headingAs="h1" />
    <HomeProjectSection title="Recent Furniture Projects" projects={furnitureProjects} projectHref={(project) => `/furniture/furniture-projects/${project.slug}`} />
    <section className="home-index home-photography reveal"><h2 className="index-label">Recent Film Photography</h2><div className="photo-collections">{recentPhotography.map(([title, rows]) => <Link href={`/35mm#${sectionIdFor(title)}`} className="photo-collection" key={title}><span className="collection-title">{title}</span><div className="photo-rows">{rows.map((row, index) => <div className="photo-row" key={index}>{row.map((image) => <img src={assetFor(`/assets/images/${image}.avif`)} alt={`${title} film photograph`} key={image} />)}</div>)}</div></Link>)}</div></section>
  </>;
}

function FurniturePage() {
  return <section className="listing-page reveal"><h1 className="page-eyebrow red">Furniture Projects</h1><div className="listing-grid">{furnitureProjects.map((project) => <Link className="listing-card" href={`/furniture/furniture-projects/${project.slug}`} key={project.slug}><img src={assetFor(project.cover)} alt={`${project.title} project`} /><h2>{project.title}</h2></Link>)}</div></section>;
}

function InteriorsPage() {
  return <section className="listing-page reveal"><h1 className="page-eyebrow red">Interior Projects</h1><div className="listing-grid">{interiorProjects.map((project) => <Link className="listing-card" href={`/interiors/${project.slug}`} key={project.slug}>{project.cover ? <img src={assetFor(project.cover)} alt={`${project.title} project`} /> : <div className="listing-card-placeholder" role="img" aria-label={`${project.title}: ${project.imageStatus}`}><span>{project.imageStatus}</span></div>}<h2>{project.title}</h2></Link>)}</div></section>;
}

function ProjectStoryMedia({ media, directory }) {
  if (media.type === "comparison") {
    return <div className="project-story-media story-comparison" role="group" aria-label={media.label}>{media.items.map((item) => <figure key={item.image}><img src={`${directory}/${item.image}`} alt={item.alt} loading="lazy" /><figcaption>{item.caption}</figcaption></figure>)}</div>;
  }

  return <figure className={`project-story-media story-full story-full--${media.variant || "standard"}`}><img src={`${directory}/${media.image}`} alt={media.alt} loading="lazy" /></figure>;
}

function ImageLightbox({ images, selected, setSelected, label }) {
  useEffect(() => {
    if (selected == null) return undefined;
    const keydown = (event) => {
      if (event.key === "Escape") setSelected(null);
      if (event.key === "ArrowRight") setSelected((selected + 1) % images.length);
      if (event.key === "ArrowLeft") setSelected((selected - 1 + images.length) % images.length);
    };
    document.body.classList.add("lightbox-open");
    window.addEventListener("keydown", keydown);
    return () => { document.body.classList.remove("lightbox-open"); window.removeEventListener("keydown", keydown); };
  }, [selected, images.length, setSelected]);

  if (selected == null) return null;
  const current = images[selected];
  return <div className="lightbox" role="dialog" aria-modal="true" aria-label={label} onMouseDown={(event) => event.target === event.currentTarget && setSelected(null)}><button className="lightbox-close" onClick={() => setSelected(null)} aria-label="Close image gallery">×</button><button className="lightbox-prev" onClick={() => setSelected((selected - 1 + images.length) % images.length)} aria-label="Previous image">‹</button><div className="lightbox-stage"><img src={current.src} alt={current.alt} /><div className="lightbox-meta"><p className="lightbox-caption">{current.caption || ""}</p><span className="lightbox-counter" aria-live="polite">{selected + 1} / {images.length}</span></div></div><button className="lightbox-next" onClick={() => setSelected((selected + 1) % images.length)} aria-label="Next image">›</button></div>;
}

function ProjectDetail({ project, collection = "furniture" }) {
  const [selected, setSelected] = useState(null);
  const directory = assetFor(`/assets/projects/${project.assetSlug || project.slug}`);
  const galleryImages = (project.gallery || []).map((image, index) => ({ src: `${directory}/${image}`, alt: `${project.title} process and detail ${index + 1}`, caption: project.galleryCaptions?.[image] || "" }));
  const isInterior = collection === "interiors";
  const backHref = isInterior ? "/interiors" : "/furniture";
  const backLabel = isInterior ? "All Interior Projects" : "All Furniture Projects";
  const hero = project.cover ? `${directory}/${project.cover.split('/').pop()}` : null;
  return <><article className="project-detail reveal"><Link href={backHref} className="back-link">‹ {backLabel}</Link><aside className="project-meta"><div className="project-meta-field"><span>Project</span><h1>{project.title}</h1></div>{project.projectType && <div className="project-meta-field"><span>Project Type</span><p>{project.projectType}</p></div>}<div className="project-meta-field"><span>Role</span><p>{project.role}</p></div>{project.client && <div className="project-meta-field"><span>Client</span><p>{project.client}</p></div>}{project.location && <div className="project-meta-field"><span>Location</span><p>{project.location}</p></div>}{project.year && <div className="project-meta-field"><span>Year</span><p>{project.year}</p></div>}</aside><div className="project-body">{hero ? <img className="project-hero" src={hero} alt={`${project.title} finished project`} /> : <div className="project-hero-placeholder"><span>{project.imageStatus}</span></div>}<div className="project-copy">{project.paragraphs.map((paragraph, index) => { const media = project.storyMedia?.find((item) => item.afterParagraph === index); return <div className="project-story-block" key={index}><p>{paragraph}</p>{media && <ProjectStoryMedia media={media} directory={directory} />}</div>; })}</div>{galleryImages.length > 0 && <div className="project-gallery">{galleryImages.map((image, index) => <button type="button" onClick={() => setSelected(index)} aria-label={`Open image ${index + 1} of ${galleryImages.length}`} key={image.src}><img src={image.src} alt={image.alt} loading="lazy" /></button>)}</div>}</div></article><ImageLightbox images={galleryImages} selected={selected} setSelected={setSelected} label={`${project.title} image gallery`} /></>;
}

function PhotographyPage() {
  const flattened = useMemo(() => photographyCollections.flatMap(([title, images]) => images.map((image) => ({ title, image }))), []);
  const [selected, setSelected] = useState(null);
  const lightboxImages = useMemo(() => flattened.map((item) => ({ src: assetFor(`/assets/photography/${item.image}.webp`), alt: `${item.title} film photograph`, caption: item.title })), [flattened]);
  useEffect(() => {
    if (!window.location.hash) return;
    const id = decodeURIComponent(window.location.hash.slice(1));
    let secondFrame;
    const scrollToCollection = (behavior = "auto") => document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });
    const firstFrame = requestAnimationFrame(() => { secondFrame = requestAnimationFrame(() => scrollToCollection()); });
    const correction = window.setTimeout(() => scrollToCollection("smooth"), 850);
    return () => { cancelAnimationFrame(firstFrame); cancelAnimationFrame(secondFrame); window.clearTimeout(correction); };
  }, []);
  return <><section className="gallery-page reveal"><h1 className="page-eyebrow red">35mm Film Photography</h1>{photographyCollections.map(([title, images]) => <article className="gallery-collection" id={sectionIdFor(title)} key={title}><h2>{title}</h2><div className="gallery-grid">{images.map((image) => { const index = flattened.findIndex((item) => item.image === image); return <button className={portraitImages.has(image) ? "portrait" : "landscape"} onClick={() => setSelected(index)} key={image}><img src={assetFor(`/assets/photography/${image}.webp`)} alt={`${title} film photograph`} loading="lazy" /></button>; })}</div></article>)}</section><ImageLightbox images={lightboxImages} selected={selected} setSelected={setSelected} label="Film photography image gallery" /></>;
}

function AboutPage() {
  return <section className="simple-page about-page reveal"><h1 className="page-eyebrow">About</h1><div className="rule" /><div className="about-content"><img src={assetFor("/assets/images/LBz71fj98oepR7MFwTg7q5VikU.avif")} alt="Portrait of Carla Inacio Duarte" /><div><p>Carla Inacio Duarte</p><p>Raised in New Hampshire</p><p>Based in Brooklyn, NY</p><p className="dash">—</p></div></div></section>;
}

function Placeholder({ title }) { return <section className="listing-page placeholder reveal"><h1 className="page-eyebrow red">{title}</h1><p>Projects incoming…</p></section>; }
function NotFound() { return <section className="not-found reveal"><h1>Page not found.</h1><p>The page no longer exists or has moved.</p><Link href="/">Back to Home</Link></section>; }

function resolvePage(pathname) {
  if (pathname === "/") return { page: <Home />, title: "Carla Inacio Duarte" };
  if (pathname === "/design-dev") return { page: <Placeholder title="Web Design & Dev" />, title: "Web Design & Dev" };
  if (pathname === "/interiors") return { page: <InteriorsPage />, title: "Interior Projects" };
  if (pathname === "/furniture") return { page: <FurniturePage />, title: "Furniture Projects" };
  if (pathname === "/35mm") return { page: <PhotographyPage />, title: "35mm Film Photography" };
  if (pathname === "/about") return { page: <AboutPage />, title: "About" };
  const detail = pathname.match(/^\/furniture\/furniture-projects\/([^/]+)\/?$/);
  if (detail) { const project = furnitureProjects.find((item) => item.slug === detail[1]); if (project) return { page: <ProjectDetail project={project} />, title: project.title }; }
  const interiorDetail = pathname.match(/^\/interiors\/([^/]+)\/?$/);
  if (interiorDetail) { const project = interiorProjects.find((item) => item.slug === interiorDetail[1]); if (project) return { page: <ProjectDetail project={project} collection="interiors" />, title: project.title }; }
  return { page: <NotFound />, title: "Page not found", notFound: true };
}

export default function App() {
  const [pathname, setPathname] = useState(routePath());
  useEffect(() => { const update = () => setPathname(routePath()); window.addEventListener("popstate", update); return () => window.removeEventListener("popstate", update); }, []);
  const route = resolvePage(pathname);
  useEffect(() => {
    document.title = route.title === "Carla Inacio Duarte" ? route.title : `${route.title} — Carla Inacio Duarte`;
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) { robots = document.createElement("meta"); robots.name = "robots"; document.head.append(robots); }
    robots.content = route.notFound ? "noindex" : "index,follow";
  }, [pathname, route.title, route.notFound]);
  return <><Header pathname={pathname} /><main>{route.page}</main><Footer /></>;
}
