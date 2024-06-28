export const GetTags = async () => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BASE_URL}/get-tag`,
      requestOptions
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching lists:", error);
    throw error;
  }
};

export const CreateTag = async (name, color) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tag_name: name, tag_color: color }),
    redirect: "follow",
  };
  console.log("reqop", requestOptions.body);
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BASE_URL}/create-tag`,
      requestOptions
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to Create a List:", error);
    throw error;
  }
};

export const SoftDeleteTag = async (taskId) => {
  const requestOptions = {
    method: "PUT",
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BASE_URL}/soft-delete-tag/${taskId}`,
      requestOptions
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to Delete List:", error);
    throw error;
  }
};
