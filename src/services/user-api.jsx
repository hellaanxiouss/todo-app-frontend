export const createUser = async (userData) => {
  console.log("userData", userData);
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  };

  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BASE_URL}/create-user`,
      requestOptions
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create user");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const authenticateUser = async (email, password) => {
  try {
    const response = await fetch('http://localhost:8085/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error during authentication:', error);
    return null;
  }
};
