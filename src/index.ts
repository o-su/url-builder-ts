export class UrlBuilder {
    private scheme: string;
    private userInfo: string | undefined;
    private host: string | undefined;
    private port: number | undefined;
    private paths: string[] = [];
    private parameters: string[] = [];
    private fragment: string | undefined;

    constructor(scheme: string) {
        this.scheme = scheme;
    }

    setScheme = (scheme: string): this => {
        this.scheme = scheme;

        return this;
    };

    setUserInfo = (userName: string, password?: string): this => {
        if (password) {
            this.userInfo = `${userName}:${password}`;
        } else {
            this.userInfo = userName;
        }

        return this;
    };

    setHost = (host: string): this => {
        this.host = host;

        return this;
    };

    setPort = (port: number): this => {
        this.port = port;

        return this;
    };

    addPath = (path: string): this => {
        this.paths.push(path);

        return this;
    };

    addParameter = (parameter: string, value: string): this => {
        this.parameters.push(`${encodeURIComponent(parameter)}=${encodeURIComponent(value)}`);

        return this;
    };

    setFragment = (fragment: string): this => {
        this.fragment = fragment;

        return this;
    };

    build = (): string => {
        let url: string = this.buildScheme();

        url += this.buildAuthority();
        url += this.buildPath();
        url += this.buildParameters();
        url += this.buildFragment();

        return url;
    };

    private buildScheme = (): string => {
        if (this.scheme) {
            return `${this.scheme}:`;
        } else {
            throw new Error("URL scheme is not defined.");
        }
    };

    private buildAuthority = (): string => {
        let url: string = "";

        if (this.host) {
            url += "//";

            if (this.userInfo) {
                url += `${this.userInfo}@`;
            }

            url += this.host;

            if (this.port) {
                url += `:${this.port}`;
            }
        }

        return url;
    };

    private buildPath = (): string => {
        let url: string = "";

        if (this.paths.length > 0) {
            if (this.host) {
                url += "/";
            }

            url += this.paths.join("/");
        }

        return url;
    };

    private buildParameters = (): string => {
        let url: string = "";

        if (this.parameters.length > 0) {
            url += "?" + this.parameters.join("&");
        }

        return url;
    };

    private buildFragment = (): string => {
        let url: string = "";

        if (this.fragment) {
            url += `#${this.fragment}`;
        }

        return url;
    };
}
