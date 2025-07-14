export const fetchPokes = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    if (response.status === 400) {
      throw new Error('Bad Request. Please check the name is correct');
    }
    if (response.status === 404) {
      throw new Error(
        'No Pokemon with that name was found. Please check the name is correct'
      );
    }
    if (response.status === 500) {
      throw new Error('Internal Server Error. Please try again later.');
    }
    if (response.status === 503) {
      throw new Error('Service Unavailable. Please try again later.');
    }
    throw new Error();
  }
  const data = await response.json();
  return data;
};

export type Pokemon = {
  name: string;
  id: number;
  sprites: { front_default: string };
};
