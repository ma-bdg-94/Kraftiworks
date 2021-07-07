import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Brand Name', () => {
  render(<App />);
  const brandName = screen.getByText(/Kraftiworks/i);
  expect(brandName).toBeInTheDocument();
});

test('renders Service Nav', () => {
  render(<App />);
  const serviceNav = screen.getByText(/Service/i);
  expect(serviceNav).toBeInTheDocument();
});

test('renders Talents Nav', () => {
  render(<App />);
  const talentsNav = screen.getByText(/Talents/i);
  expect(talentsNav).toBeInTheDocument();
});

test('renders Join Us Nav', () => {
  render(<App />);
  const joinUsNav = screen.getByText(/Join Us/i);
  expect(joinUsNav).toBeInTheDocument();
});
