import Head from "next/head";
import Footer from "../components/footer";

const ResponsibleGaming = () => {
  return (
    <>
      <Head>
        <title>Ngiribets Responsible Gaming</title>
        <meta
          name="description"
          content="Responsible Gaming Information for Ngiribets"
        />
      </Head>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-gray-800">
        <h1 className="text-3xl font-bold text-center mb-8">
          Responsible Gaming
        </h1>

        <section className="space-y-8">
          {/* 1. Introduction */}
          <div>
            <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
            <p className="leading-relaxed">
              At Ngiribets, we are dedicated to providing a safe and enjoyable
              gaming environment for all our users. We understand that while
              many people enjoy gambling responsibly, it is possible for some
              individuals to experience issues related to gambling. This
              Responsible Gaming page outlines our commitment to promoting
              responsible gaming and provides resources for those who may need
              assistance.
            </p>
          </div>

          {/* 2. Responsible Gaming Practices */}
          <div>
            <h2 className="text-xl font-semibold mb-2">
              2. Responsible Gaming Practices
            </h2>

            <p className="font-medium">2.1 Setting Limits</p>
            <p className="leading-relaxed">
              We encourage all users to set personal limits to ensure that their
              gambling remains enjoyable and does not negatively impact other
              areas of their lives. You can set limits on:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>
                <strong>Deposit Amounts:</strong> Control the maximum amount you
                can deposit into your account over a specified period.
              </li>
              <li>
                <strong>Betting Limits:</strong> Set limits on the maximum
                amount you can bet on any single game or wager.
              </li>
              <li>
                <strong>Session Time:</strong> Limit the amount of time you
                spend gambling in a single session.
              </li>
            </ul>

            <p className="font-medium mt-4">2.2 Self-Exclusion</p>
            <p className="leading-relaxed">
              If you feel that you need a break from gambling, you can request
              to self-exclude from our services. This allows you to take a
              temporary or permanent break from accessing your account. To
              self-exclude, please contact our support team, and we will assist
              you with the process.
            </p>

            <p className="font-medium mt-4">2.3 Responsible Gaming Tools</p>
            <p className="leading-relaxed">
              We offer a range of tools to help you manage your gambling:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>
                <strong>Reality Checks:</strong> Receive notifications that
                remind you of how long you have been gambling.
              </li>
              <li>
                <strong>Account Statements:</strong> Access detailed statements
                of your gambling activity to monitor your behavior.
              </li>
              <li>
                <strong>Deposit Limits:</strong> Set limits on how much you can
                deposit into your account over a set period.
              </li>
            </ul>
          </div>

          {/* 3. Recognizing Problem Gambling */}
          <div>
            <h2 className="text-xl font-semibold mb-2">
              3. Recognizing Problem Gambling
            </h2>
            <p className="leading-relaxed">
              Problem gambling can manifest in various ways. It is essential to
              recognize the signs and seek help if you or someone you know is
              struggling. Signs of problem gambling may include:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>
                <strong>Chasing Losses:</strong> Trying to win back lost money
                by gambling more.
              </li>
              <li>
                <strong>Neglecting Responsibilities:</strong> Ignoring personal
                or professional responsibilities due to gambling.
              </li>
              <li>
                <strong>Increased Time and Money Spent:</strong> Spending more
                time and money on gambling than intended.
              </li>
              <li>
                <strong>Emotional Distress:</strong> Experiencing anxiety,
                stress, or depression related to gambling.
              </li>
            </ul>
          </div>

          {/* 4. Resources for Help */}
          <div>
            <h2 className="text-xl font-semibold mb-2">
              4. Resources for Help
            </h2>
            <p className="leading-relaxed">
              If you are concerned about your gambling habits or those of
              someone you know, there are resources available to provide
              support:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>
                <strong>National Gambling Helpline:</strong> Contact [Insert
                Helpline Number] for confidential support and advice.
              </li>
              <li>
                <strong>Gamblers Anonymous:</strong> Visit [Insert Website URL]
                for support groups and meetings.
              </li>
              <li>
                <strong>GamCare:</strong> Access resources and support at
                [Insert Website URL].
              </li>
            </ul>
          </div>

          {/* 5. Our Commitment */}
          <div>
            <h2 className="text-xl font-semibold mb-2">5. Our Commitment</h2>
            <p className="leading-relaxed">
              Ngiribets is committed to promoting responsible gaming and
              ensuring the safety and well-being of our users. We continually
              review our policies and practices to provide a secure and
              supportive environment for all players.
            </p>
          </div>

          {/* 6. Contact Us */}
          <div>
            <h2 className="text-xl font-semibold mb-2">6. Contact Us</h2>
            <p className="leading-relaxed">
              If you have any questions or need assistance regarding responsible
              gaming, please do not hesitate to contact our support team:
            </p>
            <p className="font-bold">Ngiribets</p>
            <p>Email: support@ngiribets.com</p>
          </div>

          {/* 7. Acknowledgment */}
          <div className="mb-24">
            <h2 className="text-xl font-semibold mb-2">7. Acknowledgment</h2>
            <p className="leading-relaxed">
              By using our Services, you acknowledge that you have read,
              understood, and agree to our Responsible Gaming policies. We
              encourage all users to gamble responsibly and seek help if needed.
            </p>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default ResponsibleGaming;
