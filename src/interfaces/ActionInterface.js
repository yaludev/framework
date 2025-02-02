class ActionInterface {
    /**
     * Returns metadata about the action.
     * @returns {Object}
     */
    meta() {
      throw new Error('Method not implemented.');
    }
  
    /**
     * Returns an array of event names that this action listens to.
     * @returns {string[]}
     */
    listenTo() {
      throw new Error('Method not implemented.');
    }
  
    /**
     * Handles the event when it occurs.
     * @param {Object} payload - The event payload.
     */
    handle(payload) {
      throw new Error('Method not implemented.');
    }
  
    /**
     * Returns configuration options for the action.
     * @returns {Object[]}
     */
    configs() {
      throw new Error('Method not implemented.');
    }
  }
  
  module.exports = ActionInterface;
  