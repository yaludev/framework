class ActionRegistry {
    constructor() {
      this.actions = {};
    }
  
    /**
     * Register an action instance.
     * @param {ActionInterface} actionInstance
     */
    register(actionInstance) {
      const actionId = actionInstance.meta().id;
      if (actionId) {
        this.actions[actionId] = actionInstance;
      } else {
        console.warn('Action instance does not have an id in its meta() method.');
      }
    }
  
    /**
     * Get an action instance by its id.
     * @param {string} actionId
     * @returns {ActionInterface|null}
     */
    get(actionId) {
      return this.actions[actionId] || null;
    }
  
    /**
     * Get all registered actions.
     * @returns {Object} - A map of actionId to actionInstance
     */
    getAll() {
      return this.actions;
    }
  }
  
  module.exports = ActionRegistry;
  