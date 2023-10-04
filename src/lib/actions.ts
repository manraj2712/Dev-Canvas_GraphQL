export const uploadImage = async (imagePath:string, token:string) => {
    try {
        const res = await fetch('/api/upload-image', {
            method: 'POST',
            body: JSON.stringify({ path: imagePath }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        return res.json();

    } catch (error) {
        throw error;
    }
};