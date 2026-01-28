import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { tokens, reset } from '../styles/shared.js';

// Dynamic import for Three.js to make it optional
let THREE: typeof import('three') | null = null;
let OBJLoader: typeof import('three/addons/loaders/OBJLoader.js').OBJLoader | null = null;
let MTLLoader: typeof import('three/addons/loaders/MTLLoader.js').MTLLoader | null = null;

/**
 * Tampa Devs 3D Logo Component
 * Interactive 3D logo using Three.js with OBJ/MTL support
 *
 * @element td-logo-3d
 *
 * @prop {string} objUrl - URL to the OBJ file
 * @prop {string} mtlUrl - URL to the MTL file (optional)
 * @prop {number} width - Canvas width (default: 300)
 * @prop {number} height - Canvas height (default: 300)
 * @prop {boolean} autoRotate - Enable auto-rotation (default: true)
 * @prop {number} rotationSpeed - Auto-rotation speed (default: 0.01)
 * @prop {string} backgroundColor - Background color (default: transparent)
 * @prop {boolean} enableZoom - Enable mouse wheel zoom (default: false)
 * @prop {boolean} enablePan - Enable click-and-drag rotation (default: true)
 *
 * @csspart container - The canvas container
 * @csspart canvas - The WebGL canvas
 * @csspart fallback - The fallback content
 */
@customElement('td-logo-3d')
export class TdLogo3d extends LitElement {
  static styles = [
    tokens,
    reset,
    css`
      :host {
        display: block;
      }

      .container {
        position: relative;
        overflow: hidden;
        border-radius: var(--td-radius-lg);
      }

      canvas {
        display: block;
        width: 100%;
        height: 100%;
      }

      .loading {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(28, 36, 56, 0.1);
        color: var(--td-color-text-muted);
        font-size: 0.875rem;
      }

      .loading-spinner {
        width: 2rem;
        height: 2rem;
        border: 2px solid var(--td-color-border);
        border-top-color: var(--td-color-coral);
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }

      .error {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: rgba(28, 36, 56, 0.05);
        color: var(--td-color-text-muted);
        font-size: 0.875rem;
        text-align: center;
        padding: 1rem;
      }

      .fallback {
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, var(--td-color-navy) 0%, var(--td-color-navy-dark) 100%);
        color: white;
      }

      .fallback-text {
        font-size: 2rem;
        font-weight: 700;
      }

      .fallback-accent {
        color: var(--td-color-coral);
      }
    `,
  ];

  @property({ type: String }) objUrl = '';
  @property({ type: String }) mtlUrl = '';
  @property({ type: Number }) width = 300;
  @property({ type: Number }) height = 300;
  @property({ type: Boolean }) autoRotate = true;
  @property({ type: Number }) rotationSpeed = 0.01;
  @property({ type: String }) backgroundColor = 'transparent';
  @property({ type: Boolean }) enableZoom = false;
  @property({ type: Boolean }) enablePan = true;

  @state() private _loading = true;
  @state() private _error: string | null = null;
  @state() private _threeAvailable = false;

  private _scene: any = null;
  private _camera: any = null;
  private _renderer: any = null;
  private _model: any = null;
  private _animationId: number | null = null;
  private _isDragging = false;
  private _previousMouseX = 0;
  private _previousMouseY = 0;

  async connectedCallback() {
    super.connectedCallback();
    await this._loadThree();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._cleanup();
  }

  private async _loadThree() {
    try {
      // Dynamic imports for Three.js
      const threeModule = await import('three');
      THREE = threeModule;

      const objLoaderModule = await import('three/addons/loaders/OBJLoader.js');
      OBJLoader = objLoaderModule.OBJLoader;

      const mtlLoaderModule = await import('three/addons/loaders/MTLLoader.js');
      MTLLoader = mtlLoaderModule.MTLLoader;

      this._threeAvailable = true;
      await this.updateComplete;
      this._initScene();
    } catch (e) {
      console.warn('Three.js not available:', e);
      this._threeAvailable = false;
      this._loading = false;
    }
  }

