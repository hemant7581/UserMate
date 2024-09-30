const API_URL = 'https://jsonplaceholder.typicode.com/users';

// Fetch all users
export const fetchUsers = async () => {
  try {
    const response = await fetch(API_URL);
    return await response.json();
  } catch (error) {
    throw new Error('Failed to fetch users',error);
  }
};

// Create new user
export const createUser = async (userData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return await response.json();
  } catch (error) {
    throw new Error('Failed to create user',error);
  }
};

// Update user by ID
export const updateUser = async (id, userData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return await response.json();
  } catch (error) {
    throw new Error('Failed to update user',error);
  }
};

// Delete user by ID
export const deleteUser = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    return response.ok;
  } catch (error) {
    throw new Error('Failed to delete user',error);
  }
};
