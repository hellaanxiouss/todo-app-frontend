export const GetTasks = async () => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BASE_URL}/get-task`,
      requestOptions
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const GetTaskById = async (taskId) => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BASE_URL}/get-task/${taskId}`,
      requestOptions
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching the task:", error);
    throw error;
  }
};

export const CreateTask = async (taskData) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(taskData),
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BASE_URL}/create-task`,
      requestOptions
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const UpdateTask = async (taskId, taskData) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(taskData),
  };  

  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BASE_URL}/update-task/${taskId}`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error("Failed to update task");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const SoftDeleteTask = async (taskId) => {
  const requestOptions = {
    method: "PUT",
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BASE_URL}/soft-delete-task/${taskId}`,
      requestOptions
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to Delete task:", error);
    throw error;
  }
};

export const DeleteTask = async (taskId) => {
  const requestOptions = {
    method: "DELETE",
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BASE_URL}/delete-task/${taskId}`,
      requestOptions
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to Permanently Delete task:", error);
    throw error;
  }
};
