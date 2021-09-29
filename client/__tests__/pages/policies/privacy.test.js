/**
 * @jest-environment jsdom
 */

import { screen } from '@testing-library/react';
import { getPage } from 'next-page-tester';

describe('Privacy Policy Page', () => {
  it('should render privacy policy page', async () => {
    const { render } = await getPage({
      route: '/policies/privacy',
    });
    render();
    const sectionElement = screen.getByTestId('section-main');
    expect(sectionElement).toBeInTheDocument();
  });
});
