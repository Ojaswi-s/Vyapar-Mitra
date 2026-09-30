// Mock Backend API using Promises and LocalStorage to simulate real server latency

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  // Simulate POST /api/register
  registerUser: async (userData) => {
    await delay(1000); // simulate network latency
    if (!userData.name || !userData.mobile) {
      throw new Error("Missing required fields");
    }
    const userToSave = { ...userData, margin: Number(userData.margin) || 14000 };
    localStorage.setItem('vm_user', JSON.stringify(userToSave));
    localStorage.setItem('vm-lang', userData.lang || 'en');
    return { success: true, data: userToSave, message: "User registered successfully" };
  },

  // Simulate GET /api/user/profile
  getUserProfile: async () => {
    await delay(500); // simulate network latency
    const stored = localStorage.getItem('vm_user');
    if (stored) {
      return { success: true, data: JSON.parse(stored) };
    }
    throw new Error("User not found. Please register.");
  },

  // Simulate GET /api/reports/recent
  getRecentReports: async () => {
    await delay(800);
    // In a real app, this would query a database. For now we use the mock data structure.
    return { success: true, data: [] }; // The admin page uses mockAdmin.recentReports instead.
  },
  
  // Simulate POST /api/chat
  sendChatMessage: async (message) => {
    await delay(1200); // simulate AI processing time
    return { 
      success: true, 
      response: `(Simulated Backend Response): I understand you're asking about "${message}". As an AI advisor, I recommend exploring local government schemes for this.` 
    };
  }
};
