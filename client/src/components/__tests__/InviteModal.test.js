import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import InviteModal from '../modals/InviteModal';
import Mock, { initialUserState } from '../utils/mockContext';

describe('Render', () => {
  test('Modal rendered with header and button', async () => {
    // Arrange
    const { container, debug } = render(<Mock component={InviteModal}/>);
    // debug();
    // Act
    // Assert
    expect(container.querySelector('h5')).toBeTruthy();
    expect(container.querySelector('.saveButton')).toBeTruthy();
  });

  test('Invite rendered with accept and reject buttons', async () => {
    // Arrange
    const { container, debug } = render(<Mock component={InviteModal}/>);
    // debug();
    // Act
    // Assert
    expect(container.querySelector('.header')).toHaveTextContent(
      'Test',
    );
    expect(container.querySelector('.invite-buttons')).toBeTruthy();
  });

  test('All invites rendered from context', async () => {
    // Arrange
    const { container, debug } = render(<Mock component={InviteModal}/>);
    // debug();
    // Act
    // Assert
    expect(
      container.querySelector('.invite-list').childElementCount,
    ).toBe(initialUserState.invites.length);
  });
});

// describe('Close modal', () => {
//     test('Modal close when button clicked', async () => {
//         // Arrange
//     const drink = jest.fn();
//         const { container, debug, getByText } = render(<Mock/>);
//         debug();
//         // Act
//         userEvent.click(screen.getByText('Close'));
//         // Assert
//         expect(Mock.hideModal).toHaveBeenCalled();
//       });
// })
