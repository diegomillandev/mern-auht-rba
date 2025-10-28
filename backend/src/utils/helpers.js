export const formatZodError = (error) => {
    const { fieldErrors } = error.flatten();

    return Object.fromEntries(
        Object.entries(fieldErrors).map(([key, value]) => [key, value[0]])
    );
}