import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../context/GlobalContext'

export default function Bredcamp({ title }) {
  const { toggleSidebarMenu } = useContext(GlobalContext)
  useEffect(() => toggleSidebarMenu(title), [title])
  return (
    <h2 className='text-xl my-5 font-semibold text-base-content'>{title}</h2>
  )
}
