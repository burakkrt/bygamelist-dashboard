import { IconTypes } from '@/components/base/icon/types'

export type INavgationLocations = 'header' | 'panel' | 'footer'
export type INavgationPages = 'mainPages' | 'otherPages'

export interface IIconOptions {
  beforeIcon?: IconTypes
  afterIcon?: IconTypes
  iconLocation: Array<INavgationLocations>
}
export interface IPageOptions {
  label: string
  href: string
  locations: Array<INavgationLocations>
  icons?: Array<IIconOptions>
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
