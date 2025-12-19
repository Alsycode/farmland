import React from 'react';

/**
 * Terms & Conditions Page
 * - Professional spacing with dividers between sections
 * - Bold numbered titles with horizontal lines
 * - Adequate spacing for readability
 */

const TERMS_HTML = `
  <div class="section">
    <p class="intro">
      <strong>Welcome to myFarmland Pvt. Ltd.</strong><br/>
      By accessing or using our platform, you agree to comply with and be bound by the
      following terms and conditions. Please read them carefully before proceeding.
    </p>
  </div>

  <div class="section">
    <h2 class="section-title">1. General Disclaimer</h2>
    <div class="divider"></div>
    <p class="content">
      myFarmland Pvt. Ltd. provides an online platform to connect property seekers,
      providers, and related service providers. While we strive to ensure accurate and
      reliable information, the content and listings on our platform are provided for
      reference purposes only.
    </p>
    <p class="content">
      Users are advised to independently verify all information before making decisions.
      myFarmland Pvt. Ltd. does not offer professional advice or guarantee the accuracy,
      authenticity, or reliability of any user-submitted content.
    </p>
  </div>

  <div class="section">
    <h2 class="section-title">2. User Responsibilities</h2>
    <div class="divider"></div>
    <ul class="content-list">
      <li>Users must exercise caution and due diligence when engaging with other users.</li>
      <li>Compliance with all applicable laws and regulations is the sole responsibility of the user.</li>
      <li>myFarmland Pvt. Ltd. is not liable for any financial, legal, or transactional obligations between users, including buyers, sellers, licensors, or licensees.</li>
    </ul>
  </div>

  <div class="section">
    <h2 class="section-title">3. Zero-Brokerage Policy</h2>
    <div class="divider"></div>
    <p class="content">
      myFarmland Pvt. Ltd. adheres to a zero-brokerage model. However, we do not
      measure the financial capability of users or validate the legality of transactions
      undertaken on the platform.
    </p>
  </div>

  <div class="section">
    <h2 class="section-title">4. Limitation of Liability</h2>
    <div class="divider"></div>
    <ul class="content-list">
      <li>No liability for errors, omissions, delays, interruptions, or inaccuracies.</li>
      <li>No responsibility for technical issues such as network or server failures.</li>
      <li>No liability for damages arising from use of the platform.</li>
      <li>Users must comply with all applicable laws when using systems or services.</li>
      <li>No responsibility for disclosure or misuse of user information, whether intentional or inadvertent.</li>
      <li>No guarantee that the platform or linked websites are free from viruses or harmful components.</li>
    </ul>
  </div>

  <div class="section">
    <h2 class="section-title">5. User-Generated Content</h2>
    <div class="divider"></div>
    <ul class="content-list">
      <li>The platform does not control or guarantee the accuracy or legality of user-generated content.</li>
      <li>Users assume full responsibility for their interactions, postings, and communications on the platform.</li>
    </ul>
  </div>

  <div class="section">
    <h2 class="section-title">6. Transactions and Relationships</h2>
    <div class="divider"></div>
    <ul class="content-list">
      <li>myFarmland Pvt. Ltd. does not act as an intermediary.</li>
      <li>No guarantee of transaction completion.</li>
      <li>Users are solely responsible for verifying authenticity of other parties.</li>
    </ul>
  </div>

  <div class="section">
    <h2 class="section-title">7. Privacy and Security</h2>
    <div class="divider"></div>
    <ul class="content-list">
      <li>myFarmland Pvt. Ltd. is committed to protecting user privacy but does not guarantee against unauthorized access or regulatory disclosures.</li>
      <li>Users are advised to safeguard their personal and financial information.</li>
    </ul>
  </div>

  <div class="section">
    <h2 class="section-title">8. No Warranty</h2>
    <div class="divider"></div>
    <p class="content">
      The platform and services are provided "as-is" without warranties of any kind.
      myFarmland Pvt. Ltd. does not guarantee uninterrupted service or absence
      of harmful components.
    </p>
  </div>

  <div class="section">
    <h2 class="section-title">9. Intellectual Property</h2>
    <div class="divider"></div>
    <ul class="content-list">
      <li>All content, design, and functionality are the intellectual property of myFarmland Pvt. Ltd.</li>
      <li>Unauthorized use, duplication, or distribution is strictly prohibited.</li>
    </ul>
  </div>

  <div class="section">
    <h2 class="section-title">10. Modifications and Updates</h2>
    <div class="divider"></div>
    <p class="content">
      myFarmland Pvt. Ltd. reserves the right to modify or update these terms at
      any time without prior notice. Continued use of the platform constitutes
      acceptance of such changes.
    </p>
  </div>

  <div class="section">
    <h2 class="section-title">11. Governing Law</h2>
    <div class="divider"></div>
    <p class="content">
      These terms are governed by the laws of India. Any disputes shall be subject
      to the exclusive jurisdiction of the courts in Bangalore, Karnataka.
    </p>
  </div>

  <div class="section">
    <p class="closing">
      By using myFarmalnd Pvt. Ltd., you acknowledge and agree to these terms
      and conditions.
    </p>
  </div>
`;

