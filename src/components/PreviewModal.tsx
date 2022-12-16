import Image from "./Image"
import { ImageData } from "../types/ImageData"

interface PreviewModalProps {
  selectedImage: ImageData
  changeImage: (idx: number) => void
}

const PreviewModal = ({selectedImage, changeImage}: PreviewModalProps) => {
  return (
    <div className="preview-modal">
      <div className="preview-header">
        <div className="avatar-wrapper">
          <Image src={selectedImage.user.profile_image.small} className="avatar" />
          <span>{selectedImage.user.name}</span>
        </div>
        <div>
          hello
        </div>
      </div>
      <Image src={selectedImage.urls.regular} className="full-image" />
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
