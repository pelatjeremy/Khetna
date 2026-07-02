# UML - Scheduler Engine

```txt
+----------------------+
|   SchedulerEngine    |
+----------------------+
| - jobs               |
+----------------------+
| + registerJob()      |
| + triggerJob()       |
| + listJobs()         |
+----------+-----------+
           |
           | uses
           v
+----------------------+
|     SchedulerJob     |
+----------------------+
| - id                 |
| - name               |
| - trigger            |
| - context            |
| - enabled            |
+----------+-----------+
           |
           | has
           v
+----------------------+
|   SchedulerTrigger   |
+----------------------+
| - type               |
| - config             |
| - enabled            |
+----------------------+

+----------------------+
|   SchedulerContext   |
+----------------------+
| - source             |
| - payload            |
| - metadata           |
+----------------------+
```

## Notes

This diagram only represents the abstract Scheduler structure.

It does not represent real planning.
