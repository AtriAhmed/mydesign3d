export function consultationUrl(value?: string | null): string {
  const url = value?.trim();
  if (!url || /^https?:\/\/(?:www\.)?mydesign3d\.com\/book-a-free-consult\/?(?:[?#].*)?$/i.test(url)) {
    return "/book-a-free-consult/";
  }
  return url;
}
