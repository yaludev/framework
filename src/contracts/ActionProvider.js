class ActionProvider {
  constructor() {
    this.actions = {};
  }

  register(actionName, handler) {
    if (typeof handler.listenTo !== "function") {
      throw new Error(
        `Handler for action "${actionName}" must implement "listenTo" method.`
      );
    }
    this.actions[actionName] = handler;
  }

  get(actionName) {
    return this.actions[actionName];
  }

  getActionsForEvent(eventName) {
    return Object.keys(this.actions).filter((actionName) => {
      const handler = this.get(actionName);
      return handler.listenTo().includes(eventName);
    });
    // .map((actionName)=> {
    //   const handler = this.get(actionName);

    //   const validNextActions =  handler.nextActions();
    //   const targets =  validNextActions.map((row)=> row.event);
    //   return {
    //     action:actionName,
    //     validActions:validNextActions,
    //     targets:targets,
    //   }
    // });
  }

}

module.exports = new ActionProvider();
