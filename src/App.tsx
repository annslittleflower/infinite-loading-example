import { useEffect, useState, useRef } from 'react';

import Image from './components/Image';
import GhostLoaders from './components/GhostLoaders';
import Modal from './components/Modal'
import PreviewModal from './components/PreviewModal';

import { getGridChildClassNameByIndex } from './utils/grid'

import {getData} from './api'

interface ImageData {
  id: string;
  alt_description: string;
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
  // const [totalImages, setTotalImages] = useState<number>(100);
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);


  useEffect(() => {
    console.log('currentPage', currentPage)
    setIsLoading(true)
    const getImages = async () => {
      try {
        const data = await getData({ page: currentPage, perPage: 10 })
        setImages((prevImages) =>  [...prevImages, ...data?.images])
        setIsLoading(false)
      } catch (e) {
        console.log('ad!!@@@', e)
      }
    }
    getImages()
  }, [currentPage])

  const onScroll = () => {
    if ((window.innerHeight + window.scrollY) - document.body.offsetHeight === 0) {
      setCurrentPage((prevPage) => prevPage + 1)
    }
  };

  console.log('images', images)

  useEffect(() => {
    document.addEventListener('scroll', onScroll)
    
    return () => {
      document.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div className="app">
      <div className="image-grid">
        {images.length ? images.map((img, index) =>
          <Image
            src={img.urls.regular}
            key={img.id}
            className={getGridChildClassNameByIndex(index + 1)}
            altDescription={img.alt_description}
            backgroundColor={img.color}
          />
        ): null}
        {isLoading ? <GhostLoaders count={10} /> : null}
      </div>
      {isModalOpened ? (
        <Modal onClose={() => setIsModalOpened(false)}>
          <PreviewModal />
        </Modal>
      ): null}
    </div>
  );
}

export default App;
