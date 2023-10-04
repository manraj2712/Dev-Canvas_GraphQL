export const uploadImage = async (imagePath: string) => {
  try {
    const res = await fetch("/api/upload-image", {
      method: "POST",
      body: JSON.stringify({ path: imagePath }),
    });
    return res.json();
  } catch (error) {
    throw error;
  }
};

export const getToken = async () => {
  try {
    const res = await fetch("/api/auth/token");
    return res.json();
  } catch (error) {
    throw error;
  }
};