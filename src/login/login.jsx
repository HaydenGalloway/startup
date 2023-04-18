import React from 'react';

import { Unauthenticated } from './Unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';

import './login.css';

export function Login({ userName, authState, onAuthChange }) {
  return (
    <main className='container-fluid bg-dark-grey text-center' style={{ minHeight: "100vh" }}>
      <div>
        {authState !== AuthState.Unknown && <h2>Make a List. Check it twice.</h2>}
        {authState === AuthState.Authenticated && (
          <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
        )}
        {authState === AuthState.Unauthenticated && (
          <Unauthenticated
            userName={userName}
            onLogin={(loginUserName) => {
              onAuthChange(loginUserName, AuthState.Authenticated);
            }}
          />
        )}
      </div>
    </main>
  );
}
