export default function (kebabString: string) {
  return kebabString
    .split('-')
    .map((str, i) => (i === 0 ? str : str[0].toUpperCase() + str.slice(1)))
    .join('');
}
