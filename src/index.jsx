import React from 'react';

const CompaniesTabbedNav = () => {
  const handleTabChange = (nextTab) => {
    switch (nextTab) {
      case 'active':
        console.log('active');
        break;
      case 'removed':
        console.log('removed');
        break;
      default:
        break;
    }
  };

  return <div>TEST</div>;
};

export default CompaniesTabbedNav;
