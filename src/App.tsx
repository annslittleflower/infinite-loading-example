import { useEffect, useState, MouseEvent } from 'react';

import Image from './components/Image';
import GhostLoaders from './components/GhostLoaders';
import Modal from './components/Modal'
import PreviewModal from './components/PreviewModal';

import { getGridChildClassNameByIndex } from './utils/grid'
import { classNames } from './utils/classnames';

import { ImageData } from './types/ImageData';

import {getData} from './api'

const App = () => {
  const [images, setImages] = useState<ImageData[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [totalImages, setTotalImages] = useState<number>(100);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | undefined>(undefined)

  useEffect(() => {
    setIsLoading(true)
    const getImages = async () => {
      try {
        const data = await getData({ page: currentPage, perPage: 10 })
        setImages((prevImages) =>  [...prevImages, ...data?.images])
        setIsLoading(false)
      } catch (e) {
        // TODO handle error
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

  useEffect(() => {
    document.addEventListener('scroll', onScroll)
    
    return () => {
      document.removeEventListener('scroll', onScroll)
    }
  }, [])

  const selectImage = (e: MouseEvent<HTMLElement>) => {
    if (e.target instanceof HTMLImageElement) {
      const idx = +(e.target.dataset.imageindex as string);
      setSelectedImageIndex(idx)
    }
  }

  const changeImage = (inc: number) => {
    const newIndex = (selectedImageIndex as number) + inc 
    if (newIndex === images.length) {
      setSelectedImageIndex(0)
      return
    }

    if (newIndex < 0) {
      setSelectedImageIndex(images.length - 1)
      return
    }

    setSelectedImageIndex(newIndex)
  }

  const selectedImage = images.find((element, index) => index === selectedImageIndex);

  return (
    <div className="app">
      <div
        className="image-grid" 
        onClick={selectImage}      
      >
        {images.length ? images.map((img, index) =>
          <Image
            src={img.urls.regular}
            key={img.id}
            className={classNames([getGridChildClassNameByIndex(index + 1), 'grid-image'])}
            altDescription={img.alt_description}
            backgroundColor={img.color}
            data-imageindex={index}
          />
        ): null}
        {isLoading ? <GhostLoaders count={10} /> : null}
      </div>
      {selectedImage ? (
        <Modal onClose={() => setSelectedImageIndex(undefined)}>
          <PreviewModal
            selectedImage={selectedImage}
            changeImage={changeImage}
          />
        </Modal>
      ): null}
    </div>
  );
}

export default App;
