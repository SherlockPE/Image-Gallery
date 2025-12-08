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

                const url = `https://api.unsplash.com/photos/?client_id=${clientId}`;
                const response = await fetch(url);
                
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                
                const data: UnsplashImage[] = await response.json();
                setImages(data);
                
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error desconocido');
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    // Estados
    if (loading)
        return <p>Cargando...</p>;
    if (error)
        return <p>Error: {error}</p>;

    return (
        <div>
            {images.map((image) => (
                <img 
                    key={image.id} 
                    src={image.urls.small} 
                    alt={image.alt_description || 'Imagen'} 
                />
            ))}
        </div>
    );
}

export default GetImages;