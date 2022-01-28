export function getDownloadPath(): string {
  return process.env.NODE_ENV === 'production' ? '../tmp' : 'files';
}
export function getProcessedPath(): string {
  return process.env.NODE_ENV === 'production' ? '../tmp' : 'processed';
}
