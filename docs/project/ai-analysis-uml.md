# UML - AI Analysis Engine

```txt
+----------------------+
|  AIAnalysisEngine    |
+----------------------+
| - provider           |
| - promptBuilder      |
| - responseMapper     |
+----------------------+
| + analyze(context)   |
+----------+-----------+
           |
           v
+----------------------+
|    PromptBuilder     |
+----------------------+
| + build(context)     |
+----------------------+

+----------------------+
|  AIAnalysisProvider  |
+----------------------+
| + request(prompt)    |
+----------------------+

+----------------------+
|   AIResponseMapper   |
+----------------------+
| + map(response)      |
+----------------------+
```

## Lecture

AIAnalysisEngine orchestre le flux.

Il s'appuie sur :

- PromptBuilder pour preparer la demande
- AIAnalysisProvider pour obtenir une reponse simulee
- AIResponseMapper pour normaliser le resultat
