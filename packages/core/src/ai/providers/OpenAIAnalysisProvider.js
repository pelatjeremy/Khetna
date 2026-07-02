const DEFAULT_OPENAI_MODEL = 'gpt-4.1-mini';
const OPENAI_RESPONSES_URL = 'https://api.openai.com/v1/responses';

export class OpenAIAnalysisProvider {
  constructor({
    apiKey = process.env.OPENAI_API_KEY,
    model = process.env.OPENAI_MODEL || DEFAULT_OPENAI_MODEL,
    fetchFn = fetch,
  } = {}) {
    this.apiKey = apiKey;
    this.model = model;
    this.fetchFn = fetchFn;
  }

  async request(prompt) {
    return this.analyze(prompt);
  }

  async analyze(prompt) {
    const model = this.model || null;

    if (!this.apiKey) {
      return this.errorResponse('OPENAI_API_KEY_MISSING', 'OPENAI_API_KEY is required.', model);
    }

    if (!model) {
      return this.errorResponse('OPENAI_MODEL_MISSING', 'OPENAI_MODEL is required.', null);
    }

    try {
      const response = await this.fetchFn(OPENAI_RESPONSES_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          input: this.serializePrompt(prompt),
        }),
      });

      const data = await this.readJson(response);

      if (!response.ok) {
        return this.errorResponse(
          this.normalizeErrorCode(data?.error?.code, response.status),
          data?.error?.message || `OpenAI request failed with status ${response.status}.`,
          model,
        );
      }

      return {
        success: true,
        provider: 'openai',
        model,
        content: this.extractContent(data),
        raw: data,
        error: null,
      };
    } catch (error) {
      return this.errorResponse('OPENAI_PROVIDER_ERROR', error?.message, model);
    }
  }

  serializePrompt(prompt) {
    return typeof prompt === 'string' ? prompt : JSON.stringify(prompt);
  }

  async readJson(response) {
    try {
      return await response.json();
    } catch {
      return null;
    }
  }

  extractContent(response) {
    if (typeof response?.output_text === 'string') {
      return response.output_text;
    }

    const textParts = response?.output
      ?.flatMap((item) => item?.content ?? [])
      ?.map((content) => content?.text)
      ?.filter((text) => typeof text === 'string');

    return textParts?.length ? textParts.join('\n') : '';
  }

  normalizeErrorCode(code, status) {
    if (code) {
      return String(code).toUpperCase();
    }

    return status ? `OPENAI_HTTP_${status}` : 'OPENAI_PROVIDER_ERROR';
  }

  errorResponse(code, message, model) {
    return {
      success: false,
      provider: 'openai',
      model,
      content: null,
      raw: null,
      error: {
        code,
        message: this.sanitizeErrorMessage(message),
      },
    };
  }

  sanitizeErrorMessage(message) {
    let sanitized = String(message || 'OpenAI provider error.');

    for (const secret of [this.apiKey, process.env.OPENAI_API_KEY]) {
      if (secret) {
        sanitized = sanitized.replaceAll(secret, '[redacted]');
      }
    }

    return sanitized
      .replace(/Bearer\s+[A-Za-z0-9._-]+/gi, 'Bearer [redacted]')
      .replace(/OPENAI_API_KEY=[^\s&]+/gi, 'OPENAI_API_KEY=[redacted]');
  }
}
