// import { wrapper } from '../store/store';
import { Provider } from 'react-redux';
import store from '../store';
import '../styles/index.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
