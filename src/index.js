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

  return <div />;
};

export default CompaniesTabbedNav;
