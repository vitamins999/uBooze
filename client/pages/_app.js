// import { wrapper } from '../store/store';
import { Provider } from 'react-redux';
import store from '../store';
import '../styles/index.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
