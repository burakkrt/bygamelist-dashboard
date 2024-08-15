import { IconTypes } from '@/components/base/icon/types'

export type INavgationLocations = 'header' | 'footer'
export type INavgationPages = 'mainPages' | 'otherPages'

export interface IIconOptions {
  beforeIcon?: IconTypes
  afterIcon?: IconTypes
  iconLocation: Array<INavgationLocations>
}

export interface IPageOptions {
  label: string
  href: string
  target?: '_blank' | '_self'
  locations: Array<INavgationLocations>
  icons?: Array<IIconOptions>
  subPages?: Array<Omit<IPageOptions, 'locations'>>
}

export type INavigationMap = Record<INavgationPages, Array<IPageOptions>>

export interface INavigationPagesProps {
  location: INavgationLocations
  pageType: INavgationPages
  className?: string
}

export interface IRenderAnchorChildrenProps {
  pageLabel: string
  icons: Array<IIconOptions> | undefined
}
