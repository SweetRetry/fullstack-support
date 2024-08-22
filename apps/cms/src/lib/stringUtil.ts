export function highlightSearchText(text: string, searchText: string) {
  return text.replace(
    new RegExp(searchText, "gi"),
    (match) => `<span class="bg-primary text-primary-foreground p-1 rounded">${match}</span>`,
  );
}
