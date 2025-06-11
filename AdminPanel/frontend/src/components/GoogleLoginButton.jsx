const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = "https://brand-driver-server.onrender.com/api/user/google"; 
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md"
    >
      Continue with Google
    </button>
  );
};

export default GoogleLoginButton;
