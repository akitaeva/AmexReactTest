import React, { useRef, useState } from 'react';


const tabData = [
  {
    label: 'HTML',
    content: 
      'The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.'
  }, 
  { 
    label: 'CSS',
    content: 
      'Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.'
  },
  { 
    label: 'JavaScript',
    content: 
      'JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.'
  },
];

const Tabs: React.FC = () => { 
  const [activeTab, setActiveTab]  = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);  // Stable ref array

  // Handle key navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    let newIndex = activeTab;

    if (e.key === 'ArrowRight') {
      newIndex = (activeTab + 1) % tabData.length; // Move to next tab
    } else if (e.key === 'ArrowLeft') {
      newIndex = (activeTab - 1 + tabData.length) % tabData.length; // Move to previous tab
    }

    if (newIndex !== activeTab) {
      setActiveTab(newIndex);
      tabRefs.current[newIndex]?.focus(); // Explicitly move focus
    }
  };

  return (
   <div style={containerStyles}>
    {/*Tab Header */}
    <div style={headerStyles} role="tablist">
      {tabData.map((tab,index)=> (
        <button 
          key={index} 
          ref={(el) => {
            tabRefs.current[index] = el!;
          }} // Attach ref to button
          role="tab"
          aria-selected={activeTab === index}
          onClick={()=> setActiveTab(index)}
          style={{...buttonStyles,
            color: activeTab === index? 'blue' : 'black', // Highlight active tab
            borderBottom: activeTab === index ? '2px solid blue' : 'none',
            fontWeight: activeTab === index ? 'bold' : 'normal'
          }}>
            {tab.label}
        </button>
      ))}
    </div>
    {/*Tab Content */}
    <div style={contentStyles} role="tabpanel">
      <p>{tabData[activeTab].content}</p>
    </div>
   </div>
  );
};

export default Tabs;


// Tab container styles
const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '20rem',
  overflow: 'auto',
  margin: '0.5rem auto',
  maxWidth: '20rem',
} as React.CSSProperties;

// Header styles
const headerStyles = {
  display: 'flex',
  borderBottom: '1px solid #ccc',
} as React.CSSProperties;

// Button styles
const buttonStyles = {
  background: 'none',
  border: 'none',
  padding: '.75rem 1.25rem',
  fontSize: '1rem',
  cursor: 'pointer',
  outline: 'none',
  transition: 'color 0.3s, border-bottom 0.3s',
} as React.CSSProperties;

// Content styles
const contentStyles = {
  padding: '1.25rem',
  fontSize: '0.875rem',
  lineHeight: '1.6',
  color: '#333',
} as React.CSSProperties;