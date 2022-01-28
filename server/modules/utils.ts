export function replaceAccentsAndSpecialCharacters(str: string): string {
  const ACCENTS =
    'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
  const NON_ACCENTS =
    'AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz';
  const strAccents: string[] = str.split('');
  const strAccentsOut: string[] = [];
  const strAccentsLen: number = strAccents.length;
  for (let y = 0; y < strAccentsLen; y += 1) {
    if (ACCENTS.indexOf(strAccents[y]) !== -1) {
      strAccentsOut[y] = NON_ACCENTS.substr(ACCENTS.indexOf(strAccents[y]), 1);
    } else {
      strAccentsOut[y] = strAccents[y];
    }
  }
  const newString: string = strAccentsOut.join('');
  return newString.replace(/[`~!@#$%^&*()_|+\-=?;:'",<>{}[\]\\/]/gi, '');
}
