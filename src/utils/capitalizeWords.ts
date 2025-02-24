export function capitalizeWords(str: string): string {
  return str
    .toLowerCase() // Converte toda a string para minúsculas
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitaliza a primeira letra de cada palavra
}
