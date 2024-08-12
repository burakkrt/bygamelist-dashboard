import React, { useCallback, useMemo } from 'react'
import classNames from 'classnames'
import Anchor from '@/components/base/anchor'
import Icon from '@/components/base/icon'
import {
  IIconOptions,
  INavigationMap,
  INavigationPagesProps,
  IRenderAnchorChildrenProps,
} from './types'

function NavigationPages({ pageType, location, className }: INavigationPagesProps) {
  const navigationMap: INavigationMap = useMemo(
    () => ({
      mainPages: [
        {
          label: 'Anasayfa',
          href: '/',
          locations: ['header'],
        },
        {
          label: 'Metin2 PVP Serverleri',
          href: '/',
          locations: ['header', 'panel', 'footer'],
        },
        {
          label: 'Metin2 Yayıncıları',
          href: '/',
          locations: ['header', 'panel', 'footer'],
        },
      ],
      otherPages: [
        {
          label: 'Hakkımızda',
          href: '/',
          locations: ['panel'],
          icons: [
            {
              iconLocation: ['panel'],
              beforeIcon: 'icon-document',
            },
          ],
        },
        {
          label: 'Tanıtım ve İşbirliği',
          href: '/',
          locations: ['panel'],
          icons: [
            {
              iconLocation: ['panel'],
              beforeIcon: 'icon-document',
            },
          ],
        },
        {
          label: 'İletişim',
          href: '/',
          locations: ['panel'],
          icons: [
            {
              iconLocation: ['panel'],
              beforeIcon: 'icon-document',
            },
          ],
        },
      ],
    }),
    []
  )

  const targetPages =
    navigationMap[pageType]?.filter((pages) => pages.locations.includes(location)) ?? []

  const renderAnchorChildren = useCallback(
    ({ pageLabel, icons }: IRenderAnchorChildrenProps) => {
      const icon =
        icons?.find((item) => item.iconLocation.includes(location)) ??
        ({} as IIconOptions)
      if (icon?.beforeIcon || icon?.afterIcon) {
        return (
          <>
            {icon.beforeIcon && (
              <Icon name={icon.beforeIcon} className="nav-before-icon" />
            )}
            {pageLabel}
            {icon.afterIcon && <Icon name={icon.afterIcon} className="nav-after-icon" />}
          </>
        )
      }
      return pageLabel
    },
    [location]
  )

  if (targetPages && targetPages.length > 0) {
    return (
      <nav
        className={classNames(
          'nav-pages',
          `nav-${pageType}`,
          `nav-${location}`,
          className
        )}
      >
        <ul>
          {targetPages.map((page) => (
            <li key={`${page.label}-${page.href}`}>
              <Anchor href={page.href} className="nav-anchor">
                {renderAnchorChildren({ pageLabel: page.label, icons: page?.icons })}
              </Anchor>
            </li>
          ))}
        </ul>
      </nav>
    )
  }

  return null
}

export default NavigationPages
