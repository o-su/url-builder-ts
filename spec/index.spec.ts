import { UrlBuilder } from "../src/index";

describe("unit tests", () => {
    test("UrlBuilder returns correct URL for basic configuration", () => {
        // given
        const urlBuilder = new UrlBuilder("https").setHost("localhost").setPort(8080);

        // when
        const result = urlBuilder.build();

        // then
        expect(result).toEqual("https://localhost:8080");
    });

    test("UrlBuilder returns correct URL for full configuration", () => {
        // given
        const urlBuilder = new UrlBuilder("https")
            .setUserInfo("admin", "pass")
            .setHost("localhost")
            .setPort(8080)
            .addPath("dir")
            .addPath("subdir")
            .addParameter("param", "value")
            .addParameter("param2", "value2")
            .setFragment("fragment");

        // when
        const result = urlBuilder.build();

        // then
        expect(result).toEqual(
            "https://admin:pass@localhost:8080/dir/subdir?param=value&param2=value2#fragment"
        );
    });

    test("clone returns deep copy", () => {
        // given
        const urlBuilder = new UrlBuilder("https")
            .setUserInfo("admin", "pass")
            .setHost("localhost");

        // when
        const result = urlBuilder.clone().setPort(8080);

        // then
        expect(urlBuilder.build()).toEqual("https://admin:pass@localhost");
        expect(result.build()).toEqual("https://admin:pass@localhost:8080");
    });
});
