import React from 'react'
import moment from 'moment'
import Anchor from '@/components/base/anchor'

import { IMetin2ListCardProps } from './types'

function Metin2ListCard({ data }: IMetin2ListCardProps) {
  const { id, name, autoHunt, dropClient, legalSale, level, openingDate, team } = data
  return (
    <div className="metin2-list-card">
      <Anchor href={`/games/metin2/server?id=${id}`} className="card">
        <span className="level">{level?.name}</span>
        <span className="name">{name}</span>
        <span className="owners">
          {team?.owners && team.owners.length > 0 ? team.owners.join(' ') : 'Bilinmiyor'}
        </span>
        <span className="drop">{dropClient}</span>
        <span className="auto-hunt">{autoHunt ? 'Evet' : 'Hayır'}</span>
        <span className="legal-sale">{legalSale ? 'Evet' : 'Hayır'}</span>
        <span className="date">
          {moment.utc(openingDate).local().format('DD MMMM YYYY HH:mm')}
        </span>
        <span className="id">{id}</span>
      </Anchor>
    </div>
  )
}

export default Metin2ListCard
