import { motion } from 'framer-motion';
import { fadeOutPage } from '../../animations/navigation';
import Layout from '../../components/Layout';

const PrivacyPage = () => {
  const title = 'Privacy Policy';

  return (
    <Layout title={title}>
      <motion.section
        data-testid='section-main'
        variants={fadeOutPage}
        exit='exit'
        initial='initial'
        animate='animate'
        className='text-gray-700 body-font relative'
      >
        <div className='container 2xl:px-96 xl:px-64 lg:px-32 px-5 iPad:px-32 lg:py-24 pt-12 pb-56 iPadWidescreen:pb-56 iPadPro:pb-56 iPadProWidescreen:pb-56 mx-auto text-xs lg:text-base'>
          <h1 className='lg:text-3xl text-2xl pb-5 text-center'>
            Privacy Policy for uBooze
          </h1>

          <p className='py-5'>
            At uBooze, accessible from{' '}
            <a
              target='_blank'
              rel='noreferrer'
              href='https://www.ubooze/com'
              className='text-blue-700 hover:text-blue-800 cursor-pointer'
            >
              https://www.ubooze.com
            </a>
            , one of our main priorities is the privacy of our visitors. This
            Privacy Policy document contains types of information that is
            collected and recorded by uBooze and how we use it.
          </p>

          <p className='pb-5'>
            If you have additional questions or require more information about
            our Privacy Policy, do not hesitate to contact us. Our Privacy
            Policy was generated with the help of{' '}
            <a
              target='_blank'
              rel='noreferrer'
              href='https://www.gdprprivacynotice.com/'
              className='text-blue-700 hover:text-blue-800 cursor-pointer'
            >
              GDPR Privacy Policy Generator from GDPRPrivacyNotice.com
            </a>
          </p>

          <h2 className='lg:text-2xl text-xl pt-5'>
            General Data Protection Regulation (GDPR)
          </h2>
          <p className='py-5'>We are a Data Controller of your information.</p>

          <p className='pb-5'>
            uBooze legal basis for collecting and using the personal information
            described in this Privacy Policy depends on the Personal Information
            we collect and the specific context in which we collect the
            information:
          </p>

          <ul className='list-disc list-inside'>
            <li>uBooze needs to perform a contract with you</li>
            <li>You have given uBooze permission to do so</li>
            <li>
              Processing your personal information is in uBooze legitimate
              interests
            </li>
            <li>uBooze needs to comply with the law</li>
          </ul>

          <p className='py-5'>
            uBooze will retain your personal information only for as long as is
            necessary for the purposes set out in this Privacy Policy. We will
            retain and use your information to the extent necessary to comply
            with our legal obligations, resolve disputes, and enforce our
            policies.
          </p>

          <p className='pb-5'>
            If you are a resident of the European Economic Area (EEA), you have
            certain data protection rights. If you wish to be informed what
            Personal Information we hold about you and if you want it to be
            removed from our systems, please contact us.
          </p>
          <p className='pb-5'>
            In certain circumstances, you have the following data protection
            rights:
          </p>

          <ul className='list-disc list-inside'>
            <li>
              The right to access, update or to delete the information we have
              on you.
            </li>
            <li>The right of rectification.</li>
            <li>The right to object.</li>
            <li>The right of restriction.</li>
            <li>The right to data portability</li>
            <li>The right to withdraw consent</li>
          </ul>

          <h2 className='lg:text-2xl text-xl pt-5'>Log Files</h2>

          <p className='py-5'>
            uBooze follows a standard procedure of using log files. These files
            log visitors when they visit websites. All hosting companies do this
            and a part of hosting services' analytics. The information collected
            by log files include internet protocol (IP) addresses, browser type,
            Internet Service Provider (ISP), date and time stamp, referring/exit
            pages, and possibly the number of clicks. These are not linked to
            any information that is personally identifiable. The purpose of the
            information is for analyzing trends, administering the site,
            tracking users' movement on the website, and gathering demographic
            information.
          </p>

          <h2 className='lg:text-2xl text-xl pt-5'>Cookies and Web Beacons</h2>

          <p className='py-5'>
            Like any other website, uBooze uses 'cookies'. These cookies are
            used to store information including visitors' preferences, and the
            pages on the website that the visitor accessed or visited. The
            information is used to optimize the users' experience by customizing
            our web page content based on visitors' browser type and/or other
            information.
          </p>

          <p className='pb-5'>
            For more general information on cookies, please read{' '}
            <a
              target='_blank'
              rel='noreferrer'
              href='https://www.generateprivacypolicy.com/#cookies'
              className='text-blue-700 hover:text-blue-800 cursor-pointer'
            >
              "Cookies" article from the Privacy Policy Generator
            </a>
            .
          </p>

          <h2 className='lg:text-2xl text-xl pt-5'>Privacy Policies</h2>

          <p className='py-5'>
            You may consult this list to find the Privacy Policy for each of the
            advertising partners of uBooze.
          </p>

          <p className='pb-5'>
            Third-party ad servers or ad networks uses technologies like
            cookies, JavaScript, or Web Beacons that are used in their
            respective advertisements and links that appear on uBooze, which are
            sent directly to users' browser. They automatically receive your IP
            address when this occurs. These technologies are used to measure the
            effectiveness of their advertising campaigns and/or to personalize
            the advertising content that you see on websites that you visit.
          </p>

          <p className='pb-5'>
            Note that uBooze has no access to or control over these cookies that
            are used by third-party advertisers.
          </p>

          <h2 className='lg:text-2xl text-xl pt-5'>
            Third Party Privacy Policies
          </h2>

          <p className='py-5'>
            uBooze's Privacy Policy does not apply to other advertisers or
            websites. Thus, we are advising you to consult the respective
            Privacy Policies of these third-party ad servers for more detailed
            information. It may include their practices and instructions about
            how to opt-out of certain options.{' '}
          </p>

          <p className='pb-5'>
            You can choose to disable cookies through your individual browser
            options. To know more detailed information about cookie management
            with specific web browsers, it can be found at the browsers'
            respective websites.
          </p>

          <h2 className='lg:text-2xl text-xl pt-5'>Children's Information</h2>

          <p className='py-5'>
            Another part of our priority is adding protection for children while
            using the internet. We encourage parents and guardians to observe,
            participate in, and/or monitor and guide their online activity.
          </p>

          <p className='pb-5'>
            uBooze does not knowingly collect any Personal Identifiable
            Information from children under the age of 13. If you think that
            your child provided this kind of information on our website, we
            strongly encourage you to contact us immediately and we will do our
            best efforts to promptly remove such information from our records.
          </p>

          <h2 className='lg:text-2xl text-xl pt-5'>
            Online Privacy Policy Only
          </h2>

          <p className='py-5'>
            Our Privacy Policy applies only to our online activities and is
            valid for visitors to our website with regards to the information
            that they shared and/or collect in uBooze. This policy is not
            applicable to any information collected offline or via channels
            other than this website.
          </p>

          <h2 className='lg:text-2xl text-xl pt-5'>Consent</h2>

          <p className='py-5'>
            By using our website, you hereby consent to our Privacy Policy and
            agree to its terms.
          </p>
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

export default PrivacyPage;
