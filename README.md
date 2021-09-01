# gatsby-plugin-advanced-sitemap-modest

Identical to the [gatsby-plugin-advanced-sitemap](https://www.gatsbyjs.com/plugins/gatsby-plugin-advanced-sitemap/) but includes the `hideAttribution` option that's been up as a [pull request](https://github.com/TryGhost/gatsby-plugin-advanced-sitemap/pull/158) by (sonaltr)[https://github.com/sonaltr]

**Demo:** https://brightcove.com/sitemap.xml
&nbsp;

_NOTE: This plugin only generates output in `production` mode! To test, run: `gatsby build && gatsby serve`_

&nbsp;


## Install

Installing 1.0.1 will give you the hide attribution feature + match the rest of the advanced sitemap features. Everything after that is wild nonsense to make the brightcove.com sitemap work.

`npm install --save gatsby-plugin-advanced-sitemap-modest@1.0.1`

## How to Use

Same as gatsby-plugin-advanced-sitemap but with the ability to hide the attribution

```javascript
// gatsby-config.js

plugins: [
    {
        resolve: `gatsby-plugin-advanced-sitemap-modest`,
        options: {
            hideAttribution: true
        }
    }
]
```

# Copyright & License

Copyright (c) 2013-2021 [Ghost Foundation](https://ghost.org/) - Released under the [MIT license](LICENSE).
