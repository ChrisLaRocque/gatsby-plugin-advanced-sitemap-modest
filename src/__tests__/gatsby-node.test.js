jest.mock(`fs-extra`);

const fs = require(`fs-extra`);
const path = require(`path`);

const {onPostBuild} = require(`../gatsby-node`);
const utils = require(`../utils`);

const pathPrefix = ``;

beforeEach(() => {
    global.__PATH_PREFIX__ = ``;
});

describe(`Test plugin sitemap`, () => {
    it(`default settings work properly`, async () => {
        utils.writeFile = jest.fn();
        utils.writeFile.mockResolvedValue(true);

        utils.outputFile = jest.fn();
        utils.outputFile.mockResolvedValue(true);

        utils.readFile = jest.fn();
        utils.readFile.mockResolvedValue(true);

        const graphql = jest.fn();

        graphql.mockResolvedValue({
            data: {
                site: {
                    siteMetadata: {
                        siteUrl: `http://dummy.url`,
                    },
                },
                allSitePage: {
                    edges: [
                        {
                            node: {
                                context: {
                                    slug: `virtual-events`,
                                    locale: `en-US`,
                                },
                                id: `SitePage /en/resources/blog/virtual-events/`,
                                path: `/en/resources/blog/virtual-events/`,
                                slug: `/en/resources/blog/virtual-events/`,
                                url: `/en/resources/blog/virtual-events/`,
                            },
                        },
                        {
                            node: {
                                context: {
                                    slug: `virtual-events`,
                                    locale: `ko`,
                                },
                                id: `SitePage /ko/resources/blog/virtual-events/`,
                                path: `/ko/resources/blog/virtual-events/`,
                                slug: `/ko/resources/blog/virtual-events/`,
                                url: `/ko/resources/blog/virtual-events/`,
                            },
                        },
                        {
                            node: {
                                context: {
                                    slug: `virtual-events`,
                                    locale: `de`,
                                },
                                id: `SitePage /de/resources/blog/virtual-events/`,
                                path: `/de/resources/blog/virtual-events/`,
                                slug: `/de/resources/blog/virtual-events/`,
                                url: `/de/resources/blog/virtual-events/`,
                            },
                        },
                        {
                            node: {
                                context: {
                                    slug: `virtual-events`,
                                    locale: `fr`,
                                },
                                id: `SitePage /fr/resources/blog/virtual-events/`,
                                path: `/fr/resources/blog/virtual-events/`,
                                slug: `/fr/resources/blog/virtual-events/`,
                                url: `/fr/resources/blog/virtual-events/`,
                            },
                        },
                        {
                            node: {
                                context: {
                                    slug: `virtual-events`,
                                    locale: `ja`,
                                },
                                id: `SitePage /ja/resources/blog/virtual-events/`,
                                path: `/ja/resources/blog/virtual-events/`,
                                slug: `/ja/resources/blog/virtual-events/`,
                                url: `/ja/resources/blog/virtual-events/`,
                            },
                        },
                        {
                            node: {
                                context: {
                                    slug: `media-and-monetization`,
                                    locale: `en-US`,
                                },
                                id: `SitePage /en/resources/blog/media-and-monetization/`,
                                path: `/en/resources/blog/media-and-monetization/`,
                                slug: `/en/resources/blog/media-and-monetization/`,
                                url: `/en/resources/blog/media-and-monetization/`,
                            },
                        },
                        {
                            node: {
                                context: {
                                    slug: `media-and-monetization`,
                                    locale: `ko`,
                                },
                                id: `SitePage /ko/resources/blog/media-and-monetization/`,
                                path: `/ko/resources/blog/media-and-monetization/`,
                                slug: `/ko/resources/blog/media-and-monetization/`,
                                url: `/ko/resources/blog/media-and-monetization/`,
                            },
                        },
                        {
                            node: {
                                context: {
                                    slug: `media-and-monetization`,
                                    locale: `de`,
                                },
                                id: `SitePage /de/resources/blog/media-and-monetization/`,
                                path: `/de/resources/blog/media-and-monetization/`,
                                slug: `/de/resources/blog/media-and-monetization/`,
                                url: `/de/resources/blog/media-and-monetization/`,
                            },
                        },
                        {
                            node: {
                                context: {
                                    slug: `media-and-monetization`,
                                    locale: `fr`,
                                },
                                id: `SitePage /fr/resources/blog/media-and-monetization/`,
                                path: `/fr/resources/blog/media-and-monetization/`,
                                slug: `/fr/resources/blog/media-and-monetization/`,
                                url: `/fr/resources/blog/media-and-monetization/`,
                            },
                        },
                    ],
                },
            },
        });

        await onPostBuild({graphql, pathPrefix}, {});

        const [filePath] = utils.outputFile.mock.calls[0];

        expect(filePath).toEqual(path.join(`public`, `sitemap.xml`));
    });

    it(`custom query runs`, async () => {
        utils.writeFile = jest.fn();
        utils.writeFile.mockResolvedValue(true);

        utils.outputFile = jest.fn();
        utils.outputFile.mockResolvedValue(true);

        utils.readFile = jest.fn();
        utils.readFile.mockResolvedValue(true);

        const graphql = jest.fn();

        graphql.mockResolvedValue({
            data: {
                site: {
                    siteMetadata: {
                        siteUrl: `http://dummy.url`,
                    },
                },
                allSitePage: {
                    edges: [
                        {
                            node: {
                                id: 1,
                                slug: `page-1`,
                                url: `http://dummy.url/page-1`,
                            },
                        },
                        {
                            node: {
                                id: 2,
                                slug: `/exclude-page`,
                                url: `http://dummy.url/post/exclude-page`,
                            },
                        },
                    ],
                },
            },
        });

        const customQuery = `
      {
        site {
          siteMetadata {
            siteUrl
          }
        }

        allSitePage {
          edges {
            node {
              slug: path
            }
          }
        } 
    }`;

        const options = {
            output: `custom-sitemap.xml`,
            serialize: edges => edges.map((edge) => {
                edge.node.slug = `/post` + edge.node.slug;

                return edge;
            }),
            exclude: [`/post/exclude-page`],
            query: customQuery,
        };

        await onPostBuild({graphql, pathPrefix}, options);

        const [filePath] = utils.outputFile.mock.calls[0];

        expect(filePath).toEqual(path.join(`public`, `custom-sitemap.xml`));
        expect(graphql).toBeCalledWith(customQuery);
    });
});

