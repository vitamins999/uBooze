import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

import { fadeOutPage } from '../../animations/navigation';
import Layout from '../../components/Layout';

import { sendContactUsEmail } from '../../api/public';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const ContactUs = () => {
  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);

  const {
    register: contact,
    handleSubmit: handleContactSubmit,
    watch: contactWatch,
    errors: contactErrors,
    reset,
  } = useForm();

  const onContactSubmit = async (data, e) => {
    const response = await sendContactUsEmail(data);
    if (response.error) {
      notifyError('There was a problem sending your message');
    } else {
      notifySuccess('Message sent!');
    }
    e.target.reset();
  };

  useEffect(() => {
    if (contactErrors.name?.type === 'required') {
      notifyError('Name is required!');
    }
    if (contactErrors.email?.type === 'required') {
      notifyError('Email is required!');
    }
    if (contactErrors.message?.type === 'required') {
      notifyError('Your message is required!');
    }
  }, [contactErrors]);

  const title = 'Contact Us';

  return (
    <Layout title={title}>
      <motion.section
        variants={fadeOutPage}
        exit='exit'
        initial='initial'
        animate='animate'
        className='text-gray-700 body-font relative'
      >
        <div className='container px-5 py-24 mx-auto'>
          <div className='flex flex-col text-center w-full mb-12'>
            <h1 className='sm:text-3xl text-2xl font-medium font-heading mb-4 text-gray-900'>
              Contact Us
            </h1>
            <p className='lg:w-2/3 mx-auto leading-relaxed text-base'>
              Have a question? Drop us an email below and we'll get back to you!
            </p>
          </div>
          <div className='lg:w-1/2 md:w-2/3 mx-auto'>
            <form
              onSubmit={handleContactSubmit(onContactSubmit)}
              className='flex flex-wrap -m-2'
            >
              <div className='p-2 w-1/2'>
                <div className='relative'>
                  <label
                    htmlFor='name'
                    className='block text-gray-700 text-sm font-medium'
                  >
                    Name
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    ref={contact({ required: true })}
                    className='mt-1 w-full shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
                  />
                </div>
              </div>
              <div className='p-2 w-1/2'>
                <div className='relative'>
                  <label
                    htmlFor='email'
                    className='block text-gray-700 text-sm font-medium'
                  >
                    Email
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    ref={contact({ required: true })}
                    className='mt-1 w-full shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
                  />
                </div>
              </div>
              <div className='p-2 w-full'>
                <div className='relative'>
                  <label
                    htmlFor='message'
                    className='block text-gray-700 text-sm font-medium'
                  >
                    Message
                  </label>
                  <textarea
                    type='text'
                    id='message'
                    name='message'
                    ref={contact({ required: true })}
                    className='h-32 resize-none mt-1 w-full shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
                  />
                </div>
              </div>
              <div className='p-2 w-full'>
                <button
                  type='submit'
                  className='flex mx-auto font-medium shadow-sm text-green-50 bg-green-500 border-0 py-2 px-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 hover:bg-green-600 rounded-lg text-lg transition duration-200 ease-in-out'
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.section>
    </Layout>
  );
};

export default ContactUs;
