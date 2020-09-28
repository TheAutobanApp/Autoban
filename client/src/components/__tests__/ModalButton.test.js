import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import ModalButton from '../ModalButton';

describe('Button click runs function', () => {
    test('Modal close when button clicked', () => {
        // Arrange
        const close = jest.fn();
        const { container, debug, getByText } = render(<ModalButton onclick={close}>Close</ModalButton>);
        // Act
        userEvent.click(screen.getByText('Close'));
        // Assert
        expect(close).toHaveBeenCalled();
      });
})
