import React, { useState } from 'react';

const Tabs = ({ children }) => {
  if (!Array.isArray(children) || children.length === 0) {
    console.error("Tabs component must have at least one Tab child");
    return null;
  }

  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const handleClick = (newActiveTab) => {
    setActiveTab(newActiveTab);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex border-b border-gray-300">
        {children.map(child => (
          <button
            key={child.props.label}
            className={`${
              activeTab === child.props.label ? 'border-b-2 border-purple-500' : ''
            } flex-1 text-gray-700 font-medium py-2 focus:outline-none`}
            onClick={() => handleClick(child.props.label)}
          >
            {child.props.label}
          </button>
        ))}
      </div>
      <div className="py-4">
        {children.map(child => (
          <div key={child.props.label} className={activeTab === child.props.label ? '' : 'hidden'}>
            {child.props.children}
          </div>
        ))}
      </div>
    </div>
  );
};


const Tab = ({ label, children }) => {
  return (
    <div>
      {children}
    </div>
  );
};

export { Tabs, Tab };
