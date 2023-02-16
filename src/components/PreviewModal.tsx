import { useEffect, useCallback, useState } from "react"
import axios from "axios"
import {default as ImageComponent} from "./Image"
import { ImageData, URLMap } from "../types/ImageData"
import Dropdown, {OptionType} from './Dropdown'

interface PreviewModalProps {
  selectedImage: ImageData
  changeImage: (idx: number) => void
}

const PreviewModal = ({selectedImage, changeImage}: PreviewModalProps) => {

  const [dimensions, setDimensions] = useState<{label: string, value: string}[]>([])

  const getImageSizes = useCallback(() => {
    // TODO improve loading dropdown experience and order 
    const hiddenImagesWrapper = document.createElement('div');
    hiddenImagesWrapper.id = 'hiddenImagesWrapper'
    document.body.appendChild(hiddenImagesWrapper)

    const imageURLs = selectedImage.src
    Object.keys(imageURLs).forEach((key) => {
      const url = imageURLs[key as keyof URLMap]
      const img = document.createElement("img");
      img.id = url
      img.src = url

      document.getElementById('hiddenImagesWrapper')?.appendChild(img)

      img.onload = () => {
        const dimension = {value: url, label: `${key} (${img.naturalWidth} x ${img.naturalHeight})`}
        setDimensions((prev) => [...prev, dimension])
      }
    })
  }, [selectedImage.src])

  useEffect(() => {
    getImageSizes()
    return () => {
      document.getElementById('hiddenImagesWrapper')?.remove()
    }
  }, [getImageSizes])

  const onSelectOption = (o: OptionType) => {
    axios.get(
      o.value,
      { responseType: 'blob' }
    )
      .then((response) => {
        const blobURL = URL.createObjectURL(response.data);
        const link = document.createElement("a");
        link.href = blobURL;
        link.download = o.label;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
    // const link = document.createElement('a');
    // link.href = o.value;
    // link.target = '_blank';
    // link.download = 'd';
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
    // THIS DOES NOT WORK FOR DIFFERENT DOMAINS !!!
  }

  return (
    <div className="preview-modal">
      <div className="preview-header">
        <div className="avatar-wrapper">
          {/* <ImageComponent src={selectedImage.photographer_url} className="avatar" /> */}
          <span>{selectedImage.photographer}</span>
        </div>
        <Dropdown
          options={dimensions}
          title="download free"
          onSelectOption={onSelectOption}
        />
      </div>
      <ImageComponent src={selectedImage.src.large2x} className="full-image" />
      <button
        className="preview-modal-buttons preview-modal-buttons__prev"
        onClick={() => changeImage(-1)}
      >
        &lt;
      </button>
      <button
        className="preview-modal-buttons preview-modal-buttons__next"
        onClick={() => changeImage(1)}
      >
        &gt;
      </button>
    </div>
  )
}

export default PreviewModal
