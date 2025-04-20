export const exportToCSV = (
  filename: string,
  headers: string[],
  rows: (string | number)[][],
) => {
  const csvContent =
    "data:text/csv;charset=utf-8," +
    [headers, ...rows].map((e) => e.join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `${filename}.csv`);
  document.body.appendChild(link); // Required for Firefox
  link.click();
  document.body.removeChild(link);
};
