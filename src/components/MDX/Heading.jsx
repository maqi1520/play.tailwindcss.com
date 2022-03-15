/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import cn from 'classnames'
import React from 'react'

const Heading = function Heading({
  as: Comp = 'div',
  className,
  children,
  id,
  ...props
}) {
  return (
    <Comp className={className}>
      <span className="prefix"></span>
      <span>{children}</span>
      <span className="suffix"></span>
    </Comp>
  )
}

Heading.displayName = 'Heading'

export const H1 = ({ className, ...props }) => (
  <Heading
    as="h1"
    className={cn(className, 'text-5xl font-bold leading-tight')}
    {...props}
  />
)

export const H2 = ({ className, ...props }) => (
  <Heading
    as="h2"
    className={cn(
      'text-3xl leading-10 text-primary dark:text-primary-dark font-bold my-6',
      className
    )}
    {...props}
  />
)
export const H3 = ({ className, ...props }) => (
  <Heading
    as="h3"
    className={cn(
      className,
      'text-2xl leading-9 text-primary dark:text-primary-dark font-bold my-6'
    )}
    {...props}
  />
)

export const H4 = ({ className, ...props }) => (
  <Heading
    as="h4"
    className={cn(className, 'text-xl font-bold leading-9 my-4')}
    {...props}
  />
)
