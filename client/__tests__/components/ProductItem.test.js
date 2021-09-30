/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import store from '../../store';
import ProductItem from '../../components/ProductItem';

const mockProduct = {
  productID: 3641,
  productName: 'Budweiser',
  displayName: 'Budweiser',
  volume: '4x300ml',
  drinkType: 'beer',
  drinkSubtype: 'lager',
  supermarketProducts: [
    {
      productName: 'Budweiser Lager Beer Bottles 4x300',
      price: 300,
      offer: 'No offer',
      link: 'https://groceries.asda.com/product/1000017525490',
      image:
        'https://ui.assets-asda.com:443/dm/asdagroceries/5014379004595?$ProdList$',
      drinkType: 'beer',
      drinkSubtype: 'lager',
      supermarket: 'Asda',
      productID: 3641,
    },
    {
      productName: 'Budweiser Beer 4 x 300ml',
      price: 0,
      offer: 'No offer',
      link: 'https://shop.coop.co.uk/product/61e58241-6441-414b-9a8e-d8c606a79e51',
      image:
        'https://ssonlineorderingpocsst01.blob.core.windows.net/brandbankimages/5014379004595_512x512',
      drinkType: 'beer',
      drinkSubtype: 'lager',
      supermarket: 'Co-op',
      productID: 3641,
    },
    {
      productName: 'Budweiser Beer 4 x 300ml',
      price: 400,
      offer: 'No offer',
      link: 'https://www.iceland.co.uk/p/budweiser-beer-4-x-300ml/72096.html',
      image:
        'https://assets.iceland.co.uk/i/iceland/budweiser_beer_4_x_300ml_72096_T1.jpg?$producttile$',
      drinkType: 'beer',
      drinkSubtype: 'lager',
      supermarket: 'Iceland',
      productID: 3641,
    },
  ],
};

const MockProductItem = () => {
  return (
    <Provider store={store}>
      <ToastContainer />
      <ProductItem product={mockProduct} />
    </Provider>
  );
};

describe('Product Item Component', () => {
  beforeEach(() => {
    render(<MockProductItem />);
  });

  it('should render component', () => {
    const sectionElement = screen.getByTestId('section-main');
    expect(sectionElement).toBeInTheDocument();
  });

  it('should render image correctly', () => {
    const imageElement = screen.getByTestId('image-product');
    expect(imageElement.alt).toBe('Budweiser');
  });

  it('should render product name', () => {
    const headingElement = screen.getByRole('heading', { name: /Budweiser/i });
    expect(headingElement).toBeInTheDocument();
  });

  it('should render product volume', () => {
    const headingElement = screen.getByRole('heading', { name: /4x300ml/i });
    expect(headingElement).toBeInTheDocument();
  });

  it('should render product drink type and subtype', () => {
    const headingElement = screen.getByRole('heading', {
      name: /Beer | Lager/i,
    });
    expect(headingElement).toBeInTheDocument();
  });

  it('should render three supermarket product items', () => {
    const divElements = screen.getAllByTestId('divider-supermarketProduct');
    expect(divElements.length).toBe(3);
  });

  it('should render supermarket product image correctly', () => {
    const imageElements = screen.getAllByTestId('image-supermarketProduct');
    expect(imageElements[0].alt).toBe('Asda');
  });

  it('should render supermarket product price correctly', () => {
    const imageElements = screen.getAllByTestId('span-supermarketProductPrice');
    expect(imageElements[0].textContent).toBe('£3.00');
  });

  it('should render supermarket product price of 0 as out of stock', () => {
    const imageElements = screen.getAllByTestId('span-supermarketProductPrice');
    expect(imageElements[1].textContent).toBe('Out of Stock');
  });

  it('should render item as not favourited if not logged in', () => {
    const svgElement = screen.getByTestId('svg-notFavourite');
    expect(svgElement).toBeInTheDocument();
  });

  // Error

  it('should render error message if favourite button is clicked whilst not logged in', async () => {
    const svgElement = screen.getByTestId('svg-notFavourite');
    fireEvent.click(svgElement);
    const alertElement = await screen.findByText(
      'Easy there! You need to be logged in before you can favourite a drink!'
    );
    expect(alertElement).toBeInTheDocument();
  });
});
