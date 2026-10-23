"use server";

import { getPayload } from "payload";
import config from "@payload-config";

export type ConsultationState = { status: "idle" | "success" | "error"; message: string };

export async function submitConsultation(_previous: ConsultationState, formData: FormData): Promise<ConsultationState> {
  const error = { status: "error" as const, message: "Please check your details and try again." };
  // A hidden field catches basic bot submissions.
  if (formData.get("company")) return { status: "success", message: "Thank you. We’ll be in touch soon." };

  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const service = formData.get("service");
  const message = formData.get("message");
  if ([firstName, lastName, email, phone, service, message].some((value) => typeof value !== "string")) return error;

  const data = {
    firstName: (firstName as string).trim(),
    lastName: (lastName as string).trim(),
    email: (email as string).trim(),
    phone: (phone as string).trim(),
    service: (service as string).trim(),
    message: (message as string).trim(),
  };
  if (!data.firstName || data.firstName.length > 100 || !data.lastName || data.lastName.length > 100 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || data.email.length > 254 ||
      !data.phone || data.phone.length > 40 || !/^[+\d][\d\s()+.\-]{5,39}$/.test(data.phone) ||
      !data.service || data.service.length > 100 || data.message.length > 3000) return error;

  try {
    const payload = await getPayload({ config });
    await payload.create({ collection: "consultation-requests", data: { ...data, status: "new" }, overrideAccess: true });
    return { status: "success", message: "Your request was submitted. Our team will get back to you within 24 hours." };
  } catch {
    return { status: "error", message: "We couldn’t save your request. Please try again." };
  }
}
