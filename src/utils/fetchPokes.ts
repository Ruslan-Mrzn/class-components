export const fetchPokes = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
