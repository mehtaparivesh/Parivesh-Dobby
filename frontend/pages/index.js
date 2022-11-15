import Head from "next/head";
import Image from "next/image";
import ImageCard from "../components/ImageCard";
import styles from "../styles/Home.module.css";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
export default function Home() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getImages = async () => {
      const url = "http://localhost:8000/getImages";
      await axios.get(url).then(
        (response) => {
          setImages(response.date.images);
          if (response.data.success === true) {
            setImages(response.date.images);
          } else {
            alert(response.data.message);
          }
        },
        (err) => console.log(err)
      );
    };
  }, []);

  return (
    <main className="min-h-screen w-screen">
      {images.map((image, index) => {
        return <ImageCard source={image} key={uuidv4()} />;
      })}
    </main>
  );
}
