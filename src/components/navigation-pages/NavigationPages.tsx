import React, { useCallback, useMemo } from 'react'
import classNames from 'classnames'
import Anchor from '@/components/base/anchor'
import Icon from '@/components/base/icon'
import {
  IIconOptions,
  INavigationMap,
  INavigationPagesProps,
  IPageOptions,
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
          icons: [
            {
              iconLocation: ['header'],
              beforeIcon: 'icon-home',
            },
          ],
        },
        {
          label: 'Oyunlar',
          href: '/games',
          locations: ['header'],
          icons: [
            {
              iconLocation: ['header'],
              beforeIcon: 'icon-menu-right',
            },
          ],
          subPages: [
            {
              label: 'Metin2',
              href: '/games/metin2',
              locations: ['header'],
              icons: [
                {
                  iconLocation: ['header'],
                  beforeIcon: 'icon-metin2',
                },
              ],
              subPages: [
                {
                  label: 'Sunucu Ekle',
                  href: '/games/metin2/add-server',
                  icons: [
                    {
                      iconLocation: ['header'],
                      beforeIcon: 'icon-list-add',
                    },
                  ],
                },
                {
                  label: 'Sunucu Yayınla',
                  href: '/games/metin2/publish-server?status=false',
                  icons: [
                    {
                      iconLocation: ['header'],
                      beforeIcon: 'icon-list-check',
                    },
                  ],
                },
              ],
            },
          ],
        },

        {
          label: 'Siteyi Görüntüle',
          href: 'https://bygamelist.com',
          target: '_blank',
          locations: ['header'],
          icons: [
            {
              iconLocation: ['header'],
              beforeIcon: 'icon-eye',
            },
          ],
        },
      ],
      otherPages: [
        {
          label: 'Siteyi Görüntüle',
          href: 'https://bygamelist.com',
          target: '_blank',
          locations: ['footer'],
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

  const renderSubPages = useCallback(
    (subPages: IPageOptions['subPages']) => {
      if (!subPages || subPages?.length === 0) {
        return null
      }

      return (
        <ul className="nav-pages">
          {subPages.map((page) => (
            <li key={`${page.label}-${page.href}`}>
              <Anchor
                href={page.href}
                className="nav-anchor"
                target={page?.target || '_self'}
              >
                {renderAnchorChildren({
                  pageLabel: page.label,
                  icons: page?.icons,
                })}
              </Anchor>
              {page?.subPages && renderSubPages(page.subPages)}
            </li>
          ))}
        </ul>
      )
    },
    [renderAnchorChildren]
  )

  if (targetPages && targetPages.length > 0) {
    return (
      <ul
        className={classNames(
          'nav-pages',
          `nav-${pageType}`,
          `nav-${location}`,
          className
        )}
      >
        {targetPages.map((page) => (
          <li key={`${page.label}-${page.href}`}>
            <Anchor
              href={page.href}
              className={classNames('nav-anchor', page.href === '#' && 'link-none')}
              target={page?.target || '_self'}
            >
              {renderAnchorChildren({ pageLabel: page.label, icons: page?.icons })}
            </Anchor>
            {page?.subPages && renderSubPages(page.subPages)}
          </li>
        ))}
      </ul>
    )
  }

  return null
}

export default NavigationPages
