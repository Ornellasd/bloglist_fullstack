import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('renders blog title and author before expand', () => {
  const blog = {
    title: 'Test Blog',
    author: 'Testy McTestFace',
    url: 'http://www.test.com'
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(
    component.container.querySelector('.unexpanded')
  ).toBeDefined()
})