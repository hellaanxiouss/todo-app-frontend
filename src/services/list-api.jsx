export const GetLists = async () => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BASE_URL}/get-list`,
      requestOptions
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching lists:", error);
    throw error;
  }
};

export const CreateList = async (name, color) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ list_name: name, list_color: color }),
    redirect: "follow",
  };
  console.log("reqop", requestOptions.body);
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BASE_URL}/create-list`,
      requestOptions
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to Create a List:", error);
    throw error;
  }
};

export const SoftDeleteList = async (listId) => {
  const requestOptions = {
    method: "PUT",
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BASE_URL}/soft-delete-list/${listId}`,
      requestOptions
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to Delete List:", error);
    throw error;
  }
};
