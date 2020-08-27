import { wrapper } from '../store/store';
import { Provider } from 'react-redux';
import '../styles/index.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
