'use client'
import { useState } from 'react'
import Content from './Components/Content'

export default function Page() {
  const [data, setData] = useState({
    my_name: 'Erik Muller Coelho',
    project_name: 'League of Heroes',
  })

  return (
    <>
      <Content />
    </>
  )
}
