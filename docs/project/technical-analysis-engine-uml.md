# UML - Technical Analysis Engine

```txt
+-----------------------------+
| TechnicalAnalysisEngine     |
+-----------------------------+
| - indicatorProvider         |
| - snapshotMapper            |
+-----------------------------+
| + analyze(marketData)       |
+-----------------------------+
              |
              v
+-----------------------------+
| TechnicalIndicatorProvider  |
+-----------------------------+
| + analyze(marketData)       |
+-----------------------------+
              |
              v
+-----------------------------+
| TechnicalSnapshotMapper     |
+-----------------------------+
| + toTechnicalSnapshot(input)|
+-----------------------------+
```
