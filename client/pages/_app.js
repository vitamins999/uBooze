import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import store from '../store';
import { AnimatePresence } from 'framer-motion';
import '../styles/index.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <AnimatePresence exitBeforeEnter>
      <Provider store={store} key={router.route}>
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
        <Component {...pageProps} key={router.asPath} />
      </Provider>
    </AnimatePresence>
  );
}

export default MyApp;
