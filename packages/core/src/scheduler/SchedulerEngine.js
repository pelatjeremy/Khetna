import { SchedulerJob } from './SchedulerJob.js';

function normalizeSchedulerError(error) {
  return {
    success: false,
    error: {
      code: error?.code || 'SCHEDULER_ERROR',
      message: error?.message || 'Scheduler operation failed.',
    },
  };
}

function getTriggerConfig(job) {
  return job?.trigger?.config || {};
}

export class SchedulerEngine {
  constructor({ jobs = [], tradingCore = null, notificationEngine = null } = {}) {
    this.jobs = new Map();
    this.timers = new Map();
    this.tradingCore = tradingCore;
    this.notificationEngine = notificationEngine;

    jobs.forEach((job) => this.registerJob(job));
  }

  registerJob(jobConfig) {
    const job = jobConfig instanceof SchedulerJob ? jobConfig : new SchedulerJob(jobConfig);
    this.jobs.set(job.id, job);

    return job;
  }

  startJob(jobId) {
    try {
      const job = this.getJob(jobId);
      const intervalMs = getTriggerConfig(job).intervalMs;

      if (!job.enabled) {
        throw new Error('Cannot start a disabled scheduler job.');
      }

      if (this.timers.has(job.id)) {
        return { success: true, job, started: true, alreadyStarted: true };
      }

      if (Number.isFinite(intervalMs) && intervalMs > 0) {
        const timer = setInterval(() => {
          this.runJob(job.id);
        }, intervalMs);

        this.timers.set(job.id, timer);
      }

      return { success: true, job, started: true };
    } catch (error) {
      return normalizeSchedulerError(error);
    }
  }

  stopJob(jobId) {
    try {
      const job = this.getJob(jobId);
      const timer = this.timers.get(job.id);

      if (timer) {
        clearInterval(timer);
        this.timers.delete(job.id);
      }

      return { success: true, job, stopped: true };
    } catch (error) {
      return normalizeSchedulerError(error);
    }
  }

  async runJob(jobId) {
    try {
      const job = this.getJob(jobId);

      if (!job.enabled) {
        throw new Error('Cannot run a disabled scheduler job.');
      }

      const result =
        typeof job.task === 'function' ? await job.task(job) : await this.runTradingCore(job);
      const notification = this.notificationEngine?.notify
        ? this.notificationEngine.notify(result)
        : null;

      return {
        success: true,
        job,
        triggered: true,
        result,
        notification,
      };
    } catch (error) {
      return normalizeSchedulerError(error);
    }
  }

  triggerJob(jobOrId) {
    const jobId = typeof jobOrId === 'string' ? jobOrId : jobOrId?.id;

    return this.runJob(jobId);
  }

  listJobs() {
    return [...this.jobs.values()];
  }

  getJob(jobId) {
    const job = this.jobs.get(jobId);

    if (!job) {
      throw new Error('Scheduler job not found.');
    }

    return job;
  }

  runTradingCore(job) {
    if (!this.tradingCore || typeof this.tradingCore.run !== 'function') {
      throw new Error('TradingCore.run is required to execute this scheduler job.');
    }

    return this.tradingCore.run(job.input ?? job.context?.payload ?? {});
  }
}
