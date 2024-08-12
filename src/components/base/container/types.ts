export type ContainerSizes = 'fuild' | 'extended' | 'wide' | 'medium' | 'mobile'

export interface IContainerProps {
  size: ContainerSizes
  children: React.ReactNode
}
