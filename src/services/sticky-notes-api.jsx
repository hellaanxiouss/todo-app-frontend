export const GetStickyNotes = async () => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BASE_URL}/get-sticky-notes`,
      requestOptions
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching Sticky Notes:", error);
    throw error;
  }
};

export const CreateStickyNote = async (noteName, noteDescription, color) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: noteName, content: noteDescription, bgColor: color }),
    redirect: "follow",
  };
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BASE_URL}/create-sticky-note`,
      requestOptions
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to Create a Sticky Note:", error);
    throw error;
  }
};

export const SoftDeleteStickyNote = async (listId) => {
  const requestOptions = {
    method: "PUT",
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BASE_URL}/soft-delete-sticky-note/${listId}`,
      requestOptions
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to Delete Sticky Note:", error);
    throw error;
  }
};
