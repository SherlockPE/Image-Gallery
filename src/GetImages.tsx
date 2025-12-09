import { useState, useEffect } from "react";

interface UnsplashImage {
    id: string;
    urls: {
        small: string;
        regular: string;
    };
    alt_description: string | null;
}

function GetImages() {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const clientId = import.meta.env.VITE_UNSPLASH_CLIENT_ID;

        if (!clientId) {
          throw new Error("No existe una api Key configurada en el .env");
        }

        const url = `https://api.unsplash.com/photos?per_page=30&client_id=${clientId}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data: UnsplashImage[] = await response.json();
        setImages(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading)
    return <p className="text-slate-200">Cargando...</p>;
  if (error)
    return <p>Error: {error}</p>;

  return (
      <section className="columns-3">
        {images.map((image) => (
          <article key={image.id} className="mb-4 rounded-4xl">
            <img
              src={image.urls.small}
              alt={image.alt_description || "Imagen"}
              className=""
              />
          </article>
        ))}
      </section>
  );
}

export default GetImages;