describe(`sitemap index`, () => {
    let graphql = null;
    const queryResult = {
        data: {
            site: {
                siteMetadata: {
                    siteUrl: `http://dummy.url`,
                },
            },
            allSitePage: {
                edges: [
                    {
                        node: {
                            id: 1,
                            slug: `page-1`,
                            url: `http://dummy.url/page-1`,
                        },
                    },
                    {
                        node: {
                            id: 2,
                            slug: `/exclude-page`,
                            url: `http://dummy.url/post/exclude-page`,
                        },
                    },
                ],
            },
        },
    };
    beforeEach(() => {
        graphql = jest.fn();
        graphql.mockResolvedValue(queryResult);

        fs.createWriteStream.mockReset();
        fs.createWriteStream.mockReturnValue({
            once: jest.fn((event, cb) => cb()),
            write: jest.fn(),
            end: jest.fn(),
        });

        fs.statSync.mockReset();
        fs.statSync.mockReturnValue({
            isDirectory: jest.fn(() => true),
        });
    });

    it(`set Prefix to sitemaps`, async () => {
        const options = {
            prefix: `posts/`,
        };
        utils.renameFile = jest.fn();
        utils.renameFile.mockResolvedValue(true);

        utils.writeFile = jest.fn();
        utils.writeFile.mockResolvedValue(true);

        utils.outputFile = jest.fn();
        utils.outputFile.mockResolvedValue(true);

        await onPostBuild({graphql, pathPrefix}, options);
        const [sitemap] = utils.outputFile.mock.calls[0];

        expect(sitemap).toEqual(path.join(`public`, `sitemap.xml`));
    });
});
