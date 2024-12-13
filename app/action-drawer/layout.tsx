import React from 'react'

export default function Layout({
  children,
  button,
}: {
  children: React.ReactNode
  button: React.ReactNode
}) {
  return (
    <>
      {children} {button}
    </>
  )
}
