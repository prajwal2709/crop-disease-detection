/**
 * Local Storage Service for managing detection history
 */

const HISTORY_KEY = 'crop_disease_history';
const MAX_HISTORY_ITEMS = 5;

/**
 * Get all detection history
 * @returns {Array} Array of detection records
 */
export const getHistory = () => {
  try {
    const history = localStorage.getItem(HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error reading history:', error);
    return [];
  }
};

/**
 * Add a new detection to history
 * @param {Object} detection - Detection result object
 */
export const addToHistory = (detection) => {
  try {
    const history = getHistory();
    
    // Add timestamp and ID
    const newDetection = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...detection,
    };
    
    // Add to beginning of array
    history.unshift(newDetection);
    
    // Keep only last 5 items
    const limitedHistory = history.slice(0, MAX_HISTORY_ITEMS);
    
    localStorage.setItem(HISTORY_KEY, JSON.stringify(limitedHistory));
    return newDetection;
  } catch (error) {
    console.error('Error saving to history:', error);
  }
};

/**
 * Clear all history
 */
export const clearHistory = () => {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error('Error clearing history:', error);
  }
};

/**
 * Delete a specific history item
 * @param {number} id - ID of the item to delete
 */
export const deleteHistoryItem = (id) => {
  try {
    const history = getHistory();
    const filtered = history.filter(item => item.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting history item:', error);
  }
};

/**
 * Get detection statistics
 * @returns {Object} Statistics object
 */
export const getStats = () => {
  try {
    const history = getHistory();
    const total = history.length;
    const diseased = history.filter(h => h.disease && h.disease.toLowerCase() !== 'healthy').length;
    const healthy = total - diseased;
    
    return {
      total,
      diseased,
      healthy,
    };
  } catch (error) {
    console.error('Error calculating stats:', error);
    return { total: 0, diseased: 0, healthy: 0 };
  }
};
