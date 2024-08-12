import React from 'react'
import Link from 'next/link'
import { IAnchorProps, IAnchorOptions } from './types'

function Anchor({
  children,
  href,
  target,
  replace = false,
  scroll = true,
  className,
  title,
}: IAnchorProps) {
  const anchorOptions: IAnchorOptions = {
    children,
    href,
    replace,
    scroll,
  }

  if (title) {
    anchorOptions.title = title
  }

  if (className) {
    anchorOptions.className = className
  }

  if (target) {
    anchorOptions.target = target
  }

  return <Link {...anchorOptions} />
}

export default Anchor
