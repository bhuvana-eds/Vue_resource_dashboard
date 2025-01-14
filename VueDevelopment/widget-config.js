// const fs = require("fs");

const cfg = {
    urls: {
        // URL to serve from webpack (local)
        local: "http://localhost:8081/widget/"

        // URL to access this server (public), default is same as local
        //   you can define different public URL if you serve behind reverse proxy
        //      but public path and local path must be the same (webpack limitation)
        //   in case of S3: public URL must be undef
        // public: "https://public.host:443/widget/"
    },
    webpackDevOptions: {
        // in this section you can override webpack dev options (base configuration from webpack.config.dev.js)
        // please refer to https://webpack.js.org/configuration/ for global webpack configuration
        // please refer to https://webpack.js.org/configuration/dev-server/ for devServer

        devServer: {
            server: {
                type: "http"
                // uncomment these lines if you want to serve https
                /* options: {
                    key: fs.readFileSync("c:/Users/ii2/Downloads/localhost+5-key.pem"),
                    cert: fs.readFileSync("c:/Users/ii2/Downloads/localhost+5.pem")
                } */
            }
            // port: 9090
        }
    },
    s3: {
        // This section to configure startS3
        //   if you use startS3, urls.public must be undef and you must enable https
        options: {
            // aws sdk will use default profile if no accessKeyId & secretAccessKey are provided (files are undefined)
            accessKeyId: "your_AWS_AccessKeyId",
            secretAccessKey: "your_AWS_SecretAccessKey",
            region: "your_AWS_S3_bucket_region"

            // uncomment if you want to prevent static files to always resync
            // autoSyncIgnoreRegexp: /.*static\/(images|fonts|lib).*/
        },
        params: {
            Bucket: "your_bucket_name",
            ACL: "public-read",
            // distant path ;file path & name will be concatenated to the Key parameter
            Key: "path/inside/bucket"
        },
        // will compress js files using gzip
        useCompression: true
    },
    devVariables: {
        vue: {
            useExternalDebugger: false
        }
    }
};

module.exports = cfg;