  private _initScene() {
    if (!THREE || !this.shadowRoot) return;

    const container = this.shadowRoot.querySelector('.canvas-container');
    if (!container) return;

    // Create scene
    this._scene = new THREE.Scene();

    // Create camera
    this._camera = new THREE.PerspectiveCamera(
      45,
      this.width / this.height,
      0.1,
      1000
    );
    this._camera.position.z = 5;

    // Create renderer
    this._renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: this.backgroundColor === 'transparent',
    });
    this._renderer.setSize(this.width, this.height);
    this._renderer.setPixelRatio(window.devicePixelRatio);

    if (this.backgroundColor !== 'transparent') {
      this._renderer.setClearColor(this.backgroundColor);
    }

    container.appendChild(this._renderer.domElement);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this._scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    this._scene.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight2.position.set(-5, -5, -5);
    this._scene.add(directionalLight2);

    // Load model
    this._loadModel();

    // Add event listeners
    if (this.enablePan) {
      this._renderer.domElement.addEventListener('mousedown', this._onMouseDown);
      this._renderer.domElement.addEventListener('touchstart', this._onTouchStart);
      window.addEventListener('mousemove', this._onMouseMove);
      window.addEventListener('touchmove', this._onTouchMove);
      window.addEventListener('mouseup', this._onMouseUp);
      window.addEventListener('touchend', this._onMouseUp);
    }

    if (this.enableZoom) {
      this._renderer.domElement.addEventListener('wheel', this._onWheel);
    }

    // Start animation
    this._animate();
  }

  private async _loadModel() {
    if (!THREE || !OBJLoader || !this.objUrl) {
      this._loading = false;
      return;
    }

    try {
      let materials: any = null;

      // Load materials if MTL URL provided
      if (this.mtlUrl && MTLLoader) {
        const mtlLoader = new MTLLoader();
        materials = await new Promise((resolve, reject) => {
          mtlLoader.load(
            this.mtlUrl,
            (mtl: any) => {
              mtl.preload();
              resolve(mtl);
            },
            undefined,
            reject
          );
        });
      }

      // Load OBJ model
      const objLoader = new OBJLoader();
      if (materials) {
        objLoader.setMaterials(materials);
      }

      const object = await new Promise<any>((resolve, reject) => {
        objLoader.load(
          this.objUrl,
          resolve,
          undefined,
          reject
        );
      });

      // Center and scale the model
      const box = new THREE.Box3().setFromObject(object);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2 / maxDim;

      object.position.sub(center);
      object.scale.setScalar(scale);

      this._model = object;
      this._scene.add(object);
      this._loading = false;
    } catch (e) {
      console.error('Failed to load 3D model:', e);
      this._error = 'Failed to load 3D model';
      this._loading = false;
    }
  }

  private _animate = () => {
    this._animationId = requestAnimationFrame(this._animate);

    if (this._model && this.autoRotate && !this._isDragging) {
      this._model.rotation.y += this.rotationSpeed;
    }

    if (this._renderer && this._scene && this._camera) {
      this._renderer.render(this._scene, this._camera);
    }
  };

  private _onMouseDown = (e: MouseEvent) => {
    this._isDragging = true;
    this._previousMouseX = e.clientX;
    this._previousMouseY = e.clientY;
  };

  private _onTouchStart = (e: TouchEvent) => {
    if (e.touches.length === 1) {
      this._isDragging = true;
      this._previousMouseX = e.touches[0].clientX;
      this._previousMouseY = e.touches[0].clientY;
    }
  };

  private _onMouseMove = (e: MouseEvent) => {
    if (!this._isDragging || !this._model) return;

    const deltaX = e.clientX - this._previousMouseX;
    const deltaY = e.clientY - this._previousMouseY;

    this._model.rotation.y += deltaX * 0.01;
    this._model.rotation.x += deltaY * 0.01;

    this._previousMouseX = e.clientX;
    this._previousMouseY = e.clientY;
  };

  private _onTouchMove = (e: TouchEvent) => {
    if (!this._isDragging || !this._model || e.touches.length !== 1) return;

    const deltaX = e.touches[0].clientX - this._previousMouseX;
    const deltaY = e.touches[0].clientY - this._previousMouseY;

    this._model.rotation.y += deltaX * 0.01;
    this._model.rotation.x += deltaY * 0.01;

    this._previousMouseX = e.touches[0].clientX;
    this._previousMouseY = e.touches[0].clientY;
  };

  private _onMouseUp = () => {
    this._isDragging = false;
  };

  private _onWheel = (e: WheelEvent) => {
    if (!this._camera) return;
    e.preventDefault();

    this._camera.position.z += e.deltaY * 0.01;
    this._camera.position.z = Math.max(2, Math.min(10, this._camera.position.z));
  };

  private _cleanup() {
    if (this._animationId) {
      cancelAnimationFrame(this._animationId);
    }

    if (this._renderer) {
      this._renderer.dispose();

      if (this.enablePan) {
        this._renderer.domElement.removeEventListener('mousedown', this._onMouseDown);
        this._renderer.domElement.removeEventListener('touchstart', this._onTouchStart);
        window.removeEventListener('mousemove', this._onMouseMove);
        window.removeEventListener('touchmove', this._onTouchMove);
        window.removeEventListener('mouseup', this._onMouseUp);
        window.removeEventListener('touchend', this._onMouseUp);
      }

      if (this.enableZoom) {
        this._renderer.domElement.removeEventListener('wheel', this._onWheel);
      }
    }
  }

  render() {
    const containerStyle = `width: ${this.width}px; height: ${this.height}px;`;

    if (!this._threeAvailable && !this._loading) {
      return html`
        <div class="container fallback" part="fallback" style=${containerStyle}>
          <span class="fallback-text">Tampa<span class="fallback-accent">.dev</span></span>
        </div>
      `;
    }

    return html`
      <div class="container" part="container" style=${containerStyle}>
        <div class="canvas-container" part="canvas"></div>

        ${this._loading
          ? html`
              <div class="loading">
                <div class="loading-spinner"></div>
              </div>
            `
          : ''}

        ${this._error
          ? html`
              <div class="error">
                <p>${this._error}</p>
              </div>
            `
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'td-logo-3d': TdLogo3d;
  }
}
