import { useEffect, useState } from 'react';

import Image from './components/Image';
import GhostLoaders from './components/GhostLoaders';
import Virtualized from './components/Virtualized';

import { getGridChildClassNameByIndex } from './utils/grid'

import {getData} from './api'

interface ImageData {
  id: string;
  alt_description: string | null;
  color: string;
  urls: {
    full: string;
    raw: string;
    regular: string;
    small: string;
    small_s3: string;
    thumb: string;
  }
}

const App = () => {
  const [images, setImages] = useState<ImageData[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalImages, setTotalImages] = useState<number>(100)

  useEffect(() => {
    console.log('currentPage', currentPage)
    const getImages = async () => {
      setIsLoading(true)
      const data = await getData({ page: currentPage, perPage: 10 })
      setImages((prevImages) =>  [...prevImages, ...data?.images])
      setTotalImages(data?.totalImages || 0)
      setIsLoading(false)
    }
    getImages()
  }, [currentPage])

  console.log('images', images)

  const renderImages = () => {
    if (!images.length) return null
    
    return images.map((img, index) =>
      <Image
        src={img.urls.small}
        key={img.id}
        className={getGridChildClassNameByIndex(index + 1)}
        altDescription={img.alt_description}
        backgroundColor={img.color}
      />
    )
  }

  const renderLoaders = () => {
    if (isLoading) return <GhostLoaders count={10} />
  }

  return (
    <div className="app">
      <Virtualized />
      {/* <div className="image-grid">
        {renderImages()}
        {renderLoaders()}
      </div> */}
    </div>
  );
}

export default App;
