export async function safeExecute(action) {
  try {
    return await action();
  } catch (error) {
    console.error("Test execution error:", error);
    throw error;
  }
}
