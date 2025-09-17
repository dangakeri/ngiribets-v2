import Head from "next/head";
import Footer from "../components/footer";

const Privacy = () => {
  return (
    <>
      <Head>
        <title>Ngiribets Privacy Policy</title>
        <meta name="description" content="Privacy Policy for Ngiribets" />
      </Head>

      <main className="max-w-4xl mx-auto px-4 py-10 text-white dark:text-gray-200 mb-10">
        <h1 className="text-2xl font-bold mb-6 text-center">Privacy Policy</h1>

        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">1. Introduction</h2>
            <p>
              Welcome to Ngiribets. We are committed to protecting your privacy
              and ensuring a secure and trustworthy experience when using our
              website and services. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you visit our
              website and use our services, including but not limited to online
              gambling and casino games (collectively, the Services). By using
              our Services, you consent to the practices described in this
              Privacy Policy.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">2. Information We Collect</h2>
            <p>
              <strong>2.1 Personal Information</strong>
            </p>
            <p>
              We may collect personal information that you provide directly to
              us when you register for an account, place bets, make deposits, or
              otherwise interact with our Services. This information may
              include:
            </p>
            <ul className="list-disc ml-6 space-y-1">
              <li>
                <strong>Contact Information:</strong> Name, phone number, email
                address, and postal address.
              </li>
              <li>
                <strong>Account Information:</strong> Username, password, and
                account preferences.
              </li>
              <li>
                <strong>Financial Information:</strong> Payment details,
                transaction history, and account balance.
              </li>
            </ul>

            <p className="mt-4">
              <strong>2.2 Usage Data</strong>
            </p>
            <p>
              We may collect information about your interactions with our
              Services, including:
            </p>
            <ul className="list-disc ml-6 space-y-1">
              <li>
                <strong>Log Data:</strong> IP address, browser type, operating
                system, pages visited, and the time and date of your visit.
              </li>
              <li>
                <strong>Device Information:</strong> Device type, unique device
                identifiers, and other technical information about your device.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              3. How We Use Your Information
            </h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>
                <strong>Provide and Improve Services:</strong> Process
                transactions, manage your account, and enhance user experience.
              </li>
              <li>
                <strong>Communication:</strong> Send you updates, notifications,
                and promotional materials related to our Services.
              </li>
              <li>
                <strong>Security and Compliance:</strong> Prevent fraud, detect
                and address technical issues, and comply with legal and
                regulatory requirements.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              4. Sharing Your Information
            </h2>
            <p>We may share your information with:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>
                <strong>Service Providers:</strong> Third-party vendors who
                assist us in operating our Services, such as payment processors
                and marketing partners.
              </li>
              <li>
                <strong>Legal Authorities:</strong> When required by law or to
                respond to legal processes, or to protect the rights, property,
                or safety of Ngiribets or our users.
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with a
                merger, acquisition, or sale of assets, where your information
                may be transferred as part of the business transaction.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold">5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to
              protect your personal information from unauthorized access,
              disclosure, alteration, and destruction. Despite our efforts, no
              security measure is entirely foolproof, and we cannot guarantee
              the absolute security of your information.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              6. Your Rights and Choices
            </h2>
            <p>You have the right to:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>
                <strong>Access and Update:</strong> Review and update your
                personal information through your account settings.
              </li>
              <li>
                <strong>Opt-Out:</strong> Unsubscribe from marketing
                communications by following the instructions provided in those
                communications.
              </li>
              <li>
                <strong>Delete:</strong> Request the deletion of your personal
                information, subject to legal and contractual obligations.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              7. Cookies and Tracking Technologies
            </h2>
            <p>
              We use cookies and similar tracking technologies to collect
              information about your use of our Services and to provide a
              personalized experience. You can manage your cookie preferences
              through your browser settings.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              8. Children&apos;s Privacy
            </h2>
            <p>
              Our Services are not intended for individuals under the age of 18.
              We do not knowingly collect or solicit personal information from
              individuals under 18. If we become aware that we have collected
              personal information from a minor, we will take steps to delete
              that information.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              9. Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We will
              notify you of significant changes by posting the revised policy on
              our website with a new effective date. Your continued use of our
              Services after such changes constitutes your acceptance of the
              updated Privacy Policy.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">10. Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy or
              our data practices, please contact us at:
            </p>
            <p className="mt-2">
              <strong>Ngiribets</strong>
            </p>
            <p>Email: support@ngiribets.com</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">11. Acknowledgment</h2>
            <p>
              By using our Services, you acknowledge that you have read,
              understood, and agree to this Privacy Policy.
            </p>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Privacy;
