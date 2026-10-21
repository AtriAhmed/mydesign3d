"use server";

import { getPayload } from "payload";
import config from "@payload-config";

export type CommentActionState = { status: "idle" | "success" | "error"; message: string };

const invalidMessage = "Please check your details and try again.";

export async function submitComment(postId: number, _previous: CommentActionState, formData: FormData): Promise<CommentActionState> {
  if (!Number.isSafeInteger(postId) || postId < 1) return { status: "error", message: invalidMessage };
  // A hidden field catches basic automated submissions without affecting readers.
  if (formData.get("company")) return { status: "success", message: "Your comment was submitted for review." };

  const author = formData.get("author");
  const email = formData.get("email");
  const website = formData.get("url");
  const message = formData.get("comment");
  if (typeof author !== "string" || typeof email !== "string" || typeof website !== "string" || typeof message !== "string") {
    return { status: "error", message: invalidMessage };
  }
  const data = { author: author.trim(), email: email.trim(), website: website.trim(), message: message.trim() };
  if (!data.author || data.author.length > 100 || !data.message || data.message.length > 2000 ||
      data.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || data.website.length > 2048) {
    return { status: "error", message: invalidMessage };
  }
  if (data.website) {
    try {
      const url = new URL(data.website);
      if (url.protocol !== "https:" && url.protocol !== "http:") return { status: "error", message: invalidMessage };
    } catch {
      return { status: "error", message: invalidMessage };
    }
  }

  try {
    const payload = await getPayload({ config });
    const post = await payload.findByID({ collection: "posts", id: postId, depth: 0 });
    if (!post) return { status: "error", message: invalidMessage };
    await payload.create({
      collection: "comments",
      data: { post: postId, status: "pending", ...data },
      overrideAccess: true,
    });
    return { status: "success", message: "Your comment was submitted for review." };
  } catch {
    return { status: "error", message: "We couldn't save your comment. Please try again." };
  }
}
