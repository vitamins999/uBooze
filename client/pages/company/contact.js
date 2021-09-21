import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

import { fadeOutPage } from '../../animations/navigation';
import Layout from '../../components/Layout';

import { sendContactUsEmail } from '../../api/public';
import { notifyError, notifySuccess } from '../../utils/alerts';

const ContactUs = () => {
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
            <h1 className='lg:text-3xl text-2xl font-medium font-heading mb-4 text-gray-900'>
              Contact Us
            </h1>
            <p className='lg:w-2/3 mx-auto leading-relaxed lg:text-base text-sm'>
              Have a question? Drop us an email below and we'll get back to you!
            </p>
          </div>
          <div className='lg:w-1/2 md:w-2/3 mx-auto'>
            <form
              onSubmit={handleContactSubmit(onContactSubmit)}
              className='flex lg:flex-wrap flex-col lg:flex-row -m-2 lg:pb-0 pb-32 iPad:pb-32 iPadWidescreen:pb-32 iPadPro:pb-60'
            >
              <div className='p-2 lg:w-1/2 w-auto'>
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
                    className='mt-1 w-full text-sm shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
                  />
                </div>
              </div>
              <div className='p-2 lg:w-1/2 w-auto'>
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
                    className='mt-1 w-full text-sm shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
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
                    className='h-32 resize-none text-sm mt-1 w-full shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
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
        <svg
          className='-mt-48 z-0'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 1440 320'
        >
          <path
            fill='#55BA82'
            fillOpacity='1'
            d='M0,192L48,186.7C96,181,192,171,288,149.3C384,128,480,96,576,122.7C672,149,768,235,864,240C960,245,1056,171,1152,122.7C1248,75,1344,53,1392,42.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'
          ></path>
        </svg>
      </motion.section>
    </Layout>
  );
};

export default ContactUs;
