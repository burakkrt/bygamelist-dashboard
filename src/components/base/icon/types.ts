export type IconTypes =
  | 'icon-search'
  | 'icon-checkmark'
  | 'icon-clear'
  | 'icon-chevron-up'
  | 'icon-chevron-down'
  | 'icon-chevron-left'
  | 'icon-chevron-right'
  | 'icon-send'
  | 'icon-menu-right'
  | 'icon-telegram'
  | 'icon-x'
  | 'icon-youtube'
  | 'icon-instagram'
  | 'icon-linkedin'
  | 'icon-facebook'
  | 'icon-discord'
  | 'icon-close'
  | 'icon-document'
  | 'icon-flash'
  | 'icon-sell'
  | 'icon-sword'

export interface IIconProps extends React.HTMLProps<HTMLElement> {
  name: IconTypes
  className?: string
}
