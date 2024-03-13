import React from 'react'
import Function from '../../src/deckbuilder/function'

describe('<Function />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Function />)
  })
})