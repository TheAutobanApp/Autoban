import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import InviteSearchModal from '../modals/InviteSearchModal';
import Mock, { initialUserState } from '../utils/mockContext';

describe('Render', () => {
  test('Modal rendered with header and search', () => {
    // Arrange
    const { container, debug } = render(<Mock component={InviteSearchModal}/>);
    // debug();
    // Act
    // Assert
    expect(container.querySelector('h5')).toBeTruthy();
    expect(container.querySelector('.search')).toBeTruthy();
  });

  test('Results container shown when user types in search input', async () => {
    // Arrange
    const { container, debug } = render(<Mock component={InviteSearchModal}/>);
    // debug();
    // Act
    userEvent.type(container.querySelector('input'), 'test');
    debug();
    // Assert
    await expect(container.querySelector('.results') && container.querySelector('.visible')).toBeTruthy();
  });
});
