import Image from "./Image"

const PreviewModal = () => {
  return (
    <div className="preview-modal">
      <div className="preview-header">
        <div className="avatar-wrapper">
          <Image src="http://placekitten.com/200/300" className="avatar" />
          <span>Name Lastname</span>
        </div>
        <div>
          hello
        </div>
      </div>
      <Image src="https://placekitten.com/g/1000/1000" className="full-image" />
      <button className="preview-modal-buttons preview-modal-buttons__prev">&lt;</button>
      <button className="preview-modal-buttons preview-modal-buttons__next">&gt;</button>
    </div>
  )
}

export default PreviewModal
