import "systemjs";

/**
 * Describes the export names from the vendor bundle.
 */
const vendorMaps: Record<string, string> = {
    "axios": "Axios",
    "mitt": "Mitt",
    "vee-validate": "VeeValidate",
    "vue": "Vue",
    "vuex": "Vuex"
};

/**
 * The options that obsidian should be initialized with.
 */
interface ObsidianOptions {
    fingerprint?: string;
}

/**
 * Handles initialization of the Obsidian framework. This allows for blocks
 * and pages to delay their own initialization until the Obsidian framework
 * is ready. Currently SystemJS and other base requirements are bundled together,
 * but that could change in the future to be asynchronous loading of components.
 */
class Obsidian {
    /** Functions that will need to be called once Obsidian is ready. */
    private readonly callbacks: Array<Function> = [];

    /** True if Obsidian has fully initialized and is ready to render. */
    private isReady: boolean = false;

    /** The options Obsidian was initialized with. */
    private options!: Required<ObsidianOptions>;

    /**
     * Registers a callback to be called when the Obsidian framework is ready.
     * 
     * @param callback The callback.
     */
    public onReady(callback: Function): void {
        if (this.isReady) {
            callback();
        }
        else {
            this.callbacks.push(callback);
        }
    }

    /**
     * Configures SystemJS to append the default extension.
     */
    private configureDefaultExtension() {
        const origResolve = System.constructor.prototype.resolve;
        const defaultExtension = '.js';
        const expectedExtensions = [defaultExtension, '.ts', '.css', '.json'];

        System.constructor.prototype.resolve = function (moduleId: string, ...args: any[]) {
            const isPackage = moduleId.indexOf('/') === -1 && moduleId.indexOf('\\') === -1;
            const hasExtension = expectedExtensions.some(ext => moduleId.endsWith(ext));

            return origResolve.call(
                this,
                (hasExtension || isPackage) ? moduleId : `${moduleId}${defaultExtension}`,
                ...args
            );
        };
    }

    /**
     * Configures SystemJS to append the default extension.
     */
    private configureThumbprint() {
        const origResolve = System.constructor.prototype.resolve;
        const defaultExtension = '.js';
        const expectedExtensions = [defaultExtension, '.ts', '.css', '.json'];
        const obsidian = this;

        System.constructor.prototype.resolve = function (moduleId: string, ...args: any[]) {
            let url = origResolve.call(this, moduleId, ...args);

            const hasExtension = expectedExtensions.some(ext => url.endsWith(ext));

            if (hasExtension) {
                if (url.indexOf("?") === -1) {
                    url += `?${obsidian.options.fingerprint}`;
                }
                else {
                    url += `&${obsidian.options.fingerprint}`;
                }
            }

            return url;
        };
    }

    /**
     * Configures any modules that are bundled in this script file.
     */
    private configureBundledMaps() {
        // Instruct SystemJS to accept the module name if it is a mapped one.
        var originalResolve = System.constructor.prototype.resolve;
        System.constructor.prototype.resolve = function (id: string, parentUrl?: string): string {
            if (vendorMaps[id] !== undefined) {
                return id;
            }

            return originalResolve(id, parentUrl);
        }

        // Intercept a request to instantiate a new module and if it is one
        // of our mapped modules then just return it from the bundle.
        var originalInstantiate = System.constructor.prototype.instantiate;
        System.constructor.prototype.instantiate = async function (url: string, parentUrl?: string): Promise<any> {
            if (vendorMaps[url] !== undefined) {
                const module = await System.import("/Obsidian/obsidian-vendor.js", parentUrl);

                return [[], function (_export: System.ExportFn) {
                    return {
                        execute() {
                            _export(module[vendorMaps[url]]);
                        }
                    };
                }];
            }
            else {
                return await originalInstantiate.call(this, url, parentUrl);
            }
        }
    }

    /**
     * Initialize the framework.
     */
    public init(options?: ObsidianOptions) {
        this.options = {
            fingerprint: options?.fingerprint ?? ""
        };

        this.configureDefaultExtension();

        if (this.options.fingerprint !== "") {
            this.configureThumbprint();
        }

        this.configureBundledMaps();

        this.isReady = true;

        // The concept of the callbacks is here due to backwards compatibility
        // as well as allowing for later requiring dynamically loading other
        // pre-requisites before initializing Obsidian.
        for (const callback of this.callbacks) {
            callback();
        }
    }
}

export default new Obsidian();
