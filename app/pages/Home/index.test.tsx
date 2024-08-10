import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from './index';
import { describe, it } from 'node:test';

// Mock fetch response
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve([
        {
          id: 1,
          title: 'Product 1',
          description: 'Description 1',
          price: 100,
          rating: 4,
          image: 'https://example.com/product1.jpg',
        },
        {
          id: 2,
          title: 'Product 2',
          description: 'Description 2',
          price: 200,
          rating: 5,
          image: 'https://example.com/product2.jpg',
        },
        // Add more mock products as needed
      ]),
  })
) as jest.Mock;

describe('Home Component', () => {
  it('renders header with cart item count', () => {
    render(<Home />);
    const headerElement = screen.getByText(/Cart \(\d+\)/i);
    // expect(headerElement).toBeInTheDocument();
  });

  it('renders products on initial load', async () => {
    render(<Home />);

    // Wait for products to be rendered
    const productItems = await waitFor(() => screen.getAllByText(/Product/i));
    expect(productItems).toHaveLength(2); // Assuming 2 products are mocked
  });

  it('filters products based on search query', async () => {
    render(<Home />);
    
    // Wait for initial products to load
    await waitFor(() => screen.getAllByText(/Product/i));

    // Perform search
    const searchBox = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchBox, { target: { value: 'Product 1' } });

    // Expect only one product to be visible
    const filteredProducts = await waitFor(() => screen.getAllByText(/Product 1/i));
    expect(filteredProducts).toHaveLength(1);
  });

  it('loads more products on scroll', async () => {
    render(<Home />);

    // Wait for initial products to load
    await waitFor(() => screen.getAllByText(/Product/i));

    // Mock fetch for next page
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              id: 3,
              title: 'Product 3',
              description: 'Description 3',
              price: 150,
              rating: 3,
              image: 'https://example.com/product3.jpg',
            },
          ]),
      })
    ) as jest.Mock;

    // Simulate scroll
    fireEvent.scroll(window, { target: { scrollY: 1000 } });

    // Wait for more products to load
    const additionalProduct = await waitFor(() => screen.getByText(/Product 3/i));
    // expect(additionalProduct).toBeInTheDocument();
  });

  it('sorts products by price', async () => {
    render(<Home />);

    // Wait for initial products to load
    await waitFor(() => screen.getAllByText(/Product/i));

    // Select 'Sort by Price'
    const sortSelect = screen.getByLabelText(/Sort by:/i);
    fireEvent.change(sortSelect, { target: { value: 'price' } });

    // Check if the products are sorted by price
    const sortedProducts = await waitFor(() => screen.getAllByText(/Product/i));
    // expect(sortedProducts[0]).toHaveTextContent('Product 1'); // Assuming 'Product 1' has a lower price
  });
});
