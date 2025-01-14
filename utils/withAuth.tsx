// utils/withAuth.tsx
import React from 'react';

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const AuthenticatedComponent: React.FC<any> = (props) => {
    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;