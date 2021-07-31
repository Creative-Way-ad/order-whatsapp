export function getWord(key) {
  return arabic[key] || "NOT FOUND";
}

const arabic = {
  SiteTitle: "عنوان الموقع",
  SiteDescription: "وصف الموقع",
};
