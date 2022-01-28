export default function formatDateYYYMMDD(d: Date): string {
  return `${d.getFullYear()}-${
    `${d.getMonth() + 1}`.length > 1 ? d.getMonth() + 1 : `0${d.getMonth() + 1}`
  }-${`${d.getDate()}`.length > 1 ? d.getDate() : `0${d.getDate()}`}`;
}
