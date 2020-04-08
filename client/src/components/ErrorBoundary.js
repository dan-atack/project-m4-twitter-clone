import React from 'react';
import styled from 'styled-components';
import { CurrentUserContext } from './CurrentUserContext';

function ErrorBoundary({ children }) {

    const [error, setError] = React.useState(null);

    const componentDidCatch = (error) => {
      if (error) {
        return (
          <div>
            <h2>Something went wrong.</h2>
          </div>
          );
        }
    }

    componentDidCatch();
    // Normally, just render children
    return { children };  
};

export default ErrorBoundary;