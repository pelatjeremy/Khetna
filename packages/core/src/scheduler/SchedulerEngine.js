export class SchedulerEngine {
  constructor({ jobs = [] } = {}) {
    this.jobs = jobs;
  }

  registerJob(job) {
    this.jobs = [...this.jobs, job];

    return job;
  }

  triggerJob(job) {
    // TODO: Connect this orchestration point to the Trading Core in a validated sprint.
    return {
      job,
      triggered: false,
    };
  }

  listJobs() {
    return this.jobs;
  }
}
