import { ImgHTMLAttributes } from "react"

import { classNames } from "../utils/classnames"

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  altDescription?: string
  backgroundColor?: string
}

const Image = ({altDescription, backgroundColor, className, style, ...rest}: ImageProps) => {
  return (
    <img
      {...rest}
      className={classNames(["image", className])}
      alt={altDescription || ''}
      style={{ ...style, backgroundColor }}
    />
  )
}

export default Image