
const FAQSection = () => {
  return (
    <div className="container py-5 text-center">
      {/* Tag */}
      <div className="mb-2">
        <span className="badge bg-light text-dark rounded-pill px-3 py-2">
          ● Frequently Asked Questions
        </span>
      </div>

      {/* Headings */}
      <h2 className="fw-bold mb-1 pinkish">Got Questions?</h2>
      <h2 className="fw-bold mb-3">
        <span style={{ color: "#7a124d", borderBottom: "4px solid #e4a4cc" }}>We've Got Answers</span></h2>
      <p className="text-muted mb-5">
        Everything you need to know about our platforms and how they work.
      </p>

      {/* FAQ Cards */}
      <div className="row g-4">
        {/* 1 */}
        <div className="col-md-6">
          <div className="p-4 rounded bg-light text-start h-100 shadow-sm">
            <h6 className="fw-semibold text-dark">What platforms do you offer?</h6>
            <p className="text-muted mb-0">
              We offer ShareHub for community item sharing, SocialHub for social networking, and StudyMate for educational management. All platforms are designed to build stronger communities.
            </p>
          </div>
        </div>

        {/* 2 */}
        <div className="col-md-6">
          <div className="p-4 rounded bg-light text-start h-100 shadow-sm">
            <h6 className="fw-semibold text-dark">Is StudyMate suitable for all educational levels?</h6>
            <p className="text-muted mb-0">
              Yes! StudyMate is designed to work for schools, colleges, universities, and even professional training programs. It scales to meet different educational needs.
            </p>
          </div>
        </div>

        {/* 3 */}
        <div className="col-md-6">
          <div className="p-4 rounded bg-light text-start h-100 shadow-sm">
            <h6 className="fw-semibold text-dark">How do teachers and students interact on StudyMate?</h6>
            <p className="text-muted mb-0">
              Teachers can create assignments, post announcements, grade work, and resolve doubts. Students can submit assignments, ask questions, access materials, and chat with peers.
            </p>
          </div>
        </div>

        {/* 4 */}
        <div className="col-md-6">
          <div className="p-4 rounded bg-light text-start h-100 shadow-sm">
            <h6 className="fw-semibold text-dark">Can I use multiple platforms with one account?</h6>
            <p className="text-muted mb-0">
              Absolutely! You can use the same account across all platforms. Share items on ShareHub, connect socially on SocialHub, and learn on StudyMate.
            </p>
          </div>
        </div>

        {/* 5 */}
        <div className="col-md-6">
          <div className="p-4 rounded bg-light text-start h-100 shadow-sm">
            <h6 className="fw-semibold text-dark">Are the platforms mobile-friendly?</h6>
            <p className="text-muted mb-0">
              Yes! All platforms are fully responsive and work seamlessly on smartphones, tablets, and desktops with native app-like experiences.
            </p>
          </div>
        </div>

        {/* 6 */}
        <div className="col-md-6">
          <div className="p-4 rounded bg-light text-start h-100 shadow-sm">
            <h6 className="fw-semibold text-dark">How do you ensure data privacy and security?</h6>
            <p className="text-muted mb-0">
              We use enterprise-grade security, encrypt all data, never sell personal information, and provide granular privacy controls for all users.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
