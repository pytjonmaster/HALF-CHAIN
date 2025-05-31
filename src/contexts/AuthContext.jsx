import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // Initialize user state from localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Initialize mockUsers from localStorage or with default value
  const [mockUsers, setMockUsers] = useState(() => {
    const savedUsers = localStorage.getItem('mockUsers');
    return savedUsers ? JSON.parse(savedUsers) : {
      'test@example.com': 'password123'
    };
  });

  // Store for verification codes
  const [verificationCodes, setVerificationCodes] = useState({});

  // Save mockUsers to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('mockUsers', JSON.stringify(mockUsers));
  }, [mockUsers]);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendVerificationCode = async (email) => {
    try {
      setLoading(true);
      setError('');

      // Check if user exists
      if (!mockUsers[email]) {
        throw new Error('No account found with this email address');
      }

      // Generate and store verification code
      const code = generateVerificationCode();
      setVerificationCodes(prev => ({
        ...prev,
        [email]: code
      }));

      // Simulate sending email
      console.log(`Verification code for ${email}: ${code}`);
      
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async (email, code) => {
    try {
      setLoading(true);
      setError('');

      if (!verificationCodes[email]) {
        throw new Error('No verification code found. Please request a new code.');
      }

      if (verificationCodes[email] !== code) {
        throw new Error('Incorrect verification code. Please try again.');
      }

      // Clear the used verification code
      setVerificationCodes(prev => {
        const newCodes = { ...prev };
        delete newCodes[email];
        return newCodes;
      });

      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email, newPassword) => {
    try {
      setLoading(true);
      setError('');

      // Update the password
      setMockUsers(prev => ({
        ...prev,
        [email]: newPassword
      }));

      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email, password) => {
    try {
      setLoading(true);
      setError('');
      
      // Check if user already exists
      if (mockUsers[email]) {
        throw new Error('An account with this email already exists');
      }

      // Add new user to mockUsers
      setMockUsers(prev => ({
        ...prev,
        [email]: password
      }));
      
      setUser({ email });
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signin = async (email, password) => {
    try {
      setLoading(true);
      setError('');
      
      // Simulate backend validation
      if (!mockUsers[email]) {
        throw new Error('No account found with this email address');
      }
      
      if (mockUsers[email] !== password) {
        throw new Error('Incorrect password. Please try again');
      }

      // If validation passes, set the user
      setUser({ email });
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    loading,
    error,
    signup,
    signin,
    signout,
    sendVerificationCode,
    verifyCode,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
} 