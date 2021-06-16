import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog /> tests', () => {
  const user = {
    username: 'testy',
    id: '123456789'
  }

  const blog = {
    title: 'Test Blog',
    author: 'Testy McTestFace',
    url: 'http://www.test.com',
    likes: 60,
    user: user
  }

  let component

  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user} />
    )
  })

  test('renders blog title and author before expand', () => {
    expect(
      component.container.querySelector('.unexpanded')
    ).toBeDefined()
  })

  test('renders blog url and likes after clicking view button', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(
      component.container.querySelector('.expanded')
    ).toBeDefined()
  })
})