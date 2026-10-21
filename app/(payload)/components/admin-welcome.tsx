import Link from "next/link";

export function AdminWelcome() {
  return (
    <div className="md3d-dashboard-intro">
      <div>
        <p className="md3d-dashboard-eyebrow">MYDESIGN3D / CONTENT STUDIO</p>
        <h1>Make the site yours.</h1>
        <p>Update pages, publish articles, and curate projects from one place.</p>
      </div>
      <div className="md3d-dashboard-actions">
        <Link href="/admin/collections/pages">Edit pages <span aria-hidden="true">↗</span></Link>
        <Link href="/admin/collections/posts">Manage articles <span aria-hidden="true">↗</span></Link>
        <Link href="/admin/collections/projects">View projects <span aria-hidden="true">↗</span></Link>
      </div>
    </div>
  );
}
