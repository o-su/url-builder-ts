export class UrlBuilder {
    private settings: BuilderSettings;

    constructor(scheme: string) {
        this.settings = { scheme, paths: [], parameters: [] };
    }

    setScheme = (scheme: string): this => {
        this.settings.scheme = scheme;

        return this;
    };

    setUserInfo = (userName: string, password?: string): this => {
        this.settings.userInfo = { userName, password };

        return this;
    };

    setHost = (host: string): this => {
        this.settings.host = host;

        return this;
    };

    setPort = (port: number): this => {
        this.settings.port = port;

        return this;
    };

    addPath = (path: string): this => {
        this.settings.paths.push(path);

        return this;
    };

    addParameter = (name: string, value: string): this => {
        this.settings.parameters.push({ name, value });

        return this;
    };

    setFragment = (fragment: string): this => {
        this.settings.fragment = fragment;

        return this;
    };

    clone = (): UrlBuilder => {
        const builder = new UrlBuilder(this.settings.scheme);

        builder.setSettings(this.getSettings());

        return builder;
    };

    getSettings = (): BuilderSettings => JSON.parse(JSON.stringify(this.settings));

    setSettings = (settings: BuilderSettings): void => {
        this.settings = settings;
    };

    build = (): string => {
        let url: string = this.buildScheme();

        url += this.buildAuthority();
        url += this.buildPath();
        url += this.buildParameters();
        url += this.buildFragment();

        return url;
    };

    private buildScheme = (): string => `${this.settings.scheme}:`;

    private buildAuthority = (): string => {
        let url: string = "";

        if (this.settings.host) {
            url += "//";
            url += this.buildUserInfo();
            url += this.settings.host;

            if (this.settings.port) {
                url += `:${this.settings.port}`;
            }
        }

        return url;
    };

    private buildUserInfo = (): string => {
        let url: string = "";

        if (this.settings.userInfo) {
            const userInfo: UserInfo = this.settings.userInfo;

            if (userInfo.password) {
                url += `${userInfo.userName}:${userInfo.password}`;
            } else {
                url += userInfo.userName;
            }

            url += "@";
        }

        return url;
    };

    private buildPath = (): string => {
        let url: string = "";

        if (this.settings.paths.length > 0) {
            if (this.settings.host) {
                url += "/";
            }

            url += this.settings.paths.join("/");
        }

        return url;
    };

    private buildParameters = (): string => {
        let url: string = "";

        if (this.settings.parameters.length > 0) {
            url += "?" + this.stringifyUrlParameters(this.settings.parameters).join("&");
        }

        return url;
    };

    private stringifyUrlParameters = (parameters: UrlParameter[]): string[] => {
        return parameters.map(
            (parameter) =>
                `${encodeURIComponent(parameter.name)}=${encodeURIComponent(parameter.value)}`
        );
    };

    private buildFragment = (): string => {
        let url: string = "";

        if (this.settings.fragment) {
            url += `#${this.settings.fragment}`;
        }

        return url;
    };
}

export type BuilderSettings = {
    scheme: string;
    userInfo?: UserInfo;
    host?: string;
    port?: number;
    paths: string[];
    parameters: UrlParameter[];
    fragment?: string;
};

export type UserInfo = {
    userName: string;
    password?: string;
};

export type UrlParameter = {
    name: string;
    value: string;
};
