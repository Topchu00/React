export function ListItem(name, image, genre, desc) {
  // https://anilibria.top/storage/releases/posters/8452/bJotddCEwNlavuWUX6yUPCCP173Nxc8e.jpg

  const ImageUrl = `https://anilibria.top${image}`;
  return (
    <div>
      <img src={ImageUrl} alt="Poster" />
      <h2>{name}</h2>
      <h4>Жанры: {genre}</h4>
      <p>{desc}</p>
    </div>
  );
}
