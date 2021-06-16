import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'
import { prettyDOM } from '@testing-library/dom'


describe('blog form tests', () => {
  test('form calls event handler with right details', () => {
    const createBlog = jest.fn()

    const component = render(
      <BlogForm createBlog={createBlog} />
    )
    
    const form = component.container.querySelector('form')
    const titleInput = component.container.querySelector('#title')
    const authorInput = component.container.querySelector('#author')
    const urlInput = component.container.querySelector('#url')

    fireEvent.change(titleInput, {
      target: { value: 'Form Testing' }
    })

    fireEvent.change(authorInput, {
      target: { value: 'Testy McTestface' }
    })

    fireEvent.change(urlInput, {
      target: { value: 'http://www.test.com' }
    })

    fireEvent.submit(form)

    expect(createBlog.mock.calls[0][0].url).toBe('http://www.test.com')
  })
})