import Head from "next/head";
import Footer from "../components/footer";

const Terms = () => {
  return (
    <>
      <Head>
        <title>Ngiribets Terms and Conditions</title>
        <meta name="description" content="Terms and Conditions for Ngiribets" />
      </Head>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-white mb-12">
        <h1 className="text-3xl font-bold text-center mb-8">
          Terms and Conditions
        </h1>

        <section className="space-y-8">
          {/* 1. Introduction */}
          <div>
            <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
            <p className="leading-relaxed">
              Welcome to Ngiribets. These Terms and Conditions (Terms) govern
              your use of our website and services provided by Ngiribets,
              including but not limited to online gambling and casino games
              (collectively, the Services). By accessing or using our Services,
              you agree to these Terms. If you do not agree with any part of
              these Terms, you must refrain from using our Services.
            </p>
          </div>

          {/* 2. Eligibility */}
          <div>
            <h2 className="text-xl font-semibold mb-2">2. Eligibility</h2>
            <p className="leading-relaxed">
              You must be at least 18 years old or of legal gambling age in your
              jurisdiction to use our Services. By using our Services, you
              represent and warrant that you meet these age requirements.
              Ngiribets reserves the right to request proof of age and to
              restrict access to individuals who do not comply.
            </p>
          </div>

          {/* 3. Account Registration */}
          <div>
            <h2 className="text-xl font-semibold mb-2">
              3. Account Registration
            </h2>
            <p className="leading-relaxed">
              To access certain features, including gambling and casino games,
              you may be required to create an account. You agree to provide
              accurate, complete, and current information during registration
              and to update this information as needed. You are responsible for
              maintaining the confidentiality of your account credentials and
              for all activities under your account.
            </p>
          </div>

          {/* 4. Gambling and Casino Terms */}
          <div>
            <h2 className="text-xl font-semibold mb-2">
              4. Gambling and Casino Terms
            </h2>

            <h3 className="text-lg font-medium mt-4">4.1 General Terms</h3>
            <p className="leading-relaxed">
              Gambling and casino activities on Ngiribets are intended for
              entertainment purposes only. You should not consider gambling as a
              means to earn money. All deposits and withdrawals must be
              conducted using the methods provided on our platform. It is your
              responsibility to ensure you have sufficient funds before placing
              bets.
            </p>

            <h3 className="text-lg font-medium mt-4">
              4.2 Betting and Wagering
            </h3>
            <p className="leading-relaxed">
              All bets and wagers placed are subject to our betting rules and
              regulations. You are responsible for understanding these rules
              before participating. Ngiribets reserves the right to void or
              cancel any bet if it is deemed to have been placed in error or in
              violation of our rules.
            </p>

            <h3 className="text-lg font-medium mt-4">
              4.3 Responsible Gambling
            </h3>
            <p className="leading-relaxed">
              Ngiribets is committed to promoting responsible gambling. We
              provide tools for self-exclusion, deposit limits, and reality
              checks to help you manage your gambling behavior. If you suspect
              you may have a gambling problem, please seek assistance from a
              professional organization specializing in gambling addiction.
            </p>
          </div>

          {/* 5. Privacy and Data Protection */}
          <div>
            <h2 className="text-xl font-semibold mb-2">
              5. Privacy and Data Protection
            </h2>
            <p className="leading-relaxed">
              Your privacy is important to us. Please review our Privacy Policy,
              which explains how we collect, use, and protect your personal
              information.
            </p>
          </div>

          {/* 6. Intellectual Property */}
          <div>
            <h2 className="text-xl font-semibold mb-2">
              6. Intellectual Property
            </h2>
            <p className="leading-relaxed">
              All content on our website, including text, graphics, logos, and
              software, is the property of Ngiribets or its licensors and is
              protected by intellectual property laws. You may not use,
              reproduce, or distribute any content from our Services without
              prior written permission.
            </p>
          </div>

          {/* 7. Limitation of Liability */}
          <div>
            <h2 className="text-xl font-semibold mb-2">
              7. Limitation of Liability
            </h2>
            <p className="leading-relaxed">
              To the fullest extent permitted by law, Ngiribets shall not be
              liable for any direct, indirect, incidental, consequential, or
              punitive damages arising out of your use of our Services. This
              includes, but is not limited to, damages for loss of profits,
              data, or other intangible losses.
            </p>
          </div>

          {/* 8. Modifications to Terms */}
          <div>
            <h2 className="text-xl font-semibold mb-2">
              8. Modifications to Terms
            </h2>
            <p className="leading-relaxed">
              Ngiribets reserves the right to modify these Terms at any time. We
              will notify you of any significant changes, and your continued use
              of our Services constitutes your acceptance of the revised Terms.
            </p>
          </div>

          {/* 9. Governing Law */}
          <div>
            <h2 className="text-xl font-semibold mb-2">9. Governing Law</h2>
            <p className="leading-relaxed">
              These Terms shall be governed by and construed in accordance with
              the laws of Kenya. Any disputes arising out of or related to these
              Terms shall be subject to the exclusive jurisdiction of the courts
              in [Insert Jurisdiction].
            </p>
          </div>

          {/* 10. Contact Information */}
          <div>
            <h2 className="text-xl font-semibold mb-2">
              10. Contact Information
            </h2>
            <p className="leading-relaxed">
              For any questions regarding these Terms, please contact us at:
            </p>
            <p className="font-bold">Ngiribets</p>
            <p>Email: support@ngiribets.com</p>
          </div>

          {/* 11. Acknowledgment */}
          <div className="mb-24">
            <h2 className="text-xl font-semibold mb-2">11. Acknowledgment</h2>
            <p className="leading-relaxed">
              By using our Services, you acknowledge that you have read,
              understood, and agree to these Terms and Conditions.
            </p>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Terms;
