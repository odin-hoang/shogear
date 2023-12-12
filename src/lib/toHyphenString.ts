export default function toHyphenString(value: string): string {
   return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/\s/g, '-')
      .replace(/\//g, '-');
}