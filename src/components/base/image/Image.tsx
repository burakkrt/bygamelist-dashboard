import React, { useState } from 'react'
import NextImage from 'next/image'
import classNames from 'classnames'
import Skeleton from 'react-loading-skeleton'
import { IImageOptions, IImageProps } from './types'

function Image({
  src,
  alt,
  loading = 'eager',
  height,
  width,
  className,
  priority = false,
  objectFit = 'contain',
}: IImageProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const imageOptions: IImageOptions = {
    src,
    alt,
    onLoad: () => setIsLoading(false),
  }

  if (width && height) {
    imageOptions.width = width
    imageOptions.height = height
  } else {
    imageOptions.fill = true
    imageOptions.sizes = '(max-width: 600px) 90vw, (max-width: 1200px) 50vw, 100vw'
  }

  if (priority) {
    imageOptions.priority = priority
  }

  return (
    <div
      className={classNames(
        'image-node',
        { 'object-cover': objectFit === 'cover' },
        { fill: imageOptions?.fill },
        className
      )}
    >
      {isLoading && loading === 'lazy' && (
        <Skeleton count={1} className="image-loading-skeleton" />
      )}
      <NextImage {...imageOptions} className="next-image" />
    </div>
  )
}

export default Image
