import React from "react";

const FAQ = () => {
  const faqs = [
    {
      question: "What is this website about?",
      answer: "This website about store Management of Injibara University ."
    },
    {
      question: "How can I contact support?",
      answer: "You can contact support by sending an email to mareye132@gmail.com."
    },
    
  ];

  return (
    <div>
      <h1>Frequently Asked Questions</h1>
      {faqs.map((faq, index) => (
        <div key={index}>
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