export default function TermsAndConditions() {
  return (
    <div className="bg-[#eef4ee]">
      {/* HERO */}
      <section
        className="relative h-[260px] flex items-end"
        style={{
          backgroundImage: "url('/Farmland-Ownership.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative max-w-7xl mx-auto px-6 pb-10">
          <p className="text-sm uppercase tracking-[0.2em] text-green-100/80">
            Legal Information
          </p>
          <h1 className="mt-2 text-4xl font-semibold text-white">
            Terms & Conditions
          </h1>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-14">
        <div className="max-w-5xl mx-auto px-4">
          <div
            className="
              bg-[#eef4ee] rounded-3xl p-8 md:p-12
              shadow-[6px_6px_12px_#cfd8cf,-6px_-6px_12px_#ffffff]
              border border-green-100/70
            "
          >
            {/* Top meta row */}
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-green-200/50">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-600">
                  myFarmland Pvt. Ltd.
                </p>
                <p className="mt-1 text-sm text-green-700/80">
                  Last updated: 18 December 2025
                </p>
              </div>
              <span className="inline-flex items-center rounded-full border border-green-200/80 px-3 py-1 text-xs font-medium text-green-800 bg-white/40">
                Legal · Terms of Use
              </span>
            </div>

            {/* Styled legal content */}
            <div
              className="
                prose prose-green max-w-none space-y-0
                [&_.section]:mb-8 [&_.section]:last:mb-0
                [&_.section-title]:text-2xl [&_.section-title]:font-bold [&_.section-title]:text-green-900 [&_.section-title]:mb-4 [&_.section-title]:mt-0
                [&_.divider]:h-px [&_.divider]:w-full [&_.divider]:bg-gradient-to-r [&_.divider]:from-transparent [&_.divider]:via-green-200/50 [&_.divider]:to-transparent [&_.divider]:my-6
                [&_.content]:text-lg [&_.content]:leading-relaxed [&_.content]:text-green-800 [&_.content]:mb-4 [&_.content]:last:mb-0
                [&_.content-list]:space-y-3 [&_.content-list]:mt-0 [&_.content-list]:mb-0
                [&_.content-list_li]:text-lg [&_.content-list_li]:text-green-800 [&_.content-list_li]:leading-relaxed [&_.content-list_li]:before:mr-3 [&_.content-list_li]:before:content-['•'] [&_.content-list_li]:before:text-green-600
                [&_.intro]:text-lg [&_.intro]:font-medium [&_.intro]:text-green-800 [&_.intro]:mb-8
                [&_.closing]:mt-12 [&_.closing]:pt-8 [&_.closing]:text-lg [&_.closing]:font-semibold [&_.closing]:text-green-900 [&_.closing]:border-t [&_.closing]:border-green-200/50
              "
            >
              <div dangerouslySetInnerHTML={{ __html: TERMS_HTML }} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
