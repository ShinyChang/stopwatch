const noop = () => {};

const defaultOptions = {
  onProgress: noop,
  onStatusChange: noop
};

export const IDLE = 'idle';
export const STOPPED = 'stopped';
export const ACTIVE = 'active';
export const PAUSED = 'paused';

class Stopwatch {
  constructor(seconds, options) {
    this.remain = seconds;
    this.status = IDLE;
    this.options = Object.assign({}, defaultOptions, options);
    this._initialValue = seconds;
    this._lastTimestamp = null;
    this._rafRequestId = null;
  }

  _step() {
    const now = Date.now();
    this.remain = Math.max(0, this.remain - (now - this._lastTimestamp) / 1000);
    this._lastTimestamp = now;
    this.options.onProgress(this.remain);
    if (this.remain === 0) {
      this.status = STOPPED;
      this.options.onStatusChange(this.status);
      return;
    }
    this._rafRequestId = window.requestAnimationFrame(this._step.bind(this));
  }

  start() {
    this.status = ACTIVE;
    this.options.onStatusChange(this.status);
    this._lastTimestamp = Date.now();
    this._rafRequestId = window.requestAnimationFrame(this._step.bind(this));
  }

  pause() {
    this.status = PAUSED;
    this.options.onStatusChange(this.status);
    window.cancelAnimationFrame(this._rafRequestId);
  }

  reset() {
    this.status = IDLE;
    this.options.onStatusChange(this.status);
    this.remain = this._initialValue;
    this.options.onProgress(this.remain);
  }
}

export default Stopwatch;
