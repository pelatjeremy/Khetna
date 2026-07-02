export class NotificationRule {
  constructor(name = null, predicate = null) {
    this.name = name;
    this.predicate = predicate;
  }

  matches(context) {
    // TODO: Keep rule evaluation abstract; future sprints may inject predicates.
    if (typeof this.predicate !== 'function') {
      return false;
    }

    return Boolean(this.predicate(context));
  }
}
