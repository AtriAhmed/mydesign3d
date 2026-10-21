"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import articleDefaults from "@/content/article-sections.json";
import type { ApprovedComment } from "@/lib/cms";
import { submitComment, type CommentActionState } from "../blog/[slug]/actions";

export type ArticleCommentsContent = typeof articleDefaults.comments;

const initialState: CommentActionState = { status: "idle", message: "" };
const savedAuthorKey = "mydesign3d-comment-author";

export default function ArticleComments({ content, postId, comments }: { content: ArticleCommentsContent; postId: number; comments: ApprovedComment[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const [state, formAction, isPending] = useActionState(submitComment.bind(null, postId), initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(savedAuthorKey);
      if (!saved || !formRef.current) return;
      const values = JSON.parse(saved) as { author?: string; email?: string; url?: string };
      for (const key of ["author", "email", "url"] as const) {
        const field = formRef.current.elements.namedItem(key);
        if (field instanceof HTMLInputElement) field.value = values[key] || "";
      }
      const remember = formRef.current.elements.namedItem("remember");
      if (remember instanceof HTMLInputElement) remember.checked = true;
    } catch { /* Browser storage may be unavailable. */ }
  }, []);

  useEffect(() => {
    if (state.status !== "success") return;
    formRef.current?.reset();
  }, [state]);

  function rememberAuthor(event: React.FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    const fields = new FormData(form);
    try {
      if (fields.has("remember")) localStorage.setItem(savedAuthorKey, JSON.stringify({ author: fields.get("author"), email: fields.get("email"), url: fields.get("url") }));
      else localStorage.removeItem(savedAuthorKey);
    } catch { /* Comment posting remains available when storage is blocked. */ }
  }

  return (
    <section aria-labelledby="article-comments-title" className="mx-auto mb-[14vh] max-w-[920px] px-5">
      <div className="rounded-[30px] bg-white px-6 py-6 md:px-10">
        <h2 id="article-comments-title" className="mb-5 text-center text-[clamp(22px,2.5vw,28px)] font-normal leading-[1.3] text-brand">{content.heading}</h2>
        <div className="h-px bg-brand/20" aria-hidden="true" />
        <button
          id="article-comments-toggle"
          type="button"
          aria-expanded={isOpen}
          aria-controls="article-comments-panel"
          onClick={() => setIsOpen((open) => !open)}
          className="flex min-h-[70px] w-full cursor-pointer items-center justify-center text-center text-[15px] font-medium leading-[1.5] text-brand focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2"
        >
          {content.toggleLabel}
        </button>
        <motion.div
          id="article-comments-panel"
          role="region"
          aria-labelledby="article-comments-toggle"
          aria-hidden={!isOpen}
          inert={!isOpen}
          initial={false}
          animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <div className="border-t border-brand/20 pt-9 pb-4 text-brand">
            <div className="mb-9 space-y-5" aria-label="Comments">
              {comments.length === 0 ? <p className="text-center text-[14px] text-brand/70">{content.emptyNote}</p> : comments.map((comment) => (
                <article key={comment.id} className="rounded-2xl bg-cream px-5 py-4">
                  <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-[15px] font-semibold">{comment.author}</h3>
                    <time dateTime={comment.createdAt} className="text-[12px] text-brand/60">{new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" }).format(new Date(comment.createdAt))}</time>
                  </div>
                  <p className="whitespace-pre-wrap break-words text-[14px] leading-[1.7]">{comment.message}</p>
                </article>
              ))}
            </div>
            <h3 className="mb-4 text-[20px] font-medium">{content.replyHeading}</h3>
            <p className="mb-6 text-[14px] leading-[1.6]">{content.requiredNote}</p>
            <form ref={formRef} action={formAction} onSubmit={rememberAuthor} className="grid gap-5" aria-label="Comment form">
              <label className="absolute -left-[10000px]" aria-hidden="true">Company<input name="company" type="text" tabIndex={-1} autoComplete="off" /></label>
              <label className="grid gap-2 text-[14px] font-medium"><span>{content.commentLabel} <span aria-hidden="true">*</span></span><textarea name="comment" rows={6} maxLength={2000} required className="w-full resize-y rounded-lg border border-brand/20 bg-white px-4 py-3 text-[15px] font-normal text-brand outline-none focus-visible:border-brand" /></label>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-[14px] font-medium"><span>{content.nameLabel} <span aria-hidden="true">*</span></span><input name="author" type="text" autoComplete="name" maxLength={100} required className="w-full rounded-lg border border-brand/20 bg-white px-4 py-3 text-[15px] font-normal text-brand outline-none focus-visible:border-brand" /></label>
                <label className="grid gap-2 text-[14px] font-medium"><span>{content.emailLabel} <span aria-hidden="true">*</span></span><input name="email" type="email" autoComplete="email" maxLength={254} required className="w-full rounded-lg border border-brand/20 bg-white px-4 py-3 text-[15px] font-normal text-brand outline-none focus-visible:border-brand" /></label>
              </div>
              <label className="grid gap-2 text-[14px] font-medium">{content.websiteLabel}<input name="url" type="url" autoComplete="url" maxLength={2048} className="w-full rounded-lg border border-brand/20 bg-white px-4 py-3 text-[15px] font-normal text-brand outline-none focus-visible:border-brand" /></label>
              <label className="flex items-start gap-3 text-[14px] leading-[1.6]"><input name="remember" type="checkbox" className="mt-1 accent-brand" /><span>{content.rememberLabel}</span></label>
              <p role="status" aria-live="polite" className={`text-[13px] ${state.status === "error" ? "text-red-700" : "text-brand/70"}`}>{state.status === "success" ? content.successNote : state.message}</p>
              <button type="submit" disabled={isPending} className="w-fit cursor-pointer rounded-full bg-brand px-7 py-3 text-[12px] font-bold tracking-[1px] text-cream uppercase transition-colors hover:bg-mint hover:text-brand disabled:cursor-wait disabled:opacity-60">{isPending ? "Posting…" : content.submitLabel}</button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
